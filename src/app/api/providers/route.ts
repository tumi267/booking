import {
    createProvider,
    getAllProviders,
    updateProvider,
    deleteProvider,
  } from "@/app/libs/crud/provider"
  
  import { NextRequest, NextResponse } from "next/server"
  
  
  // GET ALL
  export async function GET() {
  
    const data = await getAllProviders()
  
    return NextResponse.json(data)
  }
  
  
  // CREATE
  export async function POST(req: NextRequest) {
  
    const body = await req.json()
  
    const data = await createProvider(body)
  
    return NextResponse.json(data)
  }
  
  
  // UPDATE
  export async function PATCH(req: NextRequest) {
  
    const body = await req.json()
  
    const { id, ...rest } = body
  
    const data = await updateProvider(id, rest)
  
    return NextResponse.json(data)
  }
  
  
  // DELETE
  export async function DELETE(req: NextRequest) {
  
    const body = await req.json()
  
    const { id } = body
  
    const data = await deleteProvider(id)
  
    return NextResponse.json(data)
  }