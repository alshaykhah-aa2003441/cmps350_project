import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const itemPath = path.join(process.cwd(), 'app/data/items.json')
const customersPath = path.join(process.cwd(), 'app/data/customer.json')
const sellersPath = path.join(process.cwd(), 'app/data/seller.json')
const adminPath = path.join(process.cwd(), 'app/data/admin.json')
const purchasePath = path.join(process.cwd(), 'app/data/purchase.json')

async function seed() {
    try {
        const items = await fs.readJSON(itemPath)
        const customers = await fs.readJSON(customersPath)
        const sellers = await fs.readJSON(sellersPath)
        const admin = await fs.readJSON(adminPath)
        const purchases = await fs.readJSON(purchasePath)

        for (const customer of customers)
            await prisma.customer.create({data: customer})

        for (const seller of sellers)
            await prisma.seller.create({data: seller})    

        for (const item of items)
            await prisma.item.create({data: item})
        
        for (const ad of admin)
            await prisma.admin.create({data: ad})  
        
        for (const purchase of purchases)
            await prisma.purchase.create({data: purchase})    
            
        console.log('successfully seeded');
    } catch (error) {
        console.log(error);
        return { error: error.message }
    }
}

await seed() 