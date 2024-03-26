document.addEventListener("DOMContentLoaded", async function() {

    const itemsTable = document.getElementById('itemsTable');
    
    try {
      const items = await fetchItems();
      if (items.length > 0) {
        const itemsHTML = items.map(item => displayItem(item)).join(''); // Use join('') for efficiency
        itemsTable.innerHTML = itemsHTML;
      } else {
        itemsTable.innerHTML = "<tr><td colspan='3'>No items found.</td></tr>";
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      itemsTable.innerHTML = "<tr><td colspan='3'>Error loading items. Please try again later.</td></tr>";
    }
  
    async function fetchItems() {
      const response = await fetch("jsons/items.json");
      if (!response.ok) {
        throw new Error(`Error fetching items: ${response.status}`);
      }
      const data = await response.json();
      return data || [];
    }
  
    function displayItem(item) {
      return `
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
        <tr>
          <td>${item.name}</td>
          <td>$${item.price}</td>
          <td>${item.quantity}</td>
        </tr>
      `;
    }
  });