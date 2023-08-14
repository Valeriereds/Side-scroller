// function logs user out and redirects them to the login screen
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert(response.statusText);
  }
};

// function that fetches the game/redirects them to the game start page
const startGame = async () => {
  const response = await fetch('/start', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  if (response.ok) {
    document.location.replace('/start');
  } else {
    alert(response.statusText);
  }
}

// function that fetches the leaderboard data and redirects to leaderboard page
const leaderboards = async () => {
  const response = await fetch('/api/leaderboards', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  if (response.ok) {
    document.location.replace('/leaderboards');
  } else {
    alert(response.statusText);
  }
}

// buttons created to logout, start the game or access leaderboards when clicked
document.querySelector('#logout').addEventListener('click', logout);
document.querySelector('#startGame').addEventListener('click', startGame);
document.querySelector('#leaderboard').addEventListener('click', leaderboards);