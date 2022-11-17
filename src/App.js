import './App.css';
import { useMemo, useState } from 'react';
import { Categories, Uncategorized } from './Categories'
import Sources from './components/sources/Sources';
import Weapons from './components/patterns/Weapons';
import Constants from './utils/Constants';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useWeapons, useProfile } from './hooks/customHooks';
import Characters from './components/navbar/Characters';

const categorizedHashes = Categories.flatMap(category => category.hashes)

function uncategorizedWeapons(weapons) {
  return Object.values(weapons).filter(weapon => categorizedHashes.indexOf(weapon.hash) == -1).map(weapon => weapon.hash)
}

function bungie(path) {
  return `https://www.bungie.net${path}`
}

function authorize() {
  const authorizeUrl = bungie(`/en/oauth/authorize?client_id=${Constants.CLIENT_ID}&response_type=code`)
  
  localStorage.setItem('tabbed', true);
  window.open(authorizeUrl);
  window.addEventListener('storage', function(e) {
      (async function () {
        console.log('Code?', localStorage)
        if(localStorage.getItem('tabbed') && localStorage.getItem('code')) {
            console.log("Let's go")
            // Reload authorization code from LocalStorage
            localStorage.removeItem('tabbed');
            const code = localStorage.getItem('code')
  
            console.log(`Getting access token for code: ${code}`)
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
        }
        
      })()
  });
}

function App() {

  const [activeSource, setActiveSource] = useState(Categories[0])
  const [character, setCharacter] = useState(null)

  const weapons = useWeapons()
  const uncategorizedHashes = useMemo(() => uncategorizedWeapons(weapons), [weapons])
  Uncategorized.hashes = uncategorizedHashes


  return (<>
    <div className="App">
      <div className="header">
        <div className="content">
          <div className='brand'><span>D2 Crafting</span></div>
          {/*<Characters />*/}
          <button className='button' onClick={authorize}>Login</button>
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
