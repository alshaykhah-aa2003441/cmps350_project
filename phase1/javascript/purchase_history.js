document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser')); 
    const currentUserusername= currentUser.username;
    // console.log(currentUser);
    // console.log(currentUserusername);
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    if (purchaseHistory && currentUserusername) {
        const userPurchaseHistory = purchaseHistory.filter(purchase => purchase.buyer === currentUserusername);
        const purchaseHistoryTable = document.getElementById('salesTable');
        const viewHistory = userPurchaseHistory.map(purchase => displayHistory(purchase)).join('');
        purchaseHistoryTable.innerHTML = `
        <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
        </tr>
        ${viewHistory}`;
         
    } 
    function displayHistory(purchase) {
        return `
        <tr>
            <td>${purchase.itemName}</td>
            <td>${purchase.price} $</td>
            <td>${purchase.quantity}</td>
        </tr>`
    }
    

})