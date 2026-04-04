
  
import { getProviderByClerkId } from "@/app/libs/crud/provider"
import { createUser, deleteUser, getUserByClerkId, updateUser } from "@/app/libs/crud/user"
import { NextRequest, NextResponse } from "next/server"
  
  
  // GET ALL
  export async function PUT(req: NextRequest) {
    try {
      const body = await req.json();
      const { clerkId, imageurl, lastName, firstName, email } = body;
  
      // 1. Check existing records
      const user = await getUserByClerkId(clerkId);
      const provider = await getProviderByClerkId(clerkId);
  
      // 2. Handle Scenario: Neither exists -> Create New User
      if (!provider && !user) {
        try {
          const newUser = await createUser({ email, firstName, lastName, clerkId, imageurl });
          
          // Check if creation actually returned a record
          if (!newUser) {
             return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
          }
  
          return NextResponse.json({ user: 0, status: "created" });
        } catch (dbError) {
          console.error("Database Create Error:", dbError);
          return NextResponse.json({ error: "Database insertion failed" }, { status: 500 });
        }
      }
  
      // 3. Handle Scenario: User already exists
      if (user) {
        return NextResponse.json({ user: 0, status: "exists" });
      }
  
      // 4. Handle Scenario: Provider exists
      return NextResponse.json({ user: 1, status: "is_provider" });
  
    } catch (error) {
      console.error("API Route Error:", error);
      return NextResponse.json({ error: "Invalid request or server error" }, { status: 500 });
    }
  }

    
  // UPDATE
  export async function PATCH(req: NextRequest) {
  
    const body = await req.json()
  
    const { id, ...rest } = body
  
    const data = await updateUser(id, rest)
  
    return NextResponse.json(data)
  }
  
  
  // DELETE
  export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id')
  
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }
  
    await deleteUser(id)
  
    return NextResponse.json({ success: true })
  }