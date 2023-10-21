const container = document.getElementById('container');
const token = localStorage.getItem('token');
const darkMode = localStorage.getItem('darkMode')

if(darkMode === 'enabled') {
  const homeImg = document.querySelector('.home-img')
  const walletImg = document.querySelector('.wallet-img')
  const savingsImg = document.querySelector('.savings-img')
  const logoImg = document.querySelector('.logo-img')
  document.body.classList.add('darkMode')
  homeImg.src = '../images/homewhite.png'
  walletImg.src = '../images/walletwhite.png'
  savingsImg.src = '../images/savingswhite.png'
  logoImg.src = '../images/logowhite.png'
}

async function loadHistory(){
  const {user} = await fetch(`/api/user/${token}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((res)=> res.json())
  .catch((err)=> console.log(err.message))

  container.innerHTML = ''

  user.transactions.forEach((transaction) => {
    const catContainer = document.createElement('div');
    catContainer.setAttribute('class', 'cat-con');
  
    const leftContainer = document.createElement('div');
    leftContainer.setAttribute('class', 'left-con')
  
    const img = document.createElement('img');
    img.setAttribute('class', 'income-img')
    if(transaction.type === 'expense') img.src = '../images/right-arrow-red.png'
    else if(transaction.type === 'income') img.src = '../images/right-arrow-green.png'
    leftContainer.appendChild(img)

    const leftInfo = document.createElement('div')
    leftInfo.setAttribute('class', 'left-info')
    const catTxt = document.createElement('p')
    catTxt.setAttribute('class', 'cat-txt')
    const catTextNode = document.createTextNode(transaction.category)
    catTxt.appendChild(catTextNode)

    const dateTxt = document.createElement('p')
    dateTxt.setAttribute('class', 'date-txt')
    const dateTxtNode = document.createTextNode(transaction.date)
    dateTxt.appendChild(dateTxtNode)

    leftInfo.appendChild(catTxt)
    leftInfo.appendChild(dateTxt)

    leftContainer.appendChild(leftInfo)



    const rightContainer = document.createElement('div')
    rightContainer.setAttribute('class', 'right-con')

    const sumContainer = document.createElement('div')
    sumContainer.setAttribute('class', 'sum-con')
    const sumTxt = document.createElement('p')
    sumTxt.setAttribute('class', 'sum-txt')
    const sumTxtNode = document.createTextNode(transaction.amount)
    sumTxt.appendChild(sumTxtNode)
    const curTxt = document.createElement('p')
    curTxt.setAttribute('class', 'cur-txt')
    const curTxtNode = document.createTextNode(user.currency)
    curTxt.appendChild(curTxtNode)
    sumContainer.appendChild(sumTxt)
    sumContainer.appendChild(curTxt)

    const descTxt = document.createElement('p')
    descTxt.setAttribute('class', 'desc-txt')
    const descTxtNode = document.createTextNode(transaction.description)
    descTxt.appendChild(descTxtNode)
    
    rightContainer.appendChild(sumContainer)
    rightContainer.appendChild(descTxt)

    catContainer.appendChild(leftContainer)
    catContainer.appendChild(rightContainer)


    container.appendChild(catContainer)
  })

}

loadHistory();