const express = require('express');
const router = express.Router();
const Debate = require('../models/debateModel');


router.get('', (req, res) => {
    res.status(200).json({message:"Server running successfully"})
})


router.post('/get-questions', async (req, res) => {
  try {
    const { standard, subject } = req.body;

    const debate = await Debate.findOne({ standard, subject });

    if (!debate) {
      return res.status(404).json({ message: 'No questions found for the given class and subject' });
    }

    const randomQuestions = getRandomQuestions(debate.questions, 15);

    res.json({ questions: randomQuestions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

function getRandomQuestions(questions, count) {
  const shuffled = questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

router.post('/insert-questions', async (req, res) => {
    try {
      const evsQuestions = [
        "What is the largest planet in our solar system?",
  "What do plants need to grow?",
  "Name one type of carnivore animal.",
  "What is the largest planet in our solar system?",
  "What do plants need to grow?",
  "Name one type of carnivore animal.",
  "What is the process called when plants make food?",
  "What is the largest mammal on Earth?",
  "What do we call the study of the Earth and its features?",
  "Name one type of herbivore animal.",
  "What is the water cycle?",
  "What is pollution?",
  "What is the importance of forests?",
  "How do animals adapt to their habitats?",
  "What is the difference between day and night?",
  "What is weather?",
  "What is climate?",
  "Name one renewable source of energy.",
  "What is the function of the roots of a plant?",
  "What is the function of the stem of a plant?",
  "What is the function of the leaves of a plant?",
  "What is soil erosion?",
  "What is conservation?",
  "What are natural resources?",
  "What is biodiversity?",
  "What is ecosystem?",
  "What is habitat?"
      ];
  
      const mathsQuestions = [
        "If I have 5 pencils and I give 2 to my friend, how many pencils do I have left?",
        "2 + 2 = ?",
        "5 - 1 = ?",
        // Add remaining questions
      ];
  
      const englishQuestions = [
        "What is the opposite of big?",
        "What is the plural of cat?",
        "What is the meaning of the word happy?",
        // Add remaining questions
      ];
  
      const questions = [
        {
          standard: "3",
          subject: "EVS",
          questions: evsQuestions,
        },
        {
          standard: "3",
          subject: "Maths",
          questions: mathsQuestions,
        },
        {
          standard: "3",
          subject: "English",
          questions: englishQuestions,
        },
      ];
  
      // Insert questions into the database
      const result = await Debate.insertMany(questions);
      res.status(201).json({ message: "Questions inserted successfully!", result });
    } catch (error) {
      console.error('Error inserting questions:', error);
      res.status(500).json({ message: "Error inserting questions", error });
    }
});

module.exports = router;