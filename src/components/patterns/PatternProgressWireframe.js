function PatternProgressWireframe({completed, icon, name, type, progress, completionValue, progressPercentage}) {
  return (<li className={"pattern-progress card " + (completed ? 'completed' : '')}>
    <div className='icon image' style={{
      backgroundImage: `url(${icon})`
    }}></div>
    <div className='content'>
      <div className='name'>{name}</div>
      <div className='description faded'>{type}</div>
    </div>
    <div className='progress'>
      <span>{progress}</span>/<span>{completionValue}</span>
    </div>
    <div className='progress-bar'>
      <div className='bar'>
        <div className='fill' style={{width: `${progressPercentage}%`}}></div>
      </div>
    </div>
  </li>)
}

export default PatternProgressWireframe;
