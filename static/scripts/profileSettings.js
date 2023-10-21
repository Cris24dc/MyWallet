const token = localStorage.getItem('token')
const darkMode = localStorage.getItem('darkMode')
const submit = document.querySelector('.save-button')

if(darkMode === 'enabled') {
  const profileImg = document.querySelector('.profile-img')
  const homeImg = document.querySelector('.home-img')
  const walletImg = document.querySelector('.wallet-img')
  const savingImg = document.querySelector('.savings-img')
  const historyImg = document.querySelector('.history-img')
  const logoImg = document.querySelector('.logo-img')
  document.body.classList.add('darkMode')
  profileImg.src = '../images/accountwhite.png'
  homeImg.src = '../images/homewhite.png'
  walletImg.src = '../images/walletwhite.png'
  savingImg.src = '../images/savingswhite.png'
  historyImg.src = '../images/historywhite.png'
  logoImg.src = '../images/logowhite.png'
}

submit.addEventListener('click', sumbitClickHandler)

async function sumbitClickHandler(){
  const firstName = document.querySelector('#first-name')
  const lastName = document.querySelector('#last-name')
  const password = document.querySelector('#password')

  const result = await fetch(`/api/update/${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: firstName.value,
      lastName: lastName.value,
      password:password.value
    })
  })
  .then((res)=> res.json())
  .catch((err)=> alert(err.message))

  if(result.status === 'ok'){
    location.replace('settings.html')
  }
  else{
    alert(result.error)
  }
}

