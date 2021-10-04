const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A skill must have a name!'],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "A skill must have a category"],
      enum: {
        values: ['frontend', 'backend', 'tools'],
        message: 'Category is either: frontend, backend or tools'
      }
    },
    logo: {
      type: String,
      required: [true, 'A skill must have a logo'],
    },
    learning: {
      type: Boolean,
      default: false,
    }
  }
);

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;