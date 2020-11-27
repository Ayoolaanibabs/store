const Suggest = require('../models/suggest');

const suggestedCategory = async(req,res, next)=>{
    try{
        const category = req.params.category
        const result = await Suggest.find({itemCategory: category})
        res.send(result)
    }catch(error){
            res.json({
                message: 'Not a valid category'
            })
    }
}
    


const suggestedAll = async (req,res, next) =>{
    try{
        const result = await Suggest.find({}, {__v: 0})
        res.send(result);
    }catch(error){
        res.json({
            error
        })
    }
}

module.exports = {
    suggestedCategory, suggestedAll
};