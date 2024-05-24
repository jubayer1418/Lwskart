import { NextRequest, NextResponse } from 'next/server';

import { CheckoutModel } from '@/model';
import { dbConnect } from '@/server';


export async function POST(request: NextRequest) {
  await dbConnect();
  const data = await request.json();


  try {
    const checkout = new CheckoutModel(data);
    await checkout.save();
    return NextResponse.json({ message: 'Checkout saved successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error saving checkout', error }, { status: 500 });
  }
}
