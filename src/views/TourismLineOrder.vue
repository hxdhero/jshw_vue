<template>
  <div class="">
    <header class="bar bar-nav">
      <router-link class="button button-fill pull-left" to="/" replace>返回</router-link>
      <a class="button button-fill pull-right" @click="submitForm">提交</a>
      <h1 class="title">线路报名</h1>
    </header>
    <nav class="bar bar-tab">
      <a class="tab-item external open-popup" data-popup=".popup-outer">
        <span class="icon jshw icon-xiaohuoban"></span>
        <span class="tab-label">添加出行人</span>
      </a>
      <a class="tab-item external open-popup" data-popup=".popup-contact">
        <span class="icon jshw icon-lianxiren"></span>
        <span class="tab-label">选择联系人</span>
        <span class="badge">{{contactLength}}</span>
      </a>
    </nav>

    <div class="content" style="padding: 5px">
      <div style="padding: 5px;display: flex; justify-content:space-around;align-items:center;">
        <b>{{lineDetail.Title}}</b>
      </div>
      <div style="padding: 0px;display: flex; justify-content: flex-end;">
        价格:{{linePrice}}元
      </div>
      <span>订单创建人</span>
      <div class="list-block" style="margin: 0">
        <!-- 姓名 -->
        <ul>
          <li>
            <div class="item-content">
              <div class="item-media"><i class="icon icon-form-name"></i></div>
              <div class="item-inner">
                <div class="item-title label">姓名</div>
                <div class="item-input">
                  <input type="text" placeholder="真实姓名(不超过5个字)" v-model="orderForm.orderUserForm.name">
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!--联系电话-->
        <ul>
          <li>
            <div class="item-content">
              <div class="item-media"><i class="icon icon-form-name"></i></div>
              <div class="item-inner">
                <div class="item-title label">联系电话</div>
                <div class="item-input">
                  <input type="tel" placeholder="手机号码" v-model="orderForm.orderUserForm.mobile">
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!--短信验证码-->
        <ul>
          <li>
            <div class="item-content">
              <div class="item-media"><i class="icon icon-form-name"></i></div>
              <div class="item-inner">
                <div class="item-title label">验证码</div>
                <div class="item-input">
                  <input type="tel" placeholder="填写验证码" v-model="orderForm.valCode">
                </div>
                <div class="item-after">
                  <button class="button button-fill" @click="getValCode" :disabled="vcInterval.disabled">获取{{vcInterval.time}}</button>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!--集合点-->
        <ul>
          <li>
            <div class="item-content">
              <div class="item-media"><i class="icon icon-form-name"></i></div>
              <div class="item-inner">
                <div class="item-title label">集合点</div>
                <div class="item-input">
                  <select v-model="orderForm.selectPoint">
                    <!--<option value=false disabled>请选择集合点</option>-->
                    <option v-for="point in linePoints" :value="point">{{point.Name}}</option>
                  </select>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!--<mt-field label="验证码" placeholder="验证码">-->
      <!--<mt-button size="normal" type="primary">获取</mt-button>-->
      <!--</mt-field>-->
      <h3 style="text-align: center;margin-top:50px;color: darkgrey" v-if="showTip">请添加联系人或者出行人</h3>
      <div v-for="(c,index) in orderForm.selectPersons" style="margin-top: 10px">
        <span>第{{index + 1}}位出行人</span>
        <div class="list-block" style="margin: 0">
          <!-- 姓名 -->
          <ul>
            <li>
              <div class="item-content">
                <div class="item-media"><i class="icon icon-form-name"></i></div>
                <div class="item-inner">
                  <div class="item-title label">姓名</div>
                  <div class="item-input">
                    <input type="text" placeholder="Your name" :value="c.name" disabled>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <!--联系电话-->
          <ul>
            <li>
              <div class="item-content">
                <div class="item-media"><i class="icon icon-form-name"></i></div>
                <div class="item-inner">
                  <div class="item-title label">联系电话</div>
                  <div class="item-input">
                    <input type="text" placeholder="Your name" :value="c.mobile" disabled>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <!--身份证-->
          <ul>
            <li>
              <div class="item-content">
                <div class="item-media"><i class="icon icon-form-name"></i></div>
                <div class="item-inner">
                  <div class="item-title label">姓名</div>
                  <div class="item-input">
                    <input type="text" placeholder="Your name" :value="c.idcard" disabled>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-for="(c,index) in orderForm.selectContacts" style="margin-top: 10px">
        <span>第{{index + 1}}位联系人</span>
        <div class="list-block" style="margin: 0">
          <!-- 姓名 -->
          <ul>
            <li>
              <div class="item-content">
                <div class="item-media"><i class="icon icon-form-name"></i></div>
                <div class="item-inner">
                  <div class="item-title label">姓名</div>
                  <div class="item-input">
                    <input type="text" placeholder="Your name" :value="c.name" disabled>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <!--联系电话-->
          <ul>
            <li>
              <div class="item-content">
                <div class="item-media"><i class="icon icon-form-name"></i></div>
                <div class="item-inner">
                  <div class="item-title label">联系电话</div>
                  <div class="item-input">
                    <input type="text" placeholder="Your name" :value="c.mobile" disabled>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <!--身份证-->
          <ul>
            <li>
              <div class="item-content">
                <div class="item-media"><i class="icon icon-form-name"></i></div>
                <div class="item-inner">
                  <div class="item-title label">姓名</div>
                  <div class="item-input">
                    <input type="text" placeholder="Your name" :value="c.idcard" disabled>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="popup popup-outer">
      <header class="bar bar-nav">
        <button class="button button-fill pull-right close-popup">
          关闭
        </button>
      </header>
      <div class="content">
        <div class="list-block" style="margin: 0">
          <!-- 姓名 -->
          <ul>
            <li>
              <div class="item-content">
                <div class="item-media"><i class="icon icon-form-name"></i></div>
                <div class="item-inner">
                  <div class="item-title label">姓名</div>
                  <div class="item-input">
                    <input type="text" placeholder="真实姓名(不超过5位)" v-model="outUserForm.name">
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <!--联系电话-->
          <ul>
            <li>
              <div class="item-content">
                <div class="item-media"><i class="icon icon-form-name"></i></div>
                <div class="item-inner">
                  <div class="item-title label">联系电话</div>
                  <div class="item-input">
                    <input type="tel" placeholder="手机号码" v-model="outUserForm.mobile">
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <!--身份证-->
          <ul>
            <li>
              <div class="item-content">
                <div class="item-media"><i class="icon icon-form-name"></i></div>
                <div class="item-inner">
                  <div class="item-title label">身份证</div>
                  <div class="item-input">
                    <input type="tel" placeholder="身份证" v-model="outUserForm.idcard">
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="row">
          <div class="col-33">&nbsp;</div>
          <div class="col-33">
            <a class="button button-fill" style="margin-top: 20px;" @click="addPerson">添加</a>
          </div>
          <div class="col-33"></div>
        </div>
        <div class="list-block media-list">
          <ul v-for="(c,i) in persons">
            <li>
              <div class="label-checkbox item-content">
                <input type="checkbox" :id="c.id" :value="c" v-model="orderForm.selectPersons"
                       style="height: 60px;width: 100px;">
                <div class="item-media"><i class="icon icon-form-checkbox"></i></div>
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title">{{c.name}}</div>
                  </div>
                  <div class="item-subtitle">{{c.mobile}}</div>
                  <div class="item-text">{{c.idcard}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <span>{{selectedPersonNames()}}</span>
      </div>
    </div>
    <div class="popup popup-contact">
      <header class="bar bar-nav">
        <button class="button button-fill pull-right close-popup">
          关闭
        </button>
      </header>
      <div class="content">
        <div class="list-block media-list">
          <ul v-for="(c,i) in contacts">
            <li>
              <div class="label-checkbox item-content">
                <input type="checkbox" :id="c.id" :value="c" v-model="orderForm.selectContacts"
                       style="height: 60px;width: 100px;">
                <div class="item-media"><i class="icon icon-form-checkbox"></i></div>
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title">{{c.name}}</div>
                  </div>
                  <div class="item-subtitle">{{c.mobile}}</div>
                  <div class="item-text">{{c.idcard}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <span>{{selectedContactNames()}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  $(document).on('click', '.open-popup', function () {
    console.log('About Popup opened')
  });
  $(document).on('click', '.popup-about', function () {
    console.log('About Popup is closing')
  });
  export default{
    data(){
      return {
        persons: [],//添加的出行人列表
        contacts: [],//联系人列表
        linePoints: [],//线路集合点
        contactLength: 0,//联系人个数
        lineDetail:"",//线路详情
        outUserForm: {
          name: "",
          mobile: "",
          idcard: "",
        },//出行人信息
        vcInterval:{
          disabled:false,
          time:""
        },//控制按钮状态和时间
        valCodeDisable: false,

        orderForm: {
          lineID:this.$route.params.lineId,
          selectPoint: false,
          valCode: "",
          selectPersons: [],//选择的出行人
          selectContacts: [],//选择的联系人列表
          orderUserForm: {
            id:this.$store.getters.loginUser.Id,
            name: "",
            mobile: "",
          },//订单提交人信息
        },//最终需要提交的表单
      }
    },
    computed: {
      currentUser () {
        return this.$store.getters.loginUser
      },
      showTip: function () {
        if ((this.orderForm.selectPersons.length + this.orderForm.selectContacts.length) < 1) {
          return true
        }
        return false
      },
      linePrice(){
        return this.lineDetail.MaxPrice * (this.orderForm.selectPersons.length+this.orderForm.selectContacts.length)
      },
    },
    methods: {
      getLineDetail:function () {
        this.$http.post(
          serverHead + "/tourismDetail",
          {"lineID": this.$route.params.lineId},
          {
            before: function () {
              $.showIndicator()
            }
          }
        ).then(respSuc => {
          $.hideIndicator()
          if (respSuc.body.suc) {
            console.log(respSuc.body.data)
            this.lineDetail = respSuc.body.data.line
          } else {
            $.alert("获取数据失败")
          }
        }, respFail => {
          $.hideIndicator()
          $.alert(respFail.body)
        })
      },//获取订单详情
      selectedPersonNames: function () {
        if (this.orderForm.selectPersons.length > 0) {
          var names = ""
          for (var i = 0; i < this.orderForm.selectPersons.length; i++) {
            if (i == 0) {
              names += this.orderForm.selectPersons[i].name
            } else {
              names += "  ," + this.orderForm.selectPersons[i].name
            }
          }
          return "已选择: [" + names + "] 共" + this.orderForm.selectPersons.length + "人"
        } else {
          return '您还没有选择出行人'
        }
      },//显示被选择的出行人
      selectedContactNames: function () {
        if (this.orderForm.selectContacts.length > 0) {
          var names = ""
          for (var i = 0; i < this.orderForm.selectContacts.length; i++) {
            if (i == 0) {
              names += this.orderForm.selectContacts[i].name
            } else {
              names += "  ," + this.orderForm.selectContacts[i].name
            }
          }
          return "已选择: [" + names + "] 共" + this.orderForm.selectContacts.length + "人"
        } else {
          return '您还没有选择联系人'
        }
      },//显示被选择的联系人
      getContacts: function () {//获取联系人列表
        this.$http.post(
          serverHead + "/user_contacts",
          {"userId": this.$store.getters.loginUser.Id},
//          {"userId": 61},
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
                id: data.ID,
                name: data.ContactName,
                mobile: data.ContactMobile,
                idcard: data.IDCard,
              })
              this.contacts = datas
              this.contactLength = datas.length
            }
          } else {
            $.alert("获取数据失败")
          }
        }, respFail => {
          $.hideIndicator()
          $.alert(respFail.body)
        })
      },//获取联系人信息
      getLinePoints: function () {//获取线路集合点列表
        this.$http.post(
          serverHead + "/tourismPoints",
          {"lineID": this.$route.params.lineId},
          {
            before: function () {
              $.showIndicator()
            }
          }
        ).then(respSuc => {
          $.hideIndicator()
          if (respSuc.body.suc) {
            console.log(respSuc.body.data)
            this.linePoints = respSuc.body.data
          } else {
            $.alert("获取数据失败")
          }
        }, respFail => {
          $.hideIndicator()
          $.alert(respFail.body)
        })
      },//获取集合点信息
      addPerson: function () {
        //校验出行人信息
        var validate = this.checkValidate(this.outUserForm, 2)
        if (validate != "ok") {
          $.alert(validate)
          return
        }
        //校验人员是否重复
        var checkFailed = this.checkRepeat(this.outUserForm, 1)
        console.log(checkFailed)
        if (checkFailed) {
          $.alert(checkFailed)
          return
        }
        //可以判断添加的人员是否已经在联系人列表中

        this.persons.push(this.outUserForm)
        this.orderForm.selectPersons.push(this.outUserForm)
        this.outUserForm = {
          name: "",
          mobile: "",
          idcard: "",
        }
      },//添加出行人并且默认选中
      valCodeClock: function (time) {
        var interval = this.vcInterval
        interval.disabled=true
        var t = time
        var it = setInterval(function () {
          t--
          interval.time="("+t+")"
          console.log(t)
          if (t == 0) {
            interval.disabled = false
            interval.time = ""
            clearInterval(it)
          }
        },1000)
      },//验证码请求发送以后让用户等待
      getValCode: function () {
        var mobile = this.orderForm.orderUserForm.mobile
        var mv = mobile.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
        if (mobile == undefined || mobile == "" || mobile.trim().length < 11 || !mv) {
          $.alert("请填写正确的手机号码")
          return
        }
        this.$http.post(
          serverHead + "/sendCodeSMS",
          {
            "mobile": mobile,
            "type": 1
          },//参数
          {
            before: function () {
              $.showIndicator()
              this.valCodeClock(20)
            }
          }
        ).then(respSuc => {
          $.hideIndicator()
          if (respSuc.body.suc) {
            console.log(respSuc.body.data)
          } else {
            $.alert(respSuc.body.msg)
          }
        }, respFail => {
          $.hideIndicator()
          $.alert(respFail.body)
        })
      },//获取短信验证码
      checkValidate: function (user, type) {//校验用户表单,type=1不校验身份证,
        if (user.name == undefined || user.name == "" || user.name.trim().length < 1) {
          return "请填写姓名"
        }
        if (user.name.length > 5) {
          return "姓名过长"
        }
        var mv = user.mobile.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
        if (user.mobile == undefined || user.mobile == "" || user.mobile.trim().length < 11 || !mv) {
          return "请填写正确的手机号码"
        }

        if (type == 2) {
          var idv = user.idcard.match(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/);
          if (!idv) {
            return "请填写正确身份证"
          }
        }
        return "ok"
      },
      checkRepeat: function (user, type) {
        if (type == 1) {
          for (var i = 0; i < this.orderForm.selectPersons.length; i++) {
            var selectPerson = this.orderForm.selectPersons[i]
            if (user.idcard == selectPerson.idcard) {
              return "身份证 " + user.idcard + " 重复"
            }
          }
          return false
        } else if (type == 2) {
          for (var i = 0; i < this.orderForm.selectPersons.length; i++) {
            var person = this.orderForm.selectPersons[i]
            for (var j = 0; j < this.orderForm.selectContacts.length; j++) {
              var contact = this.orderForm.selectContacts[j]
              if (person.idcard == contact.idcard) {
                return "身份证 " + person.idcard + " 重复"
              }
            }
          }
          return false
        } else {
          return "未知错误"
        }
      },//校验人员是否重复,type=1校验单个人员和已经选择的人员,type=2校验全部已经选择的人员
      submitForm: function () {
        //1.校验订单创建人信息
        var validate = this.checkValidate(this.orderForm.orderUserForm, 1)
        if (validate != "ok") {
          $.alert(validate)
          return
        }

        //2.校验验证码
        if(this.orderForm.valCode == "" || this.orderForm.valCode.length < 6){
          $.alert("请填写正确验证码")
          return
        }
        //3.校验集合点
        if(!this.orderForm.selectPoint){
          $.alert("请选择集合点")
          return
        }
        //4.校验出行人或者联系人
        if (this.orderForm.selectPersons.length < 1 && this.orderForm.selectContacts.length < 1) {
          $.alert("至少选择1个出行人或者联系人")
          return
        }
        console.log(this.orderForm)
        $.showIndicator()
        this.$http.post(
          serverHead + "/commitOrder",//url
          {
            "orderForm": this.orderForm,
          },//参数
          {emulateJSON:false},//options
          {
            before: function () {

            }
          }
        ).then(respSuc => {
          $.hideIndicator()
          if (respSuc.body.suc) {
            console.log(respSuc.body)
            this.$router.replace("/user")
          } else {
            $.alert(respSuc.body.msg)
          }
        }, respFail => {
          $.hideIndicator()
          $.alert(respFail.body)
        })
      },//校验订单,如果通过就提交订单
    },
    created(){
      if (!this.currentUser) {
        window.location.href = "/user"
      } else {
        this.getContacts()
        this.getLinePoints()
      }
      this.getLineDetail()
    },
    deactivated(){
      this.$destroy()
    }
  }

</script>
