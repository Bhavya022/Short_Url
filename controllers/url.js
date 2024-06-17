const shortid = require('shortid') 
const URL = require('../models/url');
async function generateshorturl(req,res){
    const body = req.body;   
    if(!body.url) return res.status(400).json({msg:'url is required'});
    const short = shortid(); 


await URL.create({
shortId:short,
redirectURL:body.url,
visitHistory:[],
}) 
return res.status(201).json({id:short})
}

async function handlegetAnalytics(req,res){
    const shortId = req.params.shortId;

    const result = await URL.findOne({shortId});
    return res.json({totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    }) 
}

module.exports={
    generateshorturl,
    handlegetAnalytics
}