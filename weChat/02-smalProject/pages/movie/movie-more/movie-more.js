var app = getApp();
var { getMovieData } = require('../../../util/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestUrl:'',//为了处理下拉动作请求数据
    movieLength:0,
    totalData:[],
    isEnd:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    var requestUrl='';
    var title='';
    switch(options.tagType){
      case 'inTheaters':
        requestUrl = app.G_DATA.baseUrl + 'v2/movie/in_theaters';
        title='即将上映';
        break;
      case 'commingSoon':
        requestUrl = app.G_DATA.baseUrl + 'v2/movie/coming_soon';
        title = '正在上映';
        break;
      case 'top250':
        requestUrl = app.G_DATA.baseUrl + 'v2/movie/top250';
        title = '豆瓣top250';
        break;
    }
    this.data.requestUrl=requestUrl;
    wx.setNavigationBarTitle({//页面标题
      title: title,
    })
    wx.showNavigationBarLoading();
    getMovieData(requestUrl, this.handleMovieData)
  },

  handleMovieData:function(data){//通用函数封装
    wx.hideNavigationBarLoading();
    if(data.length==0){
      wx.showToast({
        title: '已经没有数据了',
      })
      this.data.isEnd=true;
      return;
    }
    this.data.movieLength += data.length;
    this.data.totalData=this.data.totalData.concat(data);
    this.setData({
      movies: this.data.totalData
    })
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    var _this=this;
    this.data.requestMoreUrl = this.data.requestUrl + '?start=' + this.data.movieLength + '&count=20';
    wx.showNavigationBarLoading();
    getMovieData(this.data.requestMoreUrl,function(data){//下拉只需要刷新就可以，页面显示的数据长度不变
      _this.data.movieLength += data.length;
      _this.setData({
        movies:data
      },function(){
        wx.hideNavigationBarLoading()
      })
      
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this;
    if(this.data.isEnd){
      wx.showToast({
        title: '已经没有数据了',
      })
      return;
    }
    this.data.requestMoreUrl = this.data.requestUrl + '?start='+this.data.movieLength+'&count=20';
    wx.showNavigationBarLoading();
    getMovieData(this.data.requestMoreUrl, this.handleMovieData)
  },

  
})
