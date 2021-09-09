const express = require('express');
const { result, constant } = require('lodash');
const mongoose = require('mongoose');

const Tasks =require('./CRUD');
const app = express();

const dbURL='mongodb+srv://akshat:akshat1234@cluster0.up282.mongodb.net/Tasks?retryWrites=true&w=majority';
mongoose.connect(dbURL,{useNewUrlParser: true, useUnifiedTopology: true})
 .then((result)=> app.listen(5000))
 .catch((err) => console.log(err));

app.get('/add-task',(req,res)=>{
  const Task = new Tasks({
    Description: 'Fourth entry',
    Completed: true
  });

  Task.save()
  .then((result)=>{res.send(result)})
  .catch((err)=>{
    console.log(err);
  });
});

app.get('/read-task',(req,res)=>{
  Tasks.find({Completed:false})
  .then((result)=>{
    res.send(result);
    console.log(result);
  })
  .catch((err)=>{
    console.log(err);
  });
});

app.get('/update-task/:id',(req,res)=>{
 const id= req.params.id;
 Tasks.findByIdAndUpdate(id,{Completed:true})
 .then(()=>{console.log(' success!');
   res.redirect('/read-task');
  })
 .catch((err)=>{
   console.log(err);
 });
 
});

app.get('/delete-task/:id',(req,res)=>{
  const id = req.params.id;
  Tasks.findByIdAndRemove(id)
  .then(()=>{console.log('successfully removed!');
  res.redirect('/read-task');})
  .catch((err)=>{
   console.log(err);
  });


});

