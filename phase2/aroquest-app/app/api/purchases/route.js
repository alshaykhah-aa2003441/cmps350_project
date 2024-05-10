import ecommerceRepo from "@/app/repo/ecommerce-repo"

export async function GET(request){
    const { searchParams } = new URL(request.url)
    let filterType = [...searchParams.keys()][0]
    let value = searchParams.get(filterType)
    // console.log(`The filter is ${filterType} and the value is ${value}`);

    let response
    switch (filterType){
        case 'sellerId':
            response = await ecommerceRepo.getPurchasesBySellerId(value)
            break;
        case 'id':
            response = await ecommerceRepo.getPurchaseById(value)
            break;
        case 'buyerId':
            response = await ecommerceRepo.getPurchasesByCustomer(value)
            break;
        case 'itemId':
            response = await ecommerceRepo.getPurchasesByItemId(value)
            break;    
        default:
            response = await ecommerceRepo.getPurchases()           
    }

    return Response.json(response, {status: 200})
}

export async function POST(request){
    const purchase = await request.json()
    const newPurchase = await ecommerceRepo.addPurchase(purchase)
    return Response.json(newPurchase, {status: 200})
}