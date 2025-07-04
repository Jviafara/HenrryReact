import React from 'react'
// import styledSpecies from "./Species.module.css";

export default function Species({ species, handleSpecies, handleAllSpecies }) {
  // console.log(species);
  return (
    <div>
      <h2>Species</h2>
      {species.map(sp => (
        <button
          key={sp}
          onClick={handleSpecies}
          value={sp}
          type='button'
        >
          {sp}
        </button>
      ))}
      <button
        type='button'
        onClick={handleAllSpecies}
      >
        All Animals
      </button>
    </div>
  )
}
