
import { createService, deleteService, getAllServices, updateService } from "@/app/libs/crud/service"
  
  import { NextRequest, NextResponse } from "next/server"
  
  
  // GET ALL
  export async function GET() {
  
    const data = await getAllServices()
  
    return NextResponse.json(data)
  }
  
  
  // CREATE
  export async function POST(req: NextRequest) {
  
    const body = await req.json()
  
    const data = await createService(body)
  
    return NextResponse.json(data)
  }
  
  
  // UPDATE
  export async function PATCH(req: NextRequest) {
  
    const body = await req.json()
  
    const { id, ...rest } = body
  
    const data = await updateService(id, rest)
  
    return NextResponse.json(data)
  }
  
  
  // DELETE
  export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id')
  
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }
  
    await deleteService(id)
  
    return NextResponse.json({ success: true })
  }