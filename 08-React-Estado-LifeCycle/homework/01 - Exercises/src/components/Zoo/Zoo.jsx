import React from 'react'
// eslint-disable-next-line no-unused-vars
import Animals from '../Animals/Animals'
// eslint-disable-next-line no-unused-vars
import Species from '../Species/Species'
// import styledZoo from "./Zoo.module.css";

export default function Zoo() {
  /* Escribe acá tu código */
  const [zoo, setZoo] = React.useState({
    zooName: '',
    animals: [],
    species: [],
    allAnimals: [],
  })

  React.useEffect(() => {
    fetch('http://localhost:3001/zoo')
      .then(res => res.json())
      .then(data =>
        setZoo({
          ...zoo,
          animals: data.animals,
          species: data.species,
          allAnimals: data.animals,
        })
      )
      .catch(error => console.log(error))
  }, [])

  const handleChange = event => {
    setZoo({ ...zoo, zooName: event.target.value })
  }

  function handleSpecies(e) {
    setZoo({
      ...zoo,
      animals: zoo.animals.filter(a => a.specie === e.target.value),
    })
  }

  function handleAllSpecies() {
    setZoo({ ...zoo, animals: zoo.allAnimals })
  }

  return (
    <div>
      <label htmlFor='zooName'>Zoo Name</label>
      <input
        type='text'
        name='zooName'
        value={zoo.zooName}
        onChange={handleChange}
        id='zooName'
      />
      <h1>{zoo.zooName}</h1>
      <Species
        species={zoo.species}
        handleAllSpecies={handleAllSpecies}
        handleSpecies={handleSpecies}
      />
      <Animals animals={zoo.animals} />
    </div>
  )
}
