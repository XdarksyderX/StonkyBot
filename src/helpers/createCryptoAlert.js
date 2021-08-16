const { getCryptoPrice } = require("./getCryptoPrice");


const createCryptoAlert = async (coin, goalPrice, currency, message, db) => {

  if (currency === undefined) currency = 'USD';
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