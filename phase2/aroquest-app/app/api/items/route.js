import ecommerceRepo from "@/app/repo/ecommerce-repo"

export async function GET(request){
    const { searchParams } = new URL(request.url)
    const sellerId = searchParams.get('seller_id')
    let response
    if (sellerId){
        response = await ecommerceRepo.getItemsBySellerId(sellerId) 
    } else{
        response = await ecommerceRepo.getItems()        
    }

    // const items = await ecommerceRepo.getTotalItemCount()
    // return Response.json(items, {status: 200})
    return Response.json(response, {status: 200})
}

export async function POST(request){
    const item = await request.json()
    const newItem = await ecommerceRepo.addItem(item)
    return Response.json(newItem, {status: 200})
}