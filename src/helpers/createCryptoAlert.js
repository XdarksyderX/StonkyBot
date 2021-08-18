const { getCryptoPrice } = require("./getCryptoPrice");
const getSymbolFromCurrency = require("currency-symbol-map");

const createCryptoAlert = async (coin, goalPrice, currency, message) => {
  if (currency === undefined) currency = 'USD';
  message.reply(`**Alert created**: **Coin:** ${coin} **Goal Price:** ${getSymbolFromCurrency(currency)}${goalPrice}`);
  const intervalId = setInterval(async () => {
    const currentPrice = (await getCryptoPrice(coin, currency)).price;
    if (goalPrice < currentPrice) {
      if (currentPrice <= goalPrice) {
        message.reply(`@everyone ${(coin.charAt(0).toUpperCase() + coin.slice(1))} has arrived that price, ${goalPrice}`);
        clearInterval(intervalId);
      }
    } else {
      if (currentPrice >= goalPrice) {
        message.reply(`@everyone ${(coin.charAt(0).toUpperCase() + coin.slice(1))} has arrived that price, ${goalPrice}`);
        clearInterval(intervalId);
      }
    }
  }, 1 * 1000);
};

module.exports.createCryptoAlert = createCryptoAlert;