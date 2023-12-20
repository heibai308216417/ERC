<template>
  <div style="width: 100%; height: 700px; overflow-y: auto">
    <div v-if="current == 1" class="yangshi">
      <div>
        <div style="width: 100%; height: 30px"></div>
        <h1 style="font-size: 45px; text-align: center; font-weight: 800">
          医保数字证书技术支持服务协议
        </h1>
        <div style="width: 100%; height: 300px"></div>
        <div style="display: flex; font-weight: 800">
          <div style="padding-left: 20%"><h1>甲&emsp;&emsp;方：</h1></div>
          <div style="text-align: center">
            <h1>{{ Fathertoson.companyname }}</h1>
          </div>
        </div>
        <div style="display: flex; font-weight: 800">
          <div style="padding-left: 20%"><h1>乙&emsp;&emsp;方：</h1></div>
          <div>
            <h1>{{ configdata.companytitle }}</h1>
          </div>
        </div>
        <div style="display: flex; font-weight: 800">
          <div style="padding-left: 20%"><h1>签订日期:&ensp;</h1></div>
          <div>
            <h1>{{ year }}年{{ month }}月{{ dates }}日</h1>
          </div>
        </div>
      </div>
      <div style="width: 100%; height: 150px"></div>

      <div>
        <div class="ziti">
          医保数字证书是国家医保局自建CA机构签发的包含数字证书使用者身份信息和公开密钥的电子文件，用于全国医保业务体系内部的身份认证、信息加解密、签名验签等，保障医保业务和数据的安全性。
        </div>
        <div class="ziti">
          本公司是经国家医保局自建CA机构认证通过的医保数字证书存储介质生产厂商在{{
            configdata.province
          }}省的唯一合法授权代理商，为{{
            configdata.province
          }}医保相关用户提供符合国家医保标准规范的数字证书存储介质及其相关的技术服务。
        </div>
        <div class="ziti">
          本技术服务中的用户指医保数字证书持有人以及申请使用医保数字证书的实体单位。
        </div>
        <div class="ziti">
          <b
            >为明确本公司技术服务内容，特对具体内容作如下说明，一旦订购本公司技术服务，即表示用户同意接受并愿意遵守本协议的所有条款。</b
          >
        </div>
        <div class="ziti"><b>第一条服务内容</b></div>
        <div class="ziti">
          本公司应当按照本技术服务向用户提供以下数字证书的服务内容：
        </div>
        <div class="ziti">
          （1）按订单数量提供符合医保标准规范的数字证书存储介质；
        </div>
        <div class="ziti">
          （2）受用户委托代其向{{
            configdata.province
          }}省医保局灌装制作医保数字证书；
        </div>
        <div class="ziti">
          （3）受用户委托按订单要求向用户邮寄已制作好的医保数字证书；
        </div>
        <div class="ziti">
          （4）医保数字证书的申请、更新、延期、补办的政策咨询；
        </div>
        <div class="ziti">（5）医保数字证书使用常见问题的技术支持；</div>
        <div class="ziti">
          （6）必要情况时赴用户现场服务（相关费用由用户另行负担）；
        </div>
        <div class="ziti">（7）其他：医保公共服务、招采业务的业务咨询等。</div>

        <div class="ziti"><b>第二条用户的权利和义务</b></div>
        <div class="ziti">
          1、用户订购医保数字证书技术服务，应依法提供真实、完整和准确的信
        </div>
      </div>

      <div>
        <div style="font-size: 20px">
          息，或提供其非法获取的相关信息及资料，导致开具错误发票，造成用户损失的，由用户承担相关责任。
        </div>
        <div class="ziti">
          2、用户对医保数字证书的使用必须符合中国相关法律法规、本技术服务，并对使用医保数字证书的行为负责。
        </div>
        <div class="ziti">
          3、在医保数字证书被吊销时，用户应立即停止使用相应的数字证书。
        </div>
        <div class="ziti">
          3、在医保数字证书被吊销时，用户应立即停止使用相应的数字证书。
        </div>
        <div class="ziti">
          4、在医保数字证书即将到期时，用户应及时续订技术服务，以免影响医保数字证书的使用。
        </div>
        <div class="ziti">
          <b
            >5、医保数字证书一律不得转让、转借或转用。因转让、转借或转用而产生的相关后果应当由用户自行承担。</b
          >
        </div>

        <div class="ziti"><b>第三条 本公司的权利和义务</b></div>
        <div class="ziti">
          1、本公司有权不予受理未订购技术服务的用户，有权拒绝技术服务过期的技术支持请求。
        </div>
        <div class="ziti">
          2、本公司仅提供医保数字证书申请、使用的技术支持服务，不对用户、依赖方或其他任何第三方因使用或依赖该证书而造成的任何损失承担责任。
        </div>
        <div class="ziti">
          3、本公司严格按照要求存储并采取有效措施保护用户提交的信息、资料。
        </div>
        <div class="ziti">
          4、本公司受用户委托向医保签发灌装的医保数字证书的有效性由医保部门负责，本公司不对医保数字证书有效性负责。
        </div>
        <div class="ziti">
          5、因用户未准确描述所遇到的问题或数字证书存储介质硬件故障，导致本公司未能解决用户使用问题的，本公司不承担因此给用户造成的损失。
        </div>
      </div>

      <div>
        <div class="ziti"><b>第四条 订购服务</b></div>
        <div class="ziti">
          1、用户申请订购数字证书存储介质、使用本技术服务时，需向本公司提交相应用户信息。
        </div>
        <div class="ziti">
          2、本公司负责为用户开具合法合规的技术服务费发票。
        </div>
        <div class="ziti"><b>第五条 使用服务</b></div>
        <div class="ziti">
          1、用户在获得技术支持服务时，应准确描述所遇到的问题。
        </div>
        <div class="ziti">
          2、用户应当妥善保管医保数字证书、保护PIN码安全，不得泄露或交付他人。用户知悉或应当知悉证书PIN码已经或可能泄露、损毁、丢失时，应当及时采取有效措施防止医保数字证书被不当使用，如未终止使用证书也未通知医保部门的，由此产生的相关责任本公司概不承担。
        </div>

        <div class="ziti"><b>第六条 续订服务</b></div>
        <div class="ziti">
          1、技术服务有效期到期后，用户若仍需继续使用医保数字证书，须通过本公司订购系统续订技术服务。
        </div>
        <div class="ziti">
          2、医保数字证书有效期到期后，用户若仍需继续使用数字证书，必须在到期前通过“{{
            configdata.province == "陕西"
              ? "陕西医保证书运维管理平台"
              : "证书在线服务平台"
          }}”进行自主延期操作，否则，证书到期将自动失效。
        </div>

        <div class="ziti"><b>第七条 证书吊销</b></div>
        <div class="ziti">
          1、如遇数字证书泄露、损毁、丢失、证书中的信息发生重大变更、或用户不希望继续使用数字证书、发现数字证书被不当使用的情况，用户应当立即登录“{{
            configdata.province == "陕西"
              ? "陕西医保证书运维管理平台"
              : "证书在线服务平台"
          }}”申请吊销证书，医保部门在接到吊销申请并审核无误后，在24小时内吊销用户的数字证书。
        </div>
      </div>

      <div>
        <div class="ziti">
          2、如医保部门发现用户存在提供信息不真实、证书被滥用、证书的安全性不能得到保障时，医保部门可能不经事先通知用户，直接吊销证书。
        </div>
        <div class="ziti">
          3、上述2种原因导致医保数字证书无法使用时，本公司无法提供因此无法使用的技术支持，且不承担相关责任。
        </div>

        <div class="ziti"><b>第八条 服务方式</b></div>
        <div class="ziti">
          本公司为用户提供电话咨询、线上咨询、远程连接服务、现场服务四种服务方式，保障用户出现问题时能够及时得到有效的技术支持。
        </div>
        <div class="ziti">1、服务方式：</div>
        <div class="ziti">
          （1）电话咨询、线上咨询、远程连接服务：本公司接到用户技术支持请求或故障报告后，立即通过（电话咨询、线上咨询、远程连接服务）帮助用户解决问题，支持提供7*24小时服务。
        </div>
        <div class="ziti">
          （2）现场服务：通过对问题作初步了解和分析，派出专业工程师在2个工作日内排除故障。如在2个工作日内无法解决，将在2日内向用户提出详细解决方案及日程安排，交给用户确认。
        </div>
        <div class="ziti">2、现场服务费用</div>
        <div class="ziti">
          本技术服务不包含现场服务费用，本公司工程师前往用户现场服务，须由用户另行支付相关费用。
        </div>

        <div class="ziti"><b>第九条 个人信息保护</b></div>
        <div class="ziti">
          1、用户同意向本公司提交委托办理医保数字证书所必要的身份信息（企业用户需提交企业名称、单位住所地、单位注册地址、统一社会信用代码、单位类型、经办人姓名、经办人手机号码、企业印章电子印模）。
        </div>
      </div>

      <div>
        <div class="ziti">
          2、根据监管的要求，本公司需妥善保存与认证相关的用户身份信息。
        </div>
        <div class="ziti">
          3、根据法律法规、强制性的行政执法或司法要求必须提供用户身份信息的情况下，本公司将依据要求对外共享、转让、公开披露相关信息。
        </div>
        <div class="ziti"><b>第十条 责任限制与免除</b></div>
        <div class="ziti">
          1、用户故意或无意地提供了不完整、不可靠或已过期的信息，又根据正常的流程提供了必须的审核文件，得到了本公司向医保部门灌装签发的医保数字证书，由此引起的一切后果应由用户全部承担，本公司不承担与证书内容相关的责任，但可以根据请求提供协查帮助。
        </div>
        <div class="ziti">
          2、用户知悉医保数字证书制作数据已经失密或者可能已经失密未及时告知有关各方、并终止使用该制作数据，未向本公司提供真实、完整和准确的信息，或者有其他过错，给医保数字证书依赖方造成损失的，由用户承担赔偿责任。
        </div>
        <div class="ziti">
          3、医保数字证书的申请资格由医保部门负责身份验证，对于因用户提供虚假或错误信息导致身份验证失败而使其受有损失的，由用户自行承担责任，与我公司无关。
        </div>
        <div class="ziti">
          4、因用户的网络、主机、操作系统或其他软硬件环境等存在安全漏洞，由此导致的安全事故及相关后果，用户自行承担责任。
        </div>
        <div class="ziti">
          5、如本公司已谨慎地遵循且履行了国家法律、法规的规定，视为本公司不存在过错，无须对因此产生的损失承担赔偿责任。
        </div>
        <div class="ziti"><b>第十一条 服务计费</b></div>
        <div class="ziti" v-if="configdata.province == '陕西'">
          本技术服务计费39元/年·个（有效期为一年，从签署日起至下一年度签署日止）。若服务期限届满时，用户未续费签约，视为本公司已履行完毕服务约
        </div>
      </div>
      <div>
        <div class="ziti" v-if="configdata.province == '陕西'">
          定，服务自动终止。
        </div>
        <div class="ziti">
          本次技术服务订购个数_<b>{{ Fathertoson.totalnum }}</b
          >_个，订购年数_<b>1</b>_年，总金额为_<b>{{
            Fathertoson.sendmethod == 2 ? selfcollar : bypost
          }}</b
          >_元， 因本服务的特殊性，一经售出，不支持退费。
        </div>
        <div class="ziti"><b>第十二条 不可抗力</b></div>
        <div class="ziti">
          1、由于台风、水灾、地震等不可抗力因素，导致本协议义务不能履行或者不能完全履行时，可以免除遭遇不可抗力方的相关责任。本公司应当及时通知用户，并在3日之内提供不可抗力的详细情况及协议不能履行或者不能完全履行的有效证明文件。双方可以根据不可抗力因素对协议履行的影响程度，决定是否解除协议，或者免除部分义务，或者延期履行义务。
        </div>
        <div class="ziti">
          2、遭遇不可抗力方应当尽可能地采取必要的措施减轻不可抗力对本协议的履行所造成的影响。由于未采取适当措施致使对方损失扩大的，不得就扩大损失的部分要求免除本方责任；由于未采取适当措施致使本方损失扩大的，也不得向对方要求赔偿。
        </div>
        <div class="ziti"><b>第十三条 其他</b></div>
        <div class="ziti">
          <b
            >本协议条款可由本公司进行更新，本公司会通过网站提前进行公布，更新后的说明一旦公布即替代原来的协议条款。</b
          >
        </div>
        <div class="ziti">
          1、双方对本技术服务的规定发生争议时，应首先本着友好协商的原则解决。若协商不成的，任何一方可以请求有管辖权的人民法院依法对所争议的事项作出裁决。
        </div>
        <div class="ziti">2、本公司对本技术服务享有最终解释权。</div>
        <div class="ziti">
          3、用户确认已经认真阅读并完全理解本技术服务中的各项条款，用户在本系统提交订购，则表明接受本技术服务的约束，本技术服务即时生效。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { conf_list } from "@/api/manage";

