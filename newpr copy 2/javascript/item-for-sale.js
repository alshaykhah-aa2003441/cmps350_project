document.addEventListener("DOMContentLoaded", async function() {

    const itemsTable = document.getElementById('itemsTable');
    try {
      const items = await fetchItems();
      if (items.length > 0) {
        const itemsHTML = items.map(item => displayItem(item)).join(''); // Use join('') for efficiency
        itemsTable.innerHTML = `
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
        ${itemsHTML}`;
      } else {
        itemsTable.innerHTML = "<tr><td colspan='3'>No items found.</td></tr>";
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      itemsTable.innerHTML = "<tr><td colspan='3'>Error loading items. Please try again later.</td></tr>";
    }
  
    async function fetchItems() {
      const response = JSON.parse(localStorage.items)
      // const response = await fetch("jsons/items.json");
      if (!response) {
        throw new Error(`Error fetching items: ${response.status}`);
      }
      // const data = await response.json();
      // return data || [];
      return response
    }
  
    function displayItem(item) {
      return `
        <tr>
          <td>${item.name}</td>
          <td>$${item.price}</td>
          <td>${item.quantity}</td>
        </tr>
      `;
    }
  });