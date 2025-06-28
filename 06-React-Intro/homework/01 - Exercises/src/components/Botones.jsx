import React from 'react'

class Botones extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => alert('Módulo #1 Alert')}>Módulo 1</button>
        <button onClick={() => alert('Módulo #2 Alert')}>Módulo 2</button>
      </div>
    )
  }
}

export default Botones
