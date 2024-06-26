// // Store users data in local storage
// const users = [
//   {
//     "id": 1,
//     "type": "customer",
//     "name": "John",
//     "surname": "Doe",
//     "shipping_address": "123 Main St, City, Country",
//     "username": "user1",
//     "password": "password1",
//     "balance": 500
//   },
//   {
//     "id": 2,
//     "type": "customer",
//     "name": "Jane",
//     "surname": "Smith",
//     "shipping_address": "456 Elm St, Town, Country",
//     "username": "user2",
//     "password": "password2",
//     "balance": 700
//   },
//   {
//     "id": 3,
//     "type": "seller",
//     "company_name": "ABC Inc.",
//     "username": "seller1",
//     "password": "sellerpass1",
//     "bank_account": 12345
//   },
//   {
//     "id": 5,
//     "type": "admin",
//     "username": "admin1",
//     "password": "adminpass1"
//   }
// ];

// localStorage.setItem('users', JSON.stringify(users));

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

    const matchedUser = usersData.find(user => user.username === username && user.password === password);
    if (matchedUser) {
      sessionStorage.setItem('isLoggedIn', 'true'); 
      sessionStorage.setItem('username', username);

      const windowOpen = matchedUser.type === "customer" ? "index.html" : "seller.html";
      window.location.href = windowOpen;
    } else {
      alert("Invalid username or password. Please try again.");
    }
  });
});
