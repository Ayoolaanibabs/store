express = require('express');
mongoose = require('mongoose');
const cors = require('cors');
app = express();

const AuthRoute = require('./routes/auth');
const suggestRoute = require('./routes/suggestRoute');
const suggestedRoute = require('./routes/suggestedRoute');
const { verifyAccessToken } = require('./middleware/authMiddleware')

app.use(cors());

app.use(express.json());



const db = "mongodb+srv://ayo:4hpSbUaOWdFkk8FW@cluster0.umgd2.mongodb.net/PeopleApi"

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Mongodb connected')
});

app.use('/auth', AuthRoute);

app.use('/suggest',verifyAccessToken, suggestRoute);

app.use('/suggested',verifyAccessToken, suggestedRoute);


app.use((req, res, next)=>{
    res.status(404);
    res.send({
        error: 'Not Found'
    })
    next(err)
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.send({
        error: {
            status: error.status || 500,
            message: error.message
        }
    })
});
app.listen(3000, ()=>{
    console.log('Now running on port 3000!')
})