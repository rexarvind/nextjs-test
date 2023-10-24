import mongoose, { Schema, model, models } from 'mongoose'

const NoteSchema = new Schema({
    title: { type: String, required: true },
    content: {type: String},
    isPublic: {type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedAt: { type: Date, default: Date.now },
});

NoteSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Note = models?.Note || model('Note', NoteSchema);

