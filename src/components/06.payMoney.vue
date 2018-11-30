<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="javascript:;">支付中心</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit pay">
            <a href="javascript:;" class="selected">支付中心</a>
          </div>
          <div class="form-box payment">
            <div class="el-row">
              <div class="el-col el-col-18">
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>订 单 号：</dt>
                      <dd>{{orderInfo.order_no}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>收货人姓名：</dt>
                      <dd>{{orderInfo.accept_name}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>送货地址：</dt>
                      <dd>{{orderInfo.area+orderInfo.address}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>手机号码：</dt>
                      <dd>{{orderInfo.mobile}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付金额：</dt>
                      <dd>{{orderInfo.order_amount}} 元</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付方式：</dt>
                      <dd>在线支付</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                      <dd>{{orderInfo.message}}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="el-col el-col-6">
                <div id="container2">
                  <!-- <canvas width="300" height="300"></canvas> -->
                  <qrcode
                    :value="'http://111.230.232.110:8899/site/validate/pay/alipay/'+orderId"
                    :options="{ size: 300 }"
                  ></qrcode>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueQrcode from '@xkeshi/vue-qrcode';
export default {
  name: "payMoney",
  data: function() {
    return {
      orderId: 0,
      orderInfo: {},
      interId: 0
    };
  },
  components: {
    [VueQrcode.name]: VueQrcode
  },
  //   生命周期
  created() {
    this.orderId = this.$route.params.orderId;
    this.$axios
      .get(`site/validate/order/getorder/${this.orderId}`)
      .then(result => {
        // console.log(result);
        this.orderInfo = result.data.message[0];
      });
    this.interId = setInterval(() => {
      this.$axios
        .get(`site/validate/order/getorder/${this.orderId}`)
        .then(result => {
          // console.log(result);
          if (result.data.message[0].status === 2) {
            this.$Message.success("恭喜你,支付成功,坐等收宝贝!");
            this.$router.push("/paySuccess");
          }
        });
    }, 2000);
  },
  destroyed() {
    clearInterval(this.interId);
  }
};
</script>
<style>
</style>
