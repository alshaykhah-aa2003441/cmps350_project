import ecommerceRepo from "@/app/repo/ecommerce-repo"

export async function GET(request){
    const { searchParams } = new URL(request.url)
    let filterType = [...searchParams.keys()][0]
    let value = searchParams.get(filterType)

    let response
    switch (filterType){
        case 'seller_id':
            response = await ecommerceRepo.getItemsBySellerId(value) 
            break;
        case 'name':
            response = await ecommerceRepo.getItemByName(value)
            break;
        default:
            response = await ecommerceRepo.getItems() 
    }
    const item = await ecommerceRepo.getMostPurchasedItem()
    console.log(item);

    // const items = await ecommerceRepo.getTotalItemCount()
    // return Response.json(items, {status: 200})
    return Response.json(response, {status: 200})
}

export async function POST(request){
    const item = await request.json()
    const newItem = await ecommerceRepo.addItem(item)
    return Response.json(newItem, {status: 200})
}