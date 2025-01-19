import { Schema, model, models } from 'mongoose';

interface IDoctor {
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  imageUrl: string;
}

const doctorSchema = new Schema<IDoctor>({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: String, required: true },
  rating: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const Doctor = models.Doctor || model<IDoctor>('Doctor', doctorSchema);
export default Doctor;


