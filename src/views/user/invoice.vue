<template>
  <div id="box">
    <div class="separate">
      <div class="content">
        <a-card style="box-sizing: border-box; border-radius: 0 !important">
        </a-card>
        <div class="box_info">
          <div id="searchbar">
            <div>
              <a-button
                :class="Index == 2 ? 'ant-btn' : 'ant-btn-click'"
                style="margin-right: 10px; background: #f39800; border: 0"
                @click="inquiry(2)"
              >
                支付成功
              </a-button>
            </div>
          </div>
          <!--      -->
          <a-layout>
            <a-layout-content
              class="headbold"
              :style="{ background: '#fff', margin: 0, minHeight: '280px' }"
            >
              <a-table
                :columns="columns"
                :row-key="pattern"
                :data-source="datas"
                :pagination="pagination"
                :loading="loading"
                :bordered="true"
                @change="handleTableChange"
              >
                <template slot="sactions" slot-scope="datas, record">
                  <a
                    href="javascript:;"
                    v-if="record.drawer == 0"
                    style="color: #f39800"
                    >不开票</a
                  >
                  <a
                    href="javascript:;"
                    v-if="record.drawer == 1"
                    style="color: #f39800"
                    >开票</a
                  >
                </template>

                <template slot="ordertype" slot-scope="datas, record">
                  <span v-if="record.ordertype == 1">KEY订单</span>
                  <span v-if="record.ordertype == 2">图片处理</span>
                </template>

                <template slot="actions" slot-scope="datas, record">
                  <div class="li" v-if="record.status == 0">订单生成</div>
                  <div class="li" v-if="record.status == 1">支付中</div>
                  <div class="li" v-if="record.status == 2">支付成功</div>
                  <div class="li" v-if="record.status == 3">支付失败</div>
                  <div class="li" v-if="record.status == 4">已撤销</div>
                  <div class="li" v-if="record.status == 5">已退款</div>
                  <div class="li" v-if="record.status == 6">订单关闭</div>
                  <div class="li" v-if="record.status == 7">退款审核中</div>
                  <div class="li" v-if="record.status == 8">审核通过</div>
                  <div class="li" v-if="record.status == 9">审核失败</div>
                  <div class="li" v-if="record.status == 10">退款中</div>
                  <div class="li" v-if="record.status == 11">退款成功</div>
                  <div class="li" v-if="record.status == 12">退款失败</div>
                  <div class="li" v-if="record.status == 13">退款关闭</div>
                </template>

                <template slot="action" slot-scope="datas, record">
                  <a
                    href="javascript:;"
                    @click="showModal(record.id)"
                    style="color: #f39800"
                    v-if="record.status == 2 && record.ordertype == 1"
                    >申请退款</a
                  >
                </template>
              </a-table>
            </a-layout-content>
          </a-layout>

          <!--      -->
          <a-modal
            title="退款原因"
            :visible="visible"
            @ok="handleOk"
            @cancel="handleCancel"
          >
            <div class="financeitem"><span>本订单明细如下：</span></div>
            <div class="financeitem">订单总金额：{{ refunddata.totalfee }}</div>
            <div class="financeitem">
              其中包含key：{{ refunddata.totalnum }}个，key总额：{{
                refunddata.keyfee
              }}，代办服务费总额：{{
                refunddata.daibanfee
              }}，第三方邮寄费总额：{{ refunddata.expressfee }}
            </div>
            <div class="financeitem">已使用数量：{{ refunddata.usenum }}个</div>
            <div class="financeitem">
              可退费金额：{{ refunddata.refundfee }}
            </div>
            <div style="margin-top: 5px; padding: 5px">
              <a-input
                type="textarea"
                placeholder="请输入退款原因"
                v-model="textarea"
              ></a-input>
            </div>

            <template #footer>
              <a-button
                class="footerbutton"
                type="primary"
                @click="handleCancel"
                >取消
              </a-button>
              <a-button class="footerbutton" type="primary" @click="handleOk"
                >确定
              </a-button>
            </template>
          </a-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mail_send, order_orderlist, refund_refund } from "@/api/manage"; // 接口
import { Carousel } from "ant-design-vue";
import Pagination from "@/components/Pagination";
import {
  conf_list,
  getPriceBydaiban,
  refund_getrestnum,
  userlogin,
} from "../../api/manage";
import usbkeyimg from "@/assets/key.png";
import logimg from "@/assets/logimg.png";
import logoimg from "@/assets/93750.png";

import NavLeft from "../../components/NavLeft/NavLeft.vue";
import NavTitle from "../../components/NavTitle/NavTitle.vue";

