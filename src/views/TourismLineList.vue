<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <h1 class="title">金山户外网</h1>
        </header>
        <nav class="bar bar-tab">
            <router-link class="tab-item external active" to="/" replace>
                <span class="icon icon-home"></span>
                <span class="tab-label">线路</span>
            </router-link>
            <router-link class="tab-item external" to="/user" replace>
                <span class="icon icon-me"></span>
                <span class="tab-label">用户</span>
            </router-link>
            <router-link class="tab-item external" to="/about" replace>
                <span class="icon icon-star"></span>
                <span class="tab-label">联系我们</span>
            </router-link>
        </nav>
        <div class="content">
            <div class="card facebook-card" v-for="item in lines">
                <div class="list-block media-list" style="margin-top: 25px">
                    <router-link :to="{ name: 'lineDetail', params: { lineId: item.lineID}}" class="item-link" replace>
                        <div class="card-header">
                            <div class="content-primary" style="text-align: center">{{item.title}}</div>
                            <div class="content-block" style="text-align: center;font-size: 0.7rem">{{item.type}}</div>
                            <div class="row no-gutter">
                                <div class="col-66"> &nbsp;</div>
                                <div class="col-33"><a class="button  button-danger">{{item.price}}</a></div>
                            </div>
                        </div>
                        <div class="card-content">
                            <img :src="item.image" width="100%" height="200px">
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default{
    data(){
      return {
        lines: [],
      }
    },
    created(){
      this.getLines()
    },
    methods: {
      getLines: function () {
        this.$http.get(
            serverHead + "/tourismList",
            {
              before: function () {
                $.showIndicator()
              }
            }
        ).then(respSuc => {
          $.hideIndicator()
          if (respSuc.body.suc) {
            console.log(respSuc.body.data)
            var datas = []
            for (var i = 0; i < respSuc.body.data.length; i++) {
              var data = respSuc.body.data[i]
              datas.push({
                title: data.Title,
                type: data.TypeNames,
                image: imageHead + data.Images,
                price: "¥" + data.MinPrice,
                lineID: data.tourismLineID,
              })
              this.lines = datas
            }
          } else {
            $.alert("获取数据失败")
          }
        }, respFail => {
          $.hideIndicator()
          $.alert(respFail.body)
        })
      }
    }
  }
  //
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  $(document).on('refresh', '.pull-to-refresh-content', function (e) {
    Vue.http.get(
        serverHead + "/tourismList",
        {
          before: function () {
          }
        }
    ).then(respSuc => {
      $.pullToRefreshDone('.pull-to-refresh-content');
      if (respSuc.body.suc) {
        console.log(respSuc.body)
        var datas = []
        for (var i = 0; i < respSuc.body.data.length; i++) {
          var data = respSuc.body.data[i]
          datas.push({
            title: data.Title,
            type: data.TypeNames,
            image: "http://www.jshwclub.com" + data.Images,
            price: "¥" + data.Price1
          })
          this.lines = datas
        }
      } else {
        $.alert("获取数据失败")
      }
    }, respFail => {
      $.pullToRefreshDone('.pull-to-refresh-content');
    })
  });
//  $.init()//初始化sui
</script>