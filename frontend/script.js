// API base URL - adjust this if your backend is running on a different port
const API_BASE_URL = 'https://app-h7v3.onrender.com/api';

// DOM elements
const usersTableBody = document.getElementById('usersTableBody');
const refreshBtn = document.getElementById('refreshBtn');
const addUserBtn = document.getElementById('addUserBtn');
const userFormSection = document.getElementById('userFormSection');
const userForm = document.getElementById('userForm');
const userIdInput = document.getElementById('userId');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const cancelBtn = document.getElementById('cancelBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const noUsersMessage = document.getElementById('noUsersMessage');

// Current editing user
let currentEditingUser = null;

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    
    // Event listeners
    refreshBtn.addEventListener('click', loadUsers);
    addUserBtn.addEventListener('click', showAddUserForm);
    userForm.addEventListener('submit', handleUserSubmit);
    cancelBtn.addEventListener('click', hideUserForm);
});

// Load users from the API
async function loadUsers() {
    try {
        showLoading(true);
        
        const response = await fetch(`${API_BASE_URL}/users`);
        const result = await response.json();
        
        if (result.success) {
            displayUsers(result.data);
        } else {
            console.error('Error loading users:', result.error);
            alert('Error loading users: ' + result.error);
        }
    } catch (error) {
        console.error('Error loading users:', error);
        alert('Error loading users: ' + error.message);
    } finally {
        showLoading(false);
    }
}

// Display users in the table
function displayUsers(users) {
    usersTableBody.innerHTML = '';
    
    if (users.length === 0) {
        noUsersMessage.classList.remove('hidden');
        return;
    }
    
    noUsersMessage.classList.add('hidden');
    
    users.forEach(user => {
        const row = document.createElement('tr');
        
        // Format the date for display
        const formattedDate = new Date(user.createdAt).toLocaleDateString();
        
        row.innerHTML = `
            <td>${user.id || user._id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.age || 'N/A'}</td>
            <td>${formattedDate}</td>
            <td class="action-buttons">
                <button class="btn-edit" onclick="editUser('${user.id || user._id}')">Edit</button>
                <button class="btn-delete" onclick="deleteUser('${user.id || user._id}')">Delete</button>
            </td>
        `;
        
        usersTableBody.appendChild(row);
    });
}

// Show loading spinner
function showLoading(show) {
    if (show) {
        loadingSpinner.classList.remove('hidden');
        usersTableBody.innerHTML = '';
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

// Show add user form
function showAddUserForm() {
    currentEditingUser = null;
    userIdInput.value = '';
    nameInput.value = '';
    emailInput.value = '';
    ageInput.value = '';
    
    userFormSection.classList.remove('hidden');
    addUserBtn.disabled = true;
    refreshBtn.disabled = true;
}

// Hide user form
function hideUserForm() {
    userFormSection.classList.add('hidden');
    addUserBtn.disabled = false;
    refreshBtn.disabled = false;
}

// Handle user form submission
async function handleUserSubmit(e) {
    e.preventDefault();
    
    const userData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        age: ageInput.value ? parseInt(ageInput.value) : null
    };
    
    try {
        let response;
        
        if (currentEditingUser) {
            // Update existing user
            response = await fetch(`${API_BASE_URL}/users/${currentEditingUser}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
        } else {
            // Create new user
            response = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
        }
        
        const result = await response.json();
        
        if (result.success) {
            hideUserForm();
            loadUsers(); // Refresh the user list
            alert(currentEditingUser ? 'User updated successfully!' : 'User added successfully!');
        } else {
            console.error('Error saving user:', result.error);
            alert('Error saving user: ' + result.error);
        }
    } catch (error) {
        console.error('Error saving user:', error);
        alert('Error saving user: ' + error.message);
    }
}

// Edit user function (will be called from HTML)
async function editUser(userId) {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`);
        const result = await response.json();
        
        if (result.success) {
            const user = result.data;
            
            // Populate form with user data
            userIdInput.value = user.id || user._id;
            nameInput.value = user.name;
            emailInput.value = user.email;
            ageInput.value = user.age || '';
            
            currentEditingUser = userId;
            userFormSection.classList.remove('hidden');
            addUserBtn.disabled = true;
            refreshBtn.disabled = true;
        } else {
            console.error('Error fetching user:', result.error);
            alert('Error fetching user: ' + result.error);
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        alert('Error fetching user: ' + error.message);
    }
}

// Delete user function
async function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            loadUsers(); // Refresh the user list
            alert('User deleted successfully!');
        } else {
            console.error('Error deleting user:', result.error);
            alert('Error deleting user: ' + result.error);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user: ' + error.message);
    }
}
