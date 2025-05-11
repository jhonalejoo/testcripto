export class Crypto {
    constructor(
      public id: string,
      public name: string,
      public symbol: string,
      public price_usd: string
    ) {}
  
    static fromApi(data: any): Crypto {
      return new Crypto(data.id, data.name, data.symbol, data.price_usd);
    }
  }