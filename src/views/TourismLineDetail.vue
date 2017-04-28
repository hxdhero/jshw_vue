<style>
    .mint-swipe-indicators {
        border: none;
    }

    img {
        height: 200px;
    }
</style>
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <router-link class="button button-fill pull-left" to="/" replace>
                返回
            </router-link>
            <h1 class="item-inner title">线路详情</h1>
        </header>
        <div class="content">
            <!--幻灯片开始-->
            <mt-swipe :auto="2000" style="height: 230px">
                <mt-swipe-item v-for="item in images">
                    <img :src="item.imgUrl" width="100%" height="200px">
                </mt-swipe-item>
            </mt-swipe>

            <!--线路信息开始-->
            <div class="content-padded" style="margin-top: -10px">
                <!--时间价格-->
                <div class="row">
                    <div class="col-80">{{line.Title}}</div>
                    <div class="button button-danger pull-right"><b style="color: #FF2222;">¥{{line.MinPrice}}</b></div>
                </div>
                <!--开始结束时间-->
                <div class="">出行时间: {{formatUTCDate[0]}} 至 {{formatUTCDate[1]}}</div>
                <div>行程天数: {{line.Days}}天</div>
                <!--类型-->
                <div>
                    线路类型: <span class="badge" v-for="type in formatLineType">{{type}}</span>
                </div>
                <div>行程坐标: {{line.PlaceName}}</div>
            </div>

            <!--标签页开始-->
            <div class="buttons-tab fixed-tab" data-offset="44">
                <a href="#tab1" class="tab-link active button">行程安排</a>
                <a href="#tab2" class="tab-link button">费用说明</a>
                <a href="#tab3" class="tab-link button">集合地点</a>
                <a href="#tab4" class="tab-link button">备注说明</a>
            </div>
            <div class="content-block">
                <div class="tabs">
                    <div id="tab1" class="tab active">
                        <div class="content-block">
                            <div v-for="trip in trips">
                                <p>{{trip.title}}</p>
                                <div v-html="trip.content"></div>
                            </div>
                        </div>
                    </div>
                    <div id="tab2" class="tab">
                        <div class="content-block">
                            <div v-html="cost"></div>
                        </div>
                    </div>
                    <div id="tab3" class="tab">
                        <div class="content-block">
                            <div v-html="place"></div>
                        </div>
                    </div>
                    <div id="tab4" class="tab">
                        <div class="content-block">
                            <div v-html="remark"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nav class="bar bar-tab ">
            <a class="tab-item external" href="tel:400-820-7521">
                <span class="icon icon-phone"></span>
                <span class="tab-label">联系客服</span>
            </a>
            <a class="tab-item external" @click="gotoLineOrder" to="">
                <span class="icon icon-cart"></span>
                <span class="tab-label">报名参加</span>
            </a>
        </nav>
    </div>
</template>
<script>
  import moment from 'moment'
  import router from 'vue-router'
  export default{
    created(){
      this.getLineDetail()
    },
    data(){
      return {
        images: [],//幻灯片
        line: "",//线路
        trips: [],//路线
        cost: "",//费用说明
        place: "",//集合地点
        remark: "",//备注说明
      }
    },
    computed: {//计算,只有依赖数据发生改变的时候才会重新计算
      formatLineType: function () {
        return String(this.line.TypeNames).split(",")
      },
      formatUTCDate: function () {
        return [moment(this.line.startDate).format("YYYY-MM-DD"), moment(this.line.endDate).format("YYYY-MM-DD")]
      }
    },
    methods: {
      getLineDetail(){
        this.$http.post(
            serverHead + "/tourismDetail",
            {"lineID": this.$route.params.lineId},
            {
              before: function () {
                $.showPreloader()
              }
            }
        ).then(respSuc => {
          $.hidePreloader();
          if (respSuc.body.suc) {
            var data = respSuc.body.data
            console.log(data)
            //设置线路
            this.line = data.line
            //设置图片
            var images = []
            for (var i = 0; i < data.lineImages.length; i++) {
              var lineImage = data.lineImages[i]
              images.push({
                imgUrl: imageHead + lineImage.OriginalPath
              })
            }
            this.images = images

            //设置行程
            var trips = []
            for (var i = 0; i < data.lineTrip.length; i++) {
              var trip = data.lineTrip[i]
              trips.push({
                title: trip.Title,
                content: trip.Contents
              })
            }
            this.trips = trips

            //费用说明
            this.cost = data.line.CostExplain
            //集合地点
            this.place = data.line.PlaceExplain
            //备注说明
            this.remark = data.line.Remark
          } else {
            $.alert("获取数据失败")
          }
        }, respFail => {
          $.hidePreloader();
          $.alert(respFail.body)
        })
      },
      gotoLineOrder(){
        var _vue = this
        if (this.$store.getters.loginUser) {
          _vue.$router.replace({name: 'lineOrder', params: {lineId: _vue.$route.params.lineId}})
        } else {
          $.confirm("您还没有登录,现在就去登录吗?", function () {
            _vue.$router.replace({path:"/user"})
          })
        }
      },
    },
    deactivated(){
      this.$destroy()
    }
  }
</script>