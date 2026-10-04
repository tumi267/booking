import { updatebookingbyday } from "@/app/libs/crud/booking";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest){
    const body=await req.json();
    const{groupId,slots,times,date,status,providerId}=body
    
    updatebookingbyday(groupId,slots,date,status,providerId)

    return NextResponse.json(body)
}