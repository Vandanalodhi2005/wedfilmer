
import mongoose, { Schema, Document } from 'mongoose';

export interface IImage extends Document {
  url: string;
  publicId: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema: Schema = new Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Wedding', 'Pre-Wedding', 'Corporate', 'Family'] 
  },
}, {
  timestamps: true
});

export default mongoose.models.Image || mongoose.model<IImage>('Image', ImageSchema);
