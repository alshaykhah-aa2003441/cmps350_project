import ecommerceRepo from '@/app/repo/EcommerceRepo';
export async function GET(request){
    const items=await ecommerceRepo.getItems();
    return Response.json(items)

}