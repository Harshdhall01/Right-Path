const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: String,
    type: String, // NIT, IIIT, GFTI
    state: String,
    city: String,
    established: Number,
    website: String,
    nirf_rank: Number,
    fees: {
        general: Number,
        sc_st: Number
    },
    branches: [String],
    cutoffs: [
        {
            branch: String,
            general: Number,
            obc: Number,
            sc: Number,
            st: Number
        }
    ],
    placements: {
        avg_salary: Number,
        median_salary: Number,
        max_salary: Number,
        placement_percent: Number,
        top_recruiters: [String]
    },
    facilities: [String],
    description: String
});

module.exports = mongoose.model('College', collegeSchema);