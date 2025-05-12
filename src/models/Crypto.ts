/// Modelo que representa una criptomoneda
export class Crypto {
  constructor(
    public id: string,
    public name: string,
    public symbol: string,
    public price_usd: string,
    public percent_change_24h?: string,
    public market_cap_usd?: string,
    public volume24?: string,
    public csupply?: string,
    public rank?: string
  ) {}

  static fromApi(data: any): Crypto {
    return new Crypto(
      data.id,
      data.name,
      data.symbol,
      data.price_usd,
      data.percent_change_24h,
      data.market_cap_usd,
      data.volume24,
      data.csupply,
      data.rank
    );
  }
}
