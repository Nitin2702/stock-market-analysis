const axios = require("axios");
const fs = require("fs");
var BigData = require("./bigdata.json");

const url = "https://www.alphavantage.co/query";

const parameters = require('./settings.json');

const functions = [
  "SMA",
  "EMA",
  "WMA",
  "DEMA",
  "TEMA",
  "TRIMA",
  "KAMA",
  "MAMA",
  "VWAP",
  "T3",
  "MACD",
  "MACDEXT",
  "STOCH",
  "STOCHF",
  "RSI",
  "STOCHRSI",
  "WILLR",
  "ADX",
  "ADXR",
  "APO",
  "PPO",
  "MOM",
  "BOP",
  "CCI",
  "CMO",
  "ROC",
  "ROCR",
  "AROON",
  "AROONOSC",
  "MFI",
  "TRIX",
  "ULTOSC",
  "DX",
  "MINUS_DI",
  "PLUS_DI",
  "MINUS_DM",
  "PLUS_DM",
  "BBANDS",
  "MIDPOINT",
  "MIDPRICE",
  "SAR",
  "TRANGE",
  "ATR",
  "NATR",
  "ADOSC",
  "AD",
  "OBV",
  "HT_TRENDLINE",
  "HT_SINE",
  "HT_TRENDMODE",
  "HT_DCPERIOD",
  "HT_DCPHASE",
  "HT_PHASOR",
];

const Nifty50Companies = [
  "TCS.NS",
  "COALINDIA.NS",
  "WIPRO.NS",
  "BRITANNIA.NS",
  "BHARTIARTL.NS",
  "NESTLEIND.NS",
  "ONGC.NS",
  "TECHM.NS",
  "RELIANCE.NS",
  "ICICIBANK.NS",
  "MARUTI.NS",
  "BAJAJ-AUTO.NS",
  "NTPC.NS",
  "ZEEL.NS",
  "HEROMOTOCO.NS",
  "KOTAKBANK.NS",
  "ULTRACEMCO.NS",
  "TITAN.NS",
  "INDUSINDBK.NS",
  "ITC.NS",
  "HINDALCO.NS",
  "BAJAJFINSV.NS",
  "BAJFINANCE.NS",
  "TATASTEEL.NS",
  "CIPLA.NS",
  "LT.NS",
  "GRASIM.NS",
  "GAIL.NS",
  "SHREECEM.NS",
  "MM.NS",
];

var companiesWithCompletedData = [
  ["BAJAJ-AUTO.NS", false],
  ["BAJAJFINSV.NS", false],
  ["BAJFINANCE.NS", false],
  ["BHARTIARTL.NS", true],
  ["BRITANNIA.NS", true],
  ["CIPLA.NS", false],
  ["COALINDIA.NS", true],
  ["GAIL.NS", false],
  ["GRASIM.NS", false],
  ["HEROMOTOCO.NS", false],
  ["HINDALCO.NS", false],
  ["ICICIBANK.NS", true],
  ["INDUSINDBK.NS", false],
  ["ITC.NS", false],
  ["KOTAKBANK.NS", false],
  ["LT.NS", false],
  ["MARUTI.NS", false],
  ["MM.NS", false],
  ["NESTLEIND.NS", true],
  ["NTPC.NS", false],
  ["ONGC.NS", true],
  ["RELIANCE.NS", true],
  ["SHREECEM.NS", false],
  ["TATASTEEL.NS", false],
  ["TCS.NS", true],
  ["TECHM.NS", true],
  ["TITAN.NS", false],
  ["ULTRACEMCO.NS", false],
  ["WIPRO.NS", true],
  ["ZEEL.NS", false],
];

function getCompanies() {
  var companies = [];
  var tcompanies = Nifty50Companies;
  tcompanies.sort();
  for (var i = 0; i < tcompanies.length; i++) {
    if (fs.existsSync(`./company_data/${tcompanies[i]}.json`))
      companies.push([tcompanies[i], true]);
    else companies.push([tcompanies[i], false]);
  }
  return companies;
}

module.exports.companyNames = companiesWithCompletedData;
module.exports.functionNames = functions;

var PREVIOUS_TIME = +new Date();
var REMAINING_REQUESTS = 500;

