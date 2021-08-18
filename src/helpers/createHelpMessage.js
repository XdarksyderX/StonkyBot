const createHelpMessage = () => {
  return `**Available commands:** 
**price**: return the cryptocurrency price and stats -> !price amount(1) crypto currency(usd)
**alert**: create an alert for the price -> !alert crypto goalprice currency(usd)
    `;
};

module.exports.createHelpMessage = createHelpMessage;