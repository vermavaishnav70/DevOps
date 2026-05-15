const express = require('express');
const router = express.Router();
const Stat = require('../models/Product');

// Get current stats (returns a single object instead of an array)
router.get('/', async (req, res) => {
    try {
        const stats = await Stat.find();
        if (stats.length > 0) {
            res.json(stats[0]);
        } else {
            // Return a default stat object if the DB is empty
            const defaultStat = new Stat({});
            await defaultStat.save();
            res.json(defaultStat);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update stats (assumes we're updating the first/only document)
router.post('/', async (req, res) => {
    try {
        let stat = await Stat.findOne();
        if (!stat) {
            stat = new Stat(req.body);
        } else {
            if (req.body.vitality !== undefined) stat.vitality = req.body.vitality;
            if (req.body.focus !== undefined) stat.focus = req.body.focus;
            if (req.body.metabolicRate !== undefined) stat.metabolicRate = req.body.metabolicRate;
            if (req.body.sleepQuality !== undefined) stat.sleepQuality = req.body.sleepQuality;
            if (req.body.deepWorkStreak !== undefined) stat.deepWorkStreak = req.body.deepWorkStreak;
            if (req.body.consciousnessLevel !== undefined) stat.consciousnessLevel = req.body.consciousnessLevel;
        }

        const savedStat = await stat.save();
        res.status(200).json(savedStat);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
