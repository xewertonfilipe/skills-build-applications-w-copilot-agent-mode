import express from 'express';
import { ActivityModel } from './models/Activity';
import { connectDatabase, mongoUri } from './config/database';
import { LeaderboardModel } from './models/Leaderboard';
import { TeamModel } from './models/Team';
import { UserModel } from './models/User';
import { WorkoutModel } from './models/Workout';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.get('/api/users/', async (_req, res) => {
  const users = await UserModel.find().sort({ createdAt: -1 }).lean();
  res.json(users);
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await TeamModel.find()
    .populate('members.user', 'name email fitnessLevel')
    .sort({ createdAt: -1 })
    .lean();
  res.json(teams);
});

app.get('/api/activities/', async (_req, res) => {
  const activities = await ActivityModel.find()
    .populate('user', 'name email')
    .populate('team', 'name city')
    .sort({ performedAt: -1 })
    .lean();
  res.json(activities);
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardModel.find({ weekKey: '2026-W26' })
    .populate('user', 'name')
    .populate('team', 'name')
    .sort({ rank: 1 })
    .lean();
  res.json(leaderboard);
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await WorkoutModel.find().sort({ difficulty: 1, title: 1 }).lean();
  res.json(workouts);
});

const startServer = async () => {
  try {
    await connectDatabase();
    console.log(`MongoDB connected at ${mongoUri}`);

    app.listen(port, () => {
      console.log(`API running on ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

void startServer();
