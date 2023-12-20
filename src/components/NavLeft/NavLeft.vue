<template>
  <div id="box">
    <div class="left">
      <div
        style="
          width: 100%;
          height: 100px;
          background: #ffffff;
          text-align: center;
          padding-top: 15px;
        "
      >
        <img src="@/assets/images/logo.png" width="130px" alt="" />
      </div>
      <div class="l-center">
        <div
          :class="Index == 0 ? 'l-list-back' : ''"
          class="l-list"
          @click="Jump(0)"
        >
          <div class="l-img">
            <img v-if="Index == 0" alt="" src="@/assets/img/shouye.png" />
            <img v-else alt="" src="@/assets/img/shouye_1.png" />
          </div>
          <div class="l-sp">
            <span>首页</span>
          </div>
        </div>

        <div
          :class="Index == 2 ? 'l-list-back' : ''"
          class="l-list"
          @click="dialogVisible = true"
        >
          <div class="l-img">
            <img v-if="Index == 2" alt="" src="@/assets/img/guihuaguanli.png" />
            <img v-else alt="" src="@/assets/img/guihuaguanli_1.png" />
          </div>
          <div class="l-sp">
            <span>制图服务</span>
          </div>
        </div>

        <div
          :class="Index == 1 ? 'l-list-back' : ''"
          class="l-list"
          @click="Jump(1)"
        >
          <div class="l-img">
            <img v-if="Index == 1" alt="" src="@/assets/img/31dingdan.png" />
            <img v-else alt="" src="@/assets/img/31dingdan_1.png" />
          </div>
          <div class="l-sp">
            <span>订单查询</span>
          </div>
        </div>

        <el-dialog
          :center="true"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :modal="false"
          :visible.sync="dialogVisible"
          title="智能图片处理"
          width="30%"
        >
          <div id="successbox">
            <div class="infotip">
              在本系统下单购买证书后，须自行登录{{
                configdata.certplatformtitle
              }}提交证书申请。 您可以<span
                style="color: #f39800; cursor: pointer"
                @click="openyw"
                >点击此处</span
              >跳转到{{ configdata.certplatformtitle }}。
            </div>
            <div class="infotip">
              提交证书申请后，还须在{{
                configdata.certplatformtitle
              }}提交电子签章所需的公章图片。专业的图像处理软件处理图章耗时且操作繁杂，如果您需要人工智能自动化图章处理（自主操作，使用简单，安全可靠，5秒出图），请
              <span style="color: #f39800; cursor: pointer" @click="Jump(2)"
                >点击此处</span
              >
              前往购买。
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="warning" @click="dialogVisible = false"
              >关 闭</el-button
            >
          </span>
        </el-dialog>

        <div
          :class="Index == 3 ? 'l-list-back' : ''"
          class="l-list"
          @click="Jump(3)"
        >
          <div class="l-img">
            <img v-if="Index == 3" alt="" src="@/assets/img/tuihuo.png" />
            <img v-else alt="" src="@/assets/img/tuihuo_1.png" />
          </div>
          <div class="l-sp">
            <span>产品退订</span>
          </div>
        </div>

        <div
          :class="Index == 4 ? 'l-list-back' : ''"
          class="l-list"
          @click="Jump(4)"
        >
          <div class="l-img">
            <img v-if="Index == 4" alt="" src="@/assets/img/fapiao1.png" />
            <img v-else alt="" src="@/assets/img/fapiao.png" />
          </div>
          <div class="l-sp">
            <span>发票管理</span>
          </div>
        </div>

        <div
          :class="Index == 5 ? 'l-list-back' : ''"
          class="l-list"
          @click="Jump(5)"
        >
          <div class="l-img">
            <img v-if="Index == 5" alt="" src="@/assets/img/jiance.png" />
            <img v-else alt="" src="@/assets/img/jiance1.png" />
          </div>
          <div class="l-sp">
            <span>证书检测</span>
          </div>
        </div>

        <div
          :class="Index == 6 ? 'l-list-back' : ''"
          class="l-list"
          @click="Jump(6)"
        >
          <div class="l-img">
            <img v-if="Index == 6" alt="" src="@/assets/img/nianfei1.png" />
            <img v-else alt="" src="@/assets/img/nianfei.png" />
          </div>
          <div class="l-sp">
            <span>年费服务</span>
          </div>
        </div>
      </div>
      <div style="position: fixed; left: 0px; bottom: 0px; text-align: center">
        <img src="@/assets/images/ca3.png" width="285px" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { conf_list } from "@/api/manage";

export default {
  name: "NavLeft",
  components: "",
  props: ["partInfo"],
  data() {
    return {
      infos: this.partInfo,
      Index: 0,
      dialogVisible: false,
      configdata: {},
    };
  },

  created() {
    this.Index = window.sessionStorage.getItem("random");
    conf_list().then((response) => {
      this.configdata = response.data;
      localStorage.setItem("serviceurl", response.data.serviceurl);
    });
  },
  watch: {
    partInfo() {
      this.Index = this.partInfo;
    },
  },

  mounted() {},
  methods: {
    Jump(index) {
      window.sessionStorage.setItem("random", index);
      this.Index = window.sessionStorage.getItem("random");
      console.log(this.Index);
      this.$emit("item-click", index);
    },
    openyw() {
      window.open(this.configdata.certplatformurl, "_blank");
    },
  },
};
</script>

<style lang="less" scoped>
.left {
  position: relative;
  width: 270px;
  height: 100vh;
  //background-color: #ffffff;
  /*box-shadow: 5px 0px 20px 0px #e9f3ff;*/
  z-index: 888;
  overflow: hidden;
}

.l-center {
  //margin-top: 30px;
  margin-bottom: 20px;
}

.l-list {
  display: flex;
  align-items: center;
  width: 180px;
  height: 60px;
  font-weight: 400;
  color: #656565;
  border-radius: 6px 6px 6px 6px;
  margin: 5px 55px 5px 30px;
  cursor: pointer;
  //background-color: #ecf5ff;
  text-align: center;
}

.left {
  background-color: #ffffff;
}

.l-list-back {
  background: #ffffff;
  font-weight: 700;
  color: #3b67f4;
}

.l-list:hover {
  background-color: #ecf5ff;
  font-weight: 700;
}

.l-img {
  width: 20px;
  height: 22px;
  margin-top: 1px;
  padding-left: 30px;
}

.l-img img {
  width: 25px;
  height: 27px;
}

.l-sp {
  width: 100%;
  height: 20px;
  margin-top: 5px;
}

.l-sp span {
  font-size: 12px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
}

.infotip {
  text-indent: 30px;
  line-height: 2;
}

:deep(.el-dialog__title) {
  font-weight: 700;
}

:deep(.el-dialog__header) {
  border-bottom: 1px solid #eee;
}

:deep(el-dialog__footer) {
  border-top: 1px solid #eee;
}
</style>
