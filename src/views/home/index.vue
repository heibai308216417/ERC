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
            <div class="paydemo-type-content">
              <div
                v-show="showTitle('WX')"
                class="paydemo-type-name article-title"
              >
                微信支付
              </div>
              <div class="paydemo-type-body">
                <div
                  v-show="appPaywayList.indexOf('WX_NATIVE') >= 0"
                  :class="{ this: currentWayCode === 'WX_NATIVE' }"
                  class="paydemo-type color-change"
                  @click="changeCurrentWayCode('WX_NATIVE', 'codeImgUrl')"
                >
                  <img
                    class="paydemo-type-img"
                    src="@/assets/payTestImg/wx_native.svg"
                  /><span class="color-change">微信二维码</span>
                </div>

                <div
                  v-show="appPaywayList.indexOf('WX_BAR') >= 0"
                  :class="{ this: currentWayCode === 'WX_BAR' }"
                  class="paydemo-type color-change"
                  @click="changeCurrentWayCode('WX_BAR', '')"
                >
                  <img
                    class="paydemo-type-img"
                    src="@/assets/payTestImg/wx_bar.svg"
                  /><span class="color-change">微信条码</span>
                </div>

                <div
                  v-show="appPaywayList.indexOf('WX_JSAPI') >= 0"
                  :class="{ this: currentWayCode === 'WX_JSAPI' }"
                  class="paydemo-type color-change"
                  @click="changeCurrentWayCode('WX_JSAPI', 'codeImgUrl')"
                >
                  <img
                    class="paydemo-type-img"
                    src="@/assets/payTestImg/wx_jsapi.svg"
                  /><span class="color-change">公众号/小程序</span>
                </div>

                <div
                  v-show="appPaywayList.indexOf('WX_H5') >= 0"
                  :class="{ this: currentWayCode === 'WX_H5' }"
                  class="paydemo-type-h5"
                  @click="changeCurrentWayCode('WX_H5', 'payurl')"
                >
                  <img
                    class="paydemo-type-img"
                    src="@/assets/payTestImg/wx_h5.svg"
                  /><span class="color-change">微信H5</span>
                </div>
              </div>
              <a-row></a-row>

              <a-row>
                <a-col :span="24">
                  <a-form :form="form" @submit="handleSubmit">
                    <a-row>
                      <a-col :span="24">
                        <a-form-item
                          label="购买项目"
                          :label-col="{ span: 2 }"
                          :wrapper-col="{ span: 15, offset: 1 }"
                          :colon="false"
                        >
                          <div v-if="configdata.saletype == 'single'">
                            <a-tooltip
                              v-for="item in pricelist"
                              placement="top"
                            >
                              <template slot="title">
                                <span>{{ item.tooltip }}</span>
                              </template>
                              <a-radio-group

                                v-if="item.checktype == 'radio'"
                                :default-value="item.isforce == 0 ? 0 : 1"
                                name="radioGroup"
                              >
                                <a-radio :value="1">
                                  {{ item.title
                                  }}<span style="color: #f39800"
                                    >￥{{ item.price }}
                                    <i
                                      style="
                                        color: #999;
                                        text-decoration: line-through;
                                        font-size: 8px;
                                      "
                                      >（原价{{ item.marketprice }}）</i
                                    ></span
                                  >
                                </a-radio>
                              </a-radio-group>

                              <!--省心服务-邮寄到手-->
                              <a-checkbox
                                v-if="
                                  item.checktype == 'checkbox' &&
                                  item.servicename == 'express'
                                "
                                :checked="checkeddef"
                                @change="onChange1"
                              >
                                {{ item.title
                                }}<span v-if="item.price > 0" style="color: #f39800"
                                  >￥{{ item.price }}</span
                                >
                              </a-checkbox>
                              <!--不用选的服务-->
                              <a-checkbox
                                v-if="
                                  item.checktype == 'checkbox' &&
                                  item.servicename == 'info'
                                "
                                :checked="true"
                              >
                                {{ item.title
                                }}<span v-if="item.price > 0" style="color: #f39800"
                                  >￥{{ item.price }}</span
                                >
                              </a-checkbox>
                            </a-tooltip>
                          </div>

                          <!--套餐销售-->
                          <div
                            style="margin-left: -30px"
                            v-if="configdata.saletype == 'package'"
                          >
                            <a-radio-group v-model="packageid">
                              <a-radio
                                v-for="item in pricelist"
                                :value="item.id"
                              >
                                <a-tooltip placement="top">
                                  <template slot="title">
                                    <span>{{ item.tooltip }}</span>
                                  </template>
                                  {{ item.title
                                  }}<span style="color: red"
                                    >￥{{ item.price }}
                                    <i
                                      v-if="item.marketprice > 0"
                                      style="
                                        color: #999;
                                        text-decoration: line-through;
                                        font-size: 8px;
                                      "
                                      >（原价{{ item.marketprice }}）</i
                                    ></span
                                  >
                                </a-tooltip>
                              </a-radio>
                            </a-radio-group>
                          </div>
                        </a-form-item>
                      </a-col>
                    </a-row>

                    <a-row>
                      <a-col :span="12">
                        <a-form-item
                          label="购买数量"
                          :labelCol="{ span: 4 }"
                          :wrapper-col="{ span: 1, offset: 1 }"
                          :colon="false"
                        >
                          <a-input-number
                            id="inputNumber"
                            v-decorator="[
                              'totalnum',
                              {
                                initialValue: 1,
                                rules: [
                                  { required: true, message: '购买数量!' },
                                ],
                              },
                            ]"
                            :max="100"
                            :min="1"
                            @change="onChanges"
                          />
                        </a-form-item>
                      </a-col>

                      <a-col :span="12" pull="4">
                        <a-form-item
                          label="购买单位"
                          :labelCol="{ span: 4 }"
                          :wrapperCol="{ span: 10, offset: 1 }"
                          :colon="false"
                        >
                          <a-input
                            v-decorator="[
                              'company',
                              {
                                rules: [
                                  {
                                    required: true,
                                    message: '请输入购买单位!',
                                  },
                                ],
                              },
                            ]"
                            placeholder="请输入购买单位全称"
                          />
                        </a-form-item>
                      </a-col>
                    </a-row>

                    <a-row>
                      <a-col :span="24">
                        <a-form-item
                          label="信用代码"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 8, offset: 1 }"
                          :colon="false"
                        >
                          <a-input
                            style="margin-left: -30px"
                            v-decorator="[
                              'yscode',
                              validatorRules.yscode,
                              {
                                rules: [
                                  {
                                    required: true,
                                    message: '请输入统一社会信用代码!',
                                  },
                                ],
                              },
                            ]"
                            placeholder="请输入统一社会信用代码"
                          />
                        </a-form-item>
                      </a-col>
                    </a-row>

                    <a-row>
                      <a-col :span="12">
                        <a-form-item
                          label="经办人"
                          :labelCol="{ span: 4 }"
                          :wrapperCol="{ span: 10, offset: 1 }"
                          :colon="false"
                        >
                          <a-input
                            v-decorator="[
                              'name',
                              {
                                rules: [
                                  { required: true, message: '请输入经办人!' },
                                ],
                              },
                            ]"
                            placeholder="请输入经办人姓名"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12" pull="4">
                        <a-form-item
                          label="手机号码"
                          :labelCol="{ span: 4 }"
                          :wrapperCol="{ span: 10, offset: 1 }"
                          :colon="false"
                        >
                          <a-input
                            v-decorator="[
                              'phone',
                              validatorRules.phone,
                              {
                                rules: [
                                  {
                                    required: true,
                                    message: '请输入手机号码!',
                                  },
                                ],
                              },
                            ]"
                            placeholder="请输入11位手机号码"
                          />
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-form>
                </a-col>

                <a-col :span="24">
                  <div>
                    <a-form :form="form">
                      <a-row>
                        <a-col :span="24">
                          <a-form-item
                            label="是否开票"
                            :labelCol="{ span: 2 }"
                            :wrapperCol="{ span: 8, offset: 1 }"
                            :colon="false"
                          >
                            <div
                              style="
                                display: flex;
                                align-items: baseline;
                                margin-left: -30px;
                              "
                            >
                              <a-radio-group
                                v-model="valueaw"
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

                                <a-radio :disabled="true" :value="2">
                                  否
                                </a-radio>
                              </a-radio-group>
                              <div
                                v-if="valueaw == 1"
                                style="margin-left: 10px"
                              >
                                仅支持电子增值税普通发票
                              </div>
                              <div
                                v-if="valueaw == 2"
                                style="margin-left: 10px"
                              >
                                　
                              </div>
                            </div>
                          </a-form-item>
                        </a-col>
                      </a-row>

                      <a-row>
                        <a-col :span="8">
                          <a-form-item
                            label="电子邮箱"
                            :labelCol="{ span: 6 }"
                            :wrapperCol="{ span: 16, offset: 1 }"
                            :colon="false"
                          >
                            <a-input
                              style="margin-left: 10px"
                              v-decorator="['email', validatorRules.email]"
                              placeholder="请输入用于接收电子发票和查询订单的邮箱"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col :span="8">
                          <a-form-item
                            v-if="valueaw == 1"
                            label="购方名称"
                            :labelCol="{ span: 6 }"
                            :wrapperCol="{ span: 15, offset: 1 }"
                            :colon="false"
                          >
                            <a-input
                              style="margin-left: 10px"
                              v-decorator="[
                                'company',
                                {
                                  rules: [
                                    {
                                      required: true,
                                      message: '请输入购买单位!',
                                    },
                                  ],
                                },
                              ]"
                              disabled
                            />
                          </a-form-item>

                          <a-form-item
                            v-if="valueaw == 2"
                            label="购方名称"
                            :labelCol="{ span: 6, offset: 2 }"
                            :wrapperCol="{ span: 10, offset: 1 }"
                            :colon="false"
                          >
                            <a-input v-decorator="['company']" disabled />
                          </a-form-item>
                        </a-col>
                        <a-col :span="8" pull="1">
                          <a-form-item
                            v-if="valueaw == 1"
                            label="购方税号"
                            :labelCol="{ span: 6, offset: 2 }"
                            :wrapperCol="{ span: 15, offset: 1 }"
                            :colon="false"
                          >
                            <a-input
                              v-decorator="[
                                'yscode',
                                {
                                  rules: [
                                    {
                                      required: true,
                                      message: '请输入统一社会信用代码!',
                                    },
                                  ],
                                },
                              ]"
                              disabled
                            />
                          </a-form-item>

                          <a-form-item
                            v-if="valueaw == 2"
                            label="购方税号"
                            :labelCol="{ span: 6, offset: 2 }"
                            :wrapperCol="{ span: 15, offset: 1 }"
                            :colon="false"
                          >
                            <a-input v-decorator="['yscode']" disabled />
                          </a-form-item>
                        </a-col>
                      </a-row>

                      <a-row>
                        <a-col :span="12">
                          <a-form-item
                            label="地址电话"
                            :labelCol="{ span: 4 }"
                            :wrapperCol="{ span: 16, offset: 1 }"
                            :colon="false"
                          >
                            <a-input v-decorator="['address']" />
                          </a-form-item>
                        </a-col>
                        <a-col :span="12">
                          <a-form-item
                            style="margin-left: 20px"
                            label="银行、账号"
                            :labelCol="{ span: 3, offset: 4 }"
                            :wrapperCol="{ span: 14, offset: 1 }"
                            :colon="false"
                          >
                            <a-input v-decorator="['bank']" />
                          </a-form-item>
                        </a-col>
                      </a-row>
                    </a-form>
                  </div>
                </a-col>
              </a-row>

              <a-row style="">
                <a-col :span="24">
                  <div style="width: 800px; margin: auto; text-align: center">
                    <a-form
                      id="ok"
                      :form="form"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                      style="margin-left: 248px"
                    >
                      <a-form-item label="">
                        <a-checkbox
                          v-model="checked"
                          style="margin-right: 10px"
                          @change="onChangeqw"
                        >
                        </a-checkbox>
                        我已认真阅读并
                        <span :style="radioStyle" @click="boglook"
                          >同意协议</span
                        >
                      </a-form-item>
                    </a-form>
                  </div>
                </a-col>
              </a-row>

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
                    color: #FFFFFF;
                    margin: -10px 0 0 -25px;
                    border-radius: 8px 8px 8px 8px;

                  "
                  type="primary"
                  @click="handleSubmit"
                >
                  提交订单
                </a-button>
              </div>
                <div style="width: 100%;height: 40px">

                </div>

              <el-dialog
                :close-on-click-modal="false"
                :close-on-press-escape="false"
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
                    <span style="color: #f39800; cursor: pointer" @click="openseal"
                      >点击此处</span
                    >
                    前往购买。
                  </div>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="dialogVisible = false"
                    >关 闭</el-button
                  >
                </span>
              </el-dialog>
            </div>
          </div>
        </a-card>
        <a-modal
          :confirm-loading="confirmLoading"
          :destroyOnClose="true"
          :maskClosable="false"
          :visible="visible"
          title="阅读条款"
          width="45%"
          @cancel="handleCancel"
        >
          <Contract :Fathertoson="Fathertoson"></Contract>

          <template #footer>
            <a-button :disabled="disabled" class="footerbutton" type="primary" @click="handleOk"
              >{{ valiBtn }}
            </a-button>
          </template>
        </a-modal>

        <a-modal
          :confirm-loading="confirmLoading"
          :destroyOnClose="true"
          :maskClosable="false"
          :visible="visiblelook"
          title="技术支持服务"
          width="42%"
          @cancel="handleCancellook"
        >
          <div style="text-align: center; font-weight: 800">
            <h1>技术支持服务</h1>
          </div>

          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;贵公司的技术支持服务截止时间为 &nbsp;<b
              style="color: red"
              >{{ outtime }}</b
            >，技术支持服务已过期，为了方便您的使用，建议购买技术服务，技术支持服务收费标准：<b
              style="color: red"
              >38元/年</b
            >。
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;技术支持服务内容：数字证书使用咨询，数字证书使用问题处理。技术支持服务方式：电话或远程支持
          </p>

          <p></p>
          <br />
          <p></p>
          <br />

          <template #footer>
            <a-button :disabled="disabled" type="primary" @click="handleOklook"
              >同意购买技术服务
            </a-button>
          </template>
        </a-modal>

        <a-modal
          v-model="visiblemodd"
          title="流程说明"
          width="40%"
          @ok="handleOkmodd"
        >
          <p>
            <b
              >灌装流程说明：企业在此下单后，请再自行前往证书运维管理平台上提交证书申请。</b
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

         <div v-if="sssvisiblesss" class="position">
              <div class="position_cont">
                <div class="position_conttit">购买需知</div>
                <div class="position_content">
