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
    return Response.json(response, {status: 200})
}