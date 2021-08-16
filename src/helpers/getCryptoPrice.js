const CoinGecko = require("coingecko-api");

const getCryptoPrice = async (coin, currency) => {
  const CoinGeckoClient = new CoinGecko();
  let result = await CoinGeckoClient.coins.fetch(coin, {});
  const symbol = result.data.symbol;
  const price = result.data.market_data.current_price[currency] || result.data.market_data.current_price.usd;

  return {
    symbol,
    price,
  };
};

module.exports.getCryptoPrice = getCryptoPrice;
