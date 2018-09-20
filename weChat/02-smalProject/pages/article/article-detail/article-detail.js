
var { articles } = require('../../../data/db.js')//结构赋值（require暂时不能用绝对路径）


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
    var articleId=options.articleId;
    var article=articles[articleId];
    this.data.articleId=articleId;//为处理收藏传递id
    this.setData(article);
    /*
      
      {
        "id1":false,
        "id2":true,
        ...
      }
    */
    var collectionStorage=wx.getStorageSync('article_collection')
    var currentIsCollected=false;
    if (collectionStorage){
      currentIsCollected = collectionStorage[articleId];
    }
    else{
      var data={};
      data[articleId]=false;
      wx.setStorageSync('article_collection',data)
    }

    this.setData({//用于判断页面出初始加载时显示哪个状态
      collectStatus: currentIsCollected
    })
    
  },
  /**
   * 处理收藏
   */
  tapCollection:function(){
    var collectionStorage = wx.getStorageSync('article_collection')
    var currentIsCollected = collectionStorage[this.data.articleId];
    collectionStorage[this.data.articleId]=!currentIsCollected;
    this.setData({
      collectStatus:!currentIsCollected
    })
    wx.setStorageSync("article_collection", collectionStorage)
  }

})