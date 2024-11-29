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