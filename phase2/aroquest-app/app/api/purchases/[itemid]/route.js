import ecommerceRepo from "@/app/repo/ecommerce-repo"

export async function GET(request, {params}){
    const itemId = params.itemId
    // const totalPurchase = await ecommerceRepo.getTotalPurchaseAmountByCustomer(buyerId)
    const countOfPurchases = await ecommerceRepo.getCountOfPurchasesByItemId(itemId)
    // const info = {totalPurchase, countOfPurchases}
    return Response.json(countOfPurchases, {status: 200})
}