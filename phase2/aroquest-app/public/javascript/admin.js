import ApexCharts from 'apexcharts'

// document.addEventListener("DOMContentLoaded", function() {
//     const users = JSON.parse(localStorage.getItem('users')); 
//     const saleHistory = JSON.parse(localStorage.getItem('saleHistory'));
//     const items = JSON.parse(localStorage.getItem('items')); 
//     const sellerTables = document.getElementById('sellerTables');

//     console.log(users); 
//     console.log(saleHistory); 
//     console.log(items);
//     sellerTables.innerHTML = '';

//     const sellers = users.filter(user => user.type === 'seller');
//     sellers.forEach(seller => {
//         const sellerTable = document.createElement('table');
//         sellerTable.classList.add('seller-table');

//         const sellerHeaderRow = `
//             <tr>
//                 <th colspan="2">Seller Information</th>
//             </tr>
//             <tr>
//                 <td>ID:</td>
//                 <td>${seller.id}</td>
//             </tr>
//             <tr>
//                 <td>Username:</td>
//                 <td>${seller.username}</td>
//             </tr>
//             <tr>
//                 <td colspan="2">
//                     <button onclick="deleteSellerAndItems('${seller.id}')">End Contract and Delete Items</button>
//                 </td>
//             </tr>
//         `;
//         sellerTable.innerHTML += sellerHeaderRow;

//         console.log("Sale History:", saleHistory);
//         console.log("Items:", items);

//         const sellerItemsSold = saleHistory.filter(sale => sale.seller === seller.id);
//         sellerItemsSold.forEach(sale => {
//             console.log("Sale:", sale); 
//             const item = items.find(item => item.name === sale.itemName);
//             console.log("Item found:", item); 
        
//             if (item) {
//                 const itemRow = `
//                     <tr>
//                         <td>Item Name:</td>
//                         <td>${sale.itemName}</td>
//                     </tr>
//                     <tr>
//                         <td>Quantity Sold:</td>
//                         <td>${sale.quantity}</td>
//                     </tr>
//                     <tr>
//                         <td>Price:</td>
//                         <td>$${sale.price}</td>
//                     </tr>
//                     <tr>
//                         <td>Remaining Quantity:</td>
//                         <td>${item.quantity}</td>
//                     </tr>
//                 `;
//                 sellerTable.innerHTML += itemRow;
//             }
//         });
        

//         sellerTables.appendChild(sellerTable);
//     });
// });

// function deleteSellerAndItems(sellerId) {
//     const users = JSON.parse(localStorage.getItem('users'));
//     const updatedUsers = users.filter(user => user.id !== sellerId);
//     localStorage.setItem('users', JSON.stringify(updatedUsers));

//     const saleHistory = JSON.parse(localStorage.getItem('saleHistory'));
//     const updatedSaleHistory = saleHistory.filter(sale => sale.seller !== sellerId);
//     localStorage.setItem('saleHistory', JSON.stringify(updatedSaleHistory));

//     const items = JSON.parse(localStorage.getItem('items'));
//     const updatedItems = items.filter(item => item.seller_id !== sellerId);
//     localStorage.setItem('items', JSON.stringify(updatedItems));

//     location.reload();
// }

// chat options 
const options={
    chart:{
        height:450,
        width:'100%',
        type:'bar',
        background: '#f4f4f4',
        foreColor:'#333',
    },
    series:[{
        name: 'purchases',
        data:[123,1234,1223]
    }],
    xaxis:{
        categories:[
            "a",
            "1",
            "V"
        ]
    }
};

//init chart
const chart =new ApexCharts(document.querySelector('#charts'),options);

//render 
chart.render();
