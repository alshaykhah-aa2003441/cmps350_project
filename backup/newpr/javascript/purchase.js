document.addEventListener("DOMContentLoaded", function() {
  const purchaseForm = document.querySelector('.purchaseform');
  const itemDetailsContainer = document.getElementById('item-details');
  const selectedItem = JSON.parse(localStorage.getItem('selectedItem'));
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser')); // Assuming user data is stored during login
  const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
  const saleHistory = JSON.parse(localStorage.getItem('saleHistory')) || [];
  // Add these console logs for debugging
// console.log('currentUser:', currentUser);
// console.log('sessionStorage username:', sessionStorage.getItem('username'));

// // Check if the retrieved username matches the expected user
// if (currentUser.username !== sessionStorage.getItem('username')) {
//   console.log('Error: Current user data mismatch.');
//   // Handle the error condition appropriately
// }

  const itemDetailsHTML = `
      <h2>${selectedItem.name}</h2>
      <img src="${selectedItem.image}" alt="${selectedItem.name}">
      <p>Price: $${selectedItem.price}</p>
    `;
  itemDetailsContainer.innerHTML = itemDetailsHTML;

  purchaseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const quantity = parseInt(document.getElementById('quantity').value);
    const phoneNumber = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const zipCode = document.getElementById('zip').value.trim();

    

    const totalPrice = selectedItem.price * quantity;
    const currentUserBalance = parseInt(currentUser.balance, 10);
    // console.log('currentUser:', currentUser); // Log the retrieved user data
    // console.log('currentUserBalance:', parseInt(currentUser.balance, 10)); // Log the parsed balance

  if (currentUserBalance < totalPrice) {
      console.log('Insufficient balance:', currentUserBalance, totalPrice);
      alert('Insufficient balance to make this purchase.');
      // window.location.href = 'index.html';
      return;
  }


    const confirmationMessage = `Thank you for your purchase!
        Total Price: $${totalPrice}
        Quantity: ${quantity}
        Shipping Address: ${address}, ${zipCode}
        Phone Number: ${phoneNumber}`;

    const purchaseData = {
          itemName: selectedItem.name,
          price: selectedItem.price,
          phone: phone,
          quantity: quantity,
          address: address,
          zip: zip,
          buyer: sessionStorage.getItem('username'),
          seller: selectedItem.seller_id,
    };
    const SellerData = {
      itemName: selectedItem.name,
      itemquantity: selectedItem.quantity,
      buyer: sessionStorage.getItem('username'),
      seller: currentUser.seller_id,
      quantity: quantity,
      price: selectedItem.price*quantity,

     
};

    purchaseHistory.push(purchaseData);
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

    saleHistory.push(SellerData);
    localStorage.setItem('saleHistory', JSON.stringify(saleHistory));

    // this prevent the code from runing 

    // const seller = users.filter(user => user.id === selectedItem.seller_id && user.type === 'seller')[0];
    // if (seller) {
    //   const sellerBankAccount = seller.bank_account;
    //   const updatedBankAccount = sellerBankAccount + totalPrice;
    //   seller.bank_account = updatedBankAccount;
    //   localStorage.setItem('users', JSON.stringify(users));
    // }
    currentUser.balance -= totalPrice;
    localStorage.setItem('currentUser', JSON.stringify(currentUser)); // Update user balance in localStorage

    alert(confirmationMessage);

    
    window.location.href = 'index.html';
  });
});