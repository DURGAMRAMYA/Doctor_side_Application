const mongoose = require('mongoose');
const user=require('./userSchema');
mongoose.connect("mongodb+srv://root:system@cluster.8cgqxmc.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log('mongoose connected');

})
.catch((e)=>{
    console.log('failed');
})

const patientSchema = new mongoose.Schema({

doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required:true
    
  },

  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'nonbinary'],
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  symptoms: {
    type: String,
    enum: ['depression', 'anxiety', 'substance abuse disorder'],
    required: true
  },
  currentlyOnMedication: {
    type: String,
    required: true
  },
  hasDiabetesOrLiverProblems: {
    type: String,
    required: true
  },
  hasHeartProblems: {
    type: String,
    required: true
  },
  medicinePrescribed: {
    type: String,
    required: true
  }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient