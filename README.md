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
