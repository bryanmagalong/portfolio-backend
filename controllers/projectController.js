const Project = require("../models/projectModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find();

  res.status(200).json({
    status: "success",
    results: projects.length,
    projects,
  });
});

exports.getProjectsByTag = catchAsync(async (req, res, next) => {
  const tags = req.params.tag.split("&");

  console.log(tags);

  const projects = await Project.find({ tags: { $in: tags } });

  res.status(200).json({
    status: "success",
    results: projects.length,
    projects,
  });
});

exports.getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) return new AppError("No project with that id", 404);

  res.status(200).json({
    status: "success",
    project,
  });
});
