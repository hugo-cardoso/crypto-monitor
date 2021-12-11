#!/usr/bin/env node

const term = require( 'terminal-kit' ).terminal ;
const { program } = require('commander');
const package = require('./package.json');
const moment = require('moment');
const axios = require('axios');

axios.defaults.baseURL = 'http://api.coingecko.com/api/v3';

const getPrices = async (ids, currency) => {
  const path = `/simple/price?ids=${ids.join(',')}&vs_currencies=${ currency }&include_24hr_change=true`;
  const response = await axios.get(path);
  return response.data;
}

const formatPrice = (price, currency) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
  }).format(price);
}

const styledPercentage = (percent) => {
  const parsedPercent = percent.toFixed(2);

  if (percent > 0) return `^G${ parsedPercent }%^`;
  return `^R${ parsedPercent }%^`;
}

term.clear();
term('Loading...');


const init = (coins, currency) => {
  setInterval(async () => {
  
    let prices = await getPrices(coins, currency);
  
    term.clear();
  
    term.table([
      ['ID', 'Current Price', '24hs % change'],
      ...coins.map(watch => ([
        watch,
        formatPrice(prices[watch][currency.toLocaleLowerCase()], currency),
        styledPercentage(prices[watch][`${ currency.toLocaleLowerCase() }_24h_change`])
      ]))
    ], {
      contentHasMarkup: true,
    });
  
    term.gray(`Updated at ${ moment().format('HH:mm:ss') }`);
  }, 5000);
}

program.version(package.version);

program
  .command('watch [coins]')
  .description('Watch crypto coins')
  .option('-curr, --currency [currency]', 'Curreny to watch')
  .action((coins, options) => {

    const WATCH_COINS = coins.split(',') || [];
    const CURRENCY = options.currency || 'BRL';

    init(WATCH_COINS, CURRENCY);
  });

program.parse(process.argv);