import { Schema, model, type InferSchemaType } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    weekKey: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

leaderboardSchema.index({ weekKey: 1, rank: 1 }, { unique: true });

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;

export const LeaderboardModel = model('Leaderboard', leaderboardSchema);
