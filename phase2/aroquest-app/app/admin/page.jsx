// import styles from "@/app/page.module.css"
'use client'

import styles from "@/public/style.css";
import ecommerceRepo from "@/app/repo/ecommerce-repo";
import React, {useState, useEffect} from "react";


export default function page() {
  async function handleStatSelection(){

  }

  const [mostPurchasedCustomer, setMostPurchasedCustomer] = useState(null);
  const [mostBoughtItem, setMostBoughtItem] = useState(null);
  // Add state variables for other statistics as needed

  useEffect(() => {
      // Fetch most purchased customer
      ecommerceRepo.getCustomerWithMostPurchases().then((customer) => {
          setMostPurchasedCustomer(customer);
      });

      // Fetch most bought item
      ecommerceRepo.getMostPurchasedItem().then((item) => {
          setMostBoughtItem(item);
      });

      // Fetch other statistics as needed
  }, []);

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
          <select id="statsDropdown" onchange={e => handleStatSelection}>
            <option value="allItems">All Items</option>
            <option value="allcustomers">All Customers</option>
            <option value="mostBoughtItems">Most Purchased Item</option>
            <option value="neverBoughtCustomer">Customer Never Purchased</option>
            <option value="mostBoughtCustomer">Most Customer with purchases</option>
            <option value="mostsoldSeller">Seller with most sold ietms</option>
            <option value="neverBoughtItems">Items Never purchased</option>
          </select>
          <div>
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
          </div>

      </main>
          
          {/* Render other statistics as needed */}
      </div>
  );
}