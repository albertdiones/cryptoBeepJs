## CryptoBeep


Deps:
 * CandleFetcher from tradeExchanges lib from github
 * One of the exchanges implement tradeExchanges lib from github



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
 * [x] Create first test
 * [x] Dep: heartbeep
 * [x] Dev Dep: KuCoin
 * [x] Find sound (freesound.org??)
 * [x] Test cryptoBeep construct(fetcher: CandleFetcher, symbol: string, interval: number)
 * [x] Test: cryptoBeep.getLatestClosedCandle()
 * [x] Test: beep()
