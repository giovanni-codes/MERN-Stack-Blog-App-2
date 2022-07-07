const express = require('express');
const router = express.Router();
const BlogPost = require('../models/blogPost');


// Routes 
router.get ("/", (req, res) => {

    BlogPost.find({  })
        .then((data) => {
            console.log('Data: ', data)
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error)
        });          

});

router.post ("/save", (req, res) => {
    console.log('Body: ', req.body);
    const data = req.body;
    const newBlogPost = new BlogPost(data);

    //.save
    newBlogPost.save((error) => {
        if (error) {
            res.status(500).json({
                msg: 'Sorrrryyyy there is an internal error...'
            });
            return;
        } 
        // BlogPost
        return res.json({
            msg: 'we received your data yayayyy!!!'
        });
    });
});


//test get PLZ IGNORE!!
router.get ("/name", (req, res) => {
    const data = {
        username: 'Giovanni',
        university: 'Berkeley'

    };
    res.json(data);
});



module.exports = router;

//saving data here and testing if needed
// newBPInstance.save((error) => {
//     if (error) {
//         console.log('beep boop beep something is wrong...')
//     } else {
//         console.log('SUCCESSSSSS DATA HAS BEEN SAVED YAYA!')
//     }
// });








