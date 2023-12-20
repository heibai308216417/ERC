<template>
  <div>
    <a-modal
      v-model="visible"
      title="等待支付"
      @ok="handleClose"
      :footer="null"
      :width="300"
    >
      <div style="width: 100%; margin-bottom: 20px; text-align: center">
        <img
          v-if="apiRes.payDataType == 'codeImgUrl'"
          :src="apiRes.payData"
          alt=""
        />
        <span v-else-if="apiRes.payDataType == 'payurl'"
          >等待用户支付
          <hr />
          如浏览器未正确跳转请点击：
          <a :href="apiRes.payData" target="_blank">支付地址</a
          ><a-button
            size="small"
            class="copy-btn"
            v-clipboard:copy="apiRes.payData"
            v-clipboard:success="onCopy"
            >复制链接</a-button
          ></span
        >
        <span v-else>等待用户支付,请稍后</span>
      </div>
      <p class="describe">
        <img
          src="@/assets/payTestImg/wx_app.svg"
          alt=""
          v-show="wxApp"
        /><!-- 微信图标 -->
        <img
          src="@/assets/payTestImg/ali_app.svg"
          alt=""
          v-show="aliApp"
        /><!-- 支付宝图标 -->
        <span>{{ payText }}</span>
      </p>
    </a-modal>
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="提示信息"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div id="successbox">
        <div class="infotip">
          感谢您订购数字证书/服务，您的订单已<span style="color: #67c23a"
            >支付成功！</span
          >接下来须自行登录{{ configdata.certplatformtitle }}提交证书申请，
          您可以<span @click="openyw" style="color: #1a53ff; cursor: pointer"
            >点击此处</span
          >跳转到{{ configdata.certplatformtitle }}。
        </div>
        <div class="infotip">
          提交证书申请后，还须在{{
            configdata.certplatformtitle
          }}提交电子签章所需的公章图片。专业的图像处理软件处理图章耗时且操作繁杂，如果您需要人工智能自动化图章处理（自主操作，使用简单，安全可靠，5秒出图），请
          <span @click="openseal" style="color: red; cursor: pointer"
            >点击此处</span
          >
          前往购买。
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closew">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ReconnectingWebSocket from "reconnectingwebsocket";
import { conf_list, getWebSocketPrefix, checkorderstatus } from "@/api/manage";

export default {
  name: "PayTestModal",
  data() {
    return {
      socketurl: "",
      dialogVisible: false,
      visible: false,
      payText: "", // 二维码底部描述文字
      wxApp: false, // 微信二维码图片是否展示
      aliApp: false, // 支付宝二维码图片是否展示
      apiRes: {}, // 接口返回数据包
      payOrderWebSocket: null,
      configdata: {},
    };
  },
  created() {
    conf_list().then((response) => {
      this.configdata = response.data;
    });
  },
  methods: {
    openyw() {
      window.open(this.configdata.certplatformurl, "_blank");
    },
    openseal() {
      //  this.$router.push('/seal');
      window.open("/seal", "_blank");
    },
    closew() {
      this.dialogVisible = false;
      window.location.reload();
    },
    onCopy() {
      this.$message.success("复制成功");
    },

    // 二维码以及条码弹窗
    showModal(wayCode, apiRes) {
      const that = this;
      // 关闭上一个webSocket监听
      if (this.payOrderWebSocket) {
        this.payOrderWebSocket.close();
      }

      this.apiRes = apiRes;
      this.wxApp = false;
      this.aliApp = false;
      this.visible = true; // 打开弹窗

      // 根据不同的支付方式，展示不同的信息
      this.payText = "";
      if (wayCode === "WX_NATIVE" || wayCode === "WX_JSAPI") {
        // 微信二维码
        this.wxApp = true;
        this.payText = '请使用微信"扫一扫"扫码支付';
      } else if (wayCode === "ALI_QR" || wayCode === "ALI_JSAPI") {
        // 支付宝二维码
        this.aliApp = true;
        this.payText = '请使用支付宝"扫一扫"扫码支付';
      } else if (wayCode === "QR_CASHIER") {
        // 聚合支付二维码
        this.wxApp = true;
        this.aliApp = true;
        this.payText = "支持微信、支付宝扫码";
      }

      // 此处判断接口中返回的orderState，值为0，1 代表支付中，直接放行无需处理，2 成功 3 失败
      if (apiRes.orderState === 2 || apiRes.orderState === 3) {
        if (apiRes.orderState === 2) {
          that.handleClose();
          const succModal = that.$infoBox.modalSuccess(
            "支付成功",
            <div>2s后自动关闭...</div>
          );
          setTimeout(() => {
            succModal.destroy();
          }, 2000);
          that.$emit("closeBarCode"); // 关闭条码框
        } else if (apiRes.orderState === 3) {
          that.handleClose();
          that.$emit("closeBarCode"); // 关闭条码框
          that.$infoBox.modalError(
            "支付失败",
            <div>
              <div>错误码：{apiRes.errCode}</div>
              <div>错误信息：{apiRes.errMsg}</div>
            </div>
          );
        }
        return;
      }

      // h5 或者 wap
      if (wayCode === "WX_H5" || wayCode === "ALI_WAP") {
        this.payText = "请复制链接到手机端打开";
      } else {
        // 跳转到PC网站
        if (apiRes.payDataType === "payurl") {
          window.open(apiRes.payData);
        }
      }

      // 如果上面未关闭条码框，则代表进入webScoket，那么先在此处关闭条码框
      that.$emit("closeBarCode"); // 关闭条码框
      // 监听响应结果
      // 1秒一次监听响应结果
      setInterval(() => {
        checkorderstatus({ tradeno: apiRes.payOrderId }).then((res) => {
          console.log(res);
          switch (res.data.state) {
            case 2:
              that.handleClose();
              that.dialogVisible = true;
              break;
            case 0:
              break;
            default:
              that.handleClose();
              that.$infoBox.modalError(
                "支付失败",
                <div>
                  <div>错误码：{res.data.errCode}</div>
                  <div>错误信息：{res.data.errMsg}</div>
                </div>
              );
          }
        });
      }, 1000);
    },
    handleClose(e) {
      if (this.payOrderWebSocket) {
        this.payOrderWebSocket.close();
      }
      this.visible = false;
    },
  },
};
</script>
<style lang="less" scoped>
.describe {
  img {
    width: 30px;
    height: 25px;
  }
}

#successbox {
  .infotip {
    text-indent: 30px;
    line-height: 2;
  }
}
</style>
