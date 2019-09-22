const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'Orders were fetched'
    });
});

router.get('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:'Orders was geted',
        orderId  : req.params.orderId
    });
});
 
router.delete('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:'Orders was deleted',
        orderId  : req.params.orderId
    });
});


router.post('/',(req,res,next)=>{
    res.status(201).json({
        message:'Orders was created'
    });
});

module.exports = router;


