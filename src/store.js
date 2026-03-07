// Shared user store — imported by both main.js and register.js

export function getUsers() {
  const raw = sessionStorage.getItem('users');
  return raw ? JSON.parse(raw) : [];
}

export function saveUsers(users) {
  sessionStorage.setItem('users', JSON.stringify(users));
}