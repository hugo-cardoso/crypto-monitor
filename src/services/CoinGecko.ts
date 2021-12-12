import { IHttp, TokenList } from '../types';

export class CoinGeckoService {
  private baseUrl = 'https://api.coingecko.com/api/v3/';

  constructor(private http: IHttp) {}

  public async getCoinsPrice(tokenIdList: string[], currency: string): Promise<TokenList> {
    try {
      const path = `${ this.baseUrl }/simple/price?ids=${tokenIdList.join(',')}&vs_currencies=${ currency }&include_24hr_change=true`;
      const { data } = await this.http.get(path);

      const parsedData: TokenList = [];
      
      for (const coinId in data) {
        parsedData.push({
          id: coinId,
          value: data[coinId][currency.toLowerCase()],
          changes_24h: data[coinId][`${currency.toLowerCase()}_24h_change`],
        });
      }

      return parsedData;
    } catch (error) {
      return [];
    }
  }
}
