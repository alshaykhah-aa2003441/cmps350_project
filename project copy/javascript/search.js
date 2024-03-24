document.addEventListener("DOMContentLoaded", async function() {
    let items = [];
    const response = await fetch("javascript/items.json");
    items = await response.json();
    displayItems(items);
   
    document.getElementById('search-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const filteredItems = items.filter(item =>
            item.name.toLowerCase().includes(searchTerm)
        );
        displayItems(filteredItems);
    });

    function displayItems(items) {
        const itemList = document.querySelector('.item_list');
        itemList.innerHTML = ''; 
    
        items.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('item_card');
    
            const itemImg = document.createElement('img');
            itemImg.src = item.image;
            itemImg.alt = item.name;
    
            const itemName = document.createElement('h3');
            itemName.textContent = item.name;
    
            const itemPrice = document.createElement('p');
            itemPrice.textContent = `$${item.price}`;
    
            const buyButton = document.createElement('button');
            buyButton.textContent = 'Buy item';
            
            // Call handlePurchaseRedirect when Buy button is clicked
            buyButton.addEventListener("click", function() {
                handlePurchaseRedirect(item);
            });

            itemCard.appendChild(itemImg);
            itemCard.appendChild(itemName);
            itemCard.appendChild(itemPrice);
            itemCard.appendChild(buyButton);
    
            itemList.appendChild(itemCard);
        });
    }

    function handlePurchaseRedirect(item) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.loggedIn) {
            // Store selected item in localStorage
            localStorage.setItem('selectedItem', JSON.stringify(item));
            window.location.href = "purchase.html";
        } else {
            window.location.href = "login.html";
        }
    }

    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', function() {
        logoutUser();
    });

    function logoutUser() {
        // Get the currentUser object from localStorage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        // Update the loggedIn status to false
        if (currentUser) {
            currentUser.loggedIn = false;
            // Save the updated currentUser object back to localStorage
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }

        // Perform logout actions
        alert("Logout successful!");
        window.location.href = "index.html";
    }
});