export default {
  name: "contract",
  props: {
    Fathertoson: {
      companyname: "",
      companyyscode: "",
      sendmethod: null,
      totalnum: null,
      jiezhiprice: "",
      guanzhuangprice: "",
      shengxinprice: "",
      year: 1,
    },
  },
  data() {
    return {
      wed: 5,
      configdata: {},
      year: "",
      month: "",
      dates: "",
      current: 1,
    };
  },
  computed: {
    bypost() {
      return (
        (this.Fathertoson.guanzhuangprice +
          this.Fathertoson.jiezhiprice +
          this.Fathertoson.shengxinprice) *
        this.Fathertoson.totalnum
      );
    },
    selfcollar() {
      return (
        (this.Fathertoson.guanzhuangprice + this.Fathertoson.jiezhiprice) *
        this.Fathertoson.totalnum
      );
    },
  },
  created() {
    console.log(this.Fathertoson, "Fathertoson");
    conf_list().then((response) => {
      console.log(response.data, "info");
      this.configdata = response.data;
      localStorage.setItem("serviceurl", response.data.serviceurl);
    });
    const date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.dates = date.getDate();
  },
  methods: {
    sizechange(val) {
      console.log(val + "每页条数");
    },
    currentchange(val) {
      console.log(val + "当前页");
      this.current = val;
    },
  },
};
</script>

<style scoped>
.yangshi {
  width: 100%;
  /*height: 700px;*/
  background-color: #fff;
  font-family: SimSun;
  z-index: 999;
  overflow-y: auto;
}
.ziti {
  font-size: 1.25rem;
  text-indent: 2em;
}
</style>
