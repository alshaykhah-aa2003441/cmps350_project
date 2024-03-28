document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser')); // Assuming you have stored the current user's username
    const currentUserusername= currentUser.username;
    // console.log(currentUser);
    // console.log(currentUserusername);
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    if (purchaseHistory && currentUserusername) {
        const userPurchaseHistory = purchaseHistory.filter(purchase => purchase.buyer === currentUserusername);
        const purchaseHistoryTable = document.getElementById('salesTable');
        const viewHistory = userPurchaseHistory.map(purchase => displayHistory(purchase)).join('');
        purchaseHistoryTable.innerHTML = `<thead><tr><th>Item Name</th><th>Price</th><th>Quantity</th></tr></thead><tbody>${viewHistory}</tbody>`;
         
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