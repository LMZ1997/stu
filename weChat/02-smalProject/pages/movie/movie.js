
var { starNumToArray } =require('../../util/util.js')
var app = getApp();

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
    console.log(app)
    var inTheatersUrl = app.G_DATA.baseUrl +'v2/movie/in_theaters?start=0&count=3'
    var commingSoonUrl = app.G_DATA.baseUrl + 'v2/movie/coming_soon?start=0&count=3'
    var top250Url = app.G_DATA.baseUrl + 'v2/movie/top250?start=0&count=3'

    this.getMovieData(inTheatersUrl,function(data){
      _this.setData({
        inTheatersData:data,
        inTheatersTip:'即将上映'
      })
    })
    this.getMovieData(commingSoonUrl,function(data){
      _this.setData({
        commingSoonData:data,
        commingSoonTip: '正在热映'
      })
    })
    this.getMovieData(top250Url,function(data){
      _this.setData({
        top250Data:data,
        top250Tip: '豆瓣top250'
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
   var _this=this;
    var arr=[];
    for(var i=0;i<data.subjects.length;i++){
      arr.push({
        image: data.subjects[i].images.large,
        title: data.subjects[i].title,
        stars: starNumToArray(data.subjects[i].rating.stars),
        score: data.subjects[i].rating.average
      })
    }
    return arr;
  },


   
})