document.addEventListener("DOMContentLoaded", function() {
    const saleHistory = JSON.parse(localStorage.getItem('saleHistory'));
    const salesTable = document.getElementById('salesTable')
    const sales = saleHistory.map(sale => displaySales(sale))

    salesTable.innerHTML = sales
    function displaySales(sale) {
        return `<tr>
            <th>Item Name</th>
            <th>Buyer</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
        <tr>
            <td>${sale.itemName}</td>
            <td>${sale.buyer}</td>
            <td>${sale.quantity}</td>
            <td>${sale.price}</td>
        </tr>  `
    }
});
