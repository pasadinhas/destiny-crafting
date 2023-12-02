import Source from "./Source";

function SourceGroup({name, sources, activeSource, setActiveSource}) {
  return (<div>
    <h2 className="source-group">{name}</h2>
    <ul className="menu-list">
      {sources.map(source => <Source key={source.name} setActive={() => setActiveSource(source)} active={source === activeSource} source={source}/>)}
    </ul>
  </div>)
}

export default SourceGroup;
