const logOutBtn = document.querySelector('.logout-button')
const selectCurr = document.getElementById('currency')
const token = localStorage.getItem('token')
const dmToggle = document.querySelector('#switch')
const profileImg = document.querySelector('.profile-img')
const darkImg = document.querySelector('.dark-il-img')
const currencyImg = document.querySelector('.currency-il-img')
const logoutImg = document.querySelector('.logout-il-img')
const rightArrow = document.querySelector('.logout-img')
const rightArrowProf = document.querySelector('.profile-settings-img')
const homeImg = document.querySelector('.home-img')
const walletImg = document.querySelector('.wallet-img')
const savingImg = document.querySelector('.savings-img')
const historyImg = document.querySelector('.history-img')
const logoImg = document.querySelector('.logo-img')
let darkMode = localStorage.getItem('darkMode')
loadCurr()
loadName()

function enableDarkMode(){
  document.body.classList.add('darkMode')
  profileImg.src = '../images/accountwhite.png'
  darkImg.src = '../images/darkmodewhite.png'
  currencyImg.src = '../images/currencywhite.png'
  logoutImg.src = '../images/logoutwhite.png'
  rightArrow.src = '../images/arrow-rightwhite.png'
  rightArrowProf.src = '../images/arrow-rightwhite.png'
  homeImg.src = '../images/homewhite.png'
  walletImg.src = '../images/walletwhite.png'
  savingImg.src = '../images/savingswhite.png'
  historyImg.src = '../images/historywhite.png'
  logoImg.src = '../images/logowhite.png'
  localStorage.setItem('darkMode', 'enabled')
}

function disableDarkMode(){
  document.body.classList.remove('darkMode')
  profileImg.src = '../images/account.png'
  darkImg.src = '../images/darkmode.png'
  currencyImg.src = '../images/currency.png'
  logoutImg.src = '../images/logout.png'
  rightArrow.src = '../images/arrow-right.png'
  rightArrowProf.src = '../images/arrow-right.png'
  homeImg.src = '../images/home.png'
  walletImg.src = '../images/wallet.png'
  savingImg.src = '../images/savings.png'
  historyImg.src = '../images/history.png'
  logoImg.src = '../images/logo.png'
  localStorage.setItem('darkMode', null)
}

if(darkMode === 'enabled'){
  document.body.classList.add('darkMode')
  dmToggle.checked = true
  profileImg.src = '../images/accountwhite.png'
  darkImg.src = '../images/darkmodewhite.png'
  currencyImg.src = '../images/currencywhite.png'
  logoutImg.src = '../images/logoutwhite.png'
  rightArrow.src = '../images/arrow-rightwhite.png'
  rightArrowProf.src = '../images/arrow-rightwhite.png'
  homeImg.src = '../images/homewhite.png'
  walletImg.src = '../images/walletwhite.png'
  savingImg.src = '../images/savingswhite.png'
  historyImg.src = '../images/historywhite.png'
  logoImg.src = '../images/logowhite.png'
}

dmToggle.addEventListener('change', function(){
  if(this.checked){
    enableDarkMode()
  }else{
    disableDarkMode()
  }
})


logOutBtn.addEventListener('click', logOutBtnHandler);
selectCurr.addEventListener('change', selectCurrHandler);

function logOutBtnHandler(){
  localStorage.removeItem('token')
  location.replace('../index.html')
}

async function loadCurr(){
  const result = await fetch(`/api/currency/${token}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((res)=> res.json())
  .catch((err)=> console.log(err.message))

  selectCurr.value = result.currency
}

async function loadName(){
  const {user} = await fetch(`/api/user/${token}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((res)=> res.json())
  .catch((err)=> console.log(err.message))

  const firstName = document.querySelector('.profile-first-name-txt')
  const lastName = document.querySelector('.profile-last-name-txt')

  firstName.innerHTML = `${user.firstName}&nbsp`
  lastName.innerHTML = user.lastName
}

async function selectCurrHandler(){
  const result = await fetch(`/api/currency/${token}`,{
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: this.value
      })
  })
  .then((res)=> res.json())
  .catch((err)=> console.log(err.message))
}