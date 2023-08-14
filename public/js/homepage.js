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

document.querySelector('#logout').addEventListener('click', logout);
document.querySelector('#startGame').addEventListener('click', startGame);
document.querySelector('#leaderboard').addEventListener('click', leaderboards);