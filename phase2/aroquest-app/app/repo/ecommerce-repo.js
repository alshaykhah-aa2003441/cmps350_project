import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// import fs from 'fs';


class EcommerceRepo {
    async getItems(){
        try {
            return prisma.item.findMany()
        } catch (error) {
            return {error: error.message}
        }
    }

    async getItemById(id){
        try {
            return prisma.item.findUnique({
                where: {
                    id: parseInt(id)
                }
            })
        } catch (error) {
            return {error: error.message}
        }
    }

    async getItemByName(name){
        try {
            return prisma.item.findUnique({
                where: {
                    name: name
                }
            })
        } catch (error) {
            return {error: error.message}
        }
    }

    async updateItem(id, item){
        try {
            return prisma.item.update({
                where: {
                    id: parseInt(id)
                },
                data: item
            })
        } catch (error) {
            return {error: error.message}
        }
    }    

    async addItem(item){
        try {
            return prisma.item.create({
                data: item
            })
        } catch (error) {
            return {error: error.message}
        }
    }

    async deleteItem(id){
        try {
            return prisma.item.delete({
                where: {
                    id: parseInt(id)
                }
            })
        } catch (error) {
            return {error: error.message}
        }
    }

    async getItemsBySellerId(seller_id) {
        try {
            return prisma.item.findMany({
                where: {
                    seller_id: parseInt(seller_id)
                }
            });
        } catch (error) {
            return { error: error.message };
        }
    }
     
    async addPurchase(purchase){
        try {
            return prisma.purchase.create({
                data: purchase
            })
        } catch (error) {
            return {error: error.message}
        }
    }

    async getPurchasesBySellerId(sellerId) {
        try {
            return prisma.purchase.findMany({
                where: {
                    sellerId: parseInt(sellerId)
                }
            });
        } catch (error) {
            return { error: error.message };
        }
    }

    async getPurchases() {
        try {
            return prisma.purchase.findMany();
        } catch (error) {
            return { error: error.message };
        }
    }

    async getPurchaseById(id) {
        try {
            return prisma.purchase.findMany({
                where: {
                    id: parseInt(id)
                }
            });
        } catch (error) {
            return { error: error.message };
        }
    }

    async getPurchasesByCustomer(buyerId){
        try {
            return prisma.purchase.findMany({
                where: {
                    buyerId: parseInt(buyerId)
                }
            });
        } catch (error) {
            return { error: error.message };
        }
    }

    async getPurchasesByItemId(itemId){
        try {
            return prisma.purchase.findMany({
                where: {
                    itemId: parseInt(itemId)
                }
            });
        } catch (error) {
            return { error: error.message };
        }
    }

    async getTotalPurchaseAmountByCustomer(buyerId) {
        try {
            return prisma.purchase.aggregate({
                where: {
                    buyerId: parseInt(buyerId)
                },
                _sum: {
                    price: true
                }
            });
        } catch (error) {
            return { error: error.message };
        }
    }

    // get purchases by Customer => count of all purchases 
    async getCountOfPurchasesByCustomer(buyerId){
        try {
            return prisma.purchase.aggregate({
                _count: {_all: true},
                where: {buyerId: parseInt(buyerId)}
            })
        } catch (error) {
            return {error: error.message}
        }
    }
    
    async getCountOfPurchasesByItemId(itemId){
        try {
            return prisma.purchase.aggregate({
                _count: {_all: true},
                where: {itemId: parseInt(itemId)}
            })
        } catch (error) {
            return {error: error.message}
        }
    }

    async getCustomerByUsername(username) {
        try {
            return prisma.customer.findUnique({
                where: {
                    username
                }
            });
        } catch (error) {
            return { error: error.message };
        }
    }

    async getCustomers() {
        try {
            return prisma.customer.findMany();
        } catch (error) {
            return { error: error.message };
        }
    }

    async addCustomer(customer){
        try {
            return prisma.customer.create({
                data: customer
            })
        } catch (error) {
            return {error: error.message}
        }
    }
    
    async getTotalItemCount(){
        try {
            return prisma.item.aggregate({
                _count: {_all: true}
            })
        } catch (error) {
            return {error: error.message}
        }
    }

