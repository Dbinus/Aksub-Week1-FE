import { getUsers, saveUsers } from './store.js';

//TOAST (FEEDBACK BIAR USER TAU AKUNNYA SUKSES REGISTER)
function showToast(msg, type = 'success'){
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  void toast.offsetWidth;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ERROR HANDLERS
function setError(inputId, errorId, msg = null){
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if(msg) {
    input?.classList.add('error');
    error.textContent = msg;
    error.style.display = 'flex';
    error.classList.add('visible');
  } else{
    input?.classList.remove('error');
    error.style.display = 'none';
    error.classList.remove('visible');
  }
}
function clearAllErrors(){
  ['name', 'email', 'password', 'retypePassword'].forEach(id => {
    document.getElementById(id)?.classList.remove('error');
  });
  document.querySelectorAll('.error-msg').forEach(el => {
    el.classList.remove('visible');
    el.style.display = 'none';
  });
}

function isValidPassword(pw){
  // min 8 chars, 1 uppercase, 1 symbol
  return pw.length >= 8 && /[A-Z]/.test(pw) && /[^A-Za-z0-9]/.test(pw);
}
// REGISTER
document.getElementById('signUpBtn').addEventListener('click', () => {
  clearAllErrors();
  const nameVal = document.getElementById('name').value.trim();
  const emailVal = document.getElementById('email').value.trim();
  const passwordVal = document.getElementById('password').value;
  const retypeVal = document.getElementById('retypePassword').value;
  const agreed = document.getElementById('agreeTerms').checked;
  let valid = true;

  if(!nameVal){
    setError('name', 'nameError', "This field can't be empty");
    valid = false;
  }
  if(!emailVal){
    setError('email', 'emailError', "This field can't be empty");
    valid = false;
  } else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    setError('email', 'emailError', 'Please enter a valid email address');
    valid = false;
  }
  if(!passwordVal){
    setError('password', 'passwordError', "This field can't be empty");
    valid = false;
  } else if(!isValidPassword(passwordVal)){
    setError('password', 'passwordError', 'Password must be ≥8 characters, include 1 uppercase and 1 symbol');
    valid = false;
  }
  if(!retypeVal){
    setError('retypePassword', 'retypePasswordError', "This field can't be empty");
    valid = false;
  }else if(retypeVal !== passwordVal){
    setError('retypePassword', 'retypePasswordError', 'Passwords do not match');
    valid = false;
  }

  if(!agreed){
    const termsError = document.getElementById('termsError');
    termsError.textContent = 'Agree to the terms to continue';
    termsError.style.display = 'flex';
    termsError.classList.add('visible');
    valid = false;
  }

  if(!valid) return;
  const users = getUsers();
  const existing = users.find(u => u.email === emailVal);
  if(existing){
    setError('email', 'emailError', 'An account with this email already exists');
    return;
  }

  const newUser = {
    id: Date.now(),
    name: nameVal,
    email: emailVal,
    password: passwordVal,
    createdAt: new Date().toISOString(),
  };

  const updatedUsers = [...users.map(u => ({ ...u })), newUser];
  saveUsers(updatedUsers);
  showToast(`Account created! Welcome, ${nameVal}`, 'success');
  setTimeout(() => {
    window.location.href = '/index.html';
  }, 1500);
});