<!--                    <div style="text-align: center">-->
<!--                        <img src="@/assets/images/xuzhi.png" alt="" />-->
<!--                    </div>-->
                    {{ configdata.notice }}
                </div>
                <div class="position_contbot">
                  <span style="cursor: pointer" @click="handleCancesl">
                    {{ buttso }}
                  </span>
                </div>
              </div>
            </div>

        <div v-if="Tips" class="position">
          <div class="position_cont">
            <div class="position_conttit">
                温馨提示
            </div>
            <div class="position_content">
                <div style="margin-right: 50px">
<!--                    <img src="@/assets/images/tishi.png" width="150px" alt="" />-->
                </div>
              省心服务可以帮您提供申请、罐装、邮寄的一站式服务，放弃省心服务可能无法及时获得CA证书，请再次确认是否放弃订购！
            </div>
            <div class="position_contbot">
                <el-button type="danger" style="height: 40px;margin-top: 6px" plain  @click="handleCanceslgiveup">
                    放弃订购
                </el-button>
                <el-button type="warning" style="height: 40px;margin-top: 6px" plain @click="handleCanceslcontinue">
                    继续订购
                </el-button>
            </div>
          </div>
        </div>
        <div
          v-if="configdata.showonline == 1"
          style="
            display: flex;
            flex-direction: column;
            position: fixed;
            right: 25px;
            bottom: 100px;
            width: 100px;
            overflow: hidden;
            cursor: pointer;
          "
          @click="Gokefu"
        >
          <img
            :src="icon_ren"
            style="width: 100px; height: 90px; margin: 10px auto 10px"
          />
          <span
            style="
              display: block;
              text-align: center;
              margin: 0 auto;
              width: 80px;
              height: 30px;
              line-height: 30px;
              font-size: 14px;
              color: #fff;
              background: #f39800;
              border-radius: 5px;
            "
            >在线客服</span
          >
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
        color: "#f39800",
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

    // handleCloseBarCode () {
    //   this.$refs.payTestBarCode.visible = false
    // }
  },
};
</script>

