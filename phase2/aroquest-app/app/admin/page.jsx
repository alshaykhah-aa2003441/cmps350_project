'use client'

import styles from "@/public/style.css";
import ecommerceRepo from "@/app/repo/ecommerce-repo";
import React, {useState} from "react";


export default function page() {
  const [selectedStat, setSelectedStat] = useState(null);
  const [stateData, setStatData] = useState(null);

  const handleStatSelection = async (event) => {
    const selectedStat = event.target.value
    alert(selectedStat);
    setSelectedStat(selectedStat)

    switch (selectedStat) {
      case "mostBoughtItems":
          const mostBoughtItem = await ecommerceRepo.getMostPurchasedItem();
          setStatData(mostBoughtItem);
          break;
      case "mostBoughtCustomer":
          const mostPurchasedCustomer = await ecommerceRepo.getCustomerWithMostPurchases();
          setStatData(mostPurchasedCustomer);
          break;
      case "mostsoldSeller":
          const mostSoldSeller = await ecommerceRepo.getSellerWhoSoldMostItems()
          setStatData(mostSoldSeller);
          break;
      case "neverBoughtItems":
          const neverBoughtItems = await ecommerceRepo.getItemsNeverPurchased();
          setStatData(neverBoughtItems)
          break;
      case "neverBoughtItems":
          const neverBoughtCustomer = await ecommerceRepo.getCustomersWhoNeverPurchasedItems();
          setStatData(neverBoughtCustomer)
          break;
      case "allItems":
          const allItems = await ecommerceRepo.getItems();
          setStatData(allItems)
          break;  
    }
  }

// Function to render data based on the selected stat
const renderStatData = () => {
  if (!stateData) return null;

  switch (selectedStat) {
      case "mostBoughtItems":
          return <p>Most Bought Item: {stateData.name}</p>;
      case "mostBoughtCustomer":
          return <p>Most Purchased Customer: {stateData.name}</p>;
      case "mostsoldSeller":
          return <p>Seller with most sold items: {stateData.name}</p>;
      case "neverBoughtItems":
          return <p>Items Never Purchased: {JSON.stringify(stateData)}</p>;
      case "neverBoughtCustomer":
          return <p>Customers who never purchased: {JSON.stringify(stateData)}</p>;
      default:
          return null;
  }
};
  // useEffect(() => {
  //     // Fetch most purchased customer
  //     ecommerceRepo.getCustomerWithMostPurchases().then((customer) => {
  //         setStatData(customer);
  //     });

  //     // Fetch most bought item
  //     ecommerceRepo.getMostPurchasedItem().then((item) => {
  //         setStatData(customer)
  //     });

  //     // Fetch other statistics as needed
  // }, []);

  return (
      <div>
        <header>    
        <div id="ourBrand"  class="brand-container">
            <img src="icons/logo.png" alt="logo" id="logo"/>
            <h1>aro<span class="maroon">Q</span>uest</h1>
        </div>
        <div class="home-btn">
            <a href="index.html">
                <img src="icons/home.svg" alt="Home"/>
            </a>
        </div> 
        </header>
        <main class="admin-container" id="charts">
          <h1>Admin Page</h1>
          <label for="statsDropdown">Select Stat:</label>
          <select id="statsDropdown" onchange={handleStatSelection}>
            <option value="allItems">All Items</option>
            <option value="mostBoughtItems">Most Purchased Item</option>
            <option value="neverBoughtCustomer">Customer Never Purchased</option>
            <option value="mostBoughtCustomer">Most Customer with purchases</option>
            <option value="mostsoldSeller">Seller with most sold ietms</option>
            <option value="neverBoughtItems">Items Never purchased</option>
          </select>
          <div>
              <h2>{selectedStat ? `Selected Stat: ${selectedStat}` : "Please select a stat"}</h2>
              {renderStatData()} {/* Render the selected stat data */}
              {/* {setData ? (
                <p>{JSON.stringify(setData)}</p> // You can render the stat data here
              ) : (  {renderStatData()} 
              Render the selected stat data */}
              {/* // <p>Select a stat to view data</p>)} */}
          </div>
          {/* <div>
              <h2>Most Purchased Customer</h2>
              {mostPurchasedCustomer ? (
                  <p>{mostPurchasedCustomer.name}</p>
              ) : (
                  <p>Loading...</p>
              )}
          </div>
          <div>
              <h2>Most Bought Item</h2>
              {mostBoughtItem ? (
                  <p>{mostBoughtItem.name}</p>
              ) : (
                  <p>Loading...</p>
              )}
          </div> */}

        </main>          
      </div>
  );
}
