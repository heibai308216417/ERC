<template>
  <div id="box">
    <div class="content">
      <div class="left">
        <div>
          <NavLeft :partInfo="infos" @item-click="navClick"></NavLeft>
        </div>
      </div>
      <div class="right">
        <NavTitle @title-click="titleClink"></NavTitle>
        <div style="width: 100%">
          <router-view></router-view>
        </div>

        <div class="footer">
          <div
            style="
              display: flex;
              justify-content: space-around;
              height: 30px;
              line-height: 48px;
            "
          >
            <div style="display: flex; justify-content: center">
              <div>
                <img alt="" src="@/assets/images/footer.png" width="25px" />
              </div>
              <div style="width: 10px; height: 10px"></div>
              <div>
                <span>陕ICP备2022007316号-1</span>
              </div>
            </div>
            <div style="display: flex; justify-content: center">
              <div>
                <img alt="" src="@/assets/images/kefu.png" width="25px" />
              </div>
              <div style="width: 10px; height: 30px"></div>
              <div>
                <span>kefu@xahuadao.com</span>
              </div>
            </div>
            <div style="display: flex; justify-content: center">
              <div>
                <img alt="" src="@/assets/images/iPhone.png" width="25px" />
              </div>
              <div style="width: 10px; height: 10px"></div>
              <div>
                <span>400-8709003</span>
              </div>
              <div style="width: 250px; height: 50px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  company_servicetime,
  getpricelist,
  order_orderList,
  payTest,
  payTestOrder,
} from "@/api/manage"; // 接口~
import PayTestModal from "./PayModal"; // 二维码对话框组件
import PayTestBarCode from "./PayBarCode"; // 条码对话框组件
import { Carousel } from "ant-design-vue";
import { conf_list } from "../../api/manage";
import Contract from "@/views/home/component/contract.vue";

import policeimg from "@/assets/police.png";
import icon_ren from "@/assets/icon_kefu.gif";

import NavLeft from "../../components/NavLeft/NavLeft.vue";
import NavTitle from "../../components/NavTitle/NavTitle.vue";

