import React from 'react'
import styleCard from './Card.module.css'
import { Link } from 'react-router-dom'

export default function Card({ name, image, id }) {
  return (
    <Link
      to={`/cruiser/${id}`}
      className={styleCard.container}
    >
      <h4>{name}</h4>
      <img
        src={image}
        alt=''
      />
    </Link>
  )
}
