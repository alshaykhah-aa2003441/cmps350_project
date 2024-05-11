// document.addEventListener("DOMContentLoaded", function () {
//     let storedItems = JSON.parse(localStorage.getItem('items')) || [];
//     const currentUser = sessionStorage.getItem('id');

//     function addItemToLocalStorage(newItem) {
//         storedItems.push(newItem);
//         localStorage.setItem('items', JSON.stringify(storedItems));
//         console.log('Items added:', storedItems);
//     }

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

//     displayItems(storedItems);

//     const addItemForm = document.querySelector('.upload-form');
//     if (addItemForm) {
//         addItemForm.addEventListener('submit', handleAddItem);
//     }

//     function handleAddItem(event) {
//         event.preventDefault();

//         const itemName = document.getElementById('item-name').value.trim();
//         const itemPrice = parseFloat(document.getElementById('price').value);
//         const itemQuantity = parseInt(document.getElementById('quantity').value);
//         const itemImageInput = document.getElementById('item-image');
//         const itemImageFile = itemImageInput.files[0]; 

//         // Placeholder image URL (replace with your image handling logic)
//         const itemImage = URL.createObjectURL(itemImageFile); 

//         const newItem = {
//             name: itemName,
//             price: itemPrice,
//             quantity: itemQuantity,
//             seller: currentUser.id,
//             image: itemImage
//         };

//         addItemToLocalStorage(newItem);
//         displayItems(storedItems);

//         alert('Item added successfully!');

//         event.target.reset();
//         window.location.href = "index.html";

//     }
// });
// document.addEventListener("DOMContentLoaded", function () {
//     let storedItems = JSON.parse(localStorage.getItem('items')) || [];
//     const currentUser = sessionStorage.getItem('username');
//     console.log("Current User:", currentUser);

//     const uploadForm = document.querySelector('.upload-form');

//     uploadForm.addEventListener('submit', addItem);
//     function addItem(event) {
//         event.preventDefault();
    
//         const itemName = document.getElementById('item-name').value.trim();
//         const itemPrice = parseFloat(document.getElementById('price').value);
//         const itemQuantity = parseInt(document.getElementById('quantity').value);
//         const itemImageInput = document.getElementById('item-image');
//         const itemImageFile = itemImageInput.files[0]; // Get the selected file
    
//         const itemImage = URL.createObjectURL(itemImageFile);
//         const newItem = {
//             name: itemName,
//             price: itemPrice,
//             quantity: itemQuantity,
//             seller: currentUser,
//             image: itemImage
//         };
    
//         storedItems.push(newItem);
//         localStorage.setItem('items', JSON.stringify(storedItems));
//         displayItems(storedItems); 
//         event.target.reset();
//         window.location.href = 'index.html';
//     }
//      });
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    document.getElementById('item-image').addEventListener('change', function() {
        const imgFile = this.files[0];
        if (imgFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('image-preview').src = e.target.result;
            }
            reader.readAsDataURL(imgFile);
        }
    });

    const form = document.querySelector('.upload-form');
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const name = document.getElementById('item-name').value.trim();
        const price = parseFloat(document.getElementById('price').value);
        const quantity = parseInt(document.getElementById('quantity').value);
        const imageFiles = document.getElementById('item-image').files;

        const newItem = {
            "name": name,
            "price": price,
            "quantity": quantity,
            "seller_id": currentUser.id,
            "image": "icons/" + imageFiles[0].name 
        };

        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItem)
            });

            if (!response.ok) {
                throw new Error(`Error adding item: ${response.statusText}`);
            }

            const responseData = await response.json();
            alert('New item added successfully!');
            form.reset();
            console.log('Response data:', responseData);
            window.location.href = 'seller.html';
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Error adding item. Please try again.');
        }
    });
});
