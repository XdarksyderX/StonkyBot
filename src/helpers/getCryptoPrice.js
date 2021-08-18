const CoinGecko = require("coingecko-api");

const getCryptoPrice = async (coin, currency) => {
  try {
    const CoinGeckoClient = new CoinGecko();
    let result = await CoinGeckoClient.coins.fetch(coin, {});
    const symbol = result.data.symbol;
    const price =
      result.data.market_data.current_price[currency] ||
      result.data.market_data.current_price.usd;
    const variancy = {
      "1h": result.data.market_data.price_change_percentage_1h_in_currency[
        currency
      ],
      "24h":
        result.data.market_data.price_change_percentage_24h_in_currency[
          currency
        ],
    };

    return {
      symbol,
      price,
      variancy
    };
  } catch (err) {
    return {
      symbol: undefined,
      price: undefined,
      variancy: undefined
    };
  }
};

module.exports.getCryptoPrice = getCryptoPrice;
