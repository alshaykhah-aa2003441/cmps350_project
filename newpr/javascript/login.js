document.addEventListener("DOMContentLoaded", async function() {
    const loginForm = document.getElementById("loginForm");
  
    loginForm.addEventListener("submit", async function(event) {
      event.preventDefault();
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      try {
        const response = await fetch("jsons/users.json");
        if (!response.ok) {
          throw new Error("Failed to load user data.");
        }
  
        const usersData = await response.json();
  
        const matchedUser = usersData.find(user => user.username === username && user.password === password);
        if (matchedUser) {
          sessionStorage.setItem('isLoggedIn', true);
          sessionStorage.setItem('username', username);
  
          const windowopen = matchedUser.type === "customer" ? "index.html" : "seller.html";
          window.location.href = windowopen;
        } else {
          alert("Invalid username or password. Please try again.");
        }
      } catch (error) {
        alert("An error occurred during login: " + error.message);
      }
    });
   
  });
  