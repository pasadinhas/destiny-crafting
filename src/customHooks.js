import { useQuery } from '@tanstack/react-query'
import { fetchManifest, fetchDefinitions, fetchLinkedProfiles, fetchProfile, fetchVendors } from './fetchers'
import { getMembershipId, getToken } from './auth'
import { useMemo } from 'react'

function useManifest() {
  return useQuery(['manifest'], fetchManifest, {
    staleTime: Infinity,
    cacheTime: Infinity,
  })
}

function useDefinitions() {
  const { isLoading, data } = useManifest()

  const definitionsPath = data?.Response?.jsonWorldContentPaths?.en

  return useQuery(['definitions', definitionsPath], fetchDefinitions, {
    enabled: !!definitionsPath,
    staleTime: Infinity,
    cacheTime: Infinity,
  })
}

function useLinkedProfiles() {
  const membershipId = getMembershipId()
  return useQuery(['linked-profiles', membershipId], fetchLinkedProfiles, {
    enabled: !!membershipId && !!getToken(),
    staleTime: Infinity,
    cacheTime: Infinity,
  })
}

function useProfile(...components) {
  const { data } = useLinkedProfiles()
  const membershipType = data?.Response?.profiles[0]?.membershipType
  const membershipId = data?.Response?.profiles[0]?.membershipId

  return useQuery(['profile', membershipType, membershipId, ...components], fetchProfile, {
    enabled: !!membershipType && !!membershipId && !!getToken(),
    staleTime: Infinity,
  })
}

function useVendors() {
  const { data: linkedProfiles } = useLinkedProfiles()
  const membershipType = linkedProfiles?.Response?.profiles[0]?.membershipType
  const membershipId = linkedProfiles?.Response?.profiles[0]?.membershipId

  const { data: profile } = useProfile(200)
  const characters = (profile?.Response?.characters?.data || {})
  const characterId = Object.values(characters)[0]?.characterId

  console.log({ membershipId, membershipType, characters, characterId })

  return useQuery(['vendors', membershipType, membershipId, characterId, 400, 402, 1200], fetchVendors, {
    enabled: !!characterId && !!membershipType && !!membershipId && !!getToken(),
    staleTime: Infinity
  })
}

function useOwnedVendorItems() {
  const { data } = useVendors()
  return useMemo(() => {
    if (!data) return []
    return Object.values(data.Response.sales.data).flatMap(sale => Object.values(sale.saleItems))
      .filter(item => (item.augments || 0) & 128)
      .map(item => item.itemHash)
  }, [data])
}

function useCraftableWeaponsDefinitions() {
  const { data } = useDefinitions()
  return useMemo(() => {
    if (!data) {
      return {}
    }

    return Object.values(data.DestinyRecordDefinition)
      .filter(record => record.completionInfo?.toastStyle == 8)
      .reduce((result, definition) => {
        result[definition.hash] = definition
        return result
      }, {})
  }, [data])
}

function useWeapons() {
  const definitions = useCraftableWeaponsDefinitions()
  const { data: profile } = useProfile(900)
  return useMemo(() => {
    if (!profile) {
      return definitions
    }

    const profileRecords = profile.Response.profileRecords.data.records

    return Object.entries(definitions).reduce((result, [hash, definition]) => {
      result[hash] = {
        ...definition,
        ...profileRecords[hash]
      }
      return result
    }, {})
  }, [definitions, profile])
}

function useOwnedItemInstances(itemHashes = []) {
  const { data: profile } = useProfile(102, 201, 300, 301, 302, 304, 305, 306, 308, 309)

  return useMemo(() => {
    if (!profile) {
      return []
    }

    const instances = profile.Response.itemComponents.instances.data
    const objectives = profile.Response.itemComponents.objectives.data
    const perks = profile.Response.itemComponents.perks.data
    const plugObjectives = profile.Response.itemComponents.plugObjectives.data
    const plugStates = profile.Response.itemComponents.plugStates.data
    const sockets = profile.Response.itemComponents.sockets.data
    const stats = profile.Response.itemComponents.stats.data
    const talentGrids = profile.Response.itemComponents.talentGrids.data

    return Object.values(profile.Response.characterInventories.data).reduce((result, inventory) => {
      return result.concat(inventory.items)
    }, profile.Response.profileInventory.data.items)
    .filter(item => item.itemInstanceId) // Not all items have instances
    .filter(item => !itemHashes || itemHashes.length == 0 || itemHashes.indexOf(item.itemHash) >= 0)
    .map(item => ({
      ...instances[item.itemInstanceId],
      ...objectives[item.itemInstanceId],
      ...perks[item.itemInstanceId],
      ...plugObjectives[item.itemInstanceId],
      ...plugStates[item.itemInstanceId],
      ...sockets[item.itemInstanceId],
      ...stats[item.itemInstanceId],
      ...talentGrids[item.itemInstanceId],
    }))
  }, [profile, itemHashes])
}

export {
  useDefinitions,
  useManifest,
  useLinkedProfiles,
  useProfile,
  useCraftableWeaponsDefinitions,
  useWeapons,
  useVendors,
  useOwnedVendorItems,
  useOwnedItemInstances
}