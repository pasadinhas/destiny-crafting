import { useQuery } from "@tanstack/react-query"
import { getToken } from "./auth"
import Constants from "./Constants"


function bungie(path) {
  return `https://www.bungie.net${path}`
}

async function bungieApi(path, accessToken = null, method = 'GET') {
  accessToken = accessToken ?? getToken()
  const response = await fetch(bungie(path), {
    method: method,
    headers: {
      "authorization": `Bearer ${accessToken}`,
      "x-api-key": Constants.API_KEY
    }
  })
  return response.json()
}


async function fetchLinkedProfiles({ queryKey: [ _, membershipId ] }) {
  return await bungieApi(`/Platform/Destiny2/254/Profile/${membershipId}/LinkedProfiles/`)
}

async function fetchProfile({queryKey: [_, membershipType, membershipId, ...components]}) {
  return await bungieApi(`/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=${components.join(',')}`)
}

async function fetchManifest() {
  console.log(`Fetching manifest`)
  const response = await fetch(bungie("/Platform/Destiny2/Manifest/"))
  return response.json()
}

async function fetchDefinitions({ queryKey: [ _, path ] }) {
  console.log(`Fetching definitions`, path)

  const response = await fetch(bungie(path))
  return response.json()
}

async function fetchVendors({queryKey: [_, membershipType, membershipId, characterId, ...components]}) {
  return await bungieApi(`/Platform/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}/Vendors/?components=${components.join(',')}`)
}

export { fetchLinkedProfiles, fetchManifest, fetchProfile, fetchDefinitions, fetchVendors }