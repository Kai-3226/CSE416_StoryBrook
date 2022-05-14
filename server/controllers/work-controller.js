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
        if(!work){console.log("work not found");}
        work.workType = body.workType;
        work.content =body.content;
        work.published=body.published;
        work.name=body.name; 
        work.view=body.view;
        work.comments=body.comments;
        work.likes=body.likes;
        work.dislikes=body.dislikes;
        work.author=body.author;
        work.authorName=body.authorName;
        work.authorId=body.authorId;
        work
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: work._id,
                    work:work,
                    message: 'Work updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: updatework failed\n" + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Work not updated!',
                })
            })
    })
}

deleteWorkById = async (req, res) => {
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
                .status(200)
                .json({ success: true, data:[] })
        }
            
        let pairs = [];
            for (let key in works) {
                let work = works[key];
                let pair=null;
                if(work.published.publish==true&&work.workType==1&&work.content.length>=1){
                        pair = {
                        _id: work._id,
                        name: work.name,
                        content: work.content.slice(0,1),
                        workType: work.workType,
                        likes: work.likes,
                        published: work.published,
                        view: work.view,
                        authorId:work.authorId,
                        authorName:work.authorName,
                        author: work.author
                    };    
                 }
                 else {
                        pair = {
                        _id: work._id,
                        name: work.name,
                        content: [],
                        workType: work.workType,
                        likes: work.likes,          
                        published: work.published,
                        view: work.view,
                        authorId:work.authorId,
                        authorName:work.authorName,
                        author: work.author
                    };
                 }
                 pairs.push(pair);
            }
        
        
        
        return res.status(200).json({ success: true, data: pairs })
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
                    frontPage: work.content.pages[0],
                    workType: work.workType,
                    likes: work.likes,
                    dislikes: work.dislikes,
                    author: work.author,
                    published: work.published,
                    view: work.view,
                    comments: work.comments,
                    authorName:work.authorName,
                    authorId:work.authorId
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
    deleteWorkById,
    getWorks,
    getWorkPairs,
    getWorkById
}