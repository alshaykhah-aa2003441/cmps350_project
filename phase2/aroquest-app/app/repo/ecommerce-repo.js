import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

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
    
    async getTotalItemCount(){
        try {
            return prisma.item.aggregate({
                _count: {_all: true}
            })
        } catch (error) {
            return {error: error.message}
        }
    }

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
}

export default new EcommerceRepo()




// getSellerItemCount()
// addCustomer()
// update/deleteSellerInfo(onDelete/seller item) 

// get the item that the customer purchased => getPurchasesByCustomer + getPurchasesByItem