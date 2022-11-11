const checkCashRegister = (price, cash, cid) => {
  let cidObj = {};
  const makeObj = (cid) => {
    for(let i = 0; i < cid.length; i++) {
      cidObj[cid[i][0]] = cid[i][1];
    }
  }
  makeObj(cid);

  let sum = cash - price;
  function makeChange(sum, obj){
    let status = "";
    let diff = {};
    let h = 0;
    while(sum >= 100 && obj["ONE HUNDRED"] >= 100) {
      sum -= 100;
      obj["ONE HUNDRED"] -= 100;
      h += 100;
      diff["ONE HUNDRED"] = h;
    }

    let tw = 0;
    while(sum >= 20 && obj.TWENTY) {
      sum -= 20;
      obj.TWENTY -= 20;
      tw += 20;
      diff["TWENTY"] = tw;
    }

    let ten = 0;
    while(sum >= 10 && obj.TEN >= 10){
      sum -= 10;
      obj.TEN -= 10;
      ten += 10;
      diff["TEN"] = ten;
    }

    let f = 0;
    while(sum >= 5 && obj.FIVE >= 5) {
      sum -= 5;
      obj.FIVE -= 5;
      f += 5;
      diff["FIVE"] = f;
    }

    let o = 0;
    while(sum >= 1 && obj.ONE >= 1) {
      sum -= 1;
      obj.ONE -= 1;
      o += 1;
      diff["ONE"] = o;

    }
    let q = 0;
    while(sum >= 0.25 && obj.QUARTER >= 0.25){
      sum -= .25;
      obj.QUARTER -= .25;
      q += .25;
      diff["QUARTER"] = q;
    }
    let d = 0;
    while(sum >= .1 && obj.DIME >= .1){
      sum -= .1;
      obj.DIME -= .1;
      d += .1;
      diff["DIME"] =d;
    }
    let n = 0;
    while(sum >= .05 && obj.NICKEL >= .05){
      sum -= .05;
      obj.NICKEL -.05;
      n += .05
      diff["NICKEL"] = n;
    }
    let p = 0;
    while(sum >= .001 && obj.PENNY >= .001){
      sum = Math.round(sum * 100)/100;
      sum -= .01;
      obj.PENNY -= .01;
      p += .01;
      diff["PENNY"] = Math.round(p*100)/100;
    }

    let remain = 0;
    for(let i = 0; i < Object.values(obj).length; i++){
      remain += Object.values(obj)[i];
    }

    if(sum > 0.00){
      status = "INSUFFICIENT_FUNDS"
      diff = {};
    } else if(sum > -1 && remain > 0){
      status = "OPEN"
    } else if(sum > -1 && remain > -1){
      status = "CLOSED";
      diff = {};
      diff["PENNY"] = Math.round(p*100)/100;
      diff["NICKEL"] = n;
      diff["DIME"] = d;
      diff["QUARTER"] = q;
      diff["ONE"] = o;
      diff["FIVE"] = f;
      diff["TEN"] = ten;
      diff["TWENTY"] = tw;
      diff["ONE HUNDRED"] = h;
      }
    let change = [];
    for(let j = 0; j < Object.keys(diff).length; j++){
      change.push([Object.keys(diff)[j], Object.values(diff)[j]]);
    }
    let result = {
      "status": status,
      "change": change
    }
    return result;
  }
  return makeChange(sum, cidObj);
}
