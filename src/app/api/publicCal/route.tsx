import { getOperatingHours } from "@/app/libs/crud/operatingHours";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
   
    const gethours=await getOperatingHours()
   
    return NextResponse.json({gethours})
}