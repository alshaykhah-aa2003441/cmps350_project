document.addEventListener("DOMContentLoaded", function() {
  const purchaseForm = document.querySelector('.purchaseform');
  const itemDetailsContainer = document.getElementById('item-details');
  const selectedItem = JSON.parse(localStorage.getItem('selectedItem'));
  const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Assuming user data is stored during login
  const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
  const saleHistory = JSON.parse(localStorage.getItem('saleHistory')) || [];


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
    if (currentUser.balance < totalPrice) {
      alert('Insufficient balance to make this purchase.');
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
      seller: selectedItem.seller_id,
      quantity: quantity,
      price: selectedItem.price*quantity,

     
};

    purchaseHistory.push(purchaseData);
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

    saleHistory.push(SellerData);
    localStorage.setItem('saleHistory', JSON.stringify(saleHistory));

      // Update user balance after purchase
    currentUser.balance -= totalPrice;
    localStorage.setItem('currentUser', JSON.stringify(currentUser)); // Update user balance in localStorage

    alert(confirmationMessage);

    
    window.location.href = 'index.html';
  });
});