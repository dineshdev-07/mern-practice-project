const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalmodel')


const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()
  res.status(200).json(goals);
})

const postGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Add  the text field");
  }

  res.status(200).json({ message: "POST Goal" });
})

const putGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "PUT the goal" });
  console.log(`PUT ID ${req.params.id}`);
})

const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "DELETE the goal" });
  console.log(`DELETE ID ${req.params.id}`);
})

module.exports = { getGoals, postGoal, putGoal, deleteGoal };
