document.addEventListener("DOMContentLoaded", async function() {
    try {
        const itemsResponse = await fetch('/api/items');
        if (!itemsResponse.ok) {
            throw new Error(`Error fetching items: ${itemsResponse.statusText}`);
        }
        const storedItems = await itemsResponse.json();
        displayItems(storedItems);
    } catch (error) {
        console.error('Error: Unable to fetch items:', error);
    }

    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        const loginButton = document.querySelector('.login a');
        if (loginButton) {
            loginButton.style.display = 'none'; 
        }
    }

    async function fetchItems(searchTerm) {
        const response = await fetch(`/api/items?search=${searchTerm}`);
        if (!response.ok) {
            throw new Error(`Error fetching items: ${response.statusText}`);
        }
        return response.json();
    }

    async function handleSearch(event) {
        event.preventDefault();
        const searchTerm = document.getElementById('search-input').value.trim().toLowerCase();
        try {
            const filteredItems = await fetchItems(searchTerm);
            if (filteredItems.length === 0) {
                displayNoResultsMessage();
            } else {
                displayItems(filteredItems);
            }
        } catch (error) {
            console.error('Error searching items:', error);
            displayNoResultsMessage();
        }
    }

    document.getElementById('search-form').addEventListener('submit', handleSearch);
});

function displayItems(itemsToDisplay) {
    const itemList = document.querySelector('.item_list');
    if (!itemList) {
        console.error('Error: item_list element not found.');
        return;
    }
    itemList.innerHTML = '';

    itemsToDisplay.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('item_card');
        const itemImg = document.createElement('img');
        itemImg.src = item.image;
        itemImg.alt = item.name;
        const itemName = document.createElement('h3');
        itemName.textContent = item.name;
        const itemPrice = document.createElement('p');
        itemPrice.textContent = `$${item.price}`;
        const itemQuantity = document.createElement('p');
        itemQuantity.textContent = `Available quantity: ${item.quantity}`;

        itemList.appendChild(itemCard);
    });
}

function displayNoResultsMessage() {
    const itemList = document.querySelector('.item_list');
    itemList.innerHTML = ''; 
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'No items found.';
    itemList.appendChild(noResultsMessage);
}