export default {
  name: "paytest",
  props: {},
  components: {
    PayTestModal,
    PayTestBarCode,
    Carousel,
    Contract,
    NavTitle,
    NavLeft,
  },
  data() {
    return {
      httplogo: "",
      usbkeyimg: "",
      policeimg: policeimg,
      icon_ren: icon_ren,
      dialogVisible: false,
      sssvisiblesss: true,
      visiblemodd: false,
      // urlop:'images/93750.png',

      checked1: false,
      form: this.$form.createForm(this, { name: "coordinated" }),
      dialogStyle: {
        top: "40%",
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
      imgurl: "",
      // imgurlas: require('@/assets/images/93750.png'),
      imgurlas: "",
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
      valueaw: 1,
      valiBtn: "同意条款",
      buttso: "我已知晓",
      visible: false,
      visiblelx: false,
      companyname: "",
      confirmLoading: false,
      radioStyle: {
        cursor: "pointer",
        marginleft: "10px",
        height: "30px",
        lineHeight: "30px",
        color: "#2951F1",
      },
      mpd: null,
      vshow: true,
      isshowFooter: false,
      tobonumber: null,
      tobonum: null,
      Byyouji: null,
      number: {
        value: 11,
      },
      Fathertoson: {
        companyname: "",
        companyyscode: "",
        sendmethod: null,
        totalnum: "",
        jiezhiprice: "",
        guanzhuangprice: "",
        shengxinprice: "",
        year: "",
      },
      Tips: false,
      pricelist: [],
      configdata: {},
      packageid: 0,
      timewo: null,
      year: null,
      month: null,
      dates: null,
      btnTime: null,
      projectname: "",
      xmalimg: "",
      http: false,
      infos: null,
    };
  },
  created() {
    console.log(window.location.hostname, "window.location+++++++++");
    this.http =
      window.location.hostname == "salekey.uniondept.com" ? false : true;
    this.httplogo = "/imgs/" + window.location.hostname + "/logo.png";
    this.usbkeyimg = "/imgs/" + window.location.hostname + "/key.jpg";
    let time = 5;
    this.btnTime = setInterval(() => {
      if (time == 0) {
        clearInterval(this.btnTime);
        this.timewo = 0;
        this.buttso = "我已知晓";
        // this.sssvisiblesss = false
      } else {
        this.sssvisiblesss = true;
        this.buttso = "我已知晓" + time;
        time--;
      }
    }, 1000);
    conf_list().then((response) => {
      this.configdata = response.data;
      localStorage.setItem("serviceurl", response.data.serviceurl);
    });

    const date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.dates = date.getDate();

    conf_list().then((response) => {
      this.configdata = response.data;
      localStorage.setItem("serviceurl", response.data.serviceurl);
    });
  },

  mounted() {
    // 获取传入的参数，如果参数存在，则为appId 重新赋值
    const appId = this.$route.params.appId;
    if (appId) {
      this.appId = appId; // appId赋值
      this.appPaywayListHandle(appId); // 调用appPaywayListHandle，展示支付方式
    }
    const that = this; // 提前保留this
    this.randomOrderNo();
    getpricelist().then((response) => {
      console.log(response);
      this.pricelist = response.data;
    });
  },

  methods: {
    navClick(index) {
      console.log(index);
      if (index == 0) {
        this.$router.push("/");
      } else if (index == 1) {
        if (
          localStorage.getItem("yscode") == "" ||
          localStorage.getItem("yscode") == null ||
          localStorage.getItem("emailcode") == null ||
          localStorage.getItem("emailcode") == "" ||
          localStorage.getItem("email") == null ||
          localStorage.getItem("email") == "" ||
          localStorage.getItem("company") == null ||
          localStorage.getItem("company") == ""
        ) {
          this.$router.push("/user/login");
        } else {
          this.$router.push("/orderlist");
        }
      } else if (index == 2) {
        this.$router.push("/index");
      } else if (index == 3) {
        if (
          localStorage.getItem("yscode") == "" ||
          localStorage.getItem("yscode") == null ||
          localStorage.getItem("emailcode") == null ||
          localStorage.getItem("emailcode") == "" ||
          localStorage.getItem("email") == null ||
          localStorage.getItem("email") == "" ||
          localStorage.getItem("company") == null ||
          localStorage.getItem("company") == ""
        ) {
          this.$router.push("/user/login");
        } else {
          this.$router.push("/orderancell");
        }
      } else if (index == 4) {
        if (
          localStorage.getItem("yscode") == "" ||
          localStorage.getItem("yscode") == null ||
          localStorage.getItem("emailcode") == null ||
          localStorage.getItem("emailcode") == "" ||
          localStorage.getItem("email") == null ||
          localStorage.getItem("email") == "" ||
          localStorage.getItem("company") == null ||
          localStorage.getItem("company") == ""
        ) {
          this.$router.push("/user/login");
        } else {
          this.$router.push("/invoice");
        }
      } else if (index == 5) {
        this.$router.push("/check");
      } else if (index == 6) {
        this.$router.push("/seal");
      }
    },
    titleClink(index) {
      console.log(index);
      this.infos = index;
    },
    jiegoupricelist() {
      let number = this.pricelist;
      for (let i = 0; i < number.length; i++) {
        const element = number[i];
        if (element.id == 1) {
          this.Fathertoson.jiezhiprice = element.price;
        } else if (element.id == 4) {
          this.Fathertoson.guanzhuangprice = element.price;
        } else if (element.id == 3) {
          this.Fathertoson.shengxinprice = element.price;
        }
      }
      console.log(this.Fathertoson);
    },
    homepay() {
      this.$router.push("/");
    },
    Gokefu() {
      //customer
      window.open(localStorage.getItem("serviceurl"), "_blank");
    },
    youxiang() {
      // console.log("65565")
      window.open("https://qy.163.com/login/?from=ym");
    },
    openseal() {
      window.open("/seal/index", "_blank");
    },
    openyw() {
      window.open(this.configdata.certplatformurl, "_blank");
    },
    handleSubmitsks() {
      this.visiblelx = true;
    },
    handleOklx(e) {
      this.visiblelx = false;
    },

    handleCancesl() {
      if (this.timewo == 0) {
        console.log("进来了");
        this.sssvisiblesss = false;
      }
    },
    handleOkmodd(e) {
      console.log(e);
      this.visiblemodd = false;
    },

    onChange1(e) {
      this.checkeddef = e.target.checked;
      this.sendmethod = e.target.checked ? 1 : 2;
      this.mpd = e.target.checked;
      console.log(e.target.checked, e.target.checked);
      if (e.target.checked == false) {
        this.Tips = true;
      } else {
        this.Tips = false;
      }
    },
    handleCanceslgiveup(e) {
      var that = this;
      that.checkeddef = false;
      that.sendmethod = 2;
      that.Tips = false;
    },

    handleCanceslcontinue() {
      var that = this;
      that.checkeddef = true;
      that.sendmethod = 1;
      that.Tips = false;
    },
    onChangeqw() {
      this.disabledlook = false;
    },

    unpdeteSubmit() {
      order_orderList({ id: 1, price: 0.01 }).then((response) => {
        console.log(response);
      });
    },

    boglook() {
      console.log(this.sendmethod, "关闭3");
      if (this.configdata.saletype == "package") {
        if (this.packageid == 0) {
          this.$message({
            message: "请选择套餐！",
            type: "warning",
          });
          return false;
        } else {
          for (var i = 0; i < this.pricelist.length; i++) {
            if (this.packageid == this.pricelist[i].id) {
              this.Fathertoson.totalnum = 1;
              this.Fathertoson.guanzhuangprice = 0;
              this.Fathertoson.companyname = this.form.getFieldValue("company");
              this.Fathertoson.jiezhiprice = this.pricelist[i].price;
              this.Fathertoson.shengxinprice = 0;
              this.Fathertoson.sendmethod = 2;
              this.visible = true;
            }
          }
        }
      } else {
        this.Fathertoson.totalnum = this.form.getFieldValue("totalnum");
        this.Fathertoson.sendmethod = this.sendmethod;
        this.companyname = this.form.getFieldValue("company");
        this.Fathertoson.companyname = this.form.getFieldValue("company");
        this.companyyscode = this.form.getFieldValue("yscode");
        this.Fathertoson.companyyscode = this.form.getFieldValue("yscode");
        console.log(this.companyyscode);
        if (this.companyyscode == undefined || this.companyyscode == "") {
          this.$message.warning("请填写信用代码！");
          return false;
        } else {
          this.jiegoupricelist();
          company_servicetime({
            yscode: this.companyyscode,
          }).then((response) => {
            // console.log('+++', response.is)
            this.vshow = response.data.is;
            this.outtime = response.data.time;
            //倒数10秒
            let time = 10;
            this.btnTime = setInterval(() => {
              if (time == 0) {
                clearInterval(this.btnTime);
                this.valiBtn = "同意条款";
                this.disabled = false;
              } else {
                this.disabled = true;
                this.valiBtn = "同意条款" + time;
                time--;
              }
            }, 1000);
            this.visible = true;
          });
        }
      }
    },

    handleOk(e) {
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
    onChanges(value) {},
    handleSubmits() {
      this.$router.push("/user/login");
    },
    handleSubmit(e) {
      if (this.checked == false) {
        this.boglook();
        return false;
      } else {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
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
            values.paymenthod = "ALI_QR";
            //灌装代办
            values.isdaiban = 2;
            //是否开票
            values.drawer = this.valueaw;
            //打包id
            values.packageid = this.packageid;
            //第三方邮寄
            values.sendmethod = this.sendmethod;
            values.paymenthod = "ALI_QR";
            values.optype = "pc";
            console.log(values);
            payTestOrder(values)
              .then((res) => {
                // console.log(res)
                that.$refs.payTestModal.showModal(
                  this.currentWayCode,
                  res.data
                ); // 打开弹窗
                that.randomOrderNo(); // 刷新订单号
              })
              .catch(() => {
                that.$refs.payTestBarCode.processCatch();
                that.randomOrderNo(); // 刷新订单号
              });
          }
        });
      }
    },
    handleSelectChange(value) {
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

    // 根据不同的appId展示不同的支付方式(在下拉框切换时和在携带参数进入页面时调用)
    appPaywayListHandle(value) {
      if (!value) {
        this.appPaywayList = [];
        return false;
      }
      const that = this;
      payTest(value).then((res) => {
        that.appPaywayList = res.data;
        if (res.length === 0) {
          that.noConfigText = true;
        } else {
          that.noConfigText = false;
        }
      });
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
      payTestOrder({
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
@import "./pay.css";

body {
  background-color: #ecf5ff;
  overflow: hidden;
}

b {
  color: #333;
}

.separate {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 88vh;
  border-right: 20px solid #e9f3ff;
}

.content {
  display: flex;
  flex-direction: row;
}

.left {
  width: 300px;
  /*background: #3b67f4;*/
  border-right: 15px solid #f5f7fb;
}

.right {
  width: 100%;
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

.infotip {
  text-indent: 30px;
  line-height: 2;
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
  /*height: 200px;*/
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
  /*height: 50px;*/
  font-size: 16px;
  font-weight: bold;
  line-height: 50px;
}

.position_content {
  display: block;
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

.ant-modal {
  top: 50px;
}

.footer {
  width: 100%;
  height: 100px;
  /*background: #FFFFFF;*/
  position: fixed;
  bottom: 0px;
  padding-top: 30px;
  border-top: 15px solid #f5f7fb;
  background-image: url("../../assets/images/foot.png");
  background-repeat: no-repeat;
  background-position: right;
}

beiwang {
  width: 100%;
  height: 40px;
  background: #e9f3ff;
  /* background: #cfca7c; */
}
</style>
