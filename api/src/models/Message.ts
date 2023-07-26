import mongoose, { Schema, model } from 'mongoose';

const MessageSchema = new Schema(
  {
    senderId: { type: mongoose.Types.ObjectId, required: true },
    recipientId: { type: mongoose.Types.ObjectId, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const MessageModel = model('Message', MessageSchema);
export default MessageModel;
