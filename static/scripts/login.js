const form = document.getElementById('login-form')
const darkMode = localStorage.getItem('darkMode')

if(darkMode === 'enabled') {
  document.body.classList.add('darkMode')
}

form.addEventListener('submit', loginUser)

async function loginUser(event){
  event.preventDefault()
  const email = document.getElementById('email')
  const password = document.getElementById('password')

  const result = await fetch('/api/login', {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password:password.value
      })
    })
    .then((res)=> res.json())
    .catch((err)=> console.log(err.message))

    if(result.status === 'ok'){
      console.log('Got the token:', result.data)
      localStorage.setItem('token', result.data)
      location.replace('home.html')
    }
    else{
      alert(result.error)
    }
}
