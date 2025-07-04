import React, { useState } from 'react'
import './Contact.modules.css'

// eslint-disable-next-line
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

export function validate(inputs) {
  const errors = {}

  if (!inputs.name) {
    errors.name = 'Se requiere un nombre!'
  }
  if (!regexEmail.test(inputs.email)) {
    errors.email = 'Debe ser un correo electrónico'
  }
  if (!inputs.message) {
    errors.message = 'Se requiere un mensaje!'
  }

  return errors
}

export default function Contact() {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  })

  function handleSubmit(e) {
    e.preventDefault()
    const errorsArray = Object.values(errors)

    if (errorsArray.length > 0) {
      alert('Todos los datos deben ser validos!')
    } else {
      alert('Mensage enviado!')
      setInputs({
        name: '',
        email: '',
        message: '',
      })
      setErrors({
        name: '',
        email: '',
        message: '',
      })
    }
  }

  function handleChanges(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
    setErrors(validate({ ...inputs, [e.target.name]: e.target.value }))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor='name'>Name:</label>
          <input
            name='name'
            type='text'
            placeholder='Write your name...'
            value={inputs.name}
            onChange={handleChanges}
            className={errors.name && 'warning'}
          />
          <p className='danger'>{errors.name}</p>
          <label htmlFor='email'>Email:</label>
          <input
            name='email'
            type='text'
            placeholder='EMAIL'
            value={inputs.email}
            onChange={handleChanges}
            className={errors.email && 'warning'}
          />
          <p className='danger'>{errors.email}</p>
          <label htmlFor='message'>Message:</label>
          <input
            name='message'
            type='text'
            placeholder='Write your message...'
            value={inputs.message}
            onChange={handleChanges}
            className={errors.message && 'warning'}
          />
          <p className='danger'>{errors.message}</p>
        </section>
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}
