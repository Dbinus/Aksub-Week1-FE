import { getUsers, saveUsers } from './store.js';

// ERROR HANDLERS
function setError(inputId, errorId, msg = null){
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (msg) {
    input.classList.add('error');
    error.textContent = msg;
    error.classList.add('visible');
  } else {
    input.classList.remove('error');
    error.classList.remove('visible');
  }
}
function clearAllErrors(){
  ['email', 'password'].forEach(id => {
    const input = document.getElementById(id);
    input?.classList.remove('error');
  });
  document.querySelectorAll('.error-msg').forEach(el => el.classList.remove('visible'));
}
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  void toast.offsetWidth;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
// LOGIN
document.getElementById('loginBtn').addEventListener('click', () => {
  clearAllErrors();
  const emailVal = document.getElementById('email').value.trim();
  const passwordVal = document.getElementById('password').value;
  let valid = true;

  if(!emailVal){
    setError('email', 'emailError', "This field can't be empty");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    setError('email', 'emailError', 'Please enter a valid email address');
    valid = false;
  }
  if(!passwordVal){
    setError('password', 'passwordError', "This field can't be empty");
    valid = false;
  }

  if(!valid) return;
  const users = getUsers();
  const matchedUser = users.find(u => u.email === emailVal);
  if (!matchedUser) {
    setError('email', 'emailError', 'No account found with this email');
    return;
  }
  const accountsForEmail = users.filter(u => u.email === emailVal);
  const account = accountsForEmail[0];
  if(account.password !== passwordVal){
    setError('password', 'passwordError', 'Incorrect password');
    return;
  }
  // SUCCESS
  document.getElementById('loginForm').style.display    = 'none';
  document.getElementById('successScreen').style.display = 'block';
  document.getElementById('successScreen').classList.add('visible');
  document.getElementById('loggedInName').textContent   = account.name;
  showToast(`Welcome back, ${account.name}!`, 'success');
});

// BACK
document.getElementById('logoutBtn').addEventListener('click', () => {
  document.getElementById('successScreen').style.display = 'none';
  document.getElementById('loginForm').style.display     = 'block';
  document.getElementById('email').value    = '';
  document.getElementById('password').value = '';
});