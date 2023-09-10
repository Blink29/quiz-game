import express from "express";
import TestHistory from "../model/testHistory.js";

const router =  express.Router();

router.post('/', async (req, res) => {
    try {
        const {category, score} = req.body;
        const testHistory = new TestHistory({
            category,
            score
        });
        await testHistory.save();
        res.json(testHistory);
    } catch (err) {
        console.log("error showing score", err)
    }
})

router.get('/', async (req, res) => {
    try {
        const testHistory = await TestHistory.find();
        res.json(testHistory);
    } catch (err) {
        console.log('err finding test histort', err);
    }
})

export default router;