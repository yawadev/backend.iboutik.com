import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;
const host = process.env.EMAIL_HOST;
export const transporter = nodemailer.createTransport({
  host: host,
  port: 587,
  auth: {
    user: email,
    pass,
  },
});

export const mailOptions = {
  from: email,
  to: email,
};
