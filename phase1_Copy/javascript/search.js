// // // Sample items data
const items = [
    {
        "name": "T-Shirt",
        "price": 50,
        "image": "icons/blank-1886008_640.webp",
        "seller_id": 3,
        "quantity": 100
    },
    {
        "name": "Shoes",
        "price": 60,
        "image": "icons/adidas-dame-8.webp",
        "seller_id": 3,
        "quantity": 10
    },
    {
        "name": "Pants",
        "price": 70,
        "image": "icons/sv13100_tauw_0.webp",
        "seller_id": 3,
        "quantity": 90
    },
    {
        "name": "Sunglasses",
        "price": 25,
        "image": "icons/Dusk-Blackframewithdarktint_polarizedlenses_969c55e5-54b3-44bc-ad49-3c0eac2e49f5_1100x.webp",
        "seller_id": 3,
        "quantity": 55
    }

];

// // Store items in local storage
localStorage.setItem('items', JSON.stringify(items));

//Retrieve items from local storage and display them
document.addEventListener("DOMContentLoaded", function() {
    let storedItems = [];
    const storedData = localStorage.getItem('items');
    if (storedData) {
        storedItems = JSON.parse(storedData);
        displayItems(storedItems);
    } else {
        console.error('Error: Items not found in local storage.');
    }

    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        const loginButton = document.querySelector('.login a');
        if (loginButton) {
            loginButton.style.display = 'none'; 
        }
    }


    function displayItems(itemsToDisplay) {
        const itemList = document.querySelector('.item_list');
            
        if (!itemList) {
        console.error('Error: item_list element not found.');
        return;
    }
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
            const itemQuantity = document.createElement('p');
            itemQuantity.textContent = `Available quantity: ${item.quantity}`;



            if (item.quantity === 0) {
            const noMoreAvailable = document.createElement('p');
            noMoreAvailable.textContent = `No more ${item.name}s available`;
            itemCard.appendChild(noMoreAvailable);
        } else {
            const buyButton = document.createElement('button');
            buyButton.textContent = 'Buy item';
            buyButton.classList.add('buy-button');
            
            if (item.quantity === 0) {
                buyButton.disabled = true; 
                
            } else {
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
            }

            itemCard.appendChild(buyButton);
        }

        itemCard.appendChild(itemImg);
        itemCard.appendChild(itemName);
        itemCard.appendChild(itemPrice);
        itemCard.appendChild(itemQuantity);

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
        if (filteredItems.length === 0) {
            displayNoResultsMessage();
        } else {
            displayItems(filteredItems);
        }
    }

    function displayNoResultsMessage() {
        const itemList = document.querySelector('.item_list');
        itemList.innerHTML = ''; 
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No items found.';
        itemList.appendChild(noResultsMessage);
    }

    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', logoutUser);

    function logoutUser() {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            alert('You must be logged in to logout!');
            return; 
        }
    
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('username');
        alert('Logout successful!');
        window.location.href = 'index.html';
    }
});







    // const currentUser = sessionStorage.getItem('username');
    // console.log("Current User:", currentUser);

    // const currentUser = JSON.parse(sessionStorage.getItem('currentUser')); // Assuming you have stored the current user's username
    

    // const uploadForm = document.querySelector('.upload-form');

    // uploadForm.addEventListener('submit', addItem);
    // function addItem(event) {
    //     event.preventDefault();
    
    //     const itemName = document.getElementById('item-name').value.trim();
    //     const itemPrice = parseFloat(document.getElementById('price').value);
    //     const itemQuantity = parseInt(document.getElementById('quantity').value);
    //     const itemImageInput = document.getElementById('item-image');
    //     const itemImageFile = itemImageInput.files[0]; // Get the selected file
    
    //     const itemImage = URL.createObjectURL(itemImageFile);
    //     const newItem = {
    //         name: itemName,
    //         price: itemPrice,
    //         quantity: itemQuantity,
    //         seller: currentUser.id,
    //         image: itemImage
    //     };
    
    //     storedItems.push(newItem);
    //     localStorage.setItem('items', JSON.stringify(storedItems));
    //     displayItems(storedItems); 
    //     event.target.reset();
    //     window.location.href = 'index.html';
    // }




   
    
   
