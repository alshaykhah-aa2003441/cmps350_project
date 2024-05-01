import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// getItem(id) + getItems()
// updateItem() + deleteItem()
// update/deleteSellerInfo(onDelete/seller item) 
// getPurchase
// addCustomer()
// addItem()

// getItemBySeller()+ getSellerItemCount()
// getCustomerCountofItem()


class EcommerceRepo {
    async getItems(){
        try {
            return prisma.item.findMany()
        } catch (error) {
            return {error: error.message}
        }
    }

    async getItem(itemId){
        try {
            return prisma.item.findFirst({
                where: {itemId}
            })
        } catch (error) {
            return {error: error.message}
        }
    }

    async updateItem(itemId, item){
        try {
            return prisma.item.update({
                where: {itemId},
                data: item
            })
        } catch (error) {
            return {error: error.message}
        }
    }    

    async addItem(item){
        try {
            return prisma.item.create({
                data: {item}
            })
        } catch (error) {
            return {error: error.message}
        }
    }

    async deleteItem(itemId){
        try {
            return prisma.item.delete({
                where: {itemId}
            })
        } catch (error) {
            return {error: error.message}
        }
    }

    // async updateSeller(seller, sellerId){
    //     try {
    //         return prisma.seller.update({
    //             data: {seller},
    //             where: {sellerId}
    //         })
    //     } catch (error) {
    //         return {error: error.message}
    //     }
    // }


}