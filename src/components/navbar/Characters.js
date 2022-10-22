import { useProfile } from "../../hooks/customHooks"

function classTypeDisplayName(classType) {
  switch (classType) {
    case 0: return "Titan"
    case 1: return "Hunter"
    case 2: return "Warlock"
    default: return "???"
  }
}

function Characters() {
  const { isSuccess, data: profile } = useProfile(200)

  console.log({characters: profile?.Response?.characters?.data})
  return (<div className='characters'>
    {isSuccess && Object.values(profile.Response.characters.data).map(character => (
      <div key={character.characterId} className='character'>
        <div className="image" style={{
          backgroundImage: `url(https://bungie.net/${character.emblemBackgroundPath})`
        }}>
          <div className="class">{classTypeDisplayName(character.classType)}</div>
          <div className="power">{character.light}</div>
        </div>
      </div>)
    )}
  </div>)
}

export default Characters;
