<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="page page-current">
    <header class="bar bar-nav">
      <h1 class='title'>金山户外网</h1>
    </header>
    <nav class="bar bar-tab">
      <router-link class="tab-item external" to="/" replace>
        <span class="icon icon-home"></span>
        <span class="tab-label">线路</span>
      </router-link>
      <router-link class="tab-item external active" to="/user" replace>
        <span class="icon icon-me"></span>
        <span class="tab-label">用户</span>
      </router-link>
      <router-link class="tab-item external" to="/about" replace>
        <span class="icon icon-star"></span>
        <span class="tab-label">联系我们</span>
      </router-link>
    </nav>
    <!--<header class="bar bar-nav">-->
    <!--<h1 class='title'>用户登陆</h1>-->
    <!--</header>-->
    <!--用户没有登陆-->
    <div class="content" v-if="!this.$store.state.cu">
      <div class="list-block">
        <ul>
          <li>
            <div class="item-content">
              <div class="item-media"><i class="icon icon-form-name"></i></div>
              <div class="item-inner">
                <div class="item-title label">账号</div>
                <div class="item-input">
                  <input v-model="loginForm.account" type="text" placeholder="请输入账号">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media"><i class="icon icon-form-email"></i></div>
              <div class="item-inner">
                <div class="item-title label">密码</div>
                <div class="item-input">
                  <input v-model="loginForm.pwd" type="password" placeholder="请输入密码">
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="content-block">
        <div class="row">
          <div class="col-100"><a @click="login" class="button button-big button-fill button-success">提交</a>
          </div>
        </div>
      </div>
    </div>
    <!--用户没有登陆-->

    <!--用户已经登录-->
    <div class="content" v-if="cuID.Id">

      <div style="display: flex; justify-content:space-around;align-items:center; margin: 5px;">
        <img style="height: 100px;width: 100px; border-radius: 15px; padding: 5px;"
             :src=cuID.avatarImg>
        <div>
          <div>昵称:{{cuID.NickName}}</div>
          <div>性别:{{cuID.Gender}}</div>
        </div>
        <p><a class="button button-fill" @click="logOut">退出登录</a></p>
      </div>
      <div class="list-block media-list" style="margin: 0px 5px 10px 5px">
        <ul v-for="order in userOrders">
          <li>
            <router-link :to="{ name: 'orderDetail', params: { orderId: order.ID}}" class="item-link item-content" replace>
              <div class="item-inner">
                <div class="item-title-row">
                  <div
                    v-bind:class="[orderStatusClassButton,order.Class]">
                    {{order.Status}}
                  </div>
                  <div class="item-after">{{order.AddTime}}</div>
                </div>
                <div class="item-subtitle" style="margin-top: 10px">订单号: {{order.OrderNo}}</div>
                <div class="item-text" style="margin-top: 10px"><b>{{order.Title}}</b></div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!--用户已经登录-->
  </div>
</template>
<script>
  import moment from 'moment'
  import ls from '../../assets/js/store.min.js'
  export default{
    data (){
      return {
        loginForm: {
          account: "13761764141",
          pwd: "iamhero",
        },
        orders: [
          {}
        ],
        orderStatusClassButton: "item-title button"
      }
    },
    computed: {
      cuID () {
        if (this.$store.getters.loginUser.Id){
          var user = this.$store.getters.loginUser
          user.avatarImg = imageHead+user.Avatar
          return user
        }else{
          return this.$store.getters.loginUser
        }
      },
      userOrders(){
        var orders = new Array()
        for (var i = 0; i < this.orders.length; i++) {

          var data = this.orders[i]
          var order = new Object()
          order.ID = data.OrderID
          order.Title = data.GoodsTitle
          order.OrderNo = data.OrderNO
          order.AddTime = moment(data.AddTime).format("YYYY-MM-DD HH:mm:ss")
          console.log(data.Status)
          if(data.PaymentStatus ==1){
            switch (data.Status){
              case 4:
                order.Status = "已取消"
                order.Class= "button-light"
                break;
              default:
                order.Status = "待付款"
            }
          }else{
            switch (data.Status) {
              case 2:
              case 3:
                order.Status = "已付款"
                order.Class= "button-light"
                break;
              case 4:
                order.Status = "已取消"
                order.Class= "button-light"
                break;
              case 5:
                order.Status = "已作废"
                order.Class= "button-light"
                break;
              case 6:
                order.Status = "退款申请中"
                break;
              case 7:
                order.Status = "已退款"
                order.Class= "button-light"
                break;
              default:
                order.Status = "未知状态"
            }
          }

          orders.push(order)
        }
        return orders
      }
    },
    created(){
      console.log("user created")
      if (this.$store.state.cu) {
        this.getOrders()
      }
    },
    methods: {
      login: function () {//用户登录
        this.$http.post(
          serverHead + "/user_login",
          this.loginForm,
          {
            before: function () {
              console.log("before")
              $.showIndicator()
            },
            progress: function () {
              console.log("progress")
            }
          })
          .then((respSuc) => {
            if (respSuc.body.suc) {
              this.$store.commit("setUser", respSuc.body.data)
              ls.set('cu', respSuc.body.data)
              this.getOrders()//登陆成功调用获取订单方法
            } else {
              $.alert(respSuc.body.msg)
            }
            $.hideIndicator()
            this.show = true
          }, (respFail) => {
            $.hideIndicator()
            console.log(respFail)
            $.alert(respFail.body)
          })
      },
      logOut: function () {//用户登出
        this.$store.commit("setUser", false)
        ls.set('cu', false)
      },
      getOrders: function () {
        this.$http.post(
          serverHead + "/user_order_list",
          {"userId": this.cuID.Id},
          {
            before: function () {
              $.showIndicator()
            }
          })
          .then(respSuc => {
            $.hideIndicator()
            if (respSuc.body.suc) {
              console.log(respSuc.body.data)
              this.orders = respSuc.body.data
            }
            this.show = true
          }, respFail => {
            console.log("fail")
            $.hideIndicator()
            $.alert(respFail)
          })
      }
    },
    deactivated(){
      this.$destroy()
    },
  }
</script>
