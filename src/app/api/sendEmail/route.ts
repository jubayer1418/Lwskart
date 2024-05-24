import { generateInvoiceHTMLTable } from "@/utils/generateInvoice";
import { sendEmailWithAttachment } from "@/utils/sendEmailWithAttachment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  const { to, subject, text } = data;
  console.log(to, subject, text);
  try {
    const invoiceHTMLTable = generateInvoiceHTMLTable(data.categories, data.totalPrice);
    const response =await sendEmailWithAttachment({
      to,
      subject,
      text,
      invoiceHTMLTable,
    });
    console.log(response)
    return NextResponse.json(
      { message: "Email send successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
