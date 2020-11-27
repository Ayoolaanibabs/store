const Suggest = require('../models/suggest');

const suggest = async(req, res, next)=>{
    try{
    let suggest = new Suggest(req.body);
    const result = await suggest.save();
    res.send('Suggestion successfully Added!');
    }catch(err){
        res.json({
            status: 401,
            message: 'The is an issue with the categories!'
        })
    }
}

module.exports = {
    suggest
};