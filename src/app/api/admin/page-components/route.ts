import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/app/libs/prisma'

import {getPageComponents,createPageComponent,updatePageComponentPositions,deletePageComponent,} from '@/app/libs/crud/pageComponent'
  

// --------------------------------
// GET
// --------------------------------

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const page = searchParams.get('page')

    if (!page) {
      return NextResponse.json(
        {
          error: 'Page is required',
        },
        {
          status: 400,
        }
      )
    }

    const components = await getPageComponents(page)

    return NextResponse.json(components)
  } catch (error) {
    console.error('GET /api/admin/page-components error:',error)

    return NextResponse.json(
      {
        error: 'Failed to load page components',
      },
      {
        status: 500,
      }
    )
  }
}

// --------------------------------
// POST
// --------------------------------

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const page = body?.page
    const component = body?.component

    if (
      typeof page !== 'string' || !page.trim()
    ) {
      return NextResponse.json(
        {
          error: 'Page is required',
        },
        {
          status: 400,
        }
      )
    }

    if (
      typeof component !== 'string' || !component.trim()) {
      return NextResponse.json(
        {
          error: 'Component is required',
        },
        {
          status: 400,
        }
      )
    }

    const normalizedPage = page.trim()
    const normalizedComponent = component.trim()

  

    // --------------------------------
    // GET CURRENT COMPONENTS
    // --------------------------------

    const currentComponents =await getPageComponents(normalizedPage)

    const position = currentComponents.length

    // --------------------------------
    // CREATE
    // --------------------------------

    const created = await createPageComponent(normalizedPage,normalizedComponent,position)

    return NextResponse.json(created, {
      status: 201,
    })
  } catch (error) {
    console.error(
      'POST /api/admin/page-components error:',
      error
    )

    return NextResponse.json(
      {
        error: 'Failed to add page component',
      },
      {
        status: 500,
      }
    )
  }
}

// --------------------------------
// PUT
// --------------------------------

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    const page = body?.page
    const components = body?.components

    if (
      typeof page !== 'string' ||
      !page.trim()
    ) {
      return NextResponse.json(
        {
          error: 'Page is required',
        },
        {
          status: 400,
        }
      )
    }

    if (!Array.isArray(components)) {
      return NextResponse.json(
        {
          error: 'Components must be an array',
        },
        {
          status: 400,
        }
      )
    }

    const normalizedComponents = components.map(
      (component, index) => ({
        id: component.id,
        position: index,
      })
    )

    const updated =
      await updatePageComponentPositions(
        page.trim(),
        normalizedComponents
      )

    return NextResponse.json(updated)
  } catch (error) {
    console.error(
      'PUT /api/admin/page-components error:',
      error
    )

    return NextResponse.json(
      {
        error: 'Failed to save page layout',
      },
      {
        status: 500,
      }
    )
  }
}

// --------------------------------
// DELETE
// --------------------------------

export async function DELETE(
  request: NextRequest
) {
  try {
    const { searchParams } = new URL(request.url)

    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        {
          error: 'Component id is required',
        },
        {
          status: 400,
        }
      )
    }

    await deletePageComponent(id)

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(
      'DELETE /api/admin/page-components error:',
      error
    )

    return NextResponse.json(
      {
        error: 'Failed to remove page component',
      },
      {
        status: 500,
      }
    )
  }
}