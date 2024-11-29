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

beep.beep();