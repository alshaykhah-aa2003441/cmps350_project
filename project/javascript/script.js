document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch('users.json');
    const users = await response.json();
    const find = users.find(user => user.username === username && user.password === password);
    if (find) {
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        document.getElementById('errorMessage').style.display = 'block';
    }
});
