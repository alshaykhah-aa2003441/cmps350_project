import ecommerceRepo from "@/app/repo/ecommerce-repo"

export async function GET(request){
    const { searchParams } = new URL(request.url)
    let filterType = [...searchParams.keys()][0]
    let value = searchParams.get(filterType)

    let response
    switch (filterType){
        case 'items':
            response = await ecommerceRepo.getItems() 
            break;
        case 'mostBoughtItems':
            response = await ecommerceRepo.getMostPurchasedItem()
            break;
        case 'mostBoughtCustomer':
            response = await ecommerceRepo.getCustomerWithMostPurchases()
            break;    
        case 'neverBoughtCustomer':
            response = await ecommerceRepo.getCustomersWhoNeverPurchasedItems()
            break;
        case 'mostsoldSeller':
            response = await ecommerceRepo.getSellerWhoSoldMostItems()
            break;    
        case 'neverBoughtItems':
            response = await ecommerceRepo.getItemsNeverPurchased()
            break;  
        default:
            response = await ecommerceRepo.getCustomerWithMostPurchases()
    }

    return Response.json(response, {status: 200})
}