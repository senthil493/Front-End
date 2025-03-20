
const loginPage = document.getElementById('loginPage');
const dataPage = document.getElementById('dataPage');
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const dataForm = document.getElementById('dataForm');
const dataList = document.getElementById('dataList');
const dataInput = document.getElementById('dataInput');


loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    
    if (username === 'admin' && password === 'password') {
        loginPage.classList.add('hidden');
        dataPage.classList.remove('hidden');
        loadData(); 
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
});


function loadData() {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    dataList.innerHTML = ''; 
    data.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteData(index);
        });

        li.appendChild(deleteButton);
        dataList.appendChild(li);
    });
}


dataForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const newData = dataInput.value.trim();
    if (newData) {
        const data = JSON.parse(localStorage.getItem('data')) || [];
        data.push(newData);
        localStorage.setItem('data', JSON.stringify(data));
        dataInput.value = ''; 
        loadData(); 
    }
});


function deleteData(index) {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    data.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(data));
    loadData(); 
}


if (!loginPage.classList.contains('hidden')) {
    loadData();
}

// Sample list of items after login (replace with your dynamic data if needed)
const items = [
    "Dashboard",
    "Profile",
    "Settings",
    "Notifications",
    "Logout"
];

// Load items after login
function loadItems() {
    let contentContainer = document.getElementById("content-container");
    contentContainer.innerHTML = "";
    items.forEach(item => {
        contentContainer.innerHTML += `<div class="item">${item}</div>`;
    });
}

// Search function to filter items
function searchItems() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let contentContainer = document.getElementById("content-container");
    contentContainer.innerHTML = "";
    items.forEach(item => {
        if (item.toLowerCase().includes(input)) {
            contentContainer.innerHTML += `<div class="item">${item}</div>`;
        }
    });
}

// Call loadItems() after login to display items
loadItems();
