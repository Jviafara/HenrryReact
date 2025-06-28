const amigosBtn = document.getElementById('boton')
const buscarBtn = document.getElementById('search')
const borrarBtn = document.getElementById('delete')

async function showFriendList() {
  const list = document.getElementById('lista')
  list.innerHTML = ''

  console.log('Friend List')
  const amigos = await fetch('http://localhost:5000/amigos')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error)
    })

  amigos.forEach(amigo => {
    const li = document.createElement('li')
    li.id = 'friend'
    li.innerHTML = amigo.name + ', Edad: ' + amigo.age
    list.appendChild(li)
  })
}

async function buscarAmigo() {
  const buscarInput = document.getElementById('input').value
  const amigo = await fetch(`http://localhost:5000/amigos/${buscarInput}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error)
    })
  const span = document.getElementById('amigo')
  span.innerHTML = amigo.name
  span.style.fontWeight = 'bold'
}

async function borrarAmigo() {
  const deleteInput = document.getElementById('inputDelete').value
  console.log(deleteInput)

  try {
    const response = await fetch(
      `http://localhost:5000/amigos/${deleteInput}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${
          errorData.message || 'Unknown error'
        }`
      )
    }
    if (response.status === 204) {
      console.log('Resource deleted successfully (No Content)')
    } else {
      const data = await response.json()
      console.log('Resource deleted successfully:', data)
    }
  } catch (error) {
    console.error('Error deleting resource:', error)
  }
  const span = document.getElementById('success')
  span.innerHTML = `Tu amigo fue borado con exito`
  span.style.fontWeight = 'bold'
}

amigosBtn.addEventListener('click', showFriendList)
buscarBtn.addEventListener('click', buscarAmigo)
borrarBtn.addEventListener('click', borrarAmigo)
