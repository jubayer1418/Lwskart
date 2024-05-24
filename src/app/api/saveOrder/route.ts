import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/server";
import { Order } from "@/model";

export async function POST(request: NextRequest) {
  await dbConnect();
  const data = await request.json();

  try {
    const order = new Order(data);
 await order.save();

    return NextResponse.json(
      { message: "Order saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error saving order", error },
      { status: 500 }
    );
  }
}
