<template>
  <div id="box">
    <div class="separate">
      <div class="content">
        <a-card style="box-sizing: border-box; border-radius: 0 !important">
          <!-- 未配置支付方式提示框 -->
          <a-divider v-if="!appId">请选择应用APPID</a-divider>
          <a-divider v-else-if="noConfigText">您尚未配置任何支付方式</a-divider>
          <!--      <a-divider v-else></a-divider>-->

          <!-- 支付测试面板 v-if=""-->
          <div v-if="payTestShow()" class="paydemo" style="width: 100%">
            <div class="paydemo-type-content" style="min-height: 650px">
              <a-form-model
                ref="form"
                :model="form"
                :rules="rules"
                @submit="handleSubmit"
              >
                <a-row>
                  <a-col :span="24">
                    <a-row>
                      <a-col :span="24">
                        <a-form-model-item
                          :colon="false"
                          :label-col="{ span: 2 }"
                          :wrapper-col="{ span: 15, offset: 1 }"
                          label="购买项目"
                        >
                          <a-radio-group
                            :default-value="1"
                            name="radioGroup"
                            style="margin-left: -30px"
                          >
                            <a-radio :value="1"
                              >年服务费充值<span style="color: #f39800"
                                >￥{{ tobonumber }}</span
                              >
                            </a-radio>
                          </a-radio-group>
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row>
                      <a-col :span="12">
                        <a-form-item
                          :colon="false"
                          :labelCol="{ span: 4 }"
                          :wrapper-col="{ span: 1, offset: 1 }"
                          label="购买数量"
                        >
                          <a-input-number
                            id="inputNumber"
                            v-model:value="form.totalnum"
                            :max="10"
                            :min="1"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12" pull="4">
                        <a-form-model-item
                          :colon="false"
                          :labelCol="{ span: 4 }"
                          :wrapperCol="{ span: 10, offset: 1 }"
                          label="购买单位"
                          prop="company"
                        >
                          <a-input
                            v-model="form.company"
                            placeholder="请输入购买单位全称"
                          />
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row>
                      <a-col :span="24">
                        <a-form-model-item
                          :colon="false"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 8, offset: 1 }"
                          label="信用代码"
                          prop="yscode"
                        >
                          <a-input
                            v-model="form.yscode"
                            placeholder="请输入统一社会信用代码"
                            style="margin-left: -30px"
                          />
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row>
                      <a-col :span="12">
                        <a-form-model-item
                          :colon="false"
                          :labelCol="{ span: 4 }"
                          :wrapperCol="{ span: 10, offset: 1 }"
                          label="联系人"
                          prop="name"
                        >
                          <a-input
                            v-model="form.name"
                            placeholder="请输入联系人姓名"
                          />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="12" pull="4">
                        <a-form-model-item
                          :colon="false"
                          :labelCol="{ span: 4 }"
                          :wrapperCol="{ span: 10, offset: 1 }"
                          label="手机号码"
                          prop="phone"
                        >
                          <a-input
                            v-model="form.phone"
                            placeholder="请输入11位手机号码"
                          />
                        </a-form-model-item>
                      </a-col>
                    </a-row>
                  </a-col>
                  <a-col :span="24">
                    <div>
                      <a-row>
                        <a-col :span="24">
                          <a-form-model-item
                            :colon="false"
                            :labelCol="{ span: 2 }"
                            :wrapperCol="{ span: 8, offset: 1 }"
                            label="是否开票"
                          >
                            <div style="display: flex; align-items: baseline">
                              <a-radio-group
                                v-model="form.drawer"
                                :default-value="2"
                                name="radioGroup"
                                style="margin-top: 8px"
                              >
                                <a-tooltip placement="top">
                                  <template slot="title">
                                    <span
                                      >发票一到三个工作日，会发到您填写的邮箱</span
                                    >
                                  </template>
                                  <a-radio :value="1"> 是</a-radio>
                                </a-tooltip>

                                <a-radio :value="2"> 否</a-radio>
                              </a-radio-group>
                              <div
                                v-if="form.drawer == 1"
                                style="margin-left: 10px"
                              >
                                仅支持电子增值税普通发票
                              </div>
                              <div
                                v-if="form.drawer == 2"
                                style="margin-left: 10px"
                              >
                                　
                              </div>
                            </div>
                          </a-form-model-item>
                        </a-col>
                      </a-row>

                      <a-row>
                        <a-col :span="8">
                          <a-form-model-item
                            :colon="false"
                            :labelCol="{ span: 6 }"
                            :wrapperCol="{ span: 16, offset: 1 }"
                            label="电子邮箱"
                            prop="email"
                          >
                            <a-input
                              v-model="form.email"
                              placeholder="请输入用于接收电子发票和查询订单的邮箱"
                              style="margin-left: 10px"
                            />
                          </a-form-model-item>
                        </a-col>
                        <a-col :span="8">
                          <a-form-model-item
                            :colon="false"
                            :labelCol="{ span: 6 }"
                            :wrapperCol="{ span: 15, offset: 1 }"
                            label="购方名称"
                          >
                            <a-input v-model="form.company" disabled />
                          </a-form-model-item>
                        </a-col>
                        <a-col :span="8" pull="1">
                          <a-form-model-item
                            :colon="false"
                            :labelCol="{ span: 6, offset: 2 }"
                            :wrapperCol="{ span: 15, offset: 1 }"
                            label="购方税号"
                          >
                            <a-input v-model="form.yscode" disabled />
                          </a-form-model-item>
                        </a-col>
                      </a-row>

                      <a-row>
                        <a-col :span="12">
                          <a-form-model-item
                            :colon="false"
                            :labelCol="{ span: 4 }"
                            :wrapperCol="{ span: 16, offset: 1 }"
                            label="地址电话"
                            prop="address"
                          >
                            <a-input v-model="form.address" />
                          </a-form-model-item>
                        </a-col>
                        <a-col :span="12">
                          <a-form-model-item
                            :colon="false"
                            :labelCol="{ span: 3, offset: 4 }"
                            :wrapperCol="{ span: 14, offset: 1 }"
                            label="银行、账号"
                            prop="bank"
                          >
                            <a-input v-model="form.bank" />
                          </a-form-model-item>
                        </a-col>
                      </a-row>
                    </div>
                  </a-col>
                </a-row>
              </a-form-model>
              <div
                style="
                  display: flex;
                  flex-direction: row;
                  justify-content: center;
                "
              >
                <a-button
                  :disabled="disabledlook"
                  style="
                    font-weight: bold;
                    width: 200px;
                    height: 50px;
                    font-size: 15px;
                    background: #f39800;
                    border: 0;
                    margin: 10px 0 10px 0;
                    border-radius: 8px 8px 8px 8px;
                  "
                  type="primary"
                  @click="handleSubmit"
                >
                  提交订单
                </a-button>
              </div>
              <div id="sealintro">
                <!-- <div style="width: 50%; margin: auto">
                                    <b>购买说明</b>
                                </div>
                                <div style="width: 50%; margin: auto">
                                    付款成功后，系统会<span style="color: red">自动发送</span
                                >图片处理系统链接至<span style="color: red">电子邮箱</span>
                                    ，点击电子邮箱中收到的访问链接即可跳转到图片处理系统，进行图片处理。
                                    每个已购订单只能处理<span style="color: red">3</span
                                >次图片，使用<span style="color: red">3</span>次后，链接
                                    <span style="color: red">自动失效</span>
                                </div> -->
                <div>
                  因本服务的消费特殊性，一经售出，<span style="color: #f39800"
                    >无法退款</span
                  >，敬请理解！
                  <!--        （由于提供本服务的系统功能异常导致无法正常使用的，可进行退款）-->
                </div>
              </div>
              <div
                id="bottomtoolbar"
                style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: center;
                "
              ></div>
            </div>
          </div>
        </a-card>

        <a-modal
          v-model="visiblemodd"
          title="流程说明"
          width="40%"
          @ok="handleOkmodd"
        >
          <p>
            <b
              >灌装流程说明：企业在此下单后，前往证书运维管理平台上自助抠账使用。</b
            >
          </p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </a-modal>

        <!-- 二维码弹窗 -->
        <pay-test-modal
          ref="payTestModal"
          @closeBarCode="$refs.payTestBarCode.visible = false"
        ></pay-test-modal>

        <!-- 条码弹框 -->
        <pay-test-bar-code
          ref="payTestBarCode"
          @CodeAgainChange="testCodeChange"
          @barCodeValue="barCodeChange"
        ></pay-test-bar-code>
      </div>
    </div>
  </div>
