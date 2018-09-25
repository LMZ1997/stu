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

function getMovieData(url, success) {
  wx.request({
    url: url,
    success: function (res) {
      success(formatData(res.data))
    }
  })
}
function formatData(data) {//目的是只获取需要用的数据
  var arr = [];
  for (var i = 0; i < data.subjects.length; i++) {
    arr.push({
      image: data.subjects[i].images.large,
      title: data.subjects[i].title,
      stars: starNumToArray(data.subjects[i].rating.stars),
      score: data.subjects[i].rating.average
    })
  }
  return arr;
}

module.exports={
  starNumToArray: starNumToArray,
  getMovieData: getMovieData
}