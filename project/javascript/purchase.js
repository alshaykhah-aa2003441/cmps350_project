document.addEventListener('DOMContentLoaded', function () {
    const purchaseHistory = [], saleHistory = []
    const selectedItem = JSON.parse(localStorage.getItem('selectedItem'))
    if (selectedItem){
        const itemDetails = document.getElementById('item-details')
        itemDetails.innerHTML = `
        <p>Item: ${selectedItem.name}<p>
        <p>Price: ${selectedItem.price} $<p>`
    }
    const purchase = document.querySelector(".address")
    purchase.addEventListener('submit', function(event) {
        event.preventDefault()
        const quantity = document.getElementById('quantity').value
        const address = document.getElementById('address').value
        const city = document.getElementById('city').value
        const state = document.getElementById('state').value
        const zip = document.getElementById('zip').value

        const purchaseData = {
            itemName: selectedItem.name,
            price: selectedItem.price,
            quantity: quantity,
            address: address,
            city: city,
            state: state,
            zip: zip,
            buyer: sessionStorage.username
        }

        purchaseHistory.push(purchaseData)
        localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory))

        localStorage.setItem('saleHistory', JSON.stringify(saleHistory))
        saleHistory.push(purchaseData)
        localStorage.setItem('saleHistory', JSON.stringify(saleHistory))

        alert("Successful Purchase")
        window.location.href = 'index.html'

    })
})

