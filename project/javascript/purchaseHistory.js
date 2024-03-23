document.addEventListener('DOMContentLoaded', function () {
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory'))
    if (purchaseHistory){
        console.log(purchaseHistory);
        const purchaseHistoryTable = document.getElementById('salesTable')
        const viewHistory = purchaseHistory.map(purchase => displayHistory(purchase))
        purchaseHistoryTable.innerHTML = viewHistory
    }

    function displayHistory(purchase) {
        return `<tr>
            <th>Item Name</th>
            <th>Item Price</th>
            <th>Quantity</th>
        </tr>
        <tr>
            <td>${purchase.itemName}</td>
            <td>${purchase.price} $</td>
            <td>${purchase.quantity}</td>
        </tr>`
    }
})