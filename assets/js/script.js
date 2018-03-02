var subreddit=Vue.component('subreddit',{
  template: '#subreddit',
  props: ['name'],

  data: function(){
    return{posts:[]}
  },


  created: function(){
    this.$http.get("http://www.reddit.com/r/"+this.name+"/hot.json?limit=5")
    .then(function(resp){
      if(typeof resp.data=='string'){
        resp.data=JSON.parse(resp.data);
      }
      console.log(resp);
      this.posts=resp.data.data.children;
    });
  }

});
var post=Vue.component('post',{
  template: "#post",
  props: ['item'],
  methods:{
    getImageBackgroundCSS: function(img){
      if(img&&img!='self'&&img!='nsfw'){
        return 'background-image: url('+img+')';
      }
      else{
        return 'background-image: url(assets/img/placeholder.jpg)';
      }
    }
  }
});
Vue.filter('truncate',function(value){
  var length=60;
  if(value.length>length){
    return value.substring(0, length)+ '...';
  }
  else{
    return value;
  }
});
Vue.filter('uppercase',function(value){
  return value.toUpperCase();
});


new Vue({
  el: '#main',
  // data:{
  //
  // }
  // components:{
  //   'subreddit': {
  //     template="#subreddit",
  //     props: ['name'],
  //
  //     data: function(){
  //       return{posts:[]}
  //     },
  //
  //
  //     created: function(){
  //       this.$http.get("http://www.reddit.com/r/"+this.name+"/top.json?limit=5")
  //       .then(function(resp){
  //         if(typeof resp.data=='string'){
  //           resp.data=JSON.parse(resp.data);
  //         }
  //         console.log(resp);
  //         this.posts=resp.data.data.children;
  //       });
  //     }
  //   },
  // },
});
