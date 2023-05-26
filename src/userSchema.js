const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://root:system@cluster.8cgqxmc.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log('Login mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
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
      phone: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      confirmPassword: {
        type: String,
        required: true
      },
      designation: {
        type: String,
        required: true
      },
      hospitalClinic: {
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
      yearsOfExperience: {
        years: {
          type: Number,
          required: true
        },
        months: {
          type: Number,
          required: true
        }
      },
      highestQualification: {
        type: String,
        enum: ['MBBS', 'MD', 'MS', 'Ph.D', 'others'],
        required: true
      },
      numberOfPatients: {
        type: Number,
        required: true
      },
      numberOfAnxietyPatients: {
        type: Number,
        required: true
      },
      numberOfDepressionPatients: {
        type: Number,
        required: true
      },
      numberOfSubstanceAbusePatients: {
        type: Number,
        required: true
      }
})

const LogInCollection=new mongoose.model('users',logInSchema)

module.exports=LogInCollection