document.addEventListener("DOMContentLoaded", async function() {
    try {
        const itemsResponse = await fetch('/api/items');
        const items = await itemsResponse.json()
        console.log(items);
        displayItems(items);
        if (!itemsResponse.ok) {
            throw new Error(`Error fetching items: ${itemsResponse.statusText}`);
        }  
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
        const response = await fetch(`/api/items?name=${searchTerm}`);
        if (!response.ok) {
            throw new Error(`Error fetching items: ${response.statusText}`);
        }
        return response.json();
    }

    async function handleSearch(event) {
        event.preventDefault();
        const searchTerm = document.getElementById('search-input').value.trim();
        alert(searchTerm)
        try {
            const filteredItems = await fetchItems(searchTerm);
            // if (filteredItems.length === 0) {
            if (!filteredItems) {
                displayNoResultsMessage();
            } else if (filteredItems) {
                display(filteredItems);
            // }else {
            //     displayItems(filteredItems);
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

        itemCard.appendChild(itemImg);
        itemCard.appendChild(itemName);
        itemCard.appendChild(itemPrice);
        itemCard.appendChild(itemQuantity);
    });

}

function displayNoResultsMessage() {
    const itemList = document.querySelector('.item_list');
    itemList.innerHTML = ''; 
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'No items found.';
    itemList.appendChild(noResultsMessage);
}

function display(items) {
    const itemList = document.querySelector('.item_list');
    itemList.innerHTML = '';

    if (Array.isArray(items)) {
        items.forEach(item => {
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

            itemCard.appendChild(itemImg);
            itemCard.appendChild(itemName);
            itemCard.appendChild(itemPrice);
            itemCard.appendChild(itemQuantity);
            itemList.appendChild(itemCard);
        });
    } else {
        const itemCard = document.createElement('div');
        itemCard.classList.add('item_card');
        const itemImg = document.createElement('img');
        itemImg.src = items.image;
        itemImg.alt = items.name;
        const itemName = document.createElement('h3');
        itemName.textContent = items.name;
        const itemPrice = document.createElement('p');
        itemPrice.textContent = `$${items.price}`;
        const itemQuantity = document.createElement('p');
        itemQuantity.textContent = `Available quantity: ${items.quantity}`;

        itemCard.appendChild(itemImg);
        itemCard.appendChild(itemName);
        itemCard.appendChild(itemPrice);
        itemCard.appendChild(itemQuantity);
        itemList.appendChild(itemCard);
    }
}
