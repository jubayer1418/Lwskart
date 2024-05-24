import nodemailer from "nodemailer";

export async function sendEmailWithAttachment({
  to,
  subject,
  text,
  invoiceHTMLTable,
}: {
  to: string;
  text: string;
  subject: string;
  invoiceHTMLTable: any;
}) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transport.verify();

    console.log(testResult);
  } catch (error) {
    console.error({ error });
    return;
  }

  try {
    let mailOptions = {
      from: SMTP_EMAIL,
      to: to,
      subject: subject,

      text: text,

      html: `
      <p>Thank you for your purchase!</p>
    
      ${invoiceHTMLTable}
    `,
    };
    const sendResult = transport.sendMail(mailOptions as any);
    console.log(await sendResult);
  } catch (error) {
    console.log(error);
  }
}
