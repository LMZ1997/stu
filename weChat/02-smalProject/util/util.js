function starNumToArray(stars) {            //注意函数写法
  var arr = [];
  var num = stars.toString().substring(0, 1)
  for (var i = 0; i < 5; i++) {
    if (i < num) {
      arr.push(1)
    }
    else {
      arr.push(0)
    }
  }
  return arr;
}

module.exports={
  starNumToArray: starNumToArray
}