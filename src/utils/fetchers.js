import { getMembershipId, getToken } from "./auth"
import Constants from "./Constants"


function bungie(path) {
  return `https://www.bungie.net${path}`
}

async function bungieApi(path, accessToken = null, method = 'GET') {
  accessToken = accessToken ?? getToken()
  console.log(`Fetching: ${path}`)
  return await fetch(bungie(path), {
    method: method,
    headers: {
      "authorization": `Bearer ${accessToken}`,
      "x-api-key": Constants.API_KEY
    }
  })
}

async function testCurrentAuthentication() {
  return bungieApi(`/Platform/Destiny2/254/Profile/${getMembershipId()}/LinkedProfiles/`).then(r => {
    return r.status == 200
  })
}

async function bungieApiJson(path, accessToken = null, method = 'GET') {
  return (await bungieApi(path, accessToken, method)).json()
}

async function fetchLinkedProfiles({ queryKey: [_, __, membershipId] }) {
  return await bungieApiJson(`/Platform/Destiny2/254/Profile/${membershipId}/LinkedProfiles/`)
}

async function fetchProfile({queryKey: [_, __, membershipType, membershipId, ...components]}) {
  return await bungieApiJson(`/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=${components.join(',')}`)
}

async function fetchManifest() {
  console.log(`Fetching manifest`)
  const response = await fetch(bungie("/Platform/Destiny2/Manifest/"))
  return response.json()
}

async function fetchDefinitions({ queryKey: [_, path] }) {
  console.log(`Fetching definitions`, path)

  const response = await fetch(bungie(path))
  return response.json()
}

async function fetchVendors({queryKey: [_, __, membershipType, membershipId, characterId, ...components]}) {
  return await bungieApiJson(`/Platform/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}/Vendors/?components=${components.join(',')}`)
}

async function fetchActivities({queryKey: [_, __, membershipType, membershipId, characterId], pageParam = 0 }) {
  return await bungieApiJson(`/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/${characterId}/Stats/Activities/?count=250&page=${pageParam}`)
}

export { fetchLinkedProfiles, fetchManifest, fetchProfile, fetchDefinitions, fetchVendors, fetchActivities, testCurrentAuthentication }