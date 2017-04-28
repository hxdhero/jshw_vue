<template>
  <div class="page page-current">
    <header class="bar bar-nav">
      <router-link class="button button-fill pull-left" to="/user" replace>
        返回
      </router-link>
      <h1 class="item-inner title">线路详情</h1>
    </header>
    <div class="content">

      <div class="list-block media-list" style="margin: 0px 0px 0px 0px">
        <div style="font-size:18px;color:green;display: flex; justify-content:space-around;margin-top:10px;">
          {{od.Title}}
        </div>
      </div>
      <!--订单信息-->
      <div class="content-block-title">订单信息</div>
      <div class="list-block">
        <ul>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">订单编号</div>
              <div class="item-after">{{od.No}}</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">出游日期</div>
              <div class="item-after">{{od.date}}</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">单价</div>
              <div class="item-after">{{od.singlePrice}}</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">人数</div>
              <div class="item-after">{{od.num}}</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">总金额</div>
              <div class="item-after">{{od.totalPrice}}</div>
            </div>
          </li>
        </ul>
      </div>
      <!--出行人-->
      <div class="content-block-title">出行人</div>
      <div class="list-block">
        <ul>
          <li class="item-content" v-for="u in od.linkers">
            <div class="item-inner">
              <div class="item-title">姓名</div>
              <div class="item-after">{{u.Name}}</div>
            </div>
          </li>
        </ul>
      </div>
      <!--状态-->
      <div class="content-block-title">订单状态</div>
      <div class="list-block">
        <ul>
          <li class="item-content" v-for="os in orderStatus">
            <div class="item-inner">
              <div class="item-title">{{os.s}}</div>
              <div class="item-after">{{os.t}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="content-block">
        <p v-if="canPay"><a class="button button-big button-fill" @click="pay()">支付: {{od.totalPrice}} </a></p>
        <p v-if="canRefund"><a class="button button-big button-fill button-danger" @click="refund()">退款 </a></p>
        <p v-if="canCancel"><a class="button button-big button-fill button-warning" @click="cancel()">取消 </a></p>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default{
    data(){
      return {
        order: "",
        ordergoods: "",
        orderLinkers: "",
        canPay: false,
        canCancel: false,
        canRefund: false,
      }
    },
    created(){
      this.orderDetail()
    },
    computed: {
      od(){
        var od = new Object()
        var o = this.order
        var og = this.ordergoods
        var ol = this.orderLinkers
        od.Title = og.GoodsTitle
        od.No = o.OrderNO
        od.date = moment(o.OutDate).format("YYYY-MM-DD") + " 至 " + moment(o.BackDate).format("YYYY-MM-DD")
        od.singlePrice = og.GoodsPrice + "元/人"
        od.num = o.PlayNum + "人"
        od.totalPrice = o.OrderAmount + "元"
        od.linkers = ol
        console.log(od)
        return od
      },
      orderStatus(){
        var status = new Array()
        if (this.order.Status != 4) {
          status.push({"s": "下单成功", "t": moment(this.order.AddTime).format("YYYY-MM-DD HH:mm:ss")})
          this.canPay = true
          this.canCancel = true
          if (moment(this.order.PaymentTime).year() > 2000) {
            status.push({"s": "已付款", "t": moment(this.order.PaymentTime).format("YYYY-MM-DD HH:mm:ss")})
            this.canPay = false
            this.canCancel = false
            this.canRefund = false
          }
          if (moment(this.order.ApplyRefundDate).year() > 2000) {
            status.push({"s": "退款申请", "t": moment(this.order.ApplyRefundDate).format("YYYY-MM-DD HH:mm:ss")})
          }
          if (moment(this.order.RefundDate).year() > 2000) {
            status.push({"s": "已退款", "t": moment(this.order.RefundDate).format("YYYY-MM-DD HH:mm:ss")})
          }
        } else {
          this.canPay = false
          this.canCancel = false
          this.canRefund = false
          status.push({"s": "已取消", "t": ""})
        }
        console.log(this.canPay)
        console.log(this.canCancel)
        console.log(this.canRefund)
        return status
      }
    },
    methods: {
      orderDetail(){
        this.$http.post(
          serverHead + "/orderDetail",
          {"OrderID": this.$route.params.orderId},
          {
            before: function () {
              $.showIndicator()
            }
          })
          .then(respSuc => {
            $.hideIndicator()
            if (respSuc.body.suc) {
              console.log(respSuc.body.data)
              this.order = respSuc.body.data.order
              this.ordergoods = respSuc.body.data.ordergoods
              this.orderLinkers = respSuc.body.data.orderlinkers
            } else {
              $.alert("错误信息: ", respSuc.body.msg)
            }
          }, respFail => {
            console.log("fail")
            $.hideIndicator()
            $.alert(respFail)
          })
      },
      pay(){
//        window.location.href="https://openapi.alipay.com/gateway.do?app_id=2017040106522852&biz_content=%7B%22out_trade_no%22%3A%22hxd201704110002%22%2C%22product_code%22%3A%22QUICK_WAP_PAY%22%2C%22subject%22%3A%22%E5%A4%A7%E4%B9%90%E9%80%8F%22%2C%22total_amount%22%3A%220.1%22%7D&charset=utf-8&method=alipay.trade.wap.pay&notify_url=http%3A%2F%2Fwww.easytool.site%2Fjshw_notify_ali&sign=fWX2xfsbQBPYVo%2B%2Bx3RaUwFqrooaFz0ltb92xK2zR6m%2Fq70Bsd8KG2UlMsj3OD705bfIcIopj8XN7nV4ANHTz17T399USOOZrss015aFsAulmF7KVGF6A0AJRHQdJEmagG4o8KXqGbrHSpsoRaUVSckJDQvVjlXI27noAKmk%2FN0%3D&sign_type=RSA&timestamp=2017-04-16+17%3A20%3A36&version=1.0"
        this.$http.post(
          serverHead + "/orderPay",
          {
            "OrderID": this.$route.params.orderId,
            "returnUrl": window.location.href
          },
          {
            before: function () {
              $.showIndicator()
            }
          })
          .then(respSuc => {
            $.hideIndicator()
            if (respSuc.body.suc) {
              console.log(respSuc.body.data)
              window.location.href = respSuc.body.data
            } else {
              $.alert("错误信息: ", respSuc.body.msg)
            }
          }, respFail => {
            console.log("fail")
            $.hideIndicator()
            $.alert(respFail)
          })
      },
      cancel(){
        console.log("cancel")
      },
      refund(){
        console.log("refund")
      }
    },
    deactivated(){
      this.$destroy()
    },
  }
</script>
