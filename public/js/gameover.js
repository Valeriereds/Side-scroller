function restartGame() {
  document.location.replace('/start');
}

function renderScores() {
  // fetch('/api/leaderboards', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error(`Network response was not ok: ${response.status}`);
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log('Score posted successfully:', data);
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });
  document.location.replace('/leaderboards');
}