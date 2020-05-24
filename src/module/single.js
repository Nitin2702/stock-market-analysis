const {getAllDataForCompany} = require('./alpha_vantage');
getAllDataForCompany('ICICIBANK.NS',['BOP']).then(()=>{
    console.log('success');
}).catch(console.error);