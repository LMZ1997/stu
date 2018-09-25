
var { getMovieData } =require('../../util/util.js')
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
    var inTheatersUrl = app.G_DATA.baseUrl +'v2/movie/in_theaters?start=0&count=3'
    var commingSoonUrl = app.G_DATA.baseUrl + 'v2/movie/coming_soon?start=0&count=3'
    var top250Url = app.G_DATA.baseUrl + 'v2/movie/top250?start=0&count=3'

    getMovieData(inTheatersUrl,function(data){
      _this.setData({
        inTheatersData:data,
        inTheatersTip:'即将上映',
        inTheatersTapType:'inTheaters'
      })
    })
    getMovieData(commingSoonUrl,function(data){
      _this.setData({
        commingSoonData:data,
        commingSoonTip: '正在热映',
        commingSoonTapType: 'commingSoon'
      })
    })
    getMovieData(top250Url,function(data){
      _this.setData({
        top250Data:data,
        top250Tip: '豆瓣top250',
        top250TapType: 'top250'
      })
    })
  },

  /**
   * 处理更多
   */
   tapMore:function(event){
     var tagType=event.currentTarget.dataset.tagType
     wx.navigateTo({
       url: 'movie-more/movie-more?tagType='+tagType,
     })
   }
})