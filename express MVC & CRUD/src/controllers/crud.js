const post = (model) => async (req,res)=>{
    const item = await model.create(req.body);
    return res.status(201).send(item)
}

const getall = (model) => async (req, res)=>{
    const items = await model.find().lean().exec();
    return res.send(items)
}

const getone = (model) => async (req, res) =>{
    const item = await model.findById(req.params.id).lean().exec()
    return res.send(item)
}

module.exports = {post, getall, getone}