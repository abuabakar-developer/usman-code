import { NextApiRequest, NextApiResponse } from 'next'; // Import types
import dbConnect from "@/utils/dbConnect";
import Appointment from "@/models/Appointment";
import mongoose from "mongoose";

// Handler function for handling different HTTP methods (GET, PATCH)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set the response content type to JSON
  res.setHeader("Content-Type", "application/json");

  try {
    // Connect to the database
    await dbConnect();
  } catch (error) {
    // If there's an error connecting to the database
    console.error("Database connection failed:", error);
    return res.status(500).json({ error: "Database connection error" });
  }

  // Destructure the HTTP method from the request
  const { method } = req;

  console.log("Incoming request:", { method: req.method, query: req.query, body: req.body });

  // Switch case based on the HTTP method (GET, PATCH)
  switch (method) {
    case "GET":
      try {
        // Extract the status filter from the query parameters
        const { status } = req.query;

        // Ensure status is a valid string and not an array
        if (!status || Array.isArray(status) || !["scheduled", "pending", "canceled"].includes(status)) {
          return res.status(400).json({ error: "Invalid or missing status filter" });
        }

        // Fetch appointments based on the status filter
        const appointments = await Appointment.find({ status });
        return res.status(200).json(appointments); // Return the appointments

      } catch (error) {
        // If there's an error fetching appointments
        console.error("Error fetching appointments:", error);
        return res.status(500).json({ error: "Internal server error while fetching appointments" });
      }

    case "PATCH":
      try {
        // Extract appointment ID and status from the request
        let { id } = req.query;
        const { status } = req.body;

        // Ensure id is a string (if it's an array, pick the first element)
        if (Array.isArray(id)) {
          id = id[0]; // Take the first element if it's an array
        }

        // Validate the ID and status
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid or missing appointment ID" });
        }
        if (!status || !["scheduled", "pending", "canceled"].includes(status)) {
          return res.status(400).json({ error: "Invalid or missing status value" });
        }

        // Update the appointment's status
        const updatedAppointment = await Appointment.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );

        // If appointment not found
        if (!updatedAppointment) {
          return res.status(404).json({ error: "Appointment not found" });
        }

        // Return the updated appointment
        return res.status(200).json(updatedAppointment);

      } catch (error) {
        // If there's an error updating the appointment
        console.error("Error updating appointment:", error);
        return res.status(500).json({ error: "Internal server error while updating appointment" });
      }

    default:
      // If the HTTP method is not allowed (e.g., DELETE, PUT)
      return res.status(405).json({ error: `Method ${method} not allowed` });
  }
}



