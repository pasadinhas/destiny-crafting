import SourceGroup from "./SourceGroup";


function Sources({sources, activeSource, setActiveSource}) {
  const sourceGroups = sources.reduce((result, source) => {
    const group = source.group ?? "Ungrouped"
    result[group] = [...(result[group] || []), source]
    return result;
  }, {})

  console.log(sourceGroups)
  
return (<div>
    <h1 className="column-title">Categories</h1>
    {Object.entries(sourceGroups).map(([groupName, groupSources]) => <SourceGroup name={groupName} sources={groupSources} setActiveSource={setActiveSource} activeSource={activeSource} />)}
  </div>)
}

export default Sources;
