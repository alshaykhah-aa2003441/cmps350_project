import styles from "@/app/page.module.css";
import RootLayout from "./layout";

export default async function Home() {
    const isMainPage = true

  return (
    <RootLayout isMainPage={isMainPage}>

    <body>
        <header>   
        <div id="ourBrand" className={styles.brandContainer}>
           <h1>aro<span className={styles.maroon}>Q</span>uest</h1>
        </div>
          
        </header>
        
    </body> 
    </RootLayout>   
)
}

