const Gamification = require('../models/Gamification');

const BADGE_RULES = [
  { points: 50, badge: 'Beginner Learner' },
  { points: 200, badge: 'Consistent Scholar' },
  { points: 500, badge: 'Study Master' },
];

// Called internally by aiController after each AI action
exports.addPoints = async (userId, amount, reason) => {
  let profile = await Gamification.findOne({ userId });
  if (!profile) profile = await Gamification.create({ userId });

  const today = new Date().toDateString();
  const last = profile.lastActiveDate ? profile.lastActiveDate.toDateString() : null;
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (last === yesterday) profile.streak += 1;
  else if (last !== today) profile.streak = 1;

  profile.points += amount;
  profile.level = Math.floor(profile.points / 100) + 1;
  profile.lastActiveDate = new Date();

  BADGE_RULES.forEach(rule => {
    if (profile.points >= rule.points && !profile.badges.includes(rule.badge)) {
      profile.badges.push(rule.badge);
    }
  });

  await profile.save();
  return profile;
};

// GET /api/gamification/me
exports.getMyProfile = async (req, res) => {
  const profile = await Gamification.findOne({ userId: req.user.id }) || { points: 0, level: 1, badges: [], streak: 0 };
  res.json(profile);
};

// GET /api/gamification/leaderboard
exports.getLeaderboard = async (req, res) => {
  const top = await Gamification.find().sort({ points: -1 }).limit(10).populate('userId', 'name');
  res.json(top.map(p => ({ name: p.userId.name, points: p.points, level: p.level })));
};