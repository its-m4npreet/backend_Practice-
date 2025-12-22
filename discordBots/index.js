const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}! Bot is ready!`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ignore other bots

  // This will respond to "hi", "hii", "Hi", "HII", etc.
  if (message.content.toLowerCase().trim() === 'hii' || 
      message.content.toLowerCase().trim() === 'hi') {
        // console.log(message.author.globalName)
    message.reply(`Hello! ${message.author.globalName}`);
  }
});

// <<<--- ADD YOUR TOKEN HERE (replace the text inside the quotes)
client.login(process.env.token);