import { useAllCharacterActivitiesSinceLastReset } from "../../hooks/customHooks"

function ActivityCompletion({ hash, hashes = [] }) {
  hashes = hash ? [...hashes, hash] : hashes
  const activities = useAllCharacterActivitiesSinceLastReset()
  const completed = activities.reduce(
    (result, activity) => result || hashes.indexOf(activity.activityDetails.directorActivityHash) >= 0,
    false
  )

  return (<li className="unlock span-1">
    <div className={'checkbox ' + (completed ? 'completed' : '')}></div>
    <div className='content'>
      <div className='name'>Ketchcrash</div>
      <div className='description'>Complete a Ketchcrash activity</div>
    </div>
  </li>)
}

export default ActivityCompletion