// document.addEventListener("DOMContentLoaded", function() {
//     const users = JSON.parse(localStorage.getItem('users')); // Retrieve all users data
//     const items = JSON.parse(localStorage.getItem('items')); // Retrieve items data

//     const sellerTables = document.getElementById('users'); // Change ID to 'users'

//     const sellers = users.filter(user => user.type === 'seller'); // Filter out only the sellers

//     sellers.forEach(seller => {
//         const sellerTable = document.createElement('table');
//         sellerTable.classList.add('seller-table');

//         // Header row for seller information
//         const sellerHeaderRow = `
//             <tr>
//                 <th colspan="2">Seller Information</th>
//             </tr>
//             <tr>
//                 <td>ID:</td>
//                 <td>${seller.id}</td>
//             </tr>
//             <tr>
//                 <td>Username:</td>
//                 <td>${seller.username}</td>
//             </tr>
//             <!-- Add more seller information here -->
//         `;
//         sellerTable.innerHTML += sellerHeaderRow;

//         // Header row for items
//         const itemsHeaderRow = `
//             <tr>
//                 <th colspan="5">Items</th>
//             </tr>
//             <tr>
//                 <th>Name</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <!-- Add more item details if needed -->
//             </tr>
//         `;
//         sellerTable.innerHTML += itemsHeaderRow;

//         // Filter items for the current seller
//         const sellerItems = items.filter(item => item.seller_id === seller.id);

//         // Rows for each item
//         sellerItems.forEach(item => {
//             const itemRow = `
//                 <tr>
//                     <td>${item.name}</td>
//                     <td>$${item.price}</td>
//                     <td>${item.quantity}</td>
//                     <!-- Add more item details if needed -->
//                 </tr>
//             `;
//             sellerTable.innerHTML += itemRow;
//         });

//         // Add delete button for the seller
//         const deleteButtonRow = `
//             <tr>
//                 <td colspan="5">
//                     <button class="delete-button" data-seller-id="${seller.id}">Delete Seller</button>
//                 </td>
//             </tr>
//         `;
//         sellerTable.innerHTML += deleteButtonRow;

//         sellerTables.appendChild(sellerTable);
//     });

//     // Add event listener for delete buttons
//     const deleteButtons = document.querySelectorAll('.delete-button');
//     deleteButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             const sellerId = button.getAttribute('data-seller-id');
//             deleteSeller(sellerId);
//             // Remove the seller table from the DOM
//             button.closest('.seller-table').remove();
//         });
//     });

//     function deleteSeller(sellerId) {
//         // Implement logic to delete the seller and their items from the localStorage
//         // For simplicity, let's assume you have a function to delete the seller
//         // localStorage.removeItem(sellerId);
//     }
// });

document.addEventListener("DOMContentLoaded", function() {
    const users = JSON.parse(localStorage.getItem('users')); 
    const sellerTables = document.getElementById('sellerTables');

    const sellers = users.filter(user => user.type === 'seller');
    sellers.forEach(seller => {
        const sellerTable = document.createElement('table');
        sellerTable.classList.add('seller-table');

        const sellerHeaderRow = `
            <tr>
                <th colspan="2">Seller Information</th>
            </tr>
            <tr>
                <td>ID:</td>
                <td>${seller.id}</td>
            </tr>
            <tr>
                <td>Username:</td>
                <td>${seller.username}</td>
            </tr>
            <!-- Add more seller information here -->
        `;
        sellerTable.innerHTML += sellerHeaderRow;

        sellerTables.appendChild(sellerTable);
    });
});
