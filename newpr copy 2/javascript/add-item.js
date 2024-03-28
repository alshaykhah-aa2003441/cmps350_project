// document.addEventListener("DOMContentLoaded", function () {
//     let storedItems = JSON.parse(localStorage.getItem('items')) || [];
//     const currentUser = sessionStorage.getItem('id');

//     // Update Local Storage Function
//     function addItemToLocalStorage(newItem) {
//         storedItems.push(newItem);
//         localStorage.setItem('items', JSON.stringify(storedItems));
//         // Optional: Log the updated storedItems for debugging
//         console.log('Items added:', storedItems);
//     }

//     // Update Displayed Items Function
//     function displayItems(itemsToDisplay) {
//         const itemList = document.querySelector('.item_list');
//         itemList.innerHTML = '';

//         itemsToDisplay.forEach(item => {
//             const itemCard = document.createElement('div');
//             itemCard.classList.add('item_card');

//             const itemImg = document.createElement('img');
//             itemImg.src = item.image;
//             itemImg.alt = item.name;

//             const itemName = document.createElement('h3');
//             itemName.textContent = item.name;

//             const itemPrice = document.createElement('p');
//             itemPrice.textContent = `$${item.price}`;

//             const buyButton = document.createElement('button');
//             buyButton.textContent = 'Buy item';
//             buyButton.addEventListener("click", handleBuyingItem);

//             itemCard.appendChild(itemImg);
//             itemCard.appendChild(itemName);
//             itemCard.appendChild(itemPrice);
//             itemCard.appendChild(buyButton);
//             itemList.appendChild(itemCard);
//         });
//     }

//     // Display items from local storage on page load
//     displayItems(storedItems);

//     const addItemForm = document.querySelector('.upload-form');
//     if (addItemForm) {
//         addItemForm.addEventListener('submit', handleAddItem);
//     }

//     function handleAddItem(event) {
//         event.preventDefault();

//         // Get form input values
//         const itemName = document.getElementById('item-name').value.trim();
//         const itemPrice = parseFloat(document.getElementById('price').value);
//         const itemQuantity = parseInt(document.getElementById('quantity').value);
//         const itemImageInput = document.getElementById('item-image');
//         const itemImageFile = itemImageInput.files[0]; // Get the selected file

//         // Placeholder image URL (replace with your image handling logic)
//         const itemImage = URL.createObjectURL(itemImageFile); // Create a URL for the uploaded file

//         const newItem = {
//             name: itemName,
//             price: itemPrice,
//             quantity: itemQuantity,
//             seller: currentUser.id,
//             image: itemImage
//         };

//         // Add item to local storage and update displayed items
//         addItemToLocalStorage(newItem);
//         displayItems(storedItems);

//         alert('Item added successfully!');

//         event.target.reset();
//         window.location.href = "index.html";

//     }
// });


document.addEventListener("DOMContentLoaded", function () {
    let storedItems = JSON.parse(localStorage.getItem('items')) || [];
    const currentUser = sessionStorage.getItem('username');
    console.log("Current User:", currentUser);

    const uploadForm = document.querySelector('.upload-form');

    uploadForm.addEventListener('submit', addItem);
    function addItem(event) {
        event.preventDefault();
    
        const itemName = document.getElementById('item-name').value.trim();
        const itemPrice = parseFloat(document.getElementById('price').value);
        const itemQuantity = parseInt(document.getElementById('quantity').value);
        const itemImageInput = document.getElementById('item-image');
        const itemImageFile = itemImageInput.files[0]; // Get the selected file
    
        const itemImage = URL.createObjectURL(itemImageFile);
    
        const newItem = {
            name: itemName,
            price: itemPrice,
            quantity: itemQuantity,
            seller: currentUser,
            image: itemImage
        };
    
        storedItems.push(newItem);
        localStorage.setItem('items', JSON.stringify(storedItems));
        displayItems(storedItems); // Update the display
        event.target.reset();
        // Redirect to main page
        window.location.href = 'index.html';
    }
    
    function displayItems(itemsToDisplay) {
        const itemList = document.querySelector('.item_list');
        console.log('itemList:', itemList); // Check if itemList is null
    
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
    
});
