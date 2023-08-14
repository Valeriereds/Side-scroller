const loginFormHandler = async (event) => {
  event.preventDefault();

  // email switched to player name
  // const email = document.querySelector('#email-login').value.trim();
  const player_name = document.querySelector('#player-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (player_name && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ player_name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      // document.location.replace('/profile');
      document.location.replace('/homepage');
    } else {
      alert('User does not exist. Sign up first!')
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const player_name = document.querySelector('#name-signup').value.trim();
  // email unneeded methinks
  // const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (player_name && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ player_name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/homepage');
    } else {
      alert('Please make your password at least 8 characters long.');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