export default {
  name: "paytest",
  props: {},
  components: { Carousel, Pagination, NavLeft, NavTitle },
  data() {
    return {
      http: false,
      nowcompany: "",
      nowemail: "",
      listLoading: false,
      textarea: "",
      yscode: "",
      sdisableds: false,
      timer: 60,
      mailbox: "",
      mailboxcode: "",
      datas: [],
      Index: null,
      loading: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          align: "center",
        },
        {
          title: "单位名称",
          dataIndex: "company",
          align: "center",
        },
        {
          title: "信用代码",
          dataIndex: "yscode",
          align: "center",
        },
        {
          title: "购买数量",
          dataIndex: "totalnum",
          align: "center",
        },
        {
          title: "消费金额",
          dataIndex: "totalfee",
          align: "center",
        },
        {
          title: "购买时间",
          dataIndex: "addtime",
          align: "center",
        },
        {
          title: "联系人",
          dataIndex: "name",
          align: "center",
        },
        {
          title: "联系电话",
          dataIndex: "phone",
          align: "center",
        },
        {
          title: "是否开票",
          key: "sactions",
          scopedSlots: { customRender: "sactions" },
          align: "center",
        },
        {
          title: "订单类型",
          key: "ordertype",
          scopedSlots: { customRender: "ordertype" },
          align: "center",
        },
        {
          title: "状态",
          key: "actions",
          scopedSlots: { customRender: "actions" },
          align: "center",
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" },
          align: "center",
        },
      ],
      pattern:
        "/^\\w+((-\\w+)|(\\.\\w+))*@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$/",
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
      disabledlook: false,
      visibletongzhi: false,
      visiblelook: false,
      valueaw: 2,
      valiBtn: "同意条款",
      ModalText: "阅读协议，哈哈首科大厦大家安康",
      visible: false,
      companyname: "",
      confirmLoading: false,
      radioStyle: {
        cursor: "pointer",
        marginleft: "10px",
        height: "30px",
        lineHeight: "30px",
        color: "#132b75",
      },
      page: 1,
      pagesize: 10,
      mpd: null,
      vshow: true,
      isshowFooter: false,
      tobonumber: null,
      tobonum: null,
      Byyouji: null,
      number: {
        value: 11,
      },
      year: null,
      month: null,
      dates: null,
      btnTime: null,
      projectname: "",
      xmalimg: "",
      usbkeyimg: "",
      maile: "",
      companytitle: "",
      notice: "",
      imgurlas: "",
      refunddata: {},
      configdata: {},
      isclick: false,
    };
  },
  created() {
    this.Index = 2;

    this.http =
      window.location.hostname == "salekey.uniondept.com" ? false : true;
    this.httplogo = "/imgs/" + window.location.hostname + "/logo.png";
    this.usbkeyimg = "/imgs/" + window.location.hostname + "/key.jpg";
    if (
      localStorage.getItem("yscode") == "" ||
      localStorage.getItem("yscode") == null ||
      localStorage.getItem("emailcode") == null ||
      localStorage.getItem("emailcode") == "" ||
      localStorage.getItem("email") == null ||
      localStorage.getItem("email") == ""
    ) {
      this.$router.push("/user/login");
    } else {
      this.querylist();
      this.nowcompany = localStorage.getItem("yscode");
      this.nowemail = localStorage.getItem("email");
    }
    // loading = false
    // order_orderlist({email:this.mailbox,code:this.mailboxcode,yscode:this.yscode,page:this.page,pagesize:this.pagesize,}).then(response => {
    //   console.log(response)
    //   this.datas = response.data
    // })
    conf_list().then((response) => {
      this.configdata = response.data;
    });
  },
  methods: {
    homepay() {
      this.$router.push("/");
    },
    handleSubmits() {
      this.$router.push("/");
    },
    showModal(e) {
      // this.$message.warning('请在产品退订中操作！');
      refund_getrestnum({ id: e }).then((response) => {
        this.refunddata = response.data;
        this.Id = e;
        this.textarea = "";
        this.visible = true;
      });
    },
    handleTableChange(e) {
      this.page = e.current;
      this.pagination.current = e.current;
      var mailbox = this.mailbox;
      if (this.yscode.length < 5) {
        this.$message.info("请填写正确企业信用代码");
        return false;
      } else if (
        !/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(
          mailbox
        )
      ) {
        this.$message.info("请填写正确邮箱");
        return false;
      } else if (this.mailboxcode == "") {
        this.$message.info("请填写正确邮箱验证码");
        return false;
      } else {
        order_orderlist({
          email: mailbox,
          code: this.mailboxcode,
          yscode: this.yscode,
          page: this.page,
          pagesize: this.pagesize,
        }).then((response) => {
          this.datas = response.data;
        });
      }
    },
    verification(e) {
      var mailbox = this.mailbox;
      if (
        !/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(
          mailbox
        )
      ) {
        this.$message.info("请填写正确邮箱！！！");
        return false;
      } else {
        mail_send({ email: mailbox }).then((response) => {});
      }
    },
    logout() {
      this.$confirm("确定退出吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          localStorage.removeItem("email");
          localStorage.removeItem("emailcode");
          localStorage.removeItem("yscode");
          this.$router.push("/");
        })
        .catch(() => {});
    },
    querylist() {
      if (this.isclick) {
        this.isclick = false;
      } else {
        this.isclick = true;
      }
      order_orderlist({
        email: localStorage.getItem("email"),
        code: localStorage.getItem("emailcode"),
        yscode: localStorage.getItem("yscode"),
        page: this.page,
        pagesize: this.pagesize,
        status: this.Index == 16 ? "" : this.Index,
      }).then((response) => {
        this.datas = response.data.data;
        localStorage.setItem("company", this.datas[0].company);

        this.pagination.total = response.data.total;
      });
    },
    inquiry(Index) {
      this.Index = Index;
      order_orderlist({
        email: localStorage.getItem("email"),
        code: localStorage.getItem("emailcode"),
        yscode: localStorage.getItem("yscode"),
        page: this.page,
        pagesize: this.pagesize,
        status: Index == 16 ? "" : Index,
      }).then((response) => {
        this.datas = response.data.data;
        localStorage.setItem("company", this.datas[0].company);

        this.pagination.total = response.data.total;
      });
    },
    onChange1(e) {
      this.sendmethod = e.target.checked ? 1 : 2;
      this.mpd = e.target.checked;
    },
    onChangeqw() {
      this.disabledlook = false;
    },

    handleOk(e) {
      switch (this.refunddata.statecode) {
        //证书系统未查询到此订单
        case 404:
          this.$message.info(this.refunddata.message);
          return false;
          break;
        //证书系统查询到此订单已经全部消费完
        case 405:
          this.$message.info(this.refunddata.reason);
          return false;
          break;
        case 0:
          if (this.textarea == "") {
            this.$message.info("退款原因不能为空！");
            return false;
          } else {
            refund_refund({
              id: this.Id,
              email: localStorage.getItem("email"),
              code: localStorage.getItem("emailcode"),
              yscode: localStorage.getItem("yscode"),
              content: this.textarea,
              page: this.page,
              pagesize: this.pagesize,
            }).then((resdata) => {
              if (resdata.code == 0) {
                this.$message.info("信息提交成功");
                this.textarea = "";
                this.visible = false;
                order_orderlist({
                  email: localStorage.getItem("email"),
                  code: localStorage.getItem("emailcode"),
                  yscode: localStorage.getItem("yscode"),
                  page: this.page,
                  pagesize: this.pagesize,
                }).then((response) => {
                  this.datas = response.data.data;
                  this.pagination.total = response.data.total;
                });
              }
            });
          }
          break;
      }
    },
    handleCancel(e) {
      this.textarea = "";
      this.visible = false;
    },
  },
};
</script>

