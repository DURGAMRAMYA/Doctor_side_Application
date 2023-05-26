const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")
const LogInCollection = require("./userSchema")
const Patient=require("./patientSchema")
const { domainToUnicode } = require("url")
const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')

console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))

var docid;
var check;
var loggedIn=false;
// hbs.registerPartials(partialPath)


app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})

app.get('/edit',(req,res)=>{
    if(loggedIn===true){
    res.render('edit')}
    else{
        res.redirect('/')
    }
})

app.get('/home', async(req, res) => {
    try{
        console.log(docid);
        var data= await Patient.find({doctor:docid}).exec();
        console.log(data);
        res.render('home', { patientData: data });

    }
    catch(err){
        console.error(err)

    }

})

app.post('/signup', async (req, res) => {

    // const data = new LogInCollection({
    //     name: req.body.name,
    //     password: req.body.password
    // })
    // await data.save()

    const data = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        designation: req.body.designation,
        hospitalClinic: req.body.hospitalClinic,
        city: req.body.city,
        state: req.body.state,
        yearsOfExperience: {
            years: req.body['yearsOfExperience[years]'],
            months: req.body['yearsOfExperience[months]']
        },
        highestQualification: req.body.highestQualification,
        numberOfPatients: req.body.numberOfPatients,
        numberOfAnxietyPatients: req.body.numberOfAnxietyPatients,
        numberOfDepressionPatients: req.body.numberOfDepressionPatients,
        numberOfSubstanceAbusePatients: req.body.numberOfSubstanceAbusePatients
    };


    const checking = await LogInCollection.findOne({ name: req.body.name })

    try {
        if (checking && checking.name === req.body.name && checking.password === req.body.password) {
            res.send("user details already exists")
        }
        else {
            await LogInCollection.insertMany([data])
        }
    }
    catch {
        res.send("wrong inputs")
    }

    res.status(201).redirect('http://localhost:3000');
})


app.post('/login', async (req, res) => {

    try {
        check = await LogInCollection.findOne({ name: req.body.name })

        if (check && check.password === req.body.password) {
            loggedIn=true;
            res.status(201).redirect('http://localhost:3000/home');
            docid=check._id;
           
        }

        else {
            res.send("incorrect password")
        }
    }

    catch (e) {
        console.error(e)

        res.send("wrong details")


    }

})

app.post('/edit', async(req,res)=>{

    const data={
        doctor:docid,

   name : req.body.name,
   age : req.body.age,
   gender : req.body.gender,
   address : req.body.address,
   city :req.body.city,
   state : req.body.state,
   email : req.body.email,
   phone :req.body.phone,
   symptoms : req.body.symptoms,
   currentlyOnMedication : req.body.currentlyOnMedication,
   hasDiabetesOrLiverProblems :req.body.hasDiabetesOrLiverProblems,
   hasHeartProblems : req.body.hasHeartProblems,
   medicinePrescribed : req.body.medicinePrescribed

    }
    try{
        await Patient.insertMany([data])
    }
    catch(error){
        console.error(error);
        res.send("something went wrong");
    }

    res.status(201).redirect("/home");
})

app.listen(port, () => {
    console.log('port connected');
})