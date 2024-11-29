
import type { CandleFetcher } from 'tradeexchanges';
import type { Candle, TickerCandle } from 'tradeexchanges/tradingCandles';

export class CryptoBeep {
    private candleFetcher: CandleFetcher;
    private symbol: string;
    private interval: number;
    private player;
    private up: string;
    private down: string;
    
    constructor(
        candleFetcher: CandleFetcher,
        symbol: string,
        interval: number,
        options: { 
            up: string, 
            down: string
            player: any
        }
    ) {
        this.candleFetcher = candleFetcher;
        this.symbol = symbol;
        this.interval = interval;
        this.up = options.up;
        this.down = options.down;
        this.player = options.player ?? require('play-sound');
    }
    

    async getLatestClosedCandle(): Promise<TickerCandle | null> {
        return this.candleFetcher.fetchCandles(
            this.symbol,
            this.interval,
            2
        ).then(
            (candles: TickerCandle[] | null) => {
                if (!candles) {
                    return null;
                }
                if (candles[0].close_timestamp <= Date.now()) {
                    return candles[0];
                }
                return candles[1];
            }
        )
    }

    beep() {
        return this
            .getLatestClosedCandle()
            .then(
                (latestCandle: TickerCandle) => {
                    if (!latestCandle) {
                        return;
                    }
                    
                    if (latestCandle.close > latestCandle.open) {
                        this.player.play(
                            this.up
                        );
                    }
                    /*
                    if (latestCandle.close < latestCandle.open) {
                        this.player.play(
                            this.down
                        )
                    }*/
                }
            )
    }
}
