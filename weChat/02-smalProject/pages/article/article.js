
var { articles } =require('../../data/db.js')//结构赋值（require暂时不能用绝对路径）

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'Tom'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    this.setData({ //Data即是上边的页面初始数据data:{},改变data数据其实是同步操作
      articles:articles
    },function(){
      // console.log(_this.data)
    })
  },
  tapArticleItem:function(event){
    // console.log(event);
    wx.navigateTo({
      url: './article-detail/article-detail?articleId='+event.currentTarget.dataset.articleId
    })
  }
  
})