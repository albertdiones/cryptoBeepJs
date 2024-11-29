
import type { CandleFetcher } from 'tradeexchanges';

export class CryptoBeep {
    private candleFetcher: CandleFetcher;
    private symbol: string;
    private interval: number;
    private options: { up: string, down: string };
    
    constructor(
        candleFetcher: CandleFetcher,
        symbol: string,
        interval: number,
        options: { up: string, down: string }
    ) {
        this.candleFetcher = candleFetcher;
        this.symbol = symbol;
        this.interval = interval;
        this.options = options;
    }
    
    
}