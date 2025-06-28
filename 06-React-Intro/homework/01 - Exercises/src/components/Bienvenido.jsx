import React from 'react'
import Botones from './Botones'

const studentName = 'Jesús Viafara'
const techSkills = ['Html', 'Css', 'JavaScript', 'React', 'Redux']
const alerts = { m1: 'Aprobado', m2: 'En curso' }

export default function Bienvenido() {
  // el código de tu componente acá
  techSkills.forEach(skill => console.log(skill))

  return (
    <div>
      <h1>React Intro Homework:</h1>
      <h3>{studentName}</h3>
      <ul>
        {techSkills.map(skill => (
          <li>{skill}</li>
        ))}
      </ul>
      <Botones />
    </div>
  )
}

// Esto lo exportamos para los tests
export { studentName, techSkills, alerts }
