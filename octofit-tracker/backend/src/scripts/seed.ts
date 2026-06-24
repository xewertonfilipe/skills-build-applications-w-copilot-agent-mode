import { ActivityModel } from '../models/Activity';
import { connectDatabase, disconnectDatabase } from '../config/database';
import { LeaderboardModel } from '../models/Leaderboard';
import { TeamModel } from '../models/Team';
import { UserModel } from '../models/User';
import { WorkoutModel } from '../models/Workout';

const seed = async () => {
  console.log('Seed command: npm run seed --prefix octofit-tracker/backend');
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const users = await UserModel.insertMany([
    {
      name: 'Ana Costa',
      email: 'ana.costa@octofit.dev',
      age: 28,
      fitnessLevel: 'intermediate',
      goals: ['Run 10k', 'Improve consistency'],
    },
    {
      name: 'Bruno Lima',
      email: 'bruno.lima@octofit.dev',
      age: 34,
      fitnessLevel: 'advanced',
      goals: ['Reduce body fat', 'Maintain strength'],
    },
    {
      name: 'Carla Souza',
      email: 'carla.souza@octofit.dev',
      age: 24,
      fitnessLevel: 'beginner',
      goals: ['Build healthy routine', 'Improve mobility'],
    },
  ]);

  const teams = await TeamModel.insertMany([
    {
      name: 'Cardio Crushers',
      city: 'Sao Paulo',
      weeklyGoalMinutes: 300,
      members: [
        { user: users[0]._id, role: 'captain' },
        { user: users[2]._id, role: 'member' },
      ],
    },
    {
      name: 'Iron Pulse',
      city: 'Rio de Janeiro',
      weeklyGoalMinutes: 360,
      members: [{ user: users[1]._id, role: 'captain' }],
    },
  ]);

  await ActivityModel.insertMany([
    {
      user: users[0]._id,
      team: teams[0]._id,
      type: 'run',
      durationMinutes: 45,
      caloriesBurned: 420,
      performedAt: new Date('2026-06-20T07:30:00.000Z'),
      notes: 'Interval run at Ibirapuera park',
    },
    {
      user: users[1]._id,
      team: teams[1]._id,
      type: 'strength',
      durationMinutes: 60,
      caloriesBurned: 510,
      performedAt: new Date('2026-06-21T18:00:00.000Z'),
      notes: 'Upper body split workout',
    },
    {
      user: users[2]._id,
      team: teams[0]._id,
      type: 'yoga',
      durationMinutes: 35,
      caloriesBurned: 160,
      performedAt: new Date('2026-06-22T06:45:00.000Z'),
      notes: 'Morning flexibility flow',
    },
    {
      user: users[0]._id,
      team: teams[0]._id,
      type: 'cycle',
      durationMinutes: 50,
      caloriesBurned: 470,
      performedAt: new Date('2026-06-23T10:15:00.000Z'),
      notes: 'Tempo ride with hill repeats',
    },
  ]);

  await LeaderboardModel.insertMany([
    {
      user: users[0]._id,
      team: teams[0]._id,
      points: 980,
      rank: 1,
      weekKey: '2026-W26',
    },
    {
      user: users[1]._id,
      team: teams[1]._id,
      points: 910,
      rank: 2,
      weekKey: '2026-W26',
    },
    {
      user: users[2]._id,
      team: teams[0]._id,
      points: 640,
      rank: 3,
      weekKey: '2026-W26',
    },
  ]);

  await WorkoutModel.insertMany([
    {
      title: 'Explosive Leg Day',
      focus: 'strength',
      difficulty: 'advanced',
      estimatedMinutes: 55,
      exercises: ['Back Squat 5x5', 'Romanian Deadlift 4x8', 'Walking Lunge 3x12'],
      targetMuscles: ['quadriceps', 'hamstrings', 'glutes'],
    },
    {
      title: 'Beginner Full Body Circuit',
      focus: 'fat-loss',
      difficulty: 'beginner',
      estimatedMinutes: 30,
      exercises: ['Bodyweight Squat 3x12', 'Push-Up 3x8', 'Plank 3x30s'],
      targetMuscles: ['legs', 'chest', 'core'],
    },
    {
      title: 'Mobility Reset Session',
      focus: 'mobility',
      difficulty: 'intermediate',
      estimatedMinutes: 25,
      exercises: ['Hip Opener Flow', 'Thoracic Rotation', 'Hamstring Stretch Sequence'],
      targetMuscles: ['hips', 'back', 'hamstrings'],
    },
  ]);

  console.log('Seed completed successfully.');
};

seed()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
