<template>
  <div id="box">
        <div class="beijingtu">
          <div style="width: 100%; height: 100vh">
            <img
              alt=""
              height="100%"
              src="@/assets/images/bj1.png"
              width="100%"
            />
          </div>
        </div>
    <div class="login">
      <el-row>
        <el-col :span="12">
          <div class="login-right">
            <img alt="" src="@/assets/images/left.png" width="82%" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="login-right">
            <div class="lgr-hed">
              <img alt="" src="@/assets/images/tu41.png" width="100%" />
            </div>
            <el-form
              ref="ruleForm"
              :model="form"
              :rules="rules"
              class="demo-ruleForm"
              label-width="90px"
              style="margin-top: 80px"
            >
              <el-row>
                <el-col :span="18">
                  <el-form-item
                    class="el-input-xin"
                    label="信用代码"
                    prop="username"
                  >
                    <el-input
                      v-model="form.username"
                      class="el-input-xin el-input-xin-jia"
                      clearable
                      placeholder="请输入下单时填写的信用代码"
                      show-word-limit
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6"> </el-col>
              </el-row>

              <!--   -->
              <el-row>
                <el-col :span="18">
                  <el-form-item
                    class="el-input-xin"
                    label="电子邮箱"
                    prop="email"
                  >
                    <div
                      style="display: flex; flex-direction: row; width: 100%"
                    >
                      <el-input
                        v-model="form.email"
                        class="el-input-xin el-input-xin-jia"
                        placeholder="请输入填写的电子邮箱"
                        show-word-limit
                        style="width: 85%"
                      ></el-input>
                      <el-button
                        :disabled="disabled"
                        style="
                          display: block;
                          background: #f39800;
                          border: 0;
                          width: 100px;
                          margin-left: 10px;
                        "
                        type="warning"
                        @click="verification(0)"
                        >{{ valiBtn }}
                      </el-button>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="6"> </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item class="el-input-xin" label="验证码" prop="code">
                    <el-input
                      v-model="form.code"
                      class="el-input-xin el-input-xin-jia"
                      maxlength="4"
                      placeholder="请输入邮箱验证码"
                      show-word-limit
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6"> </el-col>
              </el-row>
              <el-row>
                <el-col :span="16">
                  <el-form-item class="el-input-xin">
                    <a-button
                      class="form-btn"
                      style="width: 100%; background: #f39800"
                      type="primary"
                      @click="submitForm('ruleForm')"
                    >
                      马上登录
                    </a-button>
                  </el-form-item>
                </el-col>
                <el-col :span="8"> </el-col>
              </el-row>
            </el-form>
          </div>
        </el-col>
      </el-row>
        <div style="position: absolute;bottom: -200px; width: 100%;height: 50px;
        display: flex;justify-content: space-between;">
          <div>
              <div style="display: flex; justify-content: center">
                  <div >
                      <img alt="" src="@/assets/images/footer.png" width="25px" />
                  </div>
                  <div style="width: 10px; height: 10px"></div>
                  <div >
                      <span style="color: #FFFFFF;line-height: 25px">陕ICP备2022007316号-1</span>
                  </div>
              </div>
          </div>
          <div>
              <div style="display: flex; justify-content: center">
                  <div>
                      <img alt="" src="@/assets/images/bai1.png" width="25px" />
                  </div>
                  <div style="width: 10px; height: 30px"></div>
                  <div>
                      <span style="color: #FFFFFF">kefu@xahuadao.com</span>
                  </div>
              </div>
          </div>
          <div>
              <div style="display: flex; justify-content: center">
                  <div>
                      <img alt="" src="@/assets/images/bai2.png" width="25px" />
                  </div>
                  <div style="width: 10px; height: 10px"></div>
                  <div>
                      <span style="color: #FFFFFF">400-8709003</span>
                  </div>
              </div>
          </div>
        </div>
    </div>




  </div>
</template>

<script>
import { conf_list, sendloginemail, userlogin } from "@/api/manage";

