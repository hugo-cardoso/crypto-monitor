import axios from 'axios';
import type { IHttp, HttpOptions } from '../types';

export class HttpService implements IHttp {
  public async get(url: string, options?: HttpOptions): Promise<any> {
    return axios.get(url, options);
  }
}