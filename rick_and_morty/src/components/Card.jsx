export default function Card(props) {
  return (
    <div>
      <button onClick={props.onClose}>X</button>
      <h2>{props.name}</h2>
      <h2>{props.status}</h2>
      <h2>{props.especies}</h2>
      <h2>{props.gender}</h2>
      <h2>{props.origin.name ? props.origin.name : props.origin}</h2>
      <img
        src={props.image}
        alt='pic'
      />
    </div>
  )
}
