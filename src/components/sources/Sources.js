import Source from "./Source";

function Sources({sources, activeSource, setActiveSource}) {
  return (<div>
    <h1 className="column-title">Categories</h1>
    <ul className="menu-list">
      {sources.map(source => <Source key={source.name} setActive={() => setActiveSource(source)} active={source === activeSource} source={source}/>)}
    </ul>
  </div>)
}

export default Sources;
