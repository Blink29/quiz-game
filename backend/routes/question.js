import express from "express";
import Question from "../model/question.js";

const router = express.Router();

router.get('/:category', async (req, res) => {
    try {
        const {category} = req.params;
        const randomQues = await Question.aggregate([
            { $match: { category } }, // Match the selected category
            { $sample: { size: 10 } }, // Get 10 random questions
          ]);
          res.json(randomQues);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

export default router;