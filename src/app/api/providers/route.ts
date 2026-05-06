import {
    createProvider,
    getAllProviders,
    updateProvider,
    deleteProvider,
  } from "@/app/libs/crud/provider"
import { clerkClient } from "@clerk/nextjs/server"
  
  import { NextRequest, NextResponse } from "next/server"
  
  
  // GET ALL
  export async function GET() {
  
    const data = await getAllProviders()
  
    return NextResponse.json(data)
  }
  
  
  // CREATE
  export async function POST(req: NextRequest) {
  
    const body = await req.json()
    const clerkUser = await clerkClient.users.createUser({
      emailAddress: [body.email],
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
    })
    const data = await createProvider({...body,clerkId:clerkUser.id})
  
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