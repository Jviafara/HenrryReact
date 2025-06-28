import Card from './Card'

export default function Cards(props) {
  const characters = props.characters
  return (
    <div>
      {characters.map(ch => (
        <Card
          key={ch.id}
          id={ch.id}
          name={ch.name}
          status={ch.status}
          species={ch.species}
          gender={ch.gender}
          origin={ch.origin.name}
          image={ch.image}
          onClose={() => window.alert('Emulamos que se cierra la card')}
        />
      ))}
    </div>
  )
}
