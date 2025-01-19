import { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import path from "path";
import fs from "fs";

// Disable Next.js's default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

interface MedicineOrder {
  medicines: string;
  prescription: string | null; // Path to saved file
  address: string;
  mobile: string;
  patientName: string;
  city: string;
}

const medicineHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Configure formidable
  const form = formidable({
    multiples: false,
    uploadDir: path.join(process.cwd(), "/public/uploads"),
    keepExtensions: true,
    filename: (name, ext) => {
      const timestamp = Date.now();
      return `${name}-${timestamp}${ext}`;
    },
  });

  // Ensure the upload directory exists
  const uploadDir = path.join(process.cwd(), "/public/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(500).json({ message: "Error processing request" });
    }

    // Safely parse form fields
    const address =
      Array.isArray(fields.address)
        ? fields.address.join(", ")
        : typeof fields.address === "string"
        ? fields.address
        : "";

    const mobile =
      Array.isArray(fields.mobile)
        ? fields.mobile[0]
        : typeof fields.mobile === "string"
        ? fields.mobile
        : "";

    const patientName =
      Array.isArray(fields.patientName)
        ? fields.patientName[0]
        : typeof fields.patientName === "string"
        ? fields.patientName
        : "";

    const city =
      Array.isArray(fields.city)
        ? fields.city[0]
        : typeof fields.city === "string"
        ? fields.city
        : "";

    const medicinesValue = Array.isArray(fields.medicines)
      ? fields.medicines.join(", ")
      : typeof fields.medicines === "string"
      ? fields.medicines
      : "";

    // Ensure at least medicines or prescription is provided
    if (!medicinesValue && !files.prescription) {
      return res.status(400).json({
        message: "Please provide medicines or upload a prescription.",
      });
    }

    // Safely handle the prescription file
    const prescriptionFile = files.prescription as File | undefined;
    const prescriptionPath = prescriptionFile
      ? `/uploads/${prescriptionFile.newFilename}`
      : null;

    // Construct the MedicineOrder object
    const order: MedicineOrder = {
      medicines: medicinesValue,
      prescription: prescriptionPath,
      address,
      mobile,
      patientName,
      city,
    };

    console.log("Order received:", order);

    // Here, you can save the `order` to a database or perform other logic.
    res.status(200).json({ message: "Order submitted successfully", order });
  });
};

export default medicineHandler;



