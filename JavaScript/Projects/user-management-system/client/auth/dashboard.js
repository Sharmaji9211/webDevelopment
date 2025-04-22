
// Global variables
let currentUser = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    setupEventListeners();
});

// Check authentication
function checkAuthentication() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    currentUser = JSON.parse(localStorage.getItem('user'));
    
    if (!isAuthenticated || !currentUser) {
        window.location.href = 'Login.html';
    } else {
        // Display user info
        document.getElementById('userName').textContent = `${currentUser.firstname} ${currentUser.lastname}`;
        document.getElementById('userEmail').textContent = currentUser.email;
        
        // Load dashboard data
        loadDashboardData();
        
        // Navigation setup
        setupNavigation();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showSection(this.getAttribute('href').substring(1));
        });
    });
    
    // User form
    document.getElementById('userForm').addEventListener('submit', handleUserFormSubmit);
    document.getElementById('cancelBtn').addEventListener('click', cancelUserForm);
    document.getElementById('addUserBtn').addEventListener('click', showAddUserForm);
    
    // Profile form
    document.getElementById('profileForm').addEventListener('submit', handleProfileUpdate);
}

// Navigation functions
function setupNavigation() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector('.nav-links a[href="#dashboard"]').classList.add('active');
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('main > section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    document.getElementById(sectionId).style.display = 'block';
    
    // Update active nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.nav-links a[href="#${sectionId}"]`).classList.add('active');
    
    // Load section-specific data
    if (sectionId === 'users-management') {
        loadUsersTable();
    } else if (sectionId === 'profile') {
        loadProfileData();
    }
}

// Dashboard functions
function loadDashboardData() {
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
            document.getElementById('totalUsers').textContent = users.length;
        })
        .catch(error => {
            console.error('Error loading dashboard data:', error);
        });
}

// Users Management functions
function loadUsersTable() {
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
            const tableBody = document.getElementById('usersTableBody');
            tableBody.innerHTML = '';
            
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.firstname} ${user.lastname}</td>
                    <td>${user.email}</td>
                    <td class="actions">
                        <button class="btn edit-btn" data-id="${user.id}">Edit</button>
                        <button class="btn delete-btn" data-id="${user.id}">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
            
            // Add event listeners to action buttons
            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', () => editUser(btn.dataset.id));
            });
            
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', () => deleteUser(btn.dataset.id));
            });
        })
        .catch(error => {
            console.error('Error loading users:', error);
        });
}

function showAddUserForm() {
    document.getElementById('userForm').reset();
    document.getElementById('userId').value = '';
    document.getElementById('userFormContainer').style.display = 'block';
}

function editUser(userId) {
    fetch(`http://localhost:3000/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('userId').value = user.id;
            document.getElementById('firstname').value = user.firstname;
            document.getElementById('lastname').value = user.lastname;
            document.getElementById('email').value = user.email;
            document.getElementById('password').value = '';
            document.getElementById('userFormContainer').style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching user:', error);
        });
}

function cancelUserForm() {
    document.getElementById('userFormContainer').style.display = 'none';
}

function handleUserFormSubmit(e) {
    e.preventDefault();
    
    const userId = document.getElementById('userId').value;
    const userData = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    
    if (userId) {
        // Update existing user
        fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            alert('User updated successfully');
            cancelUserForm();
            loadUsersTable();
        })
        .catch(error => {
            console.error('Error updating user:', error);
        });
    } else {
        // Create new user
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            alert('User created successfully');
            cancelUserForm();
            loadUsersTable();
            loadDashboardData(); // Refresh total users count
        })
        .catch(error => {
            console.error('Error creating user:', error);
        });
    }
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`http://localhost:3000/users/${userId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert('User deleted successfully');
            loadUsersTable();
            loadDashboardData(); // Refresh total users count
        })
        .catch(error => {
            console.error('Error deleting user:', error);
        });
    }
}

// Profile functions
function loadProfileData() {
    document.getElementById('profileId').value = currentUser.id;
    document.getElementById('profileFirstName').value = currentUser.firstname;
    document.getElementById('profileLastName').value = currentUser.lastname;
    document.getElementById('profileEmailInput').value = currentUser.email;
    document.getElementById('profilePassword').value = '';
    
    document.getElementById('profileName').textContent = `${currentUser.firstname} ${currentUser.lastname}`;
    document.getElementById('profileEmail').textContent = currentUser.email;
}

function handleProfileUpdate(e) {
    e.preventDefault();
    
    const profileData = {
        firstname: document.getElementById('profileFirstName').value,
        lastname: document.getElementById('profileLastName').value,
        email: document.getElementById('profileEmailInput').value,
        password: document.getElementById('profilePassword').value || undefined
    };
    
    fetch(`http://localhost:3000/users/${currentUser.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Profile updated successfully');
        // Update current user in localStorage
        currentUser = { ...currentUser, ...profileData };
        localStorage.setItem('user', JSON.stringify(currentUser));
        // Update UI
        document.getElementById('userName').textContent = `${currentUser.firstname} ${currentUser.lastname}`;
        document.getElementById('userEmail').textContent = currentUser.email;
        document.getElementById('profileName').textContent = `${currentUser.firstname} ${currentUser.lastname}`;
        document.getElementById('profileEmail').textContent = currentUser.email;
    })
    .catch(error => {
        console.error('Error updating profile:', error);
    });
}

// Logout function
function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    window.location.href = 'Login.html';
}
