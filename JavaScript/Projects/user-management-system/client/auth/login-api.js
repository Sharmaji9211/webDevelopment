
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
   // In your login success handler
fetch('http://localhost:3000/admin-login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
})
.then(response => response.json())
.then(data => {
    if (data.admin) {
        // Store the admin data properly
        localStorage.setItem('user', JSON.stringify(data.admin));
        localStorage.setItem('isAuthenticated', 'true');
        window.location.href = 'dashboard.html';
    } else {
        throw new Error('Invalid login response');
    }
})
.catch(error => {
    console.error('Login error:', error);
    alert('Login failed. Please check your credentials.');
});
});

// Check if user is already logged in
if (localStorage.getItem('isAuthenticated') === 'true') {
    window.location.href = 'dashboard.html';
}
