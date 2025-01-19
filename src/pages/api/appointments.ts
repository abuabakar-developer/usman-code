import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import Appointment from '@/models/Appointment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const appointment = await Appointment.create(req.body);
      res.status(201).json({ id: appointment._id });
    } catch (error) {
      console.error('Error saving appointment:', error); // Log the error for debugging
      res.status(500).json({ error: 'Failed to save appointment.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}



