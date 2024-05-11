import ecommerceRepo from "@/app/repo/ecommerce-repo"

export async function GET(request){
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username')
    let response
    if (username){
        response = await ecommerceRepo.getCustomerByUsername(username) 
    } else{
        response = await ecommerceRepo.getCustomers()        
    }
    const customer = await ecommerceRepo.getCustomerWithMostPurchases()
    console.log(customer);

    // const customerr = await ecommerceRepo.getCustomerNeverPurchased()
    // console.log(customerr);
    return Response.json(response, {status: 200})
}