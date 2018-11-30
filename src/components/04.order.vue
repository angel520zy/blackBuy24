<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a>&gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车
            </h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li class="active">
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          
          <div class="cart-box">
            <h2 class="slide-tit">
              <span>1、收货地址</span>
            </h2>
            <div id="orderForm" name="orderForm" url>
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                :hide-required-asterisk="false"
              >
                <el-form-item label="收货人姓名" prop="accept_name">
                  <el-input class="my-input" v-model="ruleForm.accept_name"></el-input>
                </el-form-item>
                <el-form-item label="所属地区" prop="area">
                  <VDistpicker @selected="selectedArea"
                  :province="ruleForm.area.province.value"
                  :city="ruleForm.area.city.value"
                  :area="ruleForm.area.area.value"
                  ></VDistpicker>  
                </el-form-item>
                <el-form-item label="详细地址" prop="address">
                  <el-input class="my-input" v-model="ruleForm.address"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                  <el-input class="my-input" v-model="ruleForm.mobile"></el-input>
                </el-form-item>
                 <el-form-item label="电子邮箱" prop="email">
                  <el-input class="my-input" v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="邮政编码" prop="post_code">
                  <el-input class="my-input-min" v-model="ruleForm.post_code"></el-input>
                </el-form-item>
                <h2 class="slide-tit">
                  <span>2、支付方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <label>
                      <!-- <input
                        name="payment_id"
                        type="radio"
                        onclick="paymentAmountTotal(this);"
                        value="1"
                      >
                      <input name="payment_price" type="hidden" value="0.00">在线支付 -->
                      <el-radio v-model="ruleForm.payment_id" label="6">在线支付</el-radio>
                      &nbsp;&nbsp;<em>手续费：0.00元</em>
                    </label>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>3、配送方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <label>
                      <!-- <input
                        name="express_id"
                        type="radio"
                        onclick="freightAmountTotal(this);"
                        value="1"
                        data-type="*"
                        sucmsg=" "
                      >
                      <input name="express_price" type="hidden" value="20.00">顺丰快递
                      <em>费用：20.00元</em> -->
                      <el-radio 
                      v-model="ruleForm.express_id" 
                      @change="ruleForm.expressMoment=24"
                      label="1">顺丰</el-radio>&nbsp;&nbsp;
                      <em>费用：24.00元</em>&nbsp;&nbsp;
                      <el-radio 
                      v-model="ruleForm.express_id" 
                      @change="ruleForm.expressMoment=8"
                      label="2">顺丰</el-radio>&nbsp;&nbsp;
                      <em>费用：8.00元</em>&nbsp;&nbsp;
                      <el-radio 
                      v-model="ruleForm.express_id" 
                      @change="ruleForm.expressMoment=10"
                      label="3">顺丰</el-radio>&nbsp;&nbsp;
                      <em>费用：10.00元</em>&nbsp;&nbsp;
                      <span class="Validform_checktip"></span>
                    </label>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>4、商品清单</span>
                </h2>
                <div class="line15"></div>
                <table
                  width="100%"
                  border="0"
                  align="center"
                  cellpadding="8"
                  cellspacing="0"
                  class="cart-table"
                >
                  <tbody>
                    <tr>
                      <th colspan="2" align="left">商品信息</th>
                      <th width="84" align="left">单价</th>
                      <th width="84" align="center">购买数量</th>
                      <th width="104" align="left">金额(元)</th>
                    </tr>
                    <tr v-for="(item,index) in goodsList" :key="item.id">
                      <td width="68">
                        <!-- <a target="_blank" href="/goods/show-89.html"> -->
                        <router-link :to="'/detail/'+item.id">
                          <img :src="item.img_url" class="img">
                        </router-link>
                        <!-- </a> -->
                      </td>
                      <td>
                        <!-- <a target="_blank" href="/goods/show-89.html"> -->
                        <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                        <!-- </a> -->
                      </td>
                      <td>
                        <span class="red">￥{{item.sell_price}}</span>
                      </td>
                      <td align="center">{{item.buycount}}</td>
                      <td>
                        <span class="red">￥{{item.sell_price*item.buycount}}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="line15"></div>
                <h2 class="slide-tit">
                  <span>5、结算信息</span>
                </h2>
                <div class="buy-foot clearfix">
                  <div class="left-box">
                    <dl>
                      <dt>订单备注(100字符以内)</dt>
                      <dd>
                        <textarea v-model="ruleForm.message" name="message" class="input" style="height:35px;"></textarea>
                      </dd>
                    </dl>
                  </div>
                  <div class="right-box">
                    <p>
                      商品
                      <label class="price">{{totalCount}}</label>件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                      <label
                        id="goodsAmount"
                        class="price"
                      >{{totalPrice}}</label>元&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <p>
                      运费：￥
                      <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label>元
                    </p>
                    <p class="txt-box">
                      应付总金额：￥
                      <label id="totalAmount" class="price">{{totalPrice+ruleForm.expressMoment}}</label>
                    </p>
                    <p class="btn-box">
                      <!-- <a class="btn button" href="/cart.html"> -->
                      <router-link class="btn button" to="/shopCart">
                      返回购物车
                      </router-link>
                      <!-- </a> -->
                      <a @click="submit('ruleForm')" id="btnSubmit" class="btn submit">确认提交</a>
                    </p>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VDistpicker from 'v-distpicker';
