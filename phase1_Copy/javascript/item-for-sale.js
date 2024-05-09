document.addEventListener("DOMContentLoaded", async function() {
  const itemsTable = document.getElementById('itemsTable');
  try {
      const items = await fetchItems();
      if (items.length > 0) {
          const itemsHTML = items.map(item => displayItem(item)).join('');
          itemsTable.innerHTML = `
              <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
              </tr>
              ${itemsHTML}`;
          attachEventListeners();
      } else {
          itemsTable.innerHTML = "<tr><td colspan='4'>No items found.</td></tr>";
      }
  } catch (error) {
      console.error('Error fetching items:', error);
      itemsTable.innerHTML = "<tr><td colspan='4'>Error loading items. Please try again later.</td></tr>";
  }

  async function fetchItems() {
      const response = JSON.parse(localStorage.getItem('items'));
      if (!response) {
          throw new Error(`Error fetching items`);
      }
      return response;
  }

  function displayItem(item) {
    return `
        <tr>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>
                <span class="quantity-display">${item.quantity}</span>
                <button class="modify-quantity-btn">Modify Quantity</button>
                <div class="quantity-controls hidden">
                    <input type="number" class="quantity-input" min="0">
                    <button class="submit-quantity-btn">Submit</button>
                </div>
            </td>
            
        </tr>
    `;
}

function attachEventListeners() {
  const modifyQuantityButtons = document.querySelectorAll('.modify-quantity-btn');
  modifyQuantityButtons.forEach(button => {
      button.addEventListener('click', () => {
          const quantityControls = button.parentElement.querySelector('.quantity-controls');
          quantityControls.classList.toggle('hidden');
      });
  });

  const submitButtons = document.querySelectorAll('.submit-quantity-btn');
  submitButtons.forEach(button => {
    button.addEventListener('click', () => {
        const quantityInput = button.parentElement.querySelector('.quantity-input');
        const enteredQuantity = parseInt(quantityInput.value, 10);
        const quantityDisplay = button.parentElement.parentElement.querySelector('.quantity-display');
        const currentQuantity = parseInt(quantityDisplay.textContent, 10);
        const newQuantity = currentQuantity + enteredQuantity; 
        quantityDisplay.textContent = newQuantity; 
        const itemName = quantityDisplay.parentElement.parentElement.firstElementChild.textContent;
        updateItemQuantity(itemName, newQuantity); 
        button.parentElement.classList.remove('hidden');
    });
});
}

  function updateItemQuantity(itemName, newQuantity) {
      const items = JSON.parse(localStorage.getItem('items'));
      const updatedItems = items.map(item => {
          if (item.name === itemName) {
              item.quantity = newQuantity;
          }
          return item;
      });
      localStorage.setItem('items', JSON.stringify(updatedItems));
  }
});
