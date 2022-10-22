import { useWeapons } from "../../hooks/customHooks"
import Weapon from "./Weapon";

function Weapons({source, definitions}) {
  const weapons = useWeapons()

  return (<div>
    <h1 className="column-title">Weapons</h1>
    <ul className="list">
      {source.hashes.map(hash => weapons[hash]).filter(weapon => weapon != null).map(weapon => 
        <Weapon key={weapon.hash} definitions={definitions} weapon={weapon}/>)}
    </ul>
  </div>)
}

export default Weapons;
