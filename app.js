const makeObj = (cid) => {
  const obj = {};
  cid.map(denom => obj[denom[0]] = denom[1])
  return obj;
}

const makeRegi = (sum, cidObj) => {
  const obj = {
    sum: sum,
    status: '',
    diff: {
      "ONE HUNDRED": 0,
      "TWENTY": 0,
      "TEN": 0,
      "FIVE": 0,
      "ONE": 0,
      "QUARTER": 0,
      "DIME": 0,
      "NICKEL": 0,
      "PENNY": 0
    },
    cidObj: cidObj
  }
  return obj;
}

const updateRegister = (regiObj, number, name) => {
  regiObj.sum -= number;
  regiObj.cidObj[name] -= number;
  regiObj.diff[name] += number;
  return regiObj;
}

const makeChange = (regiObj) => {
  const valueRef = {
      "ONE HUNDRED": 100,
      "TWENTY": 20,
      "TEN": 10,
      "FIVE": 5,
      "ONE": 1,
      "QUARTER": 0.25,
      "DIME": 0.1,
      "NICKEL": 0.5,
      // "PENNY": 0.01
  }

  Object.keys(valueRef).map((key) => {
    while (regiObj.sum >= valueRef[key] && regiObj.cidObj[key] >= valueRef[key]) {
      regiObj = updateRegister(regiObj, valueRef[key], key);
    }
  })

  while(regiObj.sum >= .001 && regiObj.cidObj.PENNY >= .001){
    regiObj = updateRegister(regiObj, .01, "PENNY");
    regiObj.diff.PENNY = Math.round(regiObj.diff.PENNY*100)/100;
  }

  let remain = 0;
  Object.values(regiObj.cidObj).forEach(val => remain += val);

  let changeObj = {};
  if(regiObj.sum > 0.00){
    regiObj.status = "INSUFFICIENT_FUNDS"
  } else if(regiObj.sum > -1 && remain > 0){
    regiObj.status = "OPEN";
    Object.keys(regiObj.diff).map((key) => {
      if (regiObj.diff[key] > 0) {
        changeObj[key] = regiObj.diff[key]
      }
    })
  } else if(regiObj.sum > -1 && remain > -1){
    regiObj.status = "CLOSED";
    changeObj = regiObj.diff;
    }
  let change = [];
  if (regiObj.status === "OPEN") {
    Object.keys(changeObj).forEach((key) => {
      change.push([key, changeObj[key]])
    })
  } else if (regiObj.status === "CLOSED") {
      Object.keys(changeObj).forEach((key) => {
        change.unshift([key, changeObj[key]])
    })
    }
  let result = {
    "status": regiObj.status,
    "change": change
  }
  return result;
}

const checkCashRegister = (price, cash, cid) => {
  const register = makeRegi((cash - price), makeObj(cid));

  return makeChange(register);
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
