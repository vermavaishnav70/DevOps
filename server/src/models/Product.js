const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  vitality: { type: Number, required: true, default: 85 },
  focus: { type: Number, required: true, default: 92 },
  metabolicRate: { type: String, required: true, default: '1,840 kcal active' },
  sleepQuality: { type: String, required: true, default: 'Excellent' },
  deepWorkStreak: { type: Number, required: true, default: 4 },
  consciousnessLevel: { type: String, required: true, default: 'Lucid' }
}, { timestamps: true });

module.exports = mongoose.model('Stat', statsSchema);
