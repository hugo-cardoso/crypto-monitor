import moment from 'moment';
import chalk from 'chalk';
import { table } from 'table';
import { HttpService } from './services/Http';
import { CoinGeckoService } from './services/CoinGecko';
import { formatPrice } from './utils/formatPrice';
import type { TokenList } from './types';

export class App {
  tokenIdList: string[] = [];
  currency = 'BRL';
  updateInterval = 5;
  coinGeckoService = new CoinGeckoService(new HttpService());

  constructor(tokenIdList: string[], currency: string) {
    this.tokenIdList = tokenIdList;
    this.currency = currency;
    this.init();
  }

  init() {
    this.renderLoading();

    setInterval(async () => {
      const tokenList = await this.coinGeckoService.getCoinsPrice(this.tokenIdList, this.currency);
      this.render(tokenList);
    }, this.updateInterval * 1000);
  }

  renderLoading() {
    console.clear();
    console.log(chalk.gray('Loading...'));
  }

  render(tokenList: TokenList) {
    const formatPercentage = (percentage: number) => chalk[percentage >= 0 ? 'green' : 'red'](percentage.toFixed(2));

    console.clear();

    const tableHeaders = ['Token', 'Price', '24h Change'];

    console.log(table([
      tableHeaders.map(title => chalk.white.bold(title)),
      ...tokenList.map(token => ([
        token.id,
        formatPrice(token.value, this.currency),
        formatPercentage(token.changes_24h)
      ]))
    ]))

    console.log(chalk.gray(`Updated at ${moment().format('HH:mm:ss')}`));
  }
}
