const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TasksSchema = new Schema({
  Description:{
    type: String,
    required: true
  },
  Completed:{
    type: Boolean,
    required:true
  }
}, {timestamps: true});

const Task = mongoose.model('Tasks', TasksSchema);
module.exports =Task;

