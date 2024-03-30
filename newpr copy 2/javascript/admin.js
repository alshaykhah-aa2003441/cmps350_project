document.addEventListener("DOMContentLoaded", function() {
    const users = JSON.parse(localStorage.getItem('users')); 
    const saleHistory = JSON.parse(localStorage.getItem('saleHistory'));
    const items = JSON.parse(localStorage.getItem('items')); 
    const sellerTables = document.getElementById('sellerTables');

    console.log(users); // Check if users data is retrieved
    console.log(saleHistory); // Check if saleHistory data is retrieved
    console.log(items); // Check if items data is retrieved
    
    sellerTables.innerHTML = '';

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
        `;
        sellerTable.innerHTML += sellerHeaderRow;

        console.log("Sale History:", saleHistory);
        console.log("Items:", items);

        const sellerItemsSold = saleHistory.filter(sale => sale.seller === seller.username);
        sellerItemsSold.forEach(sale => {
            console.log("Sale:", sale); // Check if sale object is logged
        
            // Find the corresponding item in the items array
            const item = items.find(item => item.name === sale.itemName);
            console.log("Item found:", item); // Check if item object is logged
        
            // If item is found, create HTML for item details and append it to sellerTable
            if (item) {
                const itemRow = `
                    <tr>
                        <td>Item Name:</td>
                        <td>${sale.itemName}</td>
                    </tr>
                    <tr>
                        <td>Quantity Sold:</td>
                        <td>${sale.quantity}</td>
                    </tr>
                    <tr>
                        <td>Price:</td>
                        <td>$${sale.price}</td>
                    </tr>
                    <tr>
                        <td>Remaining Quantity:</td>
                        <td>${item.quantity}</td>
                    </tr>
                `;
                sellerTable.innerHTML += itemRow;
            }
        });
        

        sellerTables.appendChild(sellerTable);
    });
});

