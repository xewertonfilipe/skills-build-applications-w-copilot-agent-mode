import { Schema, model, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    focus: {
      type: String,
      enum: ['strength', 'endurance', 'mobility', 'fat-loss', 'recovery'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    estimatedMinutes: { type: Number, required: true, min: 5 },
    exercises: [{ type: String, required: true, trim: true }],
    targetMuscles: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

export const WorkoutModel = model('Workout', workoutSchema);
