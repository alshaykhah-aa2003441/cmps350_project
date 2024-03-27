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
<<<<<<< HEAD
localStorage.setItem('items', JSON.stringify(items));


=======
// localStorage.setItem('items', JSON.stringify(items));
>>>>>>> ae72057b250578b30d09baba35e4f81eae27eefd


//Retrieve items from local storage and display them
document.addEventListener("DOMContentLoaded", function() {
    let storedItems = [];
    fetch('./jsons/items.json')
        .then(response=>response.json())
        .then(data=>{
             storedItems=data;
             localStorage.setItem('items', JSON.stringify(storedItems)); // Save items to local storage
            displayItems(storedItems);
        })
        .catch(error=>{
            console.error('Error fetching items:', error);
        });

        
    // const storedData = localStorage.getItem('items');
    // if (storedData) {
    //     storedItems = JSON.parse(storedData);
    //     displayItems(storedItems);
    // } else {
    //     console.error('Error: Items not found in local storage.');
    // }

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
            buyButton.classList.add('buy-button');

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
        const searchTerm = document.getElementById('search-input').value.trim().toLowerCase();
        const filteredItems = storedItems.filter(item =>
            item.name.toLowerCase().includes(searchTerm)
        );
        displayItems(filteredItems);
    }

    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', logoutUser);

    function logoutUser() {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('username');
        alert('Logout successful!');
        window.location.href = 'index.html';
    }
});
<<<<<<< HEAD




   
    
   
=======
>>>>>>> ae72057b250578b30d09baba35e4f81eae27eefd
