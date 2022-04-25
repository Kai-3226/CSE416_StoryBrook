const Work = require('../models/work-model');

createWork = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Work',
        })
    }

    const work = new Work(body);
    if (!work) {
        return res.status(400).json({ success: false, error: err })
    }
    //when work type is a story
    if (work.workType==0){
        work
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    work: work,
                    message: 'Story Created!'
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Story Not Created!'
                })
            })

    }
    //when work type is a comic
    else{
        work
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                work: work,
                message: 'Comic Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Comic Not Created!'
            })
        })
    }
    
}

updateWork = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Work.findOne({ _id: req.params.id }, (err, work) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Work not found!',
            })
        }
        work.workType = body.workType;
        work.author = body.author;
        work.content =body.content;
        work.published=body.published;
        
        work
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: work._id,
                    message: 'Work updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Work not updated!',
                })
            })
    })
}

deleteWork = async (req, res) => {
    Work.findById({ _id: req.params.id }, (err, work) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Work not found!',
            })
        }
        Work.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: work })
        }).catch(err => console.log(err))
    })
}

getWorkById = async (req, res) => {
    await Work.findById({ _id: req.params.id }, (err, work) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, work: work })
    }).catch(err => console.log(err))
}
function swap(arr, xp, yp){
        var temp = arr[xp];
        arr[xp] = arr[yp];
        arr[yp] = temp;
    }
getWorks = async (req, res) => {
    await Work.find({}, (err, works) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!works.length) {
            return res
                .status(404)
                .json({ success: false, error: `Works not found` })
        }
        const body = req.body;
        
        if (body.query="mostlike"){
            for(let i=0;i<works.length-1;i++){
                for(let j=0;j<works.length-i-1;j++){
                    if (works[j].likes.length < works[j+1].likes.length){
                        swap(works,j,j+1);
                    }   
                }
            }
        }
        else if (body,query="mostview"){
            for(let i=0;i<works.length-1;i++){
                for(let j=0;j<works.length-i-1;j++){
                    if (works[j].view < works[j+1].view){
                        swap(works,j,j+1);
                    }   
                }
            }
        }
        else if (body.query="followingWorks"){
            for(work in works){
                if(!body.payload.includes(works[work].author)){
                    works.splice(work,1);
                }
            }
        }
        else if (body.query="myWork"){
            for(work in works){
                if(works[work].author!==body.payload){
                    works.splice(work,1);
                }
            }
        }
        else if (body.query="latest"){
            for(let i=0;i<works.length-1;i++){
                for(let j=0;j<works.length-i-1;j++){
                    if (works[j].published.time < works[j+1].published.time){
                        swap(works,j,j+1);
                    }   
                }
            }
        }
        else{
            return res
                .status(404)
                .json({ success: false, error: `Not valid query` })
        }
        return res.status(200).json({ success: true, data: works })
    }).catch(err => console.log(err))
}
getWorkPairs = async (req, res) => {
    await Work.find({ }, (err, works) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!works) {
            console.log("!works.length");
            return res
                .status(404)
                .json({ success: false, error: 'Works not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in works) {
                let work = works[key];
                let pair = {
                    _id: work._id,
                    name: work.name,
                    content: work.content,
                    workType: work.workType,
                    likes: work.likes,
                    dislikes: work.dislikes,
                    author: work.author,
                    published: work.published,
                    view: work.view,
                    comments: work.comments
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

module.exports = {
    createWork,
    updateWork,
    deleteWork,
    getWorks,
    getWorkPairs,
    getWorkById
}