export default {
  name: "order",
  data: function() {
     var validateMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
          if (reg.test(value)==true) {
           callback();
          }else{
             callback(new Error('请输入正确的手机号'));
          }
         
        }
      };
       var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱地址'));
        } else {
          let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
          if (reg.test(value)==true) {
           callback();
          }else{
             callback(new Error('请输入正确的邮箱地址'));
          }
         
        }
      };
      var validatePostCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮政编码'));
        } else {
          let reg = /^[1-9]\d{5}(?!\d)$/;
          if (reg.test(value)==true) {
           callback();
          }else{
             callback(new Error('请输入正确的邮政编码'));
          }
         
        }
      };
    return {
      ids: "",
      goodsList: [],
      totalCount: 0,
      totalPrice: 0,
      ruleForm: {
        accept_name: "二哈",
        address: "中粮商务公园3栋17楼",
        mobile:'18868686688',
        email:'6688@qq.com',
        post_code:'440306',
        area:{
          province:{
            code:'440000',value:"广东省"
          },
          city:{
            code:'440300',value:"深圳市"
          },
          area:{
            code:'440306',value:"宝安区"
          }
        },
        payment_id:"6",
        express_id:"1",
        expressMoment:24,
        message:"麻烦快点帮我发哦,急用"
      },
      rules: {
        accept_name: [
          { required: true, message: "请输入收货人姓名", trigger: "change" },
          { min: 2, max: 10, message: "请输入正确的姓名哦", trigger: "change" }
        ],
        address: [
          { required: true, message: "请输入收货地址", trigger: "change" },
          { min: 2, message: "请输入正确的收货地址哦", trigger: "change" }
        ],
        mobile: [
          { validator: validateMobile, trigger: 'change' }
        ],
         email: [
          { validator: validateEmail, trigger: 'change' }
        ],
         post_code: [
          { validator: validatePostCode, trigger: 'change' }
        ],
      }
    };
  },
  methods:{
    selectedArea(newArea){
      // console.log(newArea);
      this.ruleForm.area = newArea;
    },
    // 切换快递
    // changeExpress(price){

    // },
    submit(formName){
      this.$refs[formName].validate(valid=>{
        if(valid){
          this.ruleForm.goodsAmount=this.totalPrice;
          this.ruleForm.goodsids=this.ids;
          let obj={};
          this.goodsList.forEach(v=>{
            obj[v.id]=v.buycount;
          })
           // 商品对象
          this.ruleForm.cargoodsobj = obj;
          // 提交订单
          this.$axios
            .post("site/validate/order/setorder", this.ruleForm)
            .then(result => {
              // console.log(result);
              this.$Message.success("订单提交成功");
              // 跳转路由
              this.$router.push("/payMoney/"+result.data.message.orderid);
            });
        } else {
          // console.log('error submit!!');
          this.$Message.warning("数据不完整,请检查");
          return false;
        }
      })
    }
  },
  created() {
    // console.log(this.$route);
    this.ids = this.$route.params.ids;
    this.$axios
      .get(`site/validate/order/getgoodslist/${this.ids}`)
      .then(result => {
        this.goodsList = result.data.message;
        result.data.message.forEach(v => {
          v.buycount = this.$store.state.cartData[v.id];
          this.totalCount += v.buycount;
          this.totalPrice += v.buycount * v.sell_price;
        });
      });
  },
  // 组内注册
  components: { VDistpicker }
};
</script>
<style>
.my-input > .el-input__inner {
  width: 500px;
}
.my-input-min > .el-input__inner {
  width: 100px;
}
</style>
