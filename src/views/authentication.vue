<template>
<div class="authen-list">
  <section class="list">
    <ul>
      <li @click="goInfor">
        <label>身份证正面</label>
        <span v-if="identityFrontState === '0'">待认证 <i class="icon-arr"></i></span>
        <span v-else-if="identityFrontState === '1'" class="certified">已认证 <i class="icon-arr"></i></span>
      </li>
      <li @click="goLink">
        <label>身份证背面</label>
        <span v-if="identityBackState === '0'">待认证 <i class="icon-arr"></i></span>
        <span v-else-if="identityBackState === '1'" class="certified">已认证 <i class="icon-arr"></i></span>
      </li>
      <li @click="goliveness">
        <label>活体认证</label>
        <span v-if="livebodyState === '0'">待认证 <i class="icon-arr"></i></span>
        <span v-else-if="livebodyState === '1'" class="certified">已认证 <i class="icon-arr"></i></span>
      </li>
      <li>
        <label>真实姓名</label>
        <span>
          <input type="text" name="" value="" style="width: 1.5rem;text-align: right;">
        </span>
      </li>
      <li>
        <label>身份证号</label>
        <span>
          <input type="text" name="" value="" style="width: 1.5rem;text-align: right;">
        </span>
      </li>
      <li>
        <label>芝麻分</label>
        <span>
            <input type="text" name="" value="" style="width: 1.5rem;text-align: right;">
        </span>
      </li>
      <li>
        <label></label>
      </li>
    </ul>
  </section>
  <button class="btn btn-primary" @click="nextStep">下一步</button>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
import AOU from '@/assets/js/const'

export default {
  data: function () {
    return {
      identityFrontState: '0',
      identityBackState: '0',
      livebodyState: '0',
      authNum: 0 // 已认证项数
    }
  },
  created () {
    this.getAuthenList()
  },
  computed: {
  },
  watch: {
    '$route': function (to, from) {
      this.$router.go(0)
    }
  },
  methods: {
    // 刚进页面-获取认证状态
    getAuthenList () {
    },
    // 已认证项数
    getAuthNum () {
      let arr = ['infor', 'contact', 'mobile', 'bank']
      let num = 0
      for (let v of arr) {
        if (this[v + 'State'] === '1' || this[v + 'State'] === 'Y') {
          num++
        }
      }
      return num
    },
    // 个人信息跳转
    goInfor () {
    },
    // 紧急联系人跳转
    goLink () {
    },
    // 活体认证
    goliveness () {
      this.LivenessSDK()
    },
    nextStep() {

    },
    LivenessSDK () {
      // 预定义三个动作，单次活体检测只能选取其中一个动作进行。
      var livenessEnum = {
        BLINK: 0, // 眨眼
        MOUTH: 1, // 张嘴
        YAW: 2 // 摇头
      }
      var that = this
      // 指定动作活体检测
      var liveness = new Liveness({
        // 设置代理服务器地址
        host: AOU.host,
        // 在用户采集到视频之后，请求公有云接口之前执行
        beforeCheck: function (data) {
          console.log('before data: ', data)
        },
        // 活体检测完成后的回调函数
        onChecked: function (callbackData) {
          console.log(callbackData.passed)
          if (callbackData.passed) {
            that.livebodyState = '1'
          }
        },
        // 活体检测发生错误后的回调函数
        onError: function (error) {
          console.log(error)
          Toast(error.message)
        },
        // 本次活体检测使用的动作
        action: livenessEnum.BLINK
      })
      // 指定动作活体检测与静默活体检测任选其一
      liveness.show()
    }
  }
}
</script>

<style lang="scss" scoped>
.authen-list {
    padding: 0.32rem 0.26rem 0;
    font-size: 0.125rem;
    background: #fff;
    .list {
        margin-top: 0.15rem;
        ul li {
            line-height: 0.47rem;
            font-size: 0.15rem;
            overflow: hidden;
            border-top: 1px solid #ECEFF1;
            label {
                float: left;
            }
            span {
                float: right;
                font-size: 0.14rem;
                color: #3E93FF;
            }
            .certified {
                color: #999;
            }
            .icon-arr {
                display: inline-block;
                width: 0.05rem;
                height: 0.09rem;
                background: url("../assets/images/right.png") no-repeat right center;
                background-size: 100% 100%;
            }
        }
        ul li:first-child {
            border: 0;
        }
    }
}
.btn {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: .1rem;
    margin-right: 0.26rem;
    font-size: .19rem;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
}
.btn-primary {
    color: #fff;
    background: #3E93FF;
    border: 1px solid #3E93FF;
}
</style>
