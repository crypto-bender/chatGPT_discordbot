//Create a Discord Bot using OpenAi API
require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent
]})

const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_KEY
});

const openai = new OpenAIApi(configuration);

client.on('messageCreate', async function(message) {
  try {
    if(message.author.bot) return
    const gptResponse = await openai.createCompletion({
      model: "davinci",
      prompt: `ChatGPT is a friendly chatbot. \n\
      ChatGPT: Hello, how are you? \n\
      ${message.author.username}: ${message.content} \n\
      ChatGPT:`,
      temperature: 0.9,
      max_tokens: 100,
      stop: ["ChatGPT:", "Daniel Chu:"]
    })
    message.reply(`${gptResponse.data.choices[0].text}`);
    return;
    // console.log(message.content)
    // message.reply(`You said: ${message.content}`);
  } catch(err) {
    console.log(err)
  }
})

client.login(process.env.DISCORD_TOKEN);
console.log("ChatGPT IN DA HAUS")