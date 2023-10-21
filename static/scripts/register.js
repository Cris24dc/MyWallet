const form = document.getElementById('register-form');
const darkMode = localStorage.getItem('darkMode')

if(darkMode === 'enabled') {
  document.body.classList.add('darkMode')
}

form.addEventListener('submit', registerUser)

async function registerUser(event){
  event.preventDefault();
  const firstName = document.getElementById('first-name')
  const lastName = document.getElementById('last-name')
  const email = document.getElementById('email')
  const password = document.getElementById('password')

  const result = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password:password.value
    })
  })
  .then((res)=> res.json())
  .catch((err)=> alert(err.message))

  if(result.status === 'ok'){
    location.replace('home.html')
    localStorage.setItem('token', result.data)
  }
  else{
    alert(result.error)
  }


}