// Store users data in local storage
const users = [
  {
    "id": 1,
    "type": "customer",
    "name": "John",
    "surname": "Doe",
    "shipping_address": "123 Main St, City, Country",
    "username": "user1",
    "password": "password1",
    "balance": 500
  },
  {
    "id": 2,
    "type": "customer",
    "name": "Jane",
    "surname": "Smith",
    "shipping_address": "456 Elm St, Town, Country",
    "username": "user2",
    "password": "password2",
    "balance": 700
  },
  {
    "id": 10,
    "type": "customer",
    "name": "raghad",
    "surname": "saleh",
    "shipping_address": "123 Main St, City, Country",
    "username": "user3",
    "password": "password3",
    "balance": 100000
  },

  {
    "id": 3,
    "type": "seller",
    "company_name": "aroQuest Inc.",
    "username": "seller1",
    "password": "sellerpass1",
    "bank_account": 12345
  },
  {
    "id": 5,
    "type": "admin",
    "username": "admin1",
    "password": "adminpass1"
  },
  {
  "id": 5,
  "type": "seller",
  "company_name": "aroQuest Inc.",
  "username": "seller2",
  "password": "sellerpass2",
  "bank_account": 67890
}];

localStorage.setItem('users', JSON.stringify(users));

document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById("loginForm");
  const cancelButton = document.getElementById("cancelButton");

  cancelButton.addEventListener("click", function(event) {
    event.preventDefault();
    loginForm.reset(); 
  });

  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const usersData = JSON.parse(localStorage.getItem('users')) || [];

    sessionStorage.clear();

    const matchedUser = usersData.find(user => user.username === username && user.password === password);
    if (matchedUser) {
      console.log("Matched User:", matchedUser); 
      sessionStorage.setItem('isLoggedIn', 'true'); 
      sessionStorage.setItem('id', matchedUser.id);
      sessionStorage.setItem('username', matchedUser.username); 
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('currentUser', JSON.stringify(matchedUser));
    
      
      let windowOpen = '';
      if (matchedUser.type === "customer") {
        windowOpen = "index.html";
      } else if (matchedUser.username.startsWith("seller")) {
        windowOpen = "seller.html";
      } else if (matchedUser.username.startsWith("admin")) {
        windowOpen = "admin.html";
      } else {
        windowOpen = "index.html";
      }
      
      window.location.href = windowOpen;
      console.log("Welcome, " + matchedUser.username + "!"); 
      alert("Welcome, " + matchedUser.username + "!");
    } else {
      alert("Invalid username or password. Please try again.");
    }
  });
});