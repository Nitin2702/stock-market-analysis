const SMA = {
    title: 'SMA',
    description: 'Moving Averages are used to smooth the data in an array to help eliminate noise and identify trends. The Simple Moving Average is literally the simplest form of a moving average. Each output value is the average of the previous n values. In a Simple Moving Average, each value in the time period carries equal weight, and values outside of the time period are not included in the average. This makes it less responsive to recent changes in the data, which can be useful for filtering out those changes.'
};

const EMA = {
    title: 'EMA',
    description: 'The Exponential Moving Average is a staple of technical analysis and is used in countless technical indicators. In a Simple Moving Average, each value in the time period carries equal weight, and values outside of the time period are not included in the average. However, the Exponential Moving Average is a cumulative calculation, including all data. Past values have a diminishing contribution to the average, while more recent values have a greater contribution. This method allows the moving average to be more responsive to changes in the data.<br/>'
}

module.exports.getDescription = function(input=""){
    if(input.toUpperCase().includes("SMA")) return SMA;
    if(input.toUpperCase().includes("DEMA")) return SMA;
    if(input.toUpperCase().includes("TEMA")) return SMA;
    if(input.toUpperCase().includes("EMA")) return EMA;
    if(input.toUpperCase().includes("WMA")) return SMA;
    if(input.toUpperCase().includes("TRIMA")) return SMA;
    if(input.toUpperCase().includes("KAMA")) return SMA;
    if(input.toUpperCase().includes("MAMA")) return SMA;
    if(input.toUpperCase().includes("T3")) return SMA;
    if(input.toUpperCase().includes("MACDEXT")) return SMA;
    if(input.toUpperCase().includes("MACD")) return SMA;
    if(input.toUpperCase().includes("STOCHF")) return SMA;
    if(input.toUpperCase().includes("STOCHF")) return SMA;
    if(input.toUpperCase().includes("STOCHRSI")) return SMA;
    if(input.toUpperCase().includes("RSI")) return SMA;
    if(input.toUpperCase().includes("WILLR")) return SMA;
    if(input.toUpperCase().includes("ADXR")) return SMA;
    if(input.toUpperCase().includes("ADX")) return SMA;
    if(input.toUpperCase().includes("APO")) return SMA;
    if(input.toUpperCase().includes("PPO")) return SMA;
    if(input.toUpperCase().includes("MOM")) return SMA;
    if(input.toUpperCase().includes("BOP")) return SMA;
    if(input.toUpperCase().includes("CCI")) return SMA;
    if(input.toUpperCase().includes("CMO")) return SMA;
    if(input.toUpperCase().includes("RATE OF CHANGE RATIO")) return SMA;
    if(input.toUpperCase().includes("RATE OF CHANGE")) return SMA;
    if(input.toUpperCase().includes("AROONOSC")) return SMA;
    if(input.toUpperCase().includes("AROON")) return SMA;
    if(input.toUpperCase().includes("MFI")) return SMA;
    if(input.toUpperCase().includes("TRIX")) return SMA;
    if(input.toUpperCase().includes("ULTOSC")) return SMA;
    if(input.toUpperCase().includes("DX")) return SMA;
    if(input.toUpperCase().includes("MINUS_DI")) return SMA;
    if(input.toUpperCase().includes("PLUS_DI")) return SMA;
    if(input.toUpperCase().includes("MINUS_DM")) return SMA;
    if(input.toUpperCase().includes("PLUS_DM")) return SMA;
    if(input.toUpperCase().includes("BBANDS")) return SMA;
    if(input.toUpperCase().includes("MIDPOINT")) return SMA;
    if(input.toUpperCase().includes("MIDPRICE")) return SMA;
    if(input.toUpperCase().includes("SAR")) return SMA;
    if(input.toUpperCase().includes("TRANGE")) return SMA;
    if(input.toUpperCase().includes("ATR")) return SMA;
    if(input.toUpperCase().includes("NATR")) return SMA;
    if(input.toUpperCase().includes("ADOSC")) return SMA;
    if(input.toUpperCase().includes("CHAIKIN")) return SMA;
    if(input.toUpperCase().includes("OBV")) return SMA;
    if(input.toUpperCase().includes("HT_TRENDLINE")) return SMA;
    if(input.toUpperCase().includes("HT_SINE")) return SMA;
    if(input.toUpperCase().includes("HT_TRENDMODE")) return SMA;
    if(input.toUpperCase().includes("HT_DCPERIOD")) return SMA;
    if(input.toUpperCase().includes("HT_DCPHASE")) return SMA;
    if(input.toUpperCase().includes("HT_PHASOR")) return SMA;
}