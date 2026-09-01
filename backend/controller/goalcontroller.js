const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalmodel");
const User = require("../models/usermodel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

const postGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Add  the text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

const putGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal Not Find");
  }

  const user = await User.findById(req.user.id);

  // Check for User
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // Make sure logIn User matches the goals user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }

  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateGoal);
  console.log(`PUT ID ${req.params.id}`);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const delGoal = await Goal.findByIdAndDelete(req.params.id);

  if (!delGoal) {
    res.status(400);
    throw new Error("Goal Not Found for Delete");
  }

  const user = await User.findById(req.user.id);

  // Check for User
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // Make sure logIn User matches the goals user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }

  res.status(200).json(delGoal);
  console.log(`DELETE ID ${req.params.id}`);
});

module.exports = { getGoals, postGoal, putGoal, deleteGoal };
