'use client'
import React, { useState, useEffect } from 'react'
import styles from "@/app/page.module.css"
import ecommerceRepo from '@/app/repo/ecommerce-repo'

export default function Items() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true) //add loading state

    // async function handleLoadItems() {
    //     const response = await fetch(`/api/items`)
    //     setItems(await response.json())
    // }
    useEffect(() => {
        const fetchItems = async () => {
          try {
            const res = await fetch('/api/items');
            if (!res.ok) {
              throw new Error('Failed to fetch items');
            }
            const data = await res.json();
            setItems(data);
            setLoading(false)
          } catch (error) {
            console.error(error);
            setLoading(false)
          }
        };
        fetchItems();
      }, []);
      
  return (
    <>
    <header>   
        <div id="ourBrand"  className={styles.brandContainer}>
          {/* <img src="icons/logo.png" alt="logo" id="home-logo"/> */}
          <h1>aro<span className={styles.maroon}>Q</span>uest</h1>
        </div>
        </header>
    <main className={styles.main}>
        <h1 className={styles.sellerContainerh1}>Items</h1>
        {loading ? (
                <p>Loading...</p> // Display loading indicator while data is being fetched
        ) : (  
        <table id="items" className={styles.itemsTable}> 
            <thead>
                <tr>
                    <th className={styles.th}>Item Id</th>
                    <th className={styles.th}>Item Name</th>
                    <th className={styles.th}>Available Quantity</th>
                    <th className={styles.th}>Price</th>
                    <th className={styles.th}>Seller Id</th>
                        {/* <th>Image</th> */}
                    {/* <th>Purchases</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map(item => 
                            <tr>
                                <td className={styles.td}>{item.id}</td>
                                <td className={styles.td}>{item.name}</td>
                                <td className={styles.td}>{item.quantity}</td>
                                <td className={styles.td}>{item.price} QR</td>
                                <td className={styles.td}>{item.seller_id}</td>
                                {/* <td>{item.image}</td> */}
                                <td>{}</td>
                            </tr>
                        )   
                    } 
                </tbody>
        </table>
        )}
    </main>
    </>
  )
}
