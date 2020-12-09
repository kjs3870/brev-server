import * as nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export default function sendEmail(
  to: string,
  content: number | string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const nodemailerOptions = {
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASS,
      },
    };

    const transporter = nodemailer.createTransport(nodemailerOptions);

    const mailOptions = {
      from: "czenpage <czenpage@gmail.com>",
      to,
      subject: "nodemailer test email",
      html: `<p>${content}</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) reject(err);
      else {
        transporter.close();
        resolve(true);
      }
    });
  });
}
