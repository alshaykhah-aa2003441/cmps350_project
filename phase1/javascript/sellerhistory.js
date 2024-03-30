document.addEventListener("DOMContentLoaded", function() {
    const saleHistory = JSON.parse(localStorage.getItem('saleHistory'));
    const items = JSON.parse(localStorage.getItem('items')); 
    const salesTable = document.getElementById('salesTable');
    let salesHTML = ""; 

    saleHistory.forEach(sale => {
        const item = items.find(item => item.name === sale.itemName); 
        const remainingQuantity = item ? item.quantity : "NA"; 

        salesHTML += displaySales(sale, remainingQuantity, item); 
    });
    salesTable.innerHTML = `
        <tr>
            <th>Item Name</th>
            <th>Buyer</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Availability</th>
        </tr>
        ${salesHTML}`; 

    function displaySales(sale, remainingQuantity, item) {
        let actionButtonHTML = ''; 
        
        if (item && item.quantity === 0) {
            actionButtonHTML = `<td><a href="modify-quantity.html?itemName=${encodeURIComponent(item.name)}">Add More</a></td>`;
        } else {
            actionButtonHTML = '<td></td>'; 
        }

        return `
            <tr>
                <td>${sale.itemName}</td>
                <td>${sale.buyer}</td>
                <td>${sale.quantity}</td>
                <td>$${sale.price}</td>
                <td>${remainingQuantity}</td> 
                ${actionButtonHTML} 
            </tr>`;
    }
});

