import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CharacterDetail from './Characterdetail'
import CharacterList from './Characterlist'

function App() {
  const [character, setCharacter] = useState(null)

  return (
    <>
     <CharacterList handleCharacterSelect={setCharacter}/>
     {character && <CharacterDetail characterId={character.id}/>}
    </>
  )
}

export default App
