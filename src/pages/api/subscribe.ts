import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import Subscriber from "../../models/Subscriber";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();    
                             
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    try {
      const existingSubscriber = await Subscriber.findOne({ email });

      if (existingSubscriber) {
        return res.status(200).json({ message: "You are already subscribed!" });
      }
                             
      const newSubscriber = new Subscriber({ email });
      await newSubscriber.save();
                              
      return res.status(201).json({ message: "Thank you for subscribing!" });
    } catch (error) {     
      console.error("Error saving subscriber:", error); // Log the error for debugging
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}










