<template>
    <div>
        <mt-header fixed title="服务协议">
            <router-link :to="path" slot="left">
                <mt-button icon="back"> 返回 </mt-button>
            </router-link>
        </mt-header>
        <div class="seize"></div>
        <h1>服务协议</h1>
        <p class="indent"><b>一、借款用途</b></p>
        <p class="indent"><b>××要从事个体经营，急需一笔资金。</b></p>
        <p class="indent"><b>二、借款金额</b></p>
        <p class="indent"><b>借款方向贷款方借款人民币**万元。</b></p>
        <p class="indent"><b>三、借款利息</b></p>
        <p class="indent"><b>自支用贷款之日起，按实际支用数计算利息，并计算复利。在合同规定的借款期内，年利为 %.借款方如果不按期归还款，逾期部分加收利率 %。</b></p>
        <p class="indent"><b>四、借款期限</b></p>
        <p class="indent"><b>借款方保证从**年*月起至**年*月止，按本合同规定的利息偿还借款。贷款逾期不还的部分，贷款方有权限期追回贷款。</b></p>
        <p class="indent"><b>五、条款变更</b></p>
        <p class="indent"><b>因国家变更利率，需要变更合同条款时，由双方签订变更合同的文件，作为本合同的组成部分</b></p>
        <p class="indent"><b>六、权利义务</b></p>
        <p class="indent"><b>贷款方有权监督贷款的使用情况，了解借款方的偿债能力等情况。借款方应如实提供有关的资料。借款方如不按合同规定使用贷款，贷款方有权收回部分贷款，并对违约部分参照银行规定加收罚息。贷款方提前还款的，应按规定减收利息。</b></p>
        <p class="indent"><b>七、保证条款</b></p>
        <p class="indent"><b>（一）借款方必须按照借款合同规定的用途使用借款，不得挪作他用，不得用借款进行违法活动。</b></p>
        <p class="indent"><b>（二）借款方必须按合同规定的期限还本付息。</b></p>
        <p class="indent"><b>（三）借款方有义务接受贷款方的检查、监督贷款的使用情况，了解借款方的计划执行、经营管理、财务活动、物资库存等情况。</b></p>
        <p class="indent"><b>（四）需要有保证人担保时，保证人履行连带责任后，有向借款方追偿的权利，借款方有义务对保证人进行偿还。</b></p>
        <p class="indent"><b>八、合同争议的解决方式</b></p>
        <p class="indent"><b>本合同在履行过程中发生的争议，由当事人双方友好协商解决，也可由第三人调解。协商或调解不成的，可由任意一方依法向人民法院起诉。</b></p>
        <p class="indent"><b>九、本合同未做约定的，按照《中华人民共和国合同法》的有关规定执行。</b></p>
        <p class="indent"><b>本合同一式2份，双方各执1份。</b></p>
        <p class="indent"><b>贷款人：__________________</b></p>
        <p class="indent"><b>借款人：__________________</b></p>
    </div>
</template>
<script>
import { Header, Button } from 'mint-ui'

export default {
  name: 'agreement',
  data () {
    return {
      title: '',
      path: `/${this.$route.query.path}`
    }
  },
  created () {
    console.log(this.$route.query.path)
  },
  components: {
    'mt-header': Header,
    'mt-button': Button
  }
}
</script>
<style>
.mint-header{
    background-color: #fafafa;
    color: #333;
}
.seize{
    height: 45px;
}
h1 {
    font-size: .16rem;
    text-align: center;
}
h4 {
    font-size: .15rem;
    margin: .2rem auto .1rem;
}
p {
    margin-bottom: .05rem;
    line-height: 1.5em;
}
table td {
    padding: .1rem 0;
}
.indent {
    text-indent: 2em;
}
.sign li{
    width: 50%;
    float: left;
}
</style>
