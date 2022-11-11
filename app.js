const makeObj = (cid) => {
  const obj = {};
  cid.map(denom => obj[denom[0]] = denom[1])
  return obj;
}

const regi = (sum, cidObj) => {
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

const makeChange = (sum, obj) => {
  const regiObj = regi(sum, obj);

  let h = 0;
  while(regiObj.sum >= 100 && regiObj.cidObj["ONE HUNDRED"] >= 100) {
    regiObj.sum -= 100;
    regiObj.cidObj["ONE HUNDRED"] -= 100;
    h += 100;
    regiObj.diff["ONE HUNDRED"] += 100;
  }

  let tw = 0;
  while(regiObj.sum >= 20 && regiObj.cidObj.TWENTY) {
    regiObj.sum -= 20;
    regiObj.cidObj.TWENTY -= 20;
    tw += 20;
    regiObj.diff["TWENTY"] = tw;
  }

  let ten = 0;
  while(regiObj.sum >= 10 && regiObj.cidObj.TEN >= 10){
    regiObj.sum -= 10;
    regiObj.cidObj.TEN -= 10;
    ten += 10;
    regiObj.diff["TEN"] = ten;
  }

  let f = 0;
  while(regiObj.sum >= 5 && regiObj.cidObj.FIVE >= 5) {
    regiObj.sum -= 5;
    regiObj.cidObj.FIVE -= 5;
    f += 5;
    regiObj.diff["FIVE"] = f;
  }

  let o = 0;
  while(regiObj.sum >= 1 && regiObj.cidObj.ONE >= 1) {
    regiObj.sum -= 1;
    regiObj.cidObj.ONE -= 1;
    o += 1;
    regiObj.diff["ONE"] = o;

  }
  let q = 0;
  while(regiObj.sum >= 0.25 && regiObj.cidObj.QUARTER >= 0.25){
    regiObj.sum -= .25;
    regiObj.cidObj.QUARTER -= .25;
    q += .25;
    regiObj.diff["QUARTER"] = q;
  }
  let d = 0;
  while(regiObj.sum >= .1 && regiObj.cidObj.DIME >= .1){
    regiObj.sum -= .1;
    regiObj.cidObj.DIME -= .1;
    d += .1;
    regiObj.diff["DIME"] =d;
  }

  let n = 0;
  while(regiObj.sum >= .05 && regiObj.cidObj.NICKEL >= .05){
    regiObj.sum -= .05;
    regiObj.cidObj.NICKEL -.05;
    n += .05
    regiObj.diff["NICKEL"] = n;
  }

  let p = 0;
  while(regiObj.sum >= .001 && regiObj.cidObj.PENNY >= .001){
    regiObj.sum = Math.round(regiObj.sum * 100)/100;
    regiObj.sum -= .01;
    regiObj.cidObj.PENNY -= .01;
    p += .01;
    regiObj.diff["PENNY"] = Math.round(p*100)/100;
  }

  let remain = 0;
  Object.values(obj).forEach(val => remain += val);

  let newObj = {};
  if(regiObj.sum > 0.00){
    regiObj.status = "INSUFFICIENT_FUNDS"
  } else if(regiObj.sum > -1 && remain > 0){
    regiObj.status = "OPEN";
    Object.keys(regiObj.diff).map((key) => {
      if (regiObj.diff[key] > 0) {
        newObj[key] = regiObj.diff[key]
      }
    })
    // console.log(newObj);
  } else if(regiObj.sum > -1 && remain > -1){
    regiObj.status = "CLOSED";
    newObj = regiObj.diff;
    // regiObj.diff = {};
    // regiObj.diff["PENNY"] = Math.floor(p*100)/100;
    // regiObj.diff["NICKEL"] = n;
    // regiObj.diff["DIME"] = d;
    // regiObj.diff["QUARTER"] = q;
    // regiObj.diff["ONE"] = o;
    // regiObj.diff["FIVE"] = f;
    // regiObj.diff["TEN"] = ten;
    // regiObj.diff["TWENTY"] = tw;
    // regiObj.diff["ONE HUNDRED"] = h;
    }
  let change = [];
  if (regiObj.status === "OPEN" || regiObj.status === "INSUFFICIENT FUNDS") {
    for(let j = 0; j < Object.keys(newObj).length; j++){
      change.push([Object.keys(newObj)[j], Object.values(newObj)[j]]);
    }
  } else if (regiObj.status === "CLOSED") {
      for(let j = 0; j < Object.keys(newObj).length; j++){
        change.unshift([Object.keys(newObj)[j], Object.values(newObj)[j]]);
  }}
  let result = {
    "status": regiObj.status,
    "change": change
  }
  return result;
}

const checkCashRegister = (price, cash, cid) => {
  let cidObj = makeObj(cid);

  let sum = cash - price;

  return makeChange(sum, cidObj);
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
