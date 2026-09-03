import { NextResponse } from 'next/server'
import { getAdminKpis } from '@/app/libs/crud/KPI/KPI'

export async function GET() {
  try {
    const stats = await getAdminKpis()

    return NextResponse.json(stats)
  } catch (error) {
    console.error(
      'Failed to load admin KPIs:',
      error
    )

    return NextResponse.json(
      {
        error: 'Failed to load KPIs',
      },
      { status: 500 }
    )
  }
}