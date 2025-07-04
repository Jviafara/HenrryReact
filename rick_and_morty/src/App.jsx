import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import Cards from './components/Cards'
import Card from './components/Card.jsx'
import characters, { Rick } from './data.js'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <SearchBar onSearch={characterID => window.alert(characterID)} />
      <Cards characters={characters} />
      <Card
        id={Rick.id}
        name={Rick.name}
        status={Rick.status}
        species={Rick.species}
        gender={Rick.gender}
        origin={Rick.origin.name}
        image={Rick.image}
        onClose={() => window.alert('Emulamos que se cierra la card')}
      />
    </div>
  )
}

export default App
