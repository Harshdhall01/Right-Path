const College = require('../models/college');

// GET all colleges (with filters)
const getColleges = async (req, res) => {
    try {
        const { type, state } = req.query;
        let filter = {};
        if (type) filter.type = type;
        if (state) filter.state = state;

        const colleges = await College.find(filter);
        res.json({ success: true, count: colleges.length, data: colleges });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// GET single college by ID
const getCollegeById = async (req, res) => {
    try {
        const college = await College.findById(req.params.id);
        if (!college) {
            return res.status(404).json({ success: false, error: 'College not found' });
        }
        res.json({ success: true, data: college });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// POST predict colleges based on rank
const predictColleges = async (req, res) => {
    try {
        const { rank, category } = req.body;

        if (!rank || !category) {
            return res.status(400).json({ success: false, error: 'Rank and category are required' });
        }

        const colleges = await College.find({});
        const results = { dream: [], reach: [], moderate: [], safety: [] };

        colleges.forEach(college => {
            college.cutoffs.forEach(cutoff => {
                const cutoffRank = cutoff[category.toLowerCase()];
                if (!cutoffRank) return;

                const ratio = rank / cutoffRank;
                const entry = {
                    college: college.name,
                    collegeId: college._id,
                    type: college.type,
                    state: college.state,
                    branch: cutoff.branch,
                    cutoff: cutoffRank,
                    fees: college.fees.general,
                    avg_salary: college.placements.avg_salary
                };

                if (ratio <= 0.5) results.dream.push(entry);
                else if (ratio <= 0.8) results.reach.push(entry);
                else if (ratio <= 1.2) results.moderate.push(entry);
                else results.safety.push(entry);
            });
        });

        res.json({ success: true, rank, category, results });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = { getColleges, getCollegeById, predictColleges };