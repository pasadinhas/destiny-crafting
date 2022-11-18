import './App.css';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Categories, Uncategorized } from './Categories'
import Sources from './components/sources/Sources';
import Weapons from './components/patterns/Weapons';
import Constants from './utils/Constants';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useWeapons } from './hooks/customHooks';
import { getLocalAccessToken, getToken } from './utils/auth';
import { testCurrentAuthentication } from './utils/fetchers';
import { defaultContext } from '@tanstack/react-query';

const categorizedHashes = Categories.flatMap(category => category.hashes)

function uncategorizedWeapons(weapons) {
  return Object.values(weapons).filter(weapon => categorizedHashes.indexOf(weapon.hash) === -1).map(weapon => weapon.hash)
}

function bungie(path) {
  return `https://www.bungie.net${path}`
}

function authorize(queryClient, setLoginStatus) {
  const authorizeUrl = bungie(`/en/oauth/authorize?client_id=${Constants.CLIENT_ID}&response_type=code`)
  
  localStorage.setItem('tabbed', true);
  window.open(authorizeUrl, "loginui", "height=760, width=790, left=550, top=150, menubar=no, location=no, resizable=no, scrollbars=yes, status=no, toolbar=no", !1)
  window.addEventListener('storage', function(e) {
      (async function () {
        if(localStorage.getItem('tabbed') && localStorage.getItem('code')) {
            // Reload authorization code from LocalStorage
            localStorage.removeItem('tabbed');
            const code = localStorage.getItem('code')
  
            console.log(`Getting access token using code: ${code}`)
            const response = await fetch('https://www.bungie.net/platform/app/oauth/token/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: `client_id=${Constants.CLIENT_ID}&client_secret=${Constants.CLIENT_SECRET}&grant_type=authorization_code&code=${code}`
            })
            const data = await response.json()
            console.log({accessToken: data})
            localStorage.setItem(Constants.ACCESS_TOKEN_KEY, JSON.stringify(data))

            setLoginStatus(LoginStatus.LoggedIn)
            queryClient.invalidateQueries()
        }
      })()
  });
}

function logout() {
  localStorage.removeItem('code')
  localStorage.removeItem('access_token')
  window.location.reload()
}

const LoginStatus = Object.freeze({
  Loading: Symbol("loading"),
  LoggedIn: Symbol("logged_in"),
  LoggedOut: Symbol("logged_out")
})

function App() {

  const queryClient = useContext(defaultContext)

  const [activeSource, setActiveSource] = useState(Categories[0])
  const [loginStatus, setLoginStatus] = useState(LoginStatus.Loading)

  const weapons = useWeapons()
  const uncategorizedHashes = useMemo(() => uncategorizedWeapons(weapons), [weapons])
  Uncategorized.hashes = uncategorizedHashes

  const storedAccessToken = getToken()
  useEffect(() => {
    const localAccessToken = getLocalAccessToken()
    if (localAccessToken == null) {
      setLoginStatus(LoginStatus.LoggedOut)
      return;
    }
    testCurrentAuthentication().then(authenticated => {
      if (authenticated) {
        setLoginStatus(LoginStatus.LoggedIn);
      } else {
        setLoginStatus(LoginStatus.LoggedOut);
      }
    })
  }, [storedAccessToken])


  return (<>
    <div className="App">
      <div className="header">
        <div className="content">
          <div className='brand'><span>D2 Crafting</span></div>
          {loginStatus === LoginStatus.Loading 
            ?<span>Checking log in status...</span>
            : loginStatus === LoginStatus.LoggedOut 
              ? <button className='button' onClick={() => authorize(queryClient, setLoginStatus)}>Login</button>
              : <button className='button' onClick={() => logout()}>Logout</button>
          }
        </div>
      </div>
      <div className='app-content'>
        <Sources sources={Categories} activeSource={activeSource} setActiveSource={setActiveSource} />
        <Weapons source={activeSource} />
        <div>
          <h1 className="column-title">Activities</h1>
          <ul className='list'>
            {activeSource.activities}
          </ul>
        </div>
      </div>
    </div>
    <ReactQueryDevtools />
  </>);
}

export default App;
