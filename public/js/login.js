// function for the login form: once logged in, player is redirected to homepage. If log in fails, they remain on login page
const loginFormHandler = async (event) => {
  event.preventDefault();
  const player_name = document.querySelector('#player-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  if (player_name && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ player_name, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/homepage');
    } else {
      alert('User/password combination does not exist. Sign up first!')
    }
  }
};

// function for the sign up form: once signed up, player is redirected to homepage. If sign up fails, they remain on login page
const signupFormHandler = async (event) => {
  event.preventDefault();
  const player_name = document.querySelector('#name-signup').value.trim();
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

// submit button created for log in
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

// submit button created for sign up
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
