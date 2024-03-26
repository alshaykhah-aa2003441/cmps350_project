document.addEventListener("DOMContentLoaded", function() {
    const saleHistory = JSON.parse(localStorage.getItem('saleHistory'));
    const salesTable = document.getElementById('salesTable');
    let salesHTML = ""; 

    saleHistory.forEach(sale => {
        salesHTML += displaySales(sale); 
    });

    salesTable.innerHTML = `
        <tr>
            <th>Item Name</th>
            <th>Buyer</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
        ${salesHTML}`; 

    function displaySales(sale) {
        return `
            <tr>
                <td>${sale.itemName}</td>
                <td>${sale.buyer}</td>
                <td>${sale.quantity}</td>
                <td>${sale.price}</td>
            </tr>`;
    }
});
