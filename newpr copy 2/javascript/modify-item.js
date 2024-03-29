// document.addEventListener("DOMContentLoaded", function() {
//     // Retrieve the item name from the query parameter
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const itemName = urlParams.get('itemName');

//     // Retrieve item details from localStorage based on the item name
//     const items = JSON.parse(localStorage.getItem('items'));
//     const item = items.find(item => item.name === itemName);

//     if (item) {
//         displayItemDetails(item);
//     } else {
//         // Handle the case where the item is not found
//         document.getElementById('item-details').innerHTML = "<p>Item not found</p>";
//     }

//     // Function to display item details
//     function displayItemDetails(item) {
//         const itemDetailsContainer = document.getElementById('item-details');
//         itemDetailsContainer.innerHTML = `
//             <h3>${item.name}</h3>
//             <p>Price: $${item.price}</p>
//             <p>Quantity Available: ${item.quantity}</p>
//         `;
//     }

//     // Handle form submission
//     document.getElementById('modify-form').addEventListener('submit', function(event) {
//         event.preventDefault();
//         const newQuantity = parseInt(document.getElementById('quantity').value);
        
//         // Update the quantity of the item in localStorage
//         const itemIndex = items.findIndex(item => item.name === itemName);
//         if (itemIndex !== -1) {
//             items[itemIndex].quantity = newQuantity;
//             localStorage.setItem('items', JSON.stringify(items));
//             alert('Quantity updated successfully');
//             window.location.reload(); // Reload the page to reflect the changes
//         } else {
//             alert('Item not found');
//         }
//     });
// });