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

            // if the customr is not logged in, this should take him/her to the login page
            buyButton.addEventListener("click",handleBuyingItem);
            function handleBuyingItem(event){
                event.preventDefault()
                const isLoggedIn = sessionStorage.getItem('isLoggedIn')
                if (!isLoggedIn)
                    window.location.href="login.html"
                else
                    window.location.href = 'purchase.html'
                localStorage.setItem('selectedItem', JSON.stringify(item))
            }

            const cart= document.querySelector('#cart')
            cart.addEventListener("click",handleShoppingCart);
            function handleShoppingCart(){
                window.location.href="purchase.html"
            }

            itemCard.appendChild(itemImg);
            itemCard.appendChild(itemName);
            itemCard.appendChild(itemPrice);
            itemCard.appendChild(buyButton);
    
            itemList.appendChild(itemCard);
        });
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
