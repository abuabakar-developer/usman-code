import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  try {
    // Send SMS to the owner
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: "+923154195240", 
    });

    res.status(200).json({ success: true, message: "SMS sent to owner successfully!" });
  } catch (error) {
    console.error("Twilio Error:", error);
    res.status(500).json({ success: false, error: "Failed to send SMS to the owner." });
  }
}




