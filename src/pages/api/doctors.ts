import type { NextApiRequest, NextApiResponse } from 'next';
import doctorsData from '@/data/doctors.json'; // Adjust the path if necessary

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { specialty } = req.query;

  if (!specialty || typeof specialty !== 'string') {
    return res.status(400).json({ message: 'Specialty is required and must be a string.' });
  }

  const filteredDoctors = doctorsData.filter(
    (doctor) => doctor.specialty.toLowerCase() === specialty.toLowerCase()
  );

  if (filteredDoctors.length === 0) {
    return res.status(404).json({ message: `No doctors found for ${specialty}` });
  }

  return res.status(200).json(filteredDoctors);
}





     

