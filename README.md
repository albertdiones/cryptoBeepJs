## CryptoBeep


Deps:
 # CandleFetcher from tradeExchanges lib from github
 # One of the exchanges implement tradeExchanges lib from github



Sample Code:
```
const beep = new CryptoBeep(
    okx,
    1, // 1 minute candle
    {
        up: 'assets/up.wav',
        down: 'assets/down.wav',
    }
);
```

Todos:
 * [ ] Create first test
 * [x] Dep: heartbeep
 * [ ] Dev Dep: KuCoin
 * [ ] Find sound (freesound.org??)
 * [ ] Test cryptoBeep construct(fetcher: CandleFetcher, symbol: string, interval: number)
 * [ ] Test: cryptoBeep.getLatestClosedCandle()
 * [ ] Test: beep()