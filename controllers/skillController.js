const Skill = require("../models/skillModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getAllSkills = catchAsync(async (req, res, next) => {
  const skills = await Skill.find();

  res.status(200).json({
    status: "success",
    results: skills.length,
    skills,
  });
});

exports.getSkillsByCategory = catchAsync(async (req, res, next) => {
  const skills = await Skill.find({ category: req.params.category });

  res.status(200).json({
    status: "success",
    results: skills.length,
    skills,
  });
});
