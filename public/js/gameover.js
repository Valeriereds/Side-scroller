// function to restart the game
function restartGame() {
  document.location.replace('/start');
}

// function to render scores
function renderScores() {
  document.location.replace('/leaderboards');
}

// function to return to homepage
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

// button to return the user to homepage once clicked
document.querySelector('#returnHome').addEventListener('click', returnHome);