</template>

<script>
import {
  conf_list,
  getPriceByfuwu,
  getPriceByfuwu_payrecharge,
  paysealorder,
} from "@/api/manage"; // 接口
import PayTestModal from "./PayModal"; // 二维码对话框组件
import PayTestBarCode from "./PayBarCode"; // 条码对话框组件
import { Carousel } from "ant-design-vue";

import NavLeft from "@/components/NavLeft/NavLeft.vue";
import NavTitle from "@/components/NavTitle/NavTitle.vue";

export default {
  name: "paytest",
  props: {},
  components: { PayTestModal, PayTestBarCode, Carousel, NavLeft, NavTitle },
  data() {
    return {
      http: false,
      totalnum: 1,
      projectname: "",
      sssvisiblesss: true,
      visiblemodd: false,
      checked1: false,
      form: { drawer: 2, totalnum: 1 },
      dialogStyle: {
        top: "40%",
      },
      rules: {
        company: [
          { required: true, message: "请输入购买单位全称", trigger: "blur" },
        ],
        yscode: [
          {
            required: true,
            message: "请输入统一社会信用代码",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入11位手机号码", trigger: "blur" },
          { pattern: /^1[3456789]\d{9}$/, message: "请输入正确的手机号码!" }, //此处配置正则表达式，手机号，可自己配置正则表达式
        ],
        email: [
          {
            required: true,
            message: "请输入用于接收电子发票和查询订单的邮箱",
            trigger: "blur",
          },
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
            message: "请输入正确的邮箱!",
          }, //此处配置正则表达式，手机号，可自己配置正则表达式
        ],
      },
      validatorRules: {
        phone: {
          //name与v-decorator中属性对应
          rules: [
            { required: true, message: "请输入手机号码!" },
            { pattern: /^1[3456789]\d{9}$/, message: "请输入正确的手机号码!" }, //此处配置正则表达式，手机号，可自己配置正则表达式
          ],
        },
        yscode: {
          //name与v-decorator中属性对应
          rules: [{ required: true, message: "请输入统一社会信用代码!" }],
        },
        email: {
          //name与v-decorator中属性对应
          rules: [
            { required: true, message: "请输入正确的邮箱!" },
            {
              pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
              message: "请输入正确的邮箱!",
            }, //此处配置正则表达式，手机号，可自己配置正则表达式
          ],
        },
      },
      imgurl: require("@/assets/images/key.png"),
      imgbg: require("@/assets/images/topbg.jpeg"),
      mchAppList: [], // app列表
      appId: "2021003131636388", // 已选择的appId
      appPaywayList: ["ALI_QR"], // 商户app支持的支付方式
      currentWayCode: "ALI_QR", // 以何种方式进行支付，默认是微信二维码
      currentPayDataType: "", // 支付参数
      mchOrderNo: "", // 模拟商户订单号
      authCode: "", // 条码的值
      companyyscode: "",
      paytestAmount: "0.01", // 支付金额，默认为0.01
      amountInput: false, // 自定金额输入框是否展示
      noConfigText: false, // 尚无任何配置分割线提示文字
      divisionMode: 0, // 订单分账模式
      orderTitle: "接口调试", // 订单标题
      value: 1,
      checked: false,
      checkeddef: true,
      sendmethod: 1,
      valuests: null,
      outtime: null,
      disabled: false,
      disabledlook: false,
      visibletongzhi: false,
      visiblelook: false,
      drawer: 2,
      valiBtn: "同意条款",
      ModalText: "阅读协议，哈哈首科大厦大家安康",
      visible: false,
      visiblelx: false,
      companyname: "",
      confirmLoading: false,
      radioStyle: {
        cursor: "pointer",
        marginleft: "10px",
        height: "30px",
        lineHeight: "30px",
        color: "#132b75",
      },
      mpd: null,
      vshow: true,
      isshowFooter: false,
      tobonumber: null,
      tobonum: null,
      number: {
        value: 11,
      },
      year: null,
      month: null,
      dates: null,
      btnTime: null,
      configdata: {},
    };
  },
  created() {
    this.http =
      window.location.hostname == "salekey.uniondept.com" ? false : true;
    this.httplogo = "/imgs/" + window.location.hostname + "/logo.png";
    this.usbkeyimg = "/imgs/" + window.location.hostname + "/key.jpg";
    getPriceByfuwu().then((response) => {
      console.log(response);
      this.tobonumber = response.data.price;
    });
    const date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.dates = date.getDate();
    conf_list().then((response) => {
      this.configdata = response.data;
    });
  },

  mounted() {
    this.randomOrderNo();
  },

  methods: {
    youxiang() {
      console.log("65565");
      window.open("https://qy.163.com/login/?from=ym");
    },
    homepay() {
      this.$router.push("/");
    },

    handleSubmitsks() {
      this.visiblelx = true;
    },
    handleOklx(e) {
      console.log(e);
      this.visiblelx = false;
    },

    handleCancesl() {
      this.sssvisiblesss = false;
    },
    handleOkmodd(e) {
      console.log(e);
      this.visiblemodd = false;
    },

    onChange1(e) {
      this.sendmethod = e.target.checked ? 1 : 2;
      this.mpd = e.target.checked;
      console.log(this.sendmethod);
      console.log(e.target.checked);
    },
    onChangeqw() {
      console.log("asad");
      this.disabledlook = false;
    },

    handleOk(e) {
      console.log("关闭2");
      this.visible = false;
      console.log(this.vshow);
      if (this.vshow) {
        this.visiblelook = true;
      }

      this.checked = true;
    },

    handleOklook() {
      this.disabledlook = false;
      this.visiblelook = false;
    },

    handleCancel(e) {
      console.log("关闭1");
      this.checked = false;
      this.visible = false;
      clearInterval(this.btnTime);
    },
    handleCancellook() {
      this.disabledlook = true;
      this.visiblelook = false;
    },

    onChangeq(e) {
      // console.log(e)
      console.log(`checked = ${e.target.checked}`);
    },

    onChange(a, b, c) {
      console.log(a, b, c);
    },

    //
    onChanges(value) {
      console.log("changed", value);
    },
    handleSubmits() {
      this.$router.push("/user/login");
    },
    handleSubmit(e) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log("Received values of form: ", this.form);
          // 判断是否为条码支付
          if (
            !this.$refs.payTestBarCode.getVisible() &&
            (this.currentWayCode === "WX_BAR" ||
              this.currentWayCode === "ALI_BAR" ||
              this.currentWayCode === "AUTO_BAR")
          ) {
            this.$refs.payTestBarCode.showModal();
            return;
          }
          const that = this;
          this.form.paymenthod = "ALI_QR";
          this.form.optype = "pc";
          this.form.paymenthod = "ALI_QR";
          this.form.keycode = this.keysn;
          getPriceByfuwu_payrecharge(this.form)
            .then((res) => {
              console.log(res);
              that.$refs.payTestModal.showModal(this.currentWayCode, res.data); // 打开弹窗
              that.randomOrderNo(); // 刷新订单号
            })
            .catch(() => {
              that.$refs.payTestBarCode.processCatch();
              that.randomOrderNo(); // 刷新订单号
            });
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`,
      });
    },
    // 支付板块是否展示
    payTestShow() {
      // 如果未选择appid，或者支付方式列表为0，则不显示支付体验板块
      if (this.appId === "" || this.appPaywayList.length === 0) {
        return false;
      } else {
        return true;
      }
    },

    changeCurrentWayCode(wayCode, currentPayDataType) {
      // 切换支付方式
      this.currentWayCode = wayCode;
      this.currentPayDataType = currentPayDataType;
    },

    // 变更 appId的事件
    changeAppId(value) {
      this.appPaywayListHandle(value); // 根据appId的值，动态显示支付方式
    },

    // 刷新订单号
    randomOrderNo() {
      this.mchOrderNo =
        "M" +
        new Date().getTime() +
        Math.floor(Math.random() * (9999 - 1000) + 1000);
    },

    // 获取条码的值
    barCodeChange(value) {
      this.authCode = value;
      this.immediatelyPay();
    },

    // 立即支付按钮
    immediatelyPay() {
      // 判断支付金额是否为0
      if (!this.paytestAmount || this.paytestAmount === 0.0) {
        return this.$message.error("请输入支付金额");
      }

      // 判断是否选择支付方式
      if (this.currentWayCode === "") {
        return this.$message.error("请选择支付方式");
      }

      // 请输入订单标题
      if (!this.orderTitle || this.orderTitle.length > 20) {
        return this.$message.error("请输入正确的订单标题[20字以内]");
      }

      // 判断是否为条码支付
      if (
        !this.$refs.payTestBarCode.getVisible() &&
        (this.currentWayCode === "WX_BAR" ||
          this.currentWayCode === "ALI_BAR" ||
          this.currentWayCode === "AUTO_BAR")
      ) {
        this.$refs.payTestBarCode.showModal();
        return;
      }

      const that = this;
      paysealorder({
        // jsapi 默认使用聚合二维码支付
        wayCode:
          this.currentWayCode === "WX_JSAPI" ||
          this.currentWayCode === "ALI_JSAPI"
            ? "QR_CASHIER"
            : this.currentWayCode, // 支付方式
        amount: this.paytestAmount, // 支付金额
        appId: this.appId, // appId
        mchOrderNo: this.mchOrderNo, // 订单编号
        payDataType: this.currentPayDataType, // 支付参数（二维码，条码）
        authCode: this.authCode,
        divisionMode: this.divisionMode,
        orderTitle: this.orderTitle,
      })
        .then((res) => {
          that.$refs.payTestModal.showModal(this.currentWayCode, res.data); // 打开弹窗
          that.randomOrderNo(); // 刷新订单号
        })
        .catch(() => {
          that.$refs.payTestBarCode.processCatch();
          that.randomOrderNo(); // 刷新订单号
        });
    },

    // 此处判断，微信，支付宝，聚合码，哪种支付方式一个都没配置，如果未配置，则不显示该板块，若等于-1 则表示不存在
    showTitle(parameterA) {
      if (this.appPaywayList.toString().indexOf(parameterA) === -1) {
        return false;
      } else {
        return true;
      }
    },
    // 聚合支付标题显示
    showQtTitle() {
      if (
        this.appPaywayList.toString().indexOf("WX") !== -1 ||
        this.appPaywayList.toString().indexOf("ALI") !== -1 ||
        this.appPaywayList.toString().indexOf("PP_PC") !== -1
      ) {
        return true;
      } else {
        return false;
      }
    },

    // 自定义金额输入框是否展示
    amountInputShow() {
      this.$nextTick(() => {
        // 输入框默认展示焦点
        this.$refs.amountInputFocus.focus();
      });
      this.amountInput = true;
      this.paytestAmount = "";
    },

    // 条码弹窗点击x或者蒙版关闭
    testCodeChange() {
      this.randomOrderNo(); // 刷新订单号
    },
  },
};
</script>

<style lang="css" scoped>
@import "./seal.css";

body {
  background-color: #ffff;
  overflow: hidden;
}

/*html, body, #app, #root{background: #f5f5f5 !important;}*/

/*.son{*/
/*  position: absolute;*/
/*  left: 52px;*/
/*}*/
b {
  color: #333;
}

.separate {
  /*display: flex;*/
  /*width: 100%;*/
  /*height: 640px;*/
}

.content {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

#sealintro {
  text-align: center;
  line-height: 2;
  margin-top: 20px;
  font-size: 14px;
  color: #999999;
}

.wps {
  display: flex;
  justify-content: center;
  height: 110px;
  line-height: 110px;
  text-align: center;
  /*background: -webkit-radial-gradient(circle, #fff, #64d1dd, #e86a43);  */
  /*background:white; background-image: linear-gradient(90deg, rgba(200,0,0,.5) 50%, transparent 0), linear-gradient( rgba(200,0,0,.5) 50%, transparent 0); background-size: 30px 30px;*/
}

.boxw {
  display: block;
  width: 100px;
  height: 100px;
  font-size: 46px;
  font-weight: 500;
  font-family: Microsoft YaHei UI Light;
  border-radius: 15px;
}

.biaoti {
  display: flex;
  flex-direction: row;
  font-size: 35px;
  font-weight: bold;
  text-align: center;
  font-family: "黑体";
}

.shangpinbiaoti {
  font-size: 16px;
  font-weight: 700;
  color: #000000;
}

.ant-carousel >>> .slick-dots {
  height: auto;
}

.ant-carousel >>> .slick-slide img {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 60%;
}

.ant-carousel >>> .slick-thumb {
  bottom: -45px;
}

.ant-carousel >>> .slick-thumb li {
  width: 60px;
  height: 45px;
}

.ant-carousel >>> .slick-thumb li img {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
}

.ant-carousel >>> .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}

#ok .ant-form-item-label label::after {
  content: "";
  position: relative;
  top: -0.5px;
  margin: 0 8px 0 2px;
}

.displayssssss {
  display: flex;
  flex-direction: column;
  height: 100px;
  position: relative;
}

.displayssssss p {
  float: right;
  width: 300px;
  text-align: right;
  position: absolute;
  right: 0;
}

.dingwei {
  width: 300px;
  height: 170px;
  position: absolute;
  top: -4px;
  right: 310px;
}

.colwei {
  width: 300px;
  height: 120px;
  background: #f5f5f5;
}

.dingweisb {
  /*width: 157px;*/

  position: absolute;
  top: 162px;
  left: 731px;
}

.position {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999 !important;
}

.position_cont {
  display: block;
  width: 500px;
  height: 200px;
  padding: 0 25px;
  box-sizing: border-box;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  border-radius: 5px;
  margin-top: -125px;
  margin-left: -225px;
  z-index: 1000 !important;
}

.position_conttit {
  display: block;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  line-height: 50px;
}

.position_content {
  display: block;
  height: 100px;
  color: #f00;
  font-weight: bold;
  font-size: 14px;
  line-height: 70px;
  padding: 15px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.position_contbot {
  display: flex;
  justify-content: flex-end;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  line-height: 50px;
}

.position_contbot span {
  display: block;
  height: 35px;
  line-height: 20px;
  padding: 7px 25px;
  color: #fff;
  margin-top: 5px;
  border-radius: 5px;
  box-sizing: border-box;
  background: #4278ff;
}
</style>
