<template>
  <div id="box">
    <div class="heas">
      <div class="wps">
        <div class="biaoti" @click="homepay" style="">
          <div class="boxw">
            <img src="@/assets/images/biaoti.png" width="100%" />
          </div>
        </div>
        <div style="overflow: hidden; position: absolute; right: 200px">
          <img src="@/assets/images/tu.png" alt="" />
        </div>
      </div>
      <a-popover
        trigger="click"
        :getPopupContainer="
          (triggerNode) => {
            return triggerNode.parentNode;
          }
        "
      >
        <div class="heduser">
          <div class="h-img">
            <a-avatar style="" :size="45" icon="user" />
            <!--            <div class="h-name">{{ nowcompany }}</div>-->
          </div>
        </div>
        <template slot="content">
          <div class="boxcont">
            <div class="b-cont">
              <a-avatar :size="45" icon="user" />
              <div class="b-list">{{ nowcompany }}</div>
              <div class="b-list">登录邮箱：{{ nowemail }}</div>
              <div class="b-list">信用代码：{{ nowyscode }}</div>
            </div>

            <div class="b-foot">
              <div
                @click="jump"
                style="color: black; font-weight: 700"
                class="b-oper"
              >
                订单查询
              </div>
              <div
                style="
                  color: black;
                  font-weight: 700;
                  border-bottom: 1px solid #f5f5f5;
                  display: none;
                "
                class="b-oper"
              >
                个人中心
              </div>
              <div
                @click="delLocal"
                style="color: #f39800; font-weight: 700"
                class="b-oper"
              >
                退出登录
              </div>
            </div>
          </div>
        </template>
      </a-popover>
    </div>
  </div>
</template>

<script>
import { conf_list, order_orderlist } from "@/api/manage";

export default {
  name: "NavTitle",
  components: {},
  data() {
    return {
      configdata: {},
      btnTime: null,
      datas: [],
      nowcompany: "",
      nowemail: "",
      nowyscode: "",
      timer: null,
    };
  },
  created() {
    const TIME_COUNT = 1;
    if (!this.timer) {
      this.count = TIME_COUNT;
      this.show = false;
      this.timer = setInterval(() => {
        if (this.count > 0 && this.count <= TIME_COUNT) {
          this.nowemail = localStorage.getItem("email");
          this.nowcompany = localStorage.getItem("company");
          this.nowyscode = localStorage.getItem("yscode");
          this.count--;
        } else {
          this.show = true;
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
    }

    // console.log(this.nowcompany)

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
  },
  mounted() {},
  methods: {
    homepay() {
      this.$router.push("/");
    },

    jump() {
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
        window.sessionStorage.setItem("random", 1);
        // this.Index = window.sessionStorage.getItem("random");
        // console.log(this.Index);
        this.$emit("title-click", 1);
        this.$router.push("/orderlist");
      }
    },
    delLocal() {
      this.$confirm("确定退出吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("退出了");
          localStorage.removeItem("email");
          localStorage.removeItem("emailcode");
          localStorage.removeItem("yscode");
          localStorage.removeItem("company");
          window.sessionStorage.setItem("random", 0);
            this.$emit("title-click", 0);
          this.$router.push("/");

        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped lang="css">
.heas {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 100px;
  /*box-shadow: 5px 0px 20px 0px #e9f3ff;*/
  border-bottom: 15px solid #f5f7fb;
  background-color: #ffffff;
  /* overflow: hidden; */
  z-index: 999;
}

.wps {
  display: flex;
  height: 100px;
  line-height: 80px;
  text-align: center;
  cursor: pointer;
}

.biaoti {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 50px;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  font-family: "黑体";
  color: #333333;
}

.boxw {
  vertical-align: middle;
}

.heduser {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 130px;
  height: 100px;
  /* background: #5ba656; */
  cursor: pointer;
}

.h-img {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.h-name {
  width: 70px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-weight: 700;
}

.boxcont {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  width: 250px;
  height: 330px;
  font-size: 12px;
  color: #333333;
}

.b-list {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 10px;
}

.b-cont {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 170px;

  background:#fff88f;
  padding: 10px;
  box-sizing: border-box;
}

.b-foot {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.b-oper {
  width: 80%;
  height: 70px;
  margin: 0 auto;
  text-align: center;
  line-height: 70px;
  cursor: pointer;
}
</style>