<style scoped lang="css">
@import "./pay.css";

body {
  background-color: #ecf5ff;
  overflow: hidden;
}

b {
  color: #333;
}

.separate {
  /*display: flex;*/
  /*width: 100%;*/
  /*height: 340px;*/

}

.content {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 16px 16px 16px 16px;
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
  top: 40%;
  left: 50%;
  border-radius: 5px;
  margin-top: -125px;
  margin-left: -225px;
  z-index: 1000 !important;
}

.position_conttit {
  display: block;
  color: #252626;
  font-size: 16px;
  font-weight: bold;
  line-height: 50px;
    text-align: center;
}

.position_content {
  display: block;
  color: #f39800;
  font-weight: bold;
  font-size: 14px;
    text-align: center;
  line-height: 40px;
  padding: 15px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  text-indent:2em;
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
  background: #f39800;
}

.ant-modal {
  top: 50px;
}
.footer {
  width: 100%;
  height: 20px;
  background: #4278ff;
}
.c-button-warning {
    color: #fff;
    background-color: #ff9900;
    border-color: #ff9900;
}
.footerbutton {
    font-weight: bold;
    width: 100px;
    height: 35px;
    font-size: 15px;
    background: #f39800;
    border: 0;
    margin: 10px 0 10px 0;
    border-radius: 8px 8px 8px 8px;
}
</style>
