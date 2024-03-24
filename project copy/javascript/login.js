document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const response = await fetch("javascript/users.json");
        let usersData = await response.json();
        const matchedUser = usersData.find(user => user.username === username && user.password === password);
        if (matchedUser) { 
            matchedUser.loggedIn = true; // Ensure the property name is correct
            localStorage.setItem('currentUser', JSON.stringify(matchedUser));
            window.location.href = "index.html";
        } else {
            alert("Invalid username or password. Please try again.");
        }
    });

    const cancelButton = document.querySelector(".cancel-button");
    cancelButton.addEventListener("click", function() {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    });
});
