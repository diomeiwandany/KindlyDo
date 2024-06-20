const { OpenAI } = require('openai');
require('dotenv').config();

module.exports = async function openAI(tasks, command) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: command }],
        model: "gpt-3.5-turbo",
    });

    // console.log(completion.choices[0]);
    return completion.choices[0].message.content;
}