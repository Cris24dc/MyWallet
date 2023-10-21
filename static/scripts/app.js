const darkMode = localStorage.getItem('darkMode')

if(darkMode === 'enabled') {
  document.body.classList.add('darkMode')
}

function checkIfLoggedIn() {
  const token = localStorage.getItem('token');
  if(token) location.replace('./pages/home.html')
}

checkIfLoggedIn();