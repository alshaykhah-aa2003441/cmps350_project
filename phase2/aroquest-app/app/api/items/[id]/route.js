import ecommerceRepo from "@/app/repo/ecommerce-repo"

export async function GET(request, {params}){
    const id = params.id
    const item = await ecommerceRepo.getItemById(id)
    return Response.json(item, {status: 200})
}

export async function PUT(request, {params}){
    const id = params.id
    const item = await request.json()
    const updatedItem = await ecommerceRepo.updateItem(id, item)
    return Response.json(updatedItem, {status: 201})
}

export async function DELETE(request, {params}){
    const id = params.id
    const item = await ecommerceRepo.deleteItem(id)
    return Response.json(item, {status: 200})
}