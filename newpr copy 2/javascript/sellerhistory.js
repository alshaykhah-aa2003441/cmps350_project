document.addEventListener("DOMContentLoaded", function() {
    const saleHistory = JSON.parse(localStorage.getItem('saleHistory'));
    const items = JSON.parse(localStorage.getItem('items')); // Retrieve items data
    const salesTable = document.getElementById('salesTable');
    let salesHTML = ""; 

    saleHistory.forEach(sale => {
        const item = items.find(item => item.name === sale.itemName); // Find the corresponding item
        const remainingQuantity = item ? item.quantity : "NA"; // Get the remaining quantity or "N/A" if item not found

        salesHTML += displaySales(sale, remainingQuantity, item); // Pass the item object to the display function
    });
    salesTable.innerHTML = `
        <tr>
            <th>Item Name</th>
            <th>Buyer</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Action</th> <!-- New column for action buttons -->
        </tr>
        ${salesHTML}`; 

    function displaySales(sale, remainingQuantity, item) {
        let actionButtonHTML = ''; // Initialize action button HTML
        
        // Check if the quantity is 0 and display appropriate action button
        if (item && item.quantity === 0) {
            actionButtonHTML = `<td><a href="modify-quantity.html?itemName=${encodeURIComponent(item.name)}">Add More</a></td>`;
        } else {
            actionButtonHTML = '<td></td>'; // Empty cell if quantity is not 0
        }

        return `
            <tr>
                <td>${sale.itemName}</td>
                <td>${sale.buyer}</td>
                <td>${sale.quantity}</td>
                <td>${sale.price}</td>
                <td>${remainingQuantity}</td> <!-- Display remaining quantity -->
                ${actionButtonHTML} <!-- Display action button -->
            </tr>`;
    }
});

