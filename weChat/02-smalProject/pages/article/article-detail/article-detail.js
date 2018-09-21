
var { articles } = require('../../../data/db.js')//结构赋值（require暂时不能用绝对路径）


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;

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
    if (collectionStorage){//初始化点击第二个文章时会出现错误，所以需要下边的 ' ！！'转化
      currentIsCollected = !!collectionStorage[articleId];
    }
    else{
      var data={};
      data[articleId]=false;
      wx.setStorageSync('article_collection',data)
    }

    this.setData({//用于判断页面出初始加载时显示哪个状态
      collectStatus: currentIsCollected
    })

    var backgroundMusicManger = wx.getBackgroundAudioManager();//页面初始音乐播放事件绑定
    backgroundMusicManger.onPlay(function () {     //为了使页面上音乐图标根据play/pause改变
      _this.setData({
        isPlayingMusic: true
      })
    })
    backgroundMusicManger.onPause(function () {
      _this.setData({
        isPlayingMusic: false
      })
    })
    
  },
  /**
   * 处理收藏
   */
  tapCollection:function(){
    var collectionStorage = wx.getStorageSync('article_collection')
    var currentIsCollected = collectionStorage[this.data.articleId];
    collectionStorage[this.data.articleId]=!currentIsCollected;
    wx.showToast({
      title: currentIsCollected?'取消收藏':'收藏成功',
    })
    /*
    wx.showModal({
      title: currentIsCollected ? '取消收藏' : '添加收藏',
      content: '。。。',
      success:function(res){
        if(res.confirm){
          console.log('操作成功')
        }
      }
    })
    */
    this.setData({
      collectStatus:!currentIsCollected
    })
    wx.setStorageSync("article_collection", collectionStorage)
  },
  /**
   * 处理分享
   */
  tapShare:function(){
    var itemList=["分享到微信","分享到微博","分享到QQ"];
    wx.showActionSheet({
      itemList: itemList,
      success:function(res){
        wx.showToast({
          title: itemList[res.tapIndex]+'成功',
        })
      }
    })
  },
  /**
   * 处理音乐
   */
  tapMusic:function(){
    var backgroundMusicManger=wx.getBackgroundAudioManager();
    
    var isPlaying=this.data.isPlayingMusic;
    if(isPlaying){
      backgroundMusicManger.pause();
      this.setData({
        isPlayingMusic:false
      })
    }
    else{
      backgroundMusicManger.title = this.data.music.title;
      backgroundMusicManger.src = this.data.music.src;
      backgroundMusicManger.coverImgUrl = this.data.music.coverImgUrl;
      
      // backgroundMusicManger.play();
      this.setData({
        isPlayingMusic: true
      })
    }
  }

})