module.exports.getFunction = async function(
  symbol = "RELIANCE.NS",
  func = "SMA"
) {
  var params = parameters;
  params.function = func;
  params.symbol = symbol;
  var response = await axios.default.get(url, { params: params });
  if (response.status != 200) {
    throw new Error(JSON.stringify(response));
  }
  REMAINING_REQUESTS -= 1;
  return response.data;
};

module.exports.getAllDataForCompany = async function(
  symbol = "RELIANCE.NS",
  func = functions
) {
  //process.stdout.write(":>\n\r")
  for (var i = 0; i < func.length && REMAINING_REQUESTS > 0; i++) {
    process.stdout.write(`${symbol}-${func[i]} : ${(((i+1)/func.length)*100).toPrecision(2)}% `.padEnd(30)+'\r');
    if(i>0) await sleep(20000);
    process.stdout.write(`${symbol}-${func[i]} : ${(((i+1)/func.length)*100).toPrecision(2)}% =>`.padEnd(30)+'\r');
    var data0 = await this.getFunction(symbol, func[i]);
    var initmeta = data0["Meta Data"];
    if (i === 0) this.initialiseBigData(initmeta);
    try {
      var currentIndicator = initmeta["2: Indicator"];
      this.addToBigData(data0, currentIndicator, initmeta["1: Symbol"]);
      storeData(BigData, "bigdata.json");
    } catch (ex) {
      console.log(data0, ex);
    }
  }
};

module.exports.getAllDataForAllCompanies = async function(
  symbols = Nifty50Companies,
  func = functions
) {
  for (var i = symbols.indexOf('ITC.NS')+1; i < symbols.length; i++) {
    await this.getAllDataForCompany(symbols[i], func);
  }
};

module.exports.addToBigData = function(
  data0 = {},
  currentIndicator = "",
  symbol = ""
) {
  //if (currentIndicator in BigData.Symbol[symbol]["Technical Analysis"]);
  //else BigData.Symbol[symbol]["Technical Analysis"][currentIndicator] = {};
  var technical = data0[Object.keys(data0)[1]];
  for (var date in technical) {
    if (date in BigData.Symbol[symbol]["Technical Analysis"]) {
      BigData.Symbol[symbol]["Technical Analysis"][date][currentIndicator] =
        technical[date];
    } else {
      BigData.Symbol[symbol]["Technical Analysis"][date] = {};
      BigData.Symbol[symbol]["Technical Analysis"][date][currentIndicator] =
        technical[date];
    }
  }
};

module.exports.initialiseBigData = function(initmeta = {}) {
  var symbol = initmeta["1: Symbol"];
  if (symbol in BigData.Symbol);
  else
    BigData.Symbol[symbol] = {
      "Meta Data": {
        Symbol: symbol,
        "Last Refreshed": initmeta["3: Last Refreshed"],
        Interval: initmeta["4: Interval"],
        "Time Period": initmeta["5: Time Period"],
        "Series Type": initmeta["6: Series Type"],
        "Time Zone": initmeta["7: Time Zone"],
      },
      "Technical Analysis": {},
    };
};

module.exports.distribute = function(refresh = false) {
  if (refresh === true) BigData = require("./bigdata.json");
  var folders = Object.keys(BigData["Symbol"]);
  for (var i = 0; i < folders.length; i++) {
    var folder = folders[i];
    storeData(BigData["Symbol"][folder], `${folder}.json`);
  }
};

function checkFlag() {
  var CURRENT_TIME = +new Date();
  if (CURRENT_TIME >= PREVIOUS_TIME + 12000) return;
  else setTimeout(checkFlag, 1000);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

this.getAllDataForAllCompanies().then(()=>{
    //storeData(BigData,'newbigdata.json');
    console.log('done');
    console.log('REMAINING REQUEST',REMAINING_REQUESTS);
}).catch(console.error());
/*this.getFunction(Nifty50Companies[0],'TRIMA').then((dat)=>{
    storeData(dat,'data.json');
    console.log('done');
}).catch(console.error);*/
//this.distribute(false);
//console.log(this.companyNames());
/*this.getAllDataForCompany('ITC.NS',this.functionNames.slice(this.functionNames.indexOf('BOP')+1)).then(()=>{
  console.log('success');
}).catch(console.error);*/