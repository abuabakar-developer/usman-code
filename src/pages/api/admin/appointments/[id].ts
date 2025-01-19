import { NextApiRequest, NextApiResponse } from 'next'; // Import types
import dbConnect from "@/utils/dbConnect";
import Appointment from "@/models/Appointment";
import mongoose from "mongoose";

// Define the handler function with correct types
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Content-Type", "application/json");

  try {
    // Connect to the database
    await dbConnect();
  } catch (error) {
    // If there's an error connecting to the database
    console.error("Database connection failed:", error);
    return res.status(500).json({ error: "Database connection error" });
  }

  const { method } = req;
  let { id } = req.query; // Destructure the 'id' from query parameters

  console.log("Incoming request:", { method, id, body: req.body });

  // If 'id' is an array, extract the first element
  if (Array.isArray(id)) {
    id = id[0];
  }

  // Ensure that id is a valid ObjectId (now it will be a string, not an array)
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid or missing appointment ID" });
  }

  switch (method) {
    case "GET":
      try {
        const appointment = await Appointment.findById(id);
        if (!appointment) {
          return res.status(404).json({ error: "Appointment not found" });
        }
        return res.status(200).json(appointment);
      } catch (error) {
        console.error("Error fetching appointment:", error);
        return res.status(500).json({ error: "Internal server error while fetching appointment" });
      }

    case "PATCH":
      try {
        const { status } = req.body;

        if (!status || !["scheduled", "pending", "canceled"].includes(status)) {
          return res.status(400).json({ error: "Invalid or missing status value" });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );

        if (!updatedAppointment) {
          return res.status(404).json({ error: "Appointment not found" });
        }

        return res.status(200).json(updatedAppointment);
      } catch (error) {
        console.error("Error updating appointment:", error);
        return res.status(500).json({ error: "Internal server error while updating appointment" });
      }

    default:
      return res.status(405).json({ error: `Method ${method} not allowed` });
  }
}




