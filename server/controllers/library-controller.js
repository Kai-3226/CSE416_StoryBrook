const Library = require('../models/library-model');

// created and upload a new library
createLibrary = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a library',
        })
    }

    const library = new Library(body);
    console.log("creating a new library: " + JSON.stringify(library));
    if (!library) {
        return res.status(400).json({ success: false, error: err })
    }

    library
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                library: library,
                message: 'New library Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'New library Not Created!'
            })
        })
}

updateLibrary = async (req, res) => {
    const body = req.body
    console.log("update Library: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Library.findOne({ _id: req.params.id }, (err, library) => {
        console.log("Library: " + JSON.stringify(library));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Library not found!',
            })
        }
        library.ownerId = body.ownerId;
        library.name = body.name;
        library.content = body.content;
        library.public = body.public;
        library.used = body.used;

        

        library
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: top5List._id,
                    message: 'Top 5 List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Top 5 List not updated!',
                })
            })
    })
}

deleteLibrary = async (req, res) => {
    Library.findById({ _id: req.params.id }, (err, library) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Library not found!',
            })
        }
        Library.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: Library })
        }).catch(err => console.log(err))
    })
}

getLibraryById = async (req, res) => {
    await Library.findById({ _id: req.params.id }, (err,library) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, top5List: library })
    }).catch(err => console.log(err))
}

getAllLibrary = async (req, res) => {
    await Library.find({}, (err,  libraries) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!libraries.length) {
            return res
                .status(404)
                .json({ success: false, error: ` Libraries not found` })
        }
        return res.status(200).json({ success: true, data:  libraris })
    }).catch(err => console.log(err))
}

getLibrariesByName =async(req,res) => {
    let name=req.params.name;

    await Library.find({ }, (err, libraries) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!libraries) {
            console.log("!libraries.length");
            return res
                .status(404)
                .json({ success: false, error: 'Libraries not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let namedLibraries = [];
            for (let key in libraries) {
                let namedLibrary = libraries[key];
               if(namedLibrary.name===name) {

                 namedLibraries.push(namedLibrary);
               }    
            }
            return res.status(200).json({ success: true,  namedLibraries:  namedLibraries})
        }
    }).catch(err => console.log(err))
  

}



module.exports = {
    createLibrary,
    updateLibrary,
    deleteLibrary,
    getLibraryById,
    getAllLibrary,
    getLibrariesByName
}