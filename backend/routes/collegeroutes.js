const express = require('express');
const router = express.Router();
const { getColleges, getCollegeById, predictColleges } = require('../controllers/collegecontroller');

router.get('/', getColleges);
router.get('/:id', getCollegeById);
router.post('/predict', predictColleges);

module.exports = router;