export default {
  name: "paytest",
  props: {},
  data() {
    return {
      valiBtn: "获取验证码",
      disabled: false,
      show: true,
      count: "",
      timer: null,
      http: true,
      configdata: {},
      projectname: "",
      billstatus: 0,
      company: "",
      drawer: 1,
      endtime: null,
      id: "",
      page: 1,
      pagesize: 10,
      service: "all",
      starttime: null,
      status: 0,
      rescode: null,
      countdown: 10,
      yscode: "",
      codestate: 100,
      Index: 0,
      email: "",
      imgurlas: "",
      sIndexs: 1,
      form: {
        username: "",
        password: "",
        email: "",
        code: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入下单时填写的信用代码",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入下单时的邮箱!", trigger: "blur" },
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
            message: "请输入正确的邮箱!",
          },
        ],
        code: [{ required: true, message: "请填写验证码", trigger: "blur" }],
      },
    };
  },
  created() {
    this.http =
      window.location.hostname == "salekey.uniondept.com" ? false : true;
    this.httplogo = "/imgs/" + window.location.hostname + "/logo.png";
    this.usbkeyimg = "/imgs/" + window.location.hostname + "/key.jpg";
  },
  mounted() {
    conf_list().then((response) => {
      this.configdata = response.data;
    });
  },
  methods: {
    homepay() {
      this.$router.push("/");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (this.form.username.length < 5) {
          this.$message.info("请填写正确企业信用代码");
          return false;
        } else if (
          !/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(
            this.form.email
          )
        ) {
          this.$message.info("请填写正确邮箱");
          return false;
        } else if (this.form.code == "") {
          this.$message.info("请填写正确邮箱验证码");
          return false;
        } else {
          userlogin({
            email: this.form.username,
            code: this.form.code,
            yscode: this.form.username,
            company: this.form.company,
          }).then((response) => {
            console.log(response);
            localStorage.setItem("yscode", this.form.username);
            localStorage.setItem("emailcode", this.form.code);
            localStorage.setItem("email", this.form.email);
            localStorage.setItem("company", this.form.company);
            this.$router.push("/orderlist");
          });
        }
      });
    },

    login: function () {
      console.log(this.form, "来了");
    },
    verification(codes) {
      var mailbox = this.form.email;
      if (
        !/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(
          mailbox
        )
      ) {
        this.$message.info("请填写正确邮箱！！！");
        return false;
      } else {
        let time = 60;
        let timer = setInterval(() => {
          if (time == 0) {
            clearInterval(timer);
            this.valiBtn = "获取验证码";
            this.disabled = false;
          } else {
            this.disabled = true;
            this.valiBtn = time + "秒后重试";
            time--;
          }
        }, 1000);
        sendloginemail({ email: mailbox, yscode: this.form.username }).then(
          (response) => {
            console.log();
            if (response.code == 0) {
              const TIME_COUNT = 60;
              if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                  } else {
                    this.show = true;
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000);
              }
            }
            let timer = setInterval(() => {
              if (time == 0) {
                clearInterval(timer);
                this.valiBtn = "获取验证码";
                this.disabled = false;
              } else {
                this.disabled = true;
                this.valiBtn = time + "秒后重试";
                time--;
              }
            }, 1000);
          }
        );
      }
    },
    youxiang() {
      // console.log("65565")
      window.open("https://qy.163.com/login/?from=ym");
    },
  },
};
</script>

<style lang="css" scoped>
@import "./payTest.css";

b {
  color: #333;
}

body {
  width: 100%;
  height: 100%;
  /*background: url("../../assets/images/beijing.png") no-repeat;*/
}

.bg-img {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  /*background: url("../../assets/images/beijing.png") no-repeat;*/
  background-position-x: -150px;
}

.wpss {
  display: flex;
  /*background: url("../../assets/images/beijing.png") no-repeat;*/
  /*background-position-x: -150px;*/
  height: 110px;
  line-height: 110px;
  text-align: center;
}

.biaoti {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  margin-left: 50px;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  font-family: "黑体";
  color: #333333;
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

/*                               */
/**/
.login {
  flex: 7;
  display: flex;
  position: fixed;
  left: 26%;
  top: 17%;
  /* flex-direction: column; */
  width: 45%;
  height: 498px;
  margin: 30px auto;
  background-color: #ffffff;

}

.login-left {
  width: 500px;
  background-image: url("../../assets/images/left_login.png");
  background-repeat: no-repeat;
  background-size: contain;
}

.login-right {
  width: 500px;
  font-size: 14px;
    margin-left: -1px;
    margin-top: -1px;
}

.lgr-hed {
  width: 68%;
  height: 30px;
  margin-top: 50px;
  margin-left: 25px;
}

.form-box {
  display: block;
  width: 300px;
  height: 50px;
  margin: 0 auto;
  margin-top: 20px;
  font-weight: bold;
  font-size: 12px;
  border-radius: 5px 5px 5px 5px;
  border: 1px solid #dbdbdb;
}

.form-btn {
  display: block;
  width: 300px;
  height: 50px;
  margin: 0 auto;
  font-weight: bold;
  font-size: 12px;
  margin-top: 10px;
  background-image: url("../../assets/images/bg_btn.png");
  /* background-repeat: no-repeat; */
  background-size: cover;
  border: 0;
}

.form-code {
  position: absolute;
  right: 60px;
  top: -20px;
  width: 112px;
  height: 22px;
  font-size: 12px;
  font-family: SourceHanSansCN-Light, SourceHanSansCN;
  font-weight: 300;
  color: #3381ff;
  line-height: 129px;
  cursor: pointer;
  font-weight: bold;
}

.form-codes {
  position: absolute;
  right: 90px;
  top: -20px;
  width: 112px;
  height: 22px;
  font-size: 12px;
  font-family: SourceHanSansCN-Light, SourceHanSansCN;
  font-weight: 300;
  color: #999999;
  line-height: 129px;
  cursor: pointer;
  font-weight: bold;
}

.foot {
  flex: 2;
  width: 500px;
  text-align: center;
  margin: auto;
  font-size: 12px;
  font-family: SourceHanSansCN-Light, SourceHanSansCN;
  font-weight: 300;
  color: #333333;
  line-height: 30px;
  letter-spacing: 1px;
}

.foot-sp {
  cursor: pointer;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.beijingtu {
  width: 100%;
  height: 100vh;
  /*background-image: url("../../assets/images/beijing3.png");*/
  background-repeat: no-repeat;
  background-position: center top;
  background-attachment: fixed;
}

.textbiaoti {
  width: 800px;
  height: 110px;
}

.ziti {
  margin-top: 32px;
  margin-left: 10px;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  font-family: "黑体";
  color: #333333;
}

.ant-row {
  margin-left: 24px;
}
</style>
