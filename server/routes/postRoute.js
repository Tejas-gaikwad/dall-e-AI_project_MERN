import express from "express";
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongoDb/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINIRY_NAME,
    api_key: process.env.CLOUDINIRY_API_KEY,
    api_secret: process.env.CLOUDINIRY_API_SECRET,
});


router.route('/').get( async (req, res) => {
    try {
        const post = await  Post.find({});
        res.json({ success : true, data : post});
    } catch (error) {
        console.log("ERROR -- ", error);
        res.json({ success : false, message : error});
    }
});

router.route('/').post( async (req, res) => {

    try {
        console.log("CREATE POST   1   ");
    const { name, prompt, photo } = req.body;
    console.log("CREATE POST   2   ");
    const photoUrl = await cloudinary.uploader.upload(photo);
    console.log("CREATE POST   3   ");
    const newPost = await Post.create({
        name : name,
        prompt : prompt,
        photo : photoUrl.url, 
    });
    console.log("CREATE POST   4   ");
    res.json({ success : true, data : newPost});
    console.log("CREATE POST   5   ");
    // navigation.navigate('/');
    // console.log("CREATE POST   5   ");

    } catch (error) {
        console.log("ERROR -- ", error);
        res.json({ success : false, message : error});
    }
});


export default router;