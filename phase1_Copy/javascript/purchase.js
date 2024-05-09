document.addEventListener("DOMContentLoaded", function() {
  const purchaseForm = document.querySelector('.purchaseform');
  const itemDetailsContainer = document.getElementById('item-details');
  const selectedItem = JSON.parse(localStorage.getItem('selectedItem'));
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser')); 
  const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
  const saleHistory = JSON.parse(localStorage.getItem('saleHistory')) || [];
  const users = JSON.parse(localStorage.getItem('users'))
  const items = JSON.parse(localStorage.getItem('items'))

// console.log('currentUser:', currentUser);
// console.log('sessionStorage username:', sessionStorage.getItem('username'));

// // Check if the retrieved username matches the expected user
// if (currentUser.username !== sessionStorage.getItem('username')) {
//   console.log('Error: Current user data mismatch.');
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
    const phoneNumber = parseInt(document.getElementById('phone').value);
    const address = document.getElementById('address').value.trim();
    const zipCode = parseInt(document.getElementById('zip').value);

    const user = users.findIndex(u => u.username === currentUser.username)
    if (user === -1){
      console.error('Current user not found in the list of users');
      return;
    }

    const item = items.findIndex(i => i.name === selectedItem.name)
    if (item !== -1){
      if (quantity <= items[item].quantity) { 
        items[item].quantity -= quantity;
      } else {
        console.error('Requested quantity exceeds available quantity');
        alert(`Sorry, only ${items[item].quantity} ${selectedItem.name}(s) are available.`);
        return;
      }
    } else {
      console.error('Purchased item not found in the list of items');
      return;
    }

    const totalPrice = selectedItem.price * quantity;
    users[user].balance -= totalPrice
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
          itemName: items[item].name,
          price: items[item].price,
          phone: phone,
          quantity: quantity,
          address: address,
          zip: zip,
          buyer: sessionStorage.getItem('username'),
          seller: items[item].seller_id,
    };

    const SellerData = {
      itemName: items[item].name,
      itemquantity: items[item].quantity,
      buyer: sessionStorage.getItem('username'),
      seller: users[user].seller_id,
      quantity: quantity,
      price: items[item].price*quantity,   
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
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser)); 

    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('items', JSON.stringify(items))

    alert(confirmationMessage);
    window.location.href = 'index.html';
  });
});