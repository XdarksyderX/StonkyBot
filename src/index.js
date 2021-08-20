
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});
const format = require('format-number');
const { createHelpMessage } = require('./helpers/createHelpMessage');

const getSymbolFromCurrency = require("currency-symbol-map");

const { getCryptoPrice } = require("./helpers/getCryptoPrice");
const { createCryptoAlert } = require("./helpers/createCryptoAlert");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}.`);
});

client.on("message", async (message) => {
  const prefix = "<";

  if (message.content[0] !== prefix) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLocaleLowerCase();

  switch (cmd) {
    case "ping":
      message.reply("Pong");
      break;

    case "price":
      if (isNaN(args[0])) args.unshift(1);
      if (args[2] === undefined) args[2] = "USD";
      const data = await getCryptoPrice(args[1], args[2].toLocaleLowerCase());
      try {
        
        message.reply(
          `${args[0]} ${data.symbol.toUpperCase()} => ${
            getSymbolFromCurrency(args[2].toLocaleUpperCase()) ||
            '$'
          }${format()(data.price * args[0])}    Price change: 1h  ${data.variancy['1h'] >= 0 ? ':green_circle:' : ':red_circle:'} ${data.variancy['1h']}%   |   24h  ${data.variancy['24h'] >= 0 ? ':green_circle:' : ':red_circle:'} ${data.variancy['24h']}% more info at https://coingecko.com/en/coins/${args[1]}`
        );
      } catch (err) {
        message.reply('Was an error with this crypto')
      }
      break;
        
    case "alert":
      try {

        createCryptoAlert(args[0], args[1], args[2], message);
      }
      catch (err) {
        message.reply('Was an error creating the alert');
      }
      break;

    case 'help':
      message.reply(createHelpMessage());
      break;

    default:
      message.reply('Unkowed command, please see <help')
  }
});
client.login("");
