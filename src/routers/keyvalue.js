const express = require('express')
const KeyValue = require('../Model/KeyValue')

const router = new express.Router()

router.post('/keyvalues',async(req,res)=>{

    const keyunique = await KeyValue.findOne({ 'key': req.body.key })
        if (!keyunique) {
            let history = [req.body.value]
            const reqbody = {
                'key': req.body.key,
                'value':req.body.value,
                'history':history
            }
            // const keyvalue = new KeyValue(req.body)
            const keyvalue = new KeyValue(reqbody)                
            try{
                await keyvalue.save()
                res.status(201).send(keyvalue)
            } catch (e){
                res.status(400).send(e)
            }
        }
        else{
            res.status(400).send(e)
        }
})

router.get('/keyvalues', async(req,res)=>{
    try{
        const keyvalues = await KeyValue.find({})
        res.send(keyvalues)
    } catch(e){
        res.status(500)
    }
})

router.get('/keyvalue/:key', async(req,res)=>{
    const _key = req.params.key
    // console.log(_key)
    try{
        const keyvalue = await KeyValue.findOne({ 'key': _key })
        if (!keyvalue) {
            return res.status(404).send()
        }
        res.send(keyvalue)

    } catch(e){
        res.status(500)
    }

})
router.patch('/keyvalue/:key', async (req, res) => {
    const _keyvalue = await KeyValue.findOne({ 'key': req.params.key })
    // console.log(_keyvalue.history)
    let history = _keyvalue.history
    history.push(_keyvalue.value)

    const updateParam = Object.keys(req.body)
    // console.log(updateParam)
    // console.log(updateParam[0])
    // console.log(updateParam.length)
    filter = {'key':req.params.key}
    update = {
        'value':req.body.value,
        'history':history
    }
    // update = req.body
    if ( updateParam.length == 1 && updateParam[0] == 'value') {
        try {
                const keyvalue = await KeyValue.findOneAndUpdate(filter, update, { new: true, runValidators: true })
                if (!keyvalue) {
                    return res.status(404).send()
                }
                res.send(keyvalue)
            } catch (e) {
                res.status(400).send(e)
            }
    }
    else{
        return res.status(400).send({ error: 'Invalid updates!' })
    }

})
router.delete('/keyvalues', async(req,res)=>{
    try{
        const keyvalue = await KeyValue.deleteMany({})
        if (!keyvalue) {
            return res.status(404).send()
        }
        res.send(keyvalue)

    } catch(e){
        res.status(500)
    }
})

module.exports = router