const express = require('express');
const router = express.Router();
const {getReport} = require('../Services/reportService');

router.get('/',async (req,res)=>{
    try {
        const report = await getReport();
        return res.status(200).json(report);
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
});

module.exports = router;