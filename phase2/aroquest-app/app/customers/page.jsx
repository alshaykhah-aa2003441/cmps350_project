'use client'
import React, { useState, useEffect } from 'react'
import styles from "@/app/page.module.css"

export default function Customers() {
    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(true) //add loading state
    useEffect(() => {
        const fetchCustomers = async () => {
          try {
            const res = await fetch('/api/customers');
            if (!res.ok) {
              throw new Error('Failed to fetch customers');
            }
            const data = await res.json();
            console.log('Fetched customers: ', data);
            setCustomers(data);
            setLoading(false)
          } catch (error) {
            console.error(error);
            setLoading(false)
          }
        };
        console.log("Fetching customers..");
        fetchCustomers();
      }, []);
      console.log("rendering customers..");
  return (
    <div>
        <header>   
        <div id="ourBrand"  className={styles.brandContainer}>
          <h1>aro<span className={styles.maroon}>Q</span>uest</h1>
        </div>
        </header>
        <main className={styles.main}>
        <h1 className={styles.sellerContainerh1}>Customers</h1> 
        {loading ? (
                <p>Loading...</p> // Display loading indicator while data is being fetched
            ) : (  
        <table id="customers" className={styles.itemsTable}> 
            <thead>
                <tr>
                    <th className={styles.th}>Customer Id</th>
                    <th className={styles.th}>Customer Name</th>
                    <th className={styles.th}>Username</th>
                    <th className={styles.th}>Balance</th>
                    <th className={styles.th}>Shipping Address</th>
                </tr>
            </thead>
            <tbody>
                {customers.map(customer => 
                    <tr>
                        <td className={styles.td}>{customer.id}</td>
                        <td className={styles.td}>{customer.name} {customer.surname}</td>
                        <td className={styles.td}>{customer.username}</td>
                        <td className={styles.td}>{customer.balance}</td>
                        <td className={styles.td}>{customer.shipping_address}</td>
                    </tr>
                )}            
            </tbody>
        </table>
            )}
        </main>    
    </div>
  )
}
