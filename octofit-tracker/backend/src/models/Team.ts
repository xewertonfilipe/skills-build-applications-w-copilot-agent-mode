import { Schema, model, type InferSchemaType, type Types } from 'mongoose';

type TeamMember = {
  user: Types.ObjectId;
  role: 'captain' | 'member';
};

const teamMemberSchema = new Schema<TeamMember>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['captain', 'member'], required: true },
  },
  { _id: false },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    members: { type: [teamMemberSchema], default: [] },
    weeklyGoalMinutes: { type: Number, required: true, min: 30 },
  },
  { timestamps: true },
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

export const TeamModel = model('Team', teamSchema);
