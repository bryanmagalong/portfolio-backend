const mongoose = require('mongoose');
const slugify = require('slugify');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, 'A project must have a name!' ],
    unique: true,
    trim: true,
    minlength: [ 3, 'A project must have more or equal than 3 characters!' ],
  },
  slug: {
    type: String,
    unique: true,
  },
  tags: [
    {
      type: String,
      name: {
        type: String,
        required: true,
        enum: {
          values: [ 'react', 'symfony', 'javascript', 'html', 'tailwindcss' ],
          message:
            'Name is either: react, symfony, javascript, html or tailwindcss',
        },
      },
    },
  ],
  description: {
    type: String,
  },
  imageCover: {
    type: String,
    required: [ true, 'A project must have an image cover!' ],
  },
  github: {
    type: String,
    default: '',
  },
  website: {
    type: String,
    default: '',
  },
});

projectSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
