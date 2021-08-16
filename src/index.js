require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});


const getSymbolFromCurrency = require("currency-symbol-map");

const { getCryptoPrice } = require("./helpers/getCryptoPrice");
const { createCryptoAlert } = require("./helpers/createCryptoAlert");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}.`);
});

client.on("message", async (message) => {
  const prefix = "!";

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
      message.reply(
        `${args[0]} ${data.symbol.toUpperCase()} => ${
          getSymbolFromCurrency(args[2].toLocaleUpperCase()) ||
          args[2].toLocaleUpperCase()
        }${data.price * args[0]}`
      );
      break;

    case "alert":
      createCryptoAlert(args[0], args[1], args[2], message);
      break;
  }
});
client.login(process.env.API);
