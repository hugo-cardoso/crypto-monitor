export type HttpOptions = {
  headers: {
    [key: string]: string;
  },
  body?: string;
}

export interface IHttp {
  get: (url: string, options?: HttpOptions) => Promise<any>;
}

export type Token = {
  id: string;
  value: number;
  changes_24h: number;
}

export type TokenList = Token[];