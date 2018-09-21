// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    this.getMovieData('http://t.yushu.im/v2/movie/in_theaters?start=0&count=3',function(data){
      _this.setData({
        inTheatersData:data
      })
    })
    this.getMovieData('http://t.yushu.im/v2/movie/coming_soon?start=0&count=3',function(data){
      _this.setData({
        commingSoonData:data
      })
    })
    this.getMovieData('http://t.yushu.im/v2/movie/coming_soon?start=0&count=3',function(data){
      _this.setData({
        commingSoonData:data
      })
    })
  },
  getMovieData:function(url,success){
    var _this=this;
    wx.request({
      url: url,
      success: function (res) {
        success(_this.formatData(res.data))
      }
    })
  },
  formatData:function(data){//目的是只获取需要用的数据
    var arr=[];
    for(var i=0;i<data.subjects.length;i++){
      arr.push({
        image: data.subjects[i].images.large,
        title: data.subjects[i].title,
        stars: data.subjects[i].rating.stars,
        score: data.subjects[i].rating.average
      })
    }
    return arr;
  }
   
})