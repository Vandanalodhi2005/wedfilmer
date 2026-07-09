
import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
  url: string;
  publicId: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema: Schema = new Schema({
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

export default mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);
