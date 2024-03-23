document.addEventListener("DOMContentLoaded", async function() {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const balance = document.getElementById("balance").value; 
        const response = await fetch("javascript/users.json");
        const usersData = await response.json();
        
        const matchedUser = usersData.find(user => user.username === username && user.password === password);
        if (matchedUser) {
            matchedUser.balance = balance;
            await fetch("users.json", {
                method: "PUT",
                body: JSON.stringify(usersData),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            sessionStorage.setItem('isLoggedIn', true)
            sessionStorage.setItem('username', username)
            window.location.href = "index.html";
        } else {
            alert("Invalid username or password. Please try again.");
        }
    });

    const cancelButton = document.querySelector(".cancel-button");
    cancelButton.addEventListener("click", function() {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("balance").value = ""; 
        document.getElementById("balance").classList.add("hidden"); 
        window.location.href = "index.html";
    });

    loginForm.addEventListener("submit", function() {
        document.getElementById("balance").classList.remove("hidden");
    });
});
