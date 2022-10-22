import Constants from './Constants'

function getMembershipId() {
  return getLocalAccessToken()?.membership_id
}

function getLocalAccessToken() {
  const accessToken = localStorage.getItem(Constants.ACCESS_TOKEN_KEY)
  if (!accessToken) {
    return null
  }
  return JSON.parse(accessToken)
}

function getToken() {
  return getLocalAccessToken()?.access_token
}

export { getMembershipId, getLocalAccessToken, getToken }