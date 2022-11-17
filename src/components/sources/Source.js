import { useWeapons } from "../../hooks/customHooks"

function bungie(path) {
  return `https://www.bungie.net${path}`
}

function completedWeapons(source, weapons) {
  if (!weapons) return 0;
  return source.hashes.map(hash => weapons[hash])
      .filter(weapon => weapon != null)
      .filter(weapon => weapon.state == 67)
      .length
}

function Source({active, setActive, source}) {
  const weapons = useWeapons()
  const completed = completedWeapons(source, weapons)
  const available = source.hashes.length
  const complete = completed == available

  const classes = ['source', active ? 'active' : '', complete ? 'completed' : ''].join(' ')

  return (<li className={classes} onClick={setActive}>
    <div className='icon' style={{
      backgroundImage: `url(${source.icon})`
    }}></div>
    <div className="content">{source.name}</div>
    <div className='progress'>
      <span>{completed}</span>/<span>{available}</span>
    </div>
    <a href="/" onClick={e => {
      e.preventDefault();
      setActive();
    }}></a>
  </li>)
}

export default Source;
