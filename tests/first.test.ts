import { test, expect } from '@jest/globals'
import type { CandleFetcher } from 'tradeexchanges';
import KuCoin from 'tradeexchanges-KuCoin/kucoin';
import HttpClient from 'nonChalantJs'
import { CryptoBeep } from '..';

export class CacheViaNothing {
    async getItem(key: string): Promise<string | null> {
        return null;
    }
  
    setItem(
        key: string, 
        value: string,
        expirationSeconds: number
    ): void { 
    }
}

test(
    'cryptoBeep construct test',
    async () => {

        const kuCoin: CandleFetcher = new KuCoin(
            new HttpClient(
                { 
                    cache: new CacheViaNothing()
                }
            ),
            {
                logger: console
            }
        );
        const beep = new CryptoBeep(
            kuCoin,
            'BTC-USDT', // symbol
            1, // 1 minute candle
            {
                up: 'assets/up.wav',
                down: 'assets/down.wav',
            }
        );
    }
);

test(
    'cryptoBeep.getLatestClosedCandle()',
    async () => {

        const kuCoin: CandleFetcher = new KuCoin(
            new HttpClient(
                { 
                    cache: new CacheViaNothing()
                }
            ),
            {
                logger: console
            }
        );

        const beep = new CryptoBeep(
            kuCoin,
            'BTC-USDT', // symbol
            1, // 1 minute candle
            {
                up: 'assets/up.wav',
                down: 'assets/down.wav',
            }
        );

        const candle = await beep.getLatestClosedCandle();
        
        expect(candle).not.toBeNull();

        if (!candle) {
            throw "Candle is null"
        }
        console.log(candle);
        expect(candle.close).not.toBeFalsy();
        expect(candle.open).not.toBeFalsy();
    }
);

class MockCandleFetcher {
    async fetchCandles(symbol: string, interval: number, limit: number): Promise<TickerCandle[] | null> {


        const currentMinute = Math.floor((Date.now()-1)/60000);
        const currentMinuteSecondOpen = currentMinute*60000;

        return Promise.resolve([
            {
                open: 96820.5,
                high: 96824.9,
                low: 96820.5,
                close: 96824.8,
                base_volume: 0.56790463,
                quote_volume: 54985.496884781,
                open_timestamp: currentMinuteSecondOpen,
                close_timestamp: currentMinuteSecondOpen+59999,
            },
            {
                open: 96820.5,
                high: 96824.9,
                low: 96820.5,
                close: 96824.8,
                base_volume: 0.56790463,
                quote_volume: 54985.496884781,
                open_timestamp: currentMinuteSecondOpen-60000,
                close_timestamp: currentMinuteSecondOpen-1,
            }
        ]);
    }
}


test(
    'cryptoBeep.getLatestClosedCandle()',
    async () => {

        const beep = new CryptoBeep(
            new MockCandleFetcher(),
            'BTC-USDT', // symbol
            1, // 1 minute candle
            {
                up: 'assets/up.wav',
                down: 'assets/down.wav',
            }
        );

        const candle = await beep.getLatestClosedCandle();
        
        expect(candle).not.toBeNull();

        if (!candle) {
            throw "Candle is null"
        }
        console.log(candle);
        expect(candle.close).not.toBeFalsy();
        expect(candle.open).not.toBeFalsy();
    }
);



class MockPlayer {
    playedSound:string[] = [];
    play(
        file: string,
        errorHandler: () => void,
    ) {
        this.playedSound.push(file);
        // const actualPlayer = require('play-sound')();
        // actualPlayer.play(`./${file}`, (error) => {});
    }
}



test(
    'cryptoBeep.beep()',
    async () => {

        const player = new MockPlayer();

        const expectedSound = 'assets/up.wav';

        const beep = new CryptoBeep(
            new MockCandleFetcher(),
            'BTC-USDT', // symbol
            1, // 1 minute candle
            {
                up: expectedSound,
                down: 'assets/down.wav',
                player: player
            }
        );

        await beep.beep();

        expect(player.playedSound).toContain(expectedSound);
    }
);


class MockCandleFetcherDown {
    async fetchCandles(symbol: string, interval: number, limit: number): Promise<TickerCandle[] | null> {


        const currentMinute = Math.floor((Date.now()-1)/60000);
        const currentMinuteSecondOpen = currentMinute*60000;

        return Promise.resolve([
            {
                open: 96820.5,
                high: 96824.9,
                low: 96820.5,
                close: 96824.8,
                base_volume: 0.56790463,
                quote_volume: 54985.496884781,
                open_timestamp: currentMinuteSecondOpen,
                close_timestamp: currentMinuteSecondOpen+59999,
            },
            {
                open: 96824.8,
                high: 96824.9,
                low: 96820.5,
                close: 96720.5,
                base_volume: 0.56790463,
                quote_volume: 54985.496884781,
                open_timestamp: currentMinuteSecondOpen-60000,
                close_timestamp: currentMinuteSecondOpen-1,
            }
        ]);
    }
}


test(
    'cryptoBeep.beep() down',
    async () => {

        const player = new MockPlayer();

        const expectedSound = 'assets/down.wav';

        const beep = new CryptoBeep(
            new MockCandleFetcherDown(),
            'BTC-USDT', // symbol
            1, // 1 minute candle
            {
                up: 'assets/up.wav',
                down: expectedSound,
                player: player
            }
        );

        await beep.beep();

        expect(player.playedSound).toContain(expectedSound);
    }
);



test(
    'cryptoBeep.getDownTime()',
    async () => {
        const beep = new CryptoBeep(
            new MockCandleFetcherDown(),
            'BTC-USDT', // symbol
            1, // 1 minute candle
            {
                up: 'assets/up.wav',
                down:  'assets/down.wav',
                player: new MockPlayer()
            }
        );

        const downtime = beep.getDownTime(
            1732851959001
        );

        expect(downtime).toBe(1999);
    }
);



