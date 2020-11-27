express = require('express');
mongoose = require('mongoose');
const AuthRoute = require('./routes/auth');
const suggestRoute = require('./routes/suggestRoute');
const suggestedRoute = require('./routes/suggestedRoute');
const { verifyAccessToken } = require('./middleware/authMiddleware')
app = express();


app.use(express.json());



const db = "mongodb+srv://ayo:4hpSbUaOWdFkk8FW@cluster0.umgd2.mongodb.net/PeopleApi"

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Mongodb connected')
});
/*
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*');
        return res.status(200).json({})
    }
});
*/
app.use('/auth', AuthRoute);

app.use('/suggest',verifyAccessToken, suggestRoute);

app.use('/suggested',verifyAccessToken, suggestedRoute);



app.listen(3000, ()=>{
    console.log('Now running on port 3000!')
})