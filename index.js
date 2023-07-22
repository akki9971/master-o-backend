const express = require("express");
const connectDB = require("./database")
const cors = require("cors")
const User = require('./models/Register')
const Question = require("./models/Question")
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }))

app.use(cors());


app.post("/api/check-user", (req, res) => {
    const { email } = req.body;
    User.findOne({ email: email }).then(user => {
        if (user) {
            res.json({ isRegister: true })
        } else {
            res.json({ isRegister: false })
        }
    })
})

app.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email })

    if (user) {
        errors.email = "Email already exists";
        return res.send({ message: "User already exists", success: false });
    } else {

        const newUser = {
            name,
            email,
            password,
        }


        const newCrUser = await User.create(newUser)

        if (newCrUser) {
            res.status(201).json({ message: "successfuly registered", success: true })
        } else {
            console.log(err)
            res.status(500).json({ message: "error in registration", status: false })
        }
    }
})

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }).then(user => {
        if (user) {
            if (password === user.password) {
                res.json({ message: "Login succesfull", user: user, success: true })
            } else {
                res.json({ message: "Please try again with valid credentials.", success: false })
            }
        } else {
            res.send({ message: "User is not register", success: false })
        }
    })
})

app.post("/api/add-question", async (req, res) => {
    const { question, options, answer } = req.body;
    const que = await Question.findOne({ question, answer })
    if (que) {
        res.json({ message: "Already Exist", success: false })
    } else {
        const ques = {
            question,
            options,
            answer
        }

        const newQuestion = await Question.create(ques)
        if (newQuestion) {
            res.status(201).json({ message: "Question added succesfully", success: true })

        } else {
            res.send(err)
        }

    }
})


app.get("/api/get-questions", async (req, res) => {
    try {
        const questions = await Question.aggregate([{$sample: {size: 5}}])

        res.json({questions: questions, success: true})
        
    } catch (error) {
        res.json({error: error, success: false})
    }
        // if(questions.length > 0) {
        //     // const quest = questions.slice(0, 10)
        //     res.send({ data: quest, success: true})
        // } else {
        //     res.json({success: false, message: "Some Error Occured."})
        // }
})

app.listen(4000, () => { console.log("server listen on port 4000") })