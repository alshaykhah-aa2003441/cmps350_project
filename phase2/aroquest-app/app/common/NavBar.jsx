import React from 'react'
import styles from '@/app/page.module.css'
import Link from 'next/link'

export default function NavBar({isMainPage}) {
  return (
    <>
      {/* <main className={styles.main}> */}
      <nav id="main-pageNav"> {isMainPage && (
          <><button className={styles.dashboardButton}>
            <Link className={styles.link} href={`/items`}>View Items</Link>
          </button><button className={styles.dashboardButton}>
              <Link className={styles.link} href={`/customers`}>View Customers</Link>
            </button><button className={styles.dashboardButton}>
              <Link className={styles.link} href={`/purchases`}>View Purchases</Link>
            </button></> 
        )} 
      </nav>
      {/* </main> */}
    </>
  )
}
