export interface StockModel {
    name: string;
    price: number;
    currency: string;
    change: number;
    changePercentage: number;
    lastTradeTime: string;
    volume: number;
    date: string;
}