function restartGame() {
  document.location.replace('/start');
}

function renderScores() {
  document.location.replace('/leaderboards');
}

const returnHome = async () => {
  const response = await fetch('/homepage', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  if (response.ok) {
    document.location.replace('/homepage');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#returnHome').addEventListener('click', returnHome);