    async getMostPurchasedItem(){
        try {
            const purchases = await prisma.purchase.groupBy({
                by: ['itemId'],
                _count: {
                    _all: true
                }
            });
            const mostBoughtItemId = purchases.reduce((prev, current) =>
                prev._count._all > current._count._all ? prev : current
            ); 
            return await prisma.item.findUnique({
                where: {
                    id: mostBoughtItemId.itemId
                }
            });
            // return prisma.purchase.groupBy({
            //     by: ['itemId'],
            //     _count: {_all: true},
            //     where: {
                    
            //     }
            // })
        } catch (error) {
            return {error: error.message}
        }
    }    

    async getItemsNeverPurchased() {
        try {
            const allItems = await prisma.item.findMany();
            const purchases = await prisma.purchase.findMany();
            const purchasedItemIds = new Set(purchases.map(purchase => purchase.itemId));
            const itemsNeverPurchased = allItems.filter(item => !purchasedItemIds.has(item.id));
            
            return itemsNeverPurchased;
        } catch (error) {
            return { error: error.message };
        }
    }

    async getCustomerWithMostPurchases(){
        try {
            const purchases = await prisma.purchase.groupBy({
                by: ['buyerId'],
                _count: {
                    _all: true
                }
            });
            const mostPurchasedCustomerId = purchases.reduce((prev, current) =>
                prev._count._all > current._count._all ? prev : current
            ); 
            return await prisma.customer.findUnique({
                where: {
                    id: mostPurchasedCustomerId.buyerId
                }
            });
        } catch (error) {
            return {error: error.message}
        }
    } 

    async getCustomersWhoNeverPurchasedItems() {
        try {
            const allCustomers = await prisma.customer.findMany();
            const purchases = await prisma.purchase.findMany();
            const purchasedItemIds = new Set(purchases.map(purchase => purchase.itemId));
            const customersWhoNeverPurchased = allCustomers.filter(customer => {
                const customerPurchasedItemIds = new Set(purchases.filter(purchase => purchase.buyerId === customer.id).map(purchase => purchase.itemId));
                return ![...customerPurchasedItemIds].some(itemId => purchasedItemIds.has(itemId));
            });
            
            return customersWhoNeverPurchased;
        } catch (error) {
            return { error: error.message };
        }
    }

    async getSellerWhoSoldMostItems() {
        try {
            const allItems = await prisma.item.findMany();
            const itemCountsBySeller = allItems.reduce((acc, item) => {
                acc[item.sellerId] = (acc[item.sellerId] || 0) + 1;
                return acc;
            }, {});
    
            const sellerWithMostItems = Object.keys(itemCountsBySeller).reduce((a, b) => itemCountsBySeller[a] > itemCountsBySeller[b] ? a : b);
            const seller = await prisma.seller.findUnique({ where: { id: parseInt(sellerWithMostItems) } });
    
            return seller;
        } catch (error) {
            return { error: error.message };
        }
    }
    


    // async saveUser(userData) {
    //     try {
    //         // Read existing users data from users.json
    //         let usersData = [];
    //         try {
    //             usersData = JSON.parse(fs.readFileSync('users.json'));
    //         } catch (error) {
    //             console.error('Error reading users data:', error);
    //             // If file doesn't exist or cannot be parsed, initialize with empty array
    //             usersData = [];
    //         }
    
    //         // Ensure ID uniqueness (Example: finding max ID and incrementing)
    //         const maxId = usersData.length > 0 ? Math.max(...usersData.map(user => user.id)) : 0;
    //         userData.id = maxId + 1;
    
    //         // Add new user to the array
    //         usersData.push(userData);
    
    //         // Write updated users data back to users.json
    //         fs.writeFileSync('users.json', JSON.stringify(usersData, null, 2));
    
    //         return { success: true, message: 'User saved successfully.', user: userData };
    //     } catch (error) {
    //         console.error('Error saving user:', error);
    //         return { success: false, error: 'Failed to save user.' };
    //     }
    // }

}

export default new EcommerceRepo()


    // async updateSeller(seller, sellerId){
    //          try {
    //             return prisma.seller.update({
    //                 data: {seller},
    //                 where: {sellerId}
    //             })
    //         } catch (error) {
    //             return {error: error.message}
    //         }
    // }

// getSellerItemCount()

// get the item that the customer purchased => getPurchasesByCustomer + getPurchasesByItem