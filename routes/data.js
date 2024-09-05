const express = require('express');
const router = express.Router()
const Data = require('../model/data');

router.get('/', async (req, res) => {
    try {
        const { startDate, endDate, ...otherQueryParams } = req.query;
        let query = { ...otherQueryParams };
        if (startDate || endDate) {
            query.doi = {};
            if (startDate) {
                query.doi.$gte = new Date(startDate);
            }
            if (endDate) {
                query.doi.$lte = new Date(endDate);
            }
        }
        const data = await Data.find(query);
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Failed loading data', error: err.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const data = await Data.findById(req.params.id);
        if(!data) return res.status(400).send("data with given id does'nt exist");
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Failed loading data', error: err.message });
    }
});
router.get('/pocNames', async (req, res) => {
    try {
        // Use the distinct method to get all unique pocName values
        const distinctPocNames = await Data.distinct('pocName');
        
        // Send the distinct values as the response
        res.send(distinctPocNames);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Failed to load distinct pocNames', error: err.message });
    }
});
router.post('/', async(req,res)=>{
    if(!req.body.pocName || req.body.pocName.length < 3) return res.status(400).send("pocName is a required field and must contain at least 3 letters");
    try{
        let data = new Data({
           ...req.body
        })
           data =  await data.save()
           res.send(data)
    }
    catch(err){
        console.log(err);
        res.status(500).send({ message: 'Error saving data', error: err.message });
    }
})

router.delete('/',async(req,res)=>{
    try{
       const data = await Data.deleteMany(req.query).then(res => console.log(res)).catch(err => console.log(err));

       res.send(data)
    }catch(err){
        console.log(err)
    }
})

router.put('/:id', async(req,res)=>{
    try{
        let data = await Data.findByIdAndUpdate(req.params.id,{
            $set: req.body
        }, {new:true,runValidators: true });
        if(!data) return res.status(400).send("data with given id does'nt exist");
        res.send(data)
    }catch(err){
        console.error(err);
        res.status(500).send({ message: 'Error updating data', error: err.message });
    }
})

router.get('/pocName-counts', async (req, res) => {
    try {
        // Use the aggregation framework to group by pocName and count the number of documents for each pocName
        const result = await Data.aggregate([
            {
                $group: {
                    _id: "$pocName",
                    countofdata: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    pocName: "$_id",
                    countofdata: 1
                }
            }
        ]);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Failed to load pocName counts', error: err.message });
    }
});

module.exports = router