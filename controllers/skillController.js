const Skill = require('../models/skillModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllSkills = catchAsync(async (req, res, next) => {
  const skills = await Skill.find();
  
  res.status(200).json({
    status:'success',
    results: skills.length,
    data: {
      skills,
    },
  });
});