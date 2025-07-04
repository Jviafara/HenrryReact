import React from 'react'
import styledAnimals from './Animals.module.css'

export default class Animals extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <div className={styledAnimals.container}>
        {this.props.animals.map((animal, index) => (
          <div
            key={index}
            className={styledAnimals.containerAnimals}
          >
            <h5>{animal.name}</h5>

            <img
              src={animal.image}
              alt={animal.name}
              width={300}
            />
            <span>{animal.specie}</span>
          </div>
        ))}
      </div>
    )
  }
}
