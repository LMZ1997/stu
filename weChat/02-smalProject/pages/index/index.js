Page({
  tapArticle: function () {
    /*
    wx.redirectTo({
      url: '../article/article',
    })
    */
    wx.switchTab({//跳转有tabBar的页面要用switchTab
      url: '../article/article',
    })
  }
})