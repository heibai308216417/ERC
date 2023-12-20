<template>
  <div id="box">
    <a-card style="box-sizing: border-box; border-radius: 0 !important">
      <div style="width: 100%" class="paydemo">
        <div
          class="paydemo-type-content"
          style="
            min-height: 650px;
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
          "
        >
          <div
            style="
              width: 90%;
              display: flex;
              flex-direction: row;
              margin: 50px auto 70px;
              justify-content: space-evenly;
            "
          >
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>CA介质状态</span>
              </div>
              <el-table
                :key="one"
                :data="messagesone"
                border
                fit
                highlight-current-row
                style="width: 100%"
              >
                <el-table-column label="查询内容" align="left">
                  <template slot-scope="{ row }">
                    <span>{{ row.title }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>证书状态</span>
              </div>
              <div
                style="
                  height: 20px;
                  padding: 12px 0;
                  font-weight: bold;
                  color: #909399;
                "
              >
                查询内容
              </div>
              <div v-html="str"></div>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix" style="position: relative">
                <span>技术服务状态</span>
              </div>
              <el-table
                :key="three"
                :data="messagesthree"
                border
                fit
                highlight-current-row
                style="width: 100%; margin-bottom: 10px"
              >
                <el-table-column label="查询内容" align="left">
                  <template slot-scope="{ row }">
                    <span>{{ row.title }}</span>
                    <div
                      style="position: absolute; right: 15px; top: 12px"
                      v-if="row.title[0] != '服'"
                    >
                      <b
                        v-if="tianshu < 30"
                        style="
                          line-height: 20px;
                          font-size: 14px;
                          color: red;
                          padding-left: 10px;
                        "
                        >有效服务期不足30天！请尽快续费此服务！</b
                      >
                      <b
                        v-if="youxiqoqi"
                        style="
                          line-height: 20px;
                          font-size: 14px;
                          color: #1a53ff;
                          padding-left: 10px;
                        "
                        >有效服务期内，返回证书系统进行延期</b
                      >
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div style="display: flex; justify-content: center">
                <!--                <div class="queren" v-if="youxiqoqi"  @click="bottomurl()"></div>-->
                <el-button
                  type="warning"
                  style="position: static; margin-right: 30px"
                  v-if="youxiqoqi"
                  @click="bottomurl()"
                >
                  返回延期
                </el-button>
                <el-button
                  style="position: static; margin: 0"
                  v-if="buttonstate"
                  type="warning"
                  @click="fixinadvance()"
                  >续订服务
                </el-button>
              </div>
            </el-card>
          </div>

          <div
            style="display: flex; flex-direction: row; justify-content: center"
          >
            <a-button
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
              点击开始检测
            </a-button>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { order_checksn, conf_list } from "@/api/manage"; // 接口
import { encode } from "@/utils/base64";
import usbkeyimg from "@/assets/key.png";
import logimg from "@/assets/logimg.png";
import logoimg from "@/assets/93750.png";

import NavLeft from "@/components/NavLeft/NavLeft.vue";
import NavTitle from "@/components/NavTitle/NavTitle.vue";

export default {
  name: "paytest",
  props: {},
  components: { NavLeft, NavTitle },
  data() {
    return {
      URl: "",
      str: "",
      tianshu: 365,
      buttonstate: false,
      one: "101010",
      two: "202020",
      three: "3030303",
      messagesone: [],
      messagestwo: [],
      messagesthree: [],
      messages: "",
      projectname: "",
      checked1: false,
      youxiqoqi: false,
      keynumber: "",
      imgurl: require("@/assets/images/key.png"),
      imgbg: require("@/assets/images/topbg.jpeg"),
      configdata: {},
      http: false,
    };
  },
  created() {
    this.http =
      window.location.hostname == "salekey.uniondept.com" ? false : true;
    this.httplogo = "/imgs/" + window.location.hostname + "/logo.png";
    this.usbkeyimg = "/imgs/" + window.location.hostname + "/key.jpg";
    if (this.$route.query && this.$route.query.dialoguuid) {
      localStorage.setItem("dialoguuid", this.$route.query.dialoguuid);
    } else {
      localStorage.removeItem("dialoguuid");
    }
    if (!checkctl1("1.0.3.0", "1.0.3.0", "1.0.3.0")) {
      this.$alert(
        " 检测到您的电脑缺少必要的运行控件，点击前往下载安装控件后方可正常使用系统",
        "消息提示",
        {
          confirmButtonText: "前往下载",
            customClass:'buttoncss',
          callback: (action) => {
            console.log(action);
            if (action == "confirm") {
              if (process.env.NODE_ENV === "production") {
                window.open(
                  "https://zwfw.shaanxi.gov.cn/ggfw/ztyy#/download",
                  "_blank"
                );
              } else {
                window.open(
                  "https://zwfw.shaanxi.gov.cn/ggfw/ztyy#/download",
                  "_blank"
                );
              }
            }
          },
        }
      );
    } else {
      console.log("检测到控件安装正常，可以继续操作");
    }
    conf_list().then((response) => {
      this.configdata = response.data;
    });
  },
  mounted() {},

  methods: {
    homepay() {
      this.$router.push("/");
    },
    bottomurl() {
      window.open("https://zwfw.shaanxi.gov.cn/ggfw/ztyy#/certificate/delay");
    },
    checkkey() {
      // 是否需要密码输入框
      window.common.pinCodelabel = "";
      //指定赢达信
      var keyvalue =
        "WinTrust Cryptographic Provider@TFTknP11.dll@WTSKFInterface.dll@admin@12345678@1@CSP@SM2";
      var values = keyvalue.split("@");
      window.common.keyDll = values[2];
      window.common.pinCode = values[4];
      window.common.devBrand = values[7];
      //指定初始化参数
      window.common.InitParam =
        '<?xml version=\\"1.0\\" encoding=\\"utf-8\\"?>' +
        "<authinfo><liblist>";
      var keyDllBase64 = encode("WTSKFInterface.dll");
      window.common.InitParam =
        window.common.InitParam +
        '<lib type=\\"SKF\\" version=\\"1.1\\" dllname=\\"' +
        keyDllBase64 +
        '\\" ><algid val=\\"SHA1\\" sm2_hashalg=\\"sm3\\"/></lib>';
      window.common.InitParam =
        window.common.InitParam +
        '<lib dllname=\\"\\" type=\\"CSP\\" version=\\"1.0\\"><algid val=\\"SHA1\\"/></lib>' +
        "</liblist></authinfo>";
      var err = IDA.Initialize(window.common.InitParam, window.common.keyDll);
      if (err != 0) {
        this.$alert(
          "初始化制证控件失败，错误码：" +
            err +
            " 错误信息：" +
            IDA.GetErrorMessage(IDA.GetErrorCode()),
          "错误提示"
        );
        IDA.Finalize();
        return false;
      }
      //屏蔽管理员key
      IDA.SetAdminDevLabel(window.common.adminKeyLabel);
      //GetDeviceListEx返回json格式字符串：设备名称name、设备标签label、设备序列号sn
      var devNameList = IDA.GetDeviceListEx();
      // console.log("设备列表" + devNameList)
      if (devNameList == "对象无效" || devNameList == "Invalid object") {
        this.$alert(
          "请检查设备是否连接正常、设备与选择的驱动是否匹配",
          "错误提示"
        );
        IDA.Finalize();
        return false;
      }
      if (!devNameList) {
        //this.$alert('请检查设备是否连接正常、设备与选择的驱动是否匹配', '错误提示')
        IDA.Finalize();
        return false;
      }
      console.log(JSON.parse(devNameList), "json");
      var devNameList = JSON.parse(devNameList);
      this.keynumber = devNameList[0].sn;
      //释放控件内存
      IDA.Finalize();
      return true;
    },
    handleSubmit() {
      this.buttonstate = false;
      this.messagesone = [];
      this.messagestwo = [];
      this.messagesthree = [];
      if (!this.checkkey()) {
        this.$alert("未检测到CA设备，请检查设备是否连接正常！", "错误提示");
        //   this.$alert('未检测到CA设备，请检查设备是否连接正常！', '', {
        //       confirmButtonText: '确定',
        //       callback: action => {
        //           this.$message({
        //               type: 'warning',
        //               // message: `action: ${ action }`
        //           });
        //       }
        //   });

        return false;
      }
      //指定初始化参数
      window.common.InitParam =
        '<?xml version=\\"1.0\\" encoding=\\"utf-8\\"?>' +
        "<authinfo><liblist>";
      var keyDllBase64 = encode("WTSKFInterface.dll");
      window.common.InitParam =
        window.common.InitParam +
        '<lib type=\\"SKF\\" version=\\"1.1\\" dllname=\\"' +
        keyDllBase64 +
        '\\" ><algid val=\\"SHA1\\" sm2_hashalg=\\"sm3\\"/></lib>';
      window.common.InitParam =
        window.common.InitParam +
        '<lib dllname=\\"\\" type=\\"CSP\\" version=\\"1.0\\"><algid val=\\"SHA1\\"/></lib>' +
        "</liblist></authinfo>";
      var err = IDA.RegisterParam(window.common.InitParam, "", true);
      if (err != 0) {
        this.$alert(
          "初始制证控件化失败，错误码：" +
            err +
            " 错误信息：" +
            IDA.GetErrorMessage(IDA.GetErrorCode()),
          "错误提示"
        );
        IDA.Finalize();
        return;
      }
      var certstr = IDA.GetCertLists(
        "SC",
        "",
        "",
        "",
        "CN=Private Certificate Authority Of NHSA SM2,O=NHSA,C=CN|CN=Certificate Authority Of NHSA SM2,O=NHSA,C=CN|CN=Certificate Authority Of Test NHSA SM2,O=NHSA,C=CN",
        -1
      );
      console.log(certstr, "certscertscertscertscerts");
      if (certstr == "") {
        this.buttonstate = false;
        this.messagestwo.push({ title: "未罐装医保证书" });
        return false;
      } else {
        var certs = JSON.parse(certstr);
        // console.log(certs, 'certscertscertscertscerts')
        var cert = certs[0].dn;
        console.log();
        var s61 = cert.split(",")[5];
        if (s61 != " S=61") {
          this.messagestwo.push({ title: "非法证书" });
          this.buttonstate = false;
          return false;
        } else {
          this.youxiqoqi = false;
          order_checksn({
            sn: certs[0].sn,
            dialoguuid: localStorage.getItem("dialoguuid"),
          }).then((response) => {
            console.log(response.data, "response1122");
            this.URl = response.data.servbuyurl;
            this.tianshu = response.data.mchexpirerest; //mchexpirerest
            this.youxiqoqi = response.data.mchexpirerest > 30 ? true : false;
            this.buttonstate = true;
            if (response.data.isnowmch == 1) {
              //是从本系统购买证书
              console.log(response.data.starttime);
              var begintime = /\d{4}-\d{1,2}-\d{1,2}/g.exec(
                response.data.begintime
              );
              var expiretime = /\d{4}-\d{1,2}-\d{1,2}/g.exec(
                response.data.expiretime
              );
              var mchexpire = /\d{4}-\d{1,2}-\d{1,2}/g.exec(
                response.data.mchexpire
              );
              //第一窗口显示
              this.messagesone.push({ title: "本系统订购：正常" });
              //第二窗口显示
              if (response.data.expirerest < 30) {
                this.messagestwo.push({
                  title:
                    "已罐装医保证书，剩余<span style='color:red;font-weight: bold;' >" +
                    response.data.expirerest +
                    "</span>天",
                });
              } else {
                this.messagestwo.push({
                  title:
                    "已罐装医保证书，剩余" + response.data.expirerest + "天",
                });
              }

              this.messagestwo.push({ title: "证书起始时间：" + begintime });
              this.messagestwo.push({ title: "证书失效时间：" + expiretime });
              //第三窗口显示
              this.messagesthree.push({ title: "服务到期时间：" + mchexpire });
              if (response.data.ismchexpire == 0) {
                this.messagesthree.push({
                  title: "剩余天数：" + response.data.mchexpirerest,
                });
              } else {
                this.messagesthree.push({
                  title: "已过期天数：" + response.data.mchexpirerest,
                });
              }
              var str = "<div>";
              for (var i = 0; i < this.messagestwo.length; i++) {
                str =
                  str +
                  '<div style="padding: 20px 0 30px;height: 20px;border-bottom: 1px solid #f1f1f1;">' +
                  this.messagestwo[i].title +
                  "</div>";
              }
              this.str = str + "</div>";
            } else {
              this.buttonstate = false;
              this.messagesone.push({
                title: "非本系统订购：请联系原订购系统客服",
              });
            }
          });
        }
      }
    },
    fixinadvance() {
      window.open(this.URl + "?keysn=" + this.keynumber, "_blank");
    },
  },
};
</script>

<style scoped lang="css">
@import "./seal.css";

body {
  //background-color: #f0f2f5 !important;
}

/*html, body, #app, #root{background: #f5f5f5 !important;}*/

/*.son{*/
/*  position: absolute;*/
/*  left: 52px;*/
/*}*/
b {
  color: #333;
}

#sealintro {
  text-align: center;
  margin-top: 20px;
  line-height: 2;
  font-size: 14px;
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

.separate {
  display: flex;
  width: 100%;
  height: 640px;
}

.content {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.box-card {
  width: 480px;
  margin-left: 20px;
  position: relative;
  left: -65px;
}

.box-card button {
  display: block;
  width: 100px;
  position: absolute;
  left: 50%;
  bottom: 20px;
  margin-left: -50px;
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

.queren {
  display: block;
  height: 25px;
  line-height: 25px;
  padding: 10px 20px;
  color: #606266;
}

.queren:hover {
  color: #1890ff;
}
.buttoncss{
    background: #f39800;
}
</style>
