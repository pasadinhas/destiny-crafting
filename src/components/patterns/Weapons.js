import { useWeapons } from "../../hooks/customHooks"
import EmptyPatternProgress from "./EmptyPatternProgress";
import Weapon from "./Weapon";

function Weapons({source, definitions}) {
  const weapons = useWeapons()

  return (<div>
    <h1 className="column-title">Pattern Progress</h1>
    <ul className="list">
      {source.hashes.map(hash => weapons[hash]).map(weapon => weapon != null 
        ? <Weapon key={weapon.hash} definitions={definitions} weapon={weapon}/>
        : <EmptyPatternProgress />
      )}
    </ul>
  </div>)
}

export default Weapons;
