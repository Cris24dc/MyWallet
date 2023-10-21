const token = localStorage.getItem('token');
const swiperWrapper = document.querySelector('[data-slides]');
const sumTxt = document.querySelector('.sum-txt'); 
const curTxt = document.querySelector('.sum-cur');
const carouselButtons = document.querySelectorAll('[data-carousel-button]');
let currency
const darkMode = localStorage.getItem('darkMode')

if(darkMode === 'enabled') {
  const homeImg = document.querySelector('.home-img')
  const walletImg = document.querySelector('.wallet-img')
  const historyImg = document.querySelector('.history-img')
  const logoImg = document.querySelector('.logo-img')
  const rightArrow = document.querySelector('.right-arrow img')
  const leftArrow = document.querySelector('.left-arrow img')
  document.body.classList.add('darkMode')
  homeImg.src = '../images/homewhite.png'
  walletImg.src = '../images/walletwhite.png'
  historyImg.src = '../images/historywhite.png'
  logoImg.src = '../images/logowhite.png'
  rightArrow.src = '../images/arrow-rightwhite.png'
  leftArrow.src = '../images/arrow-leftwhite.png'
}
getUser()

const editBtn = document.querySelector('.edit-button')
editBtn.addEventListener('click', editBtnHandler)

async function getUser(){
  const {user} = await fetch(`/api/user/${token}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((res)=> res.json())
  .catch((err)=> console.log(err.message))

  currency = user.currency

  changeBalance(user.savedValue)
  generateSliderObjects(user.savingItems)
}

function changeBalance(balance){
  sumTxt.innerHTML = balance
  curTxt.innerHTML = currency
}

function generateSliderObjects(savingItems){
  savingItems.forEach((item)=>{
    const percentage = Math.floor(item.savedValue / item.value * 100)
    const index = savingItems.indexOf(item)
    const catCon = document.createElement('li')
    catCon.setAttribute('class','cat-con')

    if(index === 0){
      catCon.dataset.active = true
    }

    const trashCon = document.createElement('div')
    trashCon.setAttribute('class', 'cat-trash-con')
    const catName = document.createElement('p')
    catName.setAttribute('class', 'cat-name')
    catName.innerHTML = item.name

    const thrashImg = document.createElement('img')
    thrashImg.setAttribute('class', 'trash-img dnone')
    if(darkMode === 'enabled') thrashImg.src = '../images/trashwhite.png'
    else thrashImg.src = '../images/trash.png'

    thrashImg.addEventListener('click', async () =>{
      const result = await fetch(`/api/saving/${token}/${index}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res)=> res.json())
      .catch((err)=> console.log(err.message))

      if(result.status === 'ok'){
        location.reload()
      }
      else{
        alert('Error: ' + result.error)
      }
    })

    
    trashCon.appendChild(catName)
    trashCon.appendChild(thrashImg)

    const chartCon = document.createElement('div')
    chartCon.setAttribute('class', 'chart-con')
    const chartCanvas = document.createElement('canvas')
    chartCanvas.setAttribute('id', 'chart')
    chartCon.appendChild(chartCanvas)

    const data = {
      labels: ['Saved Amount', 'Not saved Amount'],
      datasets: [{
        label: 'Label',
        data: [percentage, 100-percentage],
        backgroundColor: [item.color, '#ccc'],
        borderColor: [item.color, '#ccc'],
        borderWidth: 1,
        cutout: '88%',
      }]
    };

    const config = {
      type: 'doughnut',
      data: data,
      options: {
        plugins: {
            tooltip:{
              enabled: false,
            },
            legend:{
                display:false,
            },
            counter: {
                fontColor: 'black',
                fontSize: 50,
                fontFamily: 'sans-serif'
            }
        }
      },
    };

    chart = new Chart(
      chartCanvas,
      config
    );

    const percentageCon = document.createElement('div')
    percentageCon.setAttribute('class', 'percentage-con')
    const percentageTxt = document.createElement('p')
    percentageTxt.setAttribute('class', 'percentage-txt')
    
    percentageTxt.innerHTML = `${percentage}%`
    percentageCon.appendChild(percentageTxt)

    catCon.appendChild(trashCon)
    catCon.appendChild(chartCon)
    catCon.appendChild(percentageCon)

    swiperWrapper.appendChild(catCon)
  })

}

carouselButtons.forEach(button =>{
  button.addEventListener('click', ()=>{
    const offset = button.dataset.carouselButton === 'next' ? 1 : -1
    const slides = document.querySelector('[data-slides]')
    const activeSlide = slides.querySelector('[data-active]')
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    console.log(newIndex)
    if(newIndex < 0 ) newIndex = slides.children.length  - 1
    if(newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
  })
})

async function editBtnHandler(){
  const trashBtns = document.querySelectorAll('.trash-img')
  editBtn.classList.toggle('selected')
  trashBtns.forEach((btn)=>{
    btn.classList.toggle('dnone')
  })
}