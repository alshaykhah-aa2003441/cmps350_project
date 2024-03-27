// // Sample items data
// const items = [
//     {
//         "name": "T-Shirt",
//         "price": 50,
//         "image": "icons/blank-1886008_640.webp",
//         "seller_id": 3,
//         "quantity": 100
//     },
//     {
//         "name": "Shoes",
//         "price": 60,
//         "image": "icons/adidas-dame-8.webp",
//         "seller_id": 3,
//         "quantity": 10
//     },
//     {
//         "name": "Pants",
//         "price": 70,
//         "image": "icons/sv13100_tauw_0.webp",
//         "seller_id": 3,
//         "quantity": 90
//     },
//     {
//         "name": "Sunglasses",
//         "price": 25,
//         "image": "icons/Dusk-Blackframewithdarktint_polarizedlenses_969c55e5-54b3-44bc-ad49-3c0eac2e49f5_1100x.webp",
//         "seller_id": 3,
//         "quantity": 55
//     }
// ];

// // Store items in local storage
// localStorage.setItem('items', JSON.stringify(items));

// Retrieve items from local storage and display them
document.addEventListener("DOMContentLoaded", function() {
    let storedItems = [];
    const storedData = localStorage.getItem('items');
    if (storedData) {
        storedItems = JSON.parse(storedData);
        displayItems(storedItems);
    } else {
        console.error('Error: Items not found in local storage.');
    }
    function displayItems(itemsToDisplay) {
        const itemList = document.querySelector('.item_list');
        itemList.innerHTML = '';

        itemsToDisplay.forEach(item => {
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
            buyButton.addEventListener("click", handleBuyingItem);
            buyButton.classList.add('buy-button');

            function handleBuyingItem(event) {
                event.preventDefault();
                const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

                if (currentUser && currentUser.id) {
                    const selectedItem = JSON.stringify(item);
                    localStorage.setItem('selectedItem', selectedItem);

                    window.location.href = 'purchase.html'; 
                } else {
                    alert('Please login to buy this item.');
                    window.location.href = 'login.html'; 
                }
            }

            
            itemCard.appendChild(itemImg);
            itemCard.appendChild(itemName);
            itemCard.appendChild(itemPrice);
            itemCard.appendChild(buyButton);

            itemList.appendChild(itemCard);
        });
    }
    document.getElementById('search-form').addEventListener('submit', handleSearch);

    function handleSearch(event) {
        event.preventDefault();
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const filteredItems = storedItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm)
        );
        displayItems(filteredItems); 
    }

    // const addItemForm = document.getElementById('add-item-form');
    // addItemForm.addEventListener('submit', handleAddItem);


    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', logoutUser);
    function logoutUser() {
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('username');

        alert("Logout successful!");
        window.location.href = "index.html";
    }

});



   
    
   
