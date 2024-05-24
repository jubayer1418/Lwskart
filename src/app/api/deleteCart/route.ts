import { Cart } from "@/model";
import { dbConnect } from "@/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  const { userId } = await request.json();


  try {
    await Cart.deleteMany({ customerId: userId });
    return NextResponse.json(
      { message: "Cart cleared successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json(
      { message: "Error clearing cart", error },
      { status: 500 }
    );
  }
}
