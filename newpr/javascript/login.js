document.addEventListener("DOMContentLoaded", function() {
  let customers = JSON.parse(localStorage.getItem('customers')) || [];
  // let users = JSON.parse(localStorage.getItem('users')) || [];

  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", addUser);

  function addUser(event) {
      event.preventDefault();
      const username = event.target.username.value;
      const password = event.target.password.value;
      const balance = event.target.balance.value;

      const id = customers.length + 1; 
      const type = "customer"; 

      const user = {
        id: id,
        type: type,
        username: username,
        password: password,
        balance: balance
    };

    customers.push(user);
    localStorage.setItem('customers', JSON.stringify(customers)); 
    console.log("Customer added:", user);

    // users.push(user);
    //     localStorage.setItem('users', JSON.stringify(users));
    //     console.log("User added to users array:", user);
  }
});




//     try {
//       const response = await fetch("jsons/users.json");
//       if (!response.ok) {
//         throw new Error("Failed to load user data.");
//       }
//       const usersData = await response.json();
//       const matchedUser = usersData.find(user => user.username === username && user.password === password);
//       if (matchedUser) {
//         sessionStorage.setItem('isLoggedIn', true);
//         sessionStorage.setItem('username', username);
//         const userData = { ...matchedUser, balance: balance }; 
//         localStorage.setItem('userData', JSON.stringify(userData));
//         const blob = new Blob([JSON.stringify([userData], null, 2)], { type: 'application/json' });
//         const windowopen = matchedUser.type === "customer" ? "index.html" : "seller.html";
//         window.location.href = windowopen;
//       } else {
//         alert("Invalid username or password. Please try again.");
//       }


//     } catch (error) {
//       alert("An error occurred during login: " + error.message);
//     }

// }
  