<style scoped lang="css">
/deep/ .ant-table-thead > tr > th {
  font-weight: bold;
  background: #eeeeee;
}

@import "./payTest.css";

/*html, body, #app, #root{background: #f5f5f5 !important;}*/

/*.son{*/
/*  position: absolute;*/
/*  left: 52px;*/
/*}*/
body {
  background-color: #ffff;
  overflow: hidden;
}

b {
  color: #333;
}

/deep/ .ant-pagination {
  position: absolute;
  right: 0;
  bottom: -400px;
}

/deep/ .ant-btn {
  color: #fff;
  background: #338bff;
  border-radius: 8px 8px 8px 8px;
}

.ant-btn-click {
  border: none;
  color: #656565;
  background: #f5f5f5;
  border-radius: 8px 8px 8px 8px;
}

/*.separate {*/
/*  display: flex;*/
/*  width: 100%;*/
/*  height: 100vh;*/
/*}*/

.content {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.wps {
  display: flex;
  justify-content: center;
  /*background: #132b75;*/
  height: 110px;
  line-height: 110px;
  /*padding: 25px 0;*/
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

#searchbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
}

.financeitem {
  padding: 5px;
  border-bottom: #ccc dashed 1px;
}

#leftbar {
  display: flex;
  flex-direction: row;
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

/*box_info*/

.box_info {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 25px 30px;
  box-sizing: border-box;
}
.footerbutton {
  background: #f39800;
  border: 0;
}
</style>
