document.addEventListener("DOMContentLoaded", function() {
    const purchaseForm = document.querySelector(".purchaseForm");

    purchaseForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Debugging: Log values to check if they are retrieved correctly
        console.log("Current User:", localStorage.getItem('currentUser'));
        console.log("Selected Item:", localStorage.getItem('selectedItem'));
        console.log("Seller Details:", localStorage.getItem('sellerDetails'));

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const itemDetails = JSON.parse(localStorage.getItem('selectedItem'));
        const sellerDetails = JSON.parse(localStorage.getItem('sellerDetails'));

        if (currentUser && itemDetails && sellerDetails) {
            const quantity = document.getElementById("quantity").value;
            const address = document.getElementById("address").value;
            const phone = document.getElementById("phone").value;
            const zip = document.getElementById("zip").value;

            const totalPrice = itemDetails.price * quantity;
            if (currentUser.balance >= totalPrice) {
                // Deduct purchase amount from buyer's balance
                currentUser.balance -= totalPrice;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                // Add purchase amount to seller's balance
                sellerDetails.balance += totalPrice;
                localStorage.setItem('sellerDetails', JSON.stringify(sellerDetails));

                // Save purchase history locally
                const purchaseRecord = {
                    itemName: itemDetails.name,
                    quantity: quantity,
                    totalPrice: totalPrice,
                    shippingAddress: address,
                    phoneNumber: phone,
                    zipCode: zip
                };
                const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
                purchaseHistory.push(purchaseRecord);
                localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

                // Display success message to the customer
                alert("Purchase successful! Your item will be shipped soon.");

                // Redirect to main page after purchase
                window.location.href = "index.html";
            } else {
                alert("Insufficient balance to complete the purchase.");
            }
        } else {
            alert("User, item, or seller details not found. Please try again.");
        }
    });
});
