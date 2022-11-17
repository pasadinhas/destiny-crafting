import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { fetchManifest, fetchDefinitions, fetchLinkedProfiles, fetchProfile, fetchVendors, fetchActivities } from '../utils/fetchers'
import { getMembershipId, getToken } from '../utils/auth'
import { useMemo } from 'react'
import { lastWeeklyReset } from '../utils/weeklyReset'

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
  return useQuery(['authenticated', 'linked-profiles', membershipId], fetchLinkedProfiles, {
    enabled: !!membershipId && !!getToken(),
    staleTime: Infinity,
    cacheTime: Infinity,
  })
}

function useProfile(...components) {
  const { data } = useLinkedProfiles()
  const membershipType = data?.Response?.profiles[0]?.membershipType
  const membershipId = data?.Response?.profiles[0]?.membershipId

  return useQuery(['authenticated', 'profile', membershipType, membershipId, ...components], fetchProfile, {
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

  return useQuery(['authenticated', 'vendors', membershipType, membershipId, characterId, 400, 402, 1200], fetchVendors, {
    enabled: !!characterId && !!membershipType && !!membershipId && !!getToken(),
    staleTime: Infinity
  })
}

let currentCharacterActivitiesPage = [0, 0, 0]
let characterActivitiesComplete = [false, false, false]
function useAllCharacterActivitiesSinceLastReset() {
  const currentWeekBeginDate = lastWeeklyReset()
  const { data: linkedProfiles } = useLinkedProfiles()
  const membershipType = linkedProfiles?.Response?.profiles[0]?.membershipType
  const membershipId = linkedProfiles?.Response?.profiles[0]?.membershipId

  const { data: profile } = useProfile(200)
  const characters = Object.values(profile?.Response?.characters?.data || {})
  const characterIds = [0, 1, 2].map(i => characters[i]?.characterId ?? 0)
  let activities = []

  for (let i = 0; i < characterIds.length; i++) {
    const characterId = characterIds[i]
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, } = useInfiniteQuery(
      ['authenticated', 'activities', membershipType, membershipId, characterId], 
      fetchActivities, {
        enabled: !!characterId && !!membershipType && !!membershipId && !!getToken(),
        staleTime: Infinity,
        cacheTime: 1000 * 60 * 5, // 5 minutes
        getNextPageParam: (lastPage, pages) => {
          if (lastPage.ErrorCode != 1) {
            console.error("Error getting activities.", lastPage)
            return null;
          }
          if (characterActivitiesComplete[i]) {
            return null
          }
          if (lastPage.Response.activities.length < 250) {
            // the page wasn't complete, so we don't have more data
            characterActivitiesComplete[i] = true
            return null
          }

          if (lastPage.Response.activities.reduce((result, activity) => {
            return result || new Date(activity.period) < currentWeekBeginDate
          }, false)) {
            characterActivitiesComplete[i] = true
            return null
          }
          return currentCharacterActivitiesPage[i] + 1
        }
      }
    )

    if (hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage().then(result => currentCharacterActivitiesPage[i]++)
    }

    const characterActivities = (data?.pages || []).flatMap(page => (page?.Response?.activities || []))
    const characterActivitiesThisReset = characterActivities.filter(activity => new Date(activity.period) > currentWeekBeginDate)
    
    activities = [...activities, ...characterActivitiesThisReset]
  }

  return activities
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
  useOwnedItemInstances,
  useAllCharacterActivitiesSinceLastReset
}