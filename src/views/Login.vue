<template>
    <div class="login-wrapper" @click="handleClick">
      <!-- <img class="photo" src="../assets/images/touxiang.png" alt=""> -->
      <form class="form-wrapper">
        <div class="form-item">
          <div>
            <i class="icon-mobile"></i>
            <i class="delete-all" v-if="mobile.length" @click="mobile = ''"></i>
            <input type="tel" maxlength="11" placeholder="请输入手机号" v-model.trim="mobile">
          </div>
        </div>
        <!-- <div class="form-item">
          <div>
            <i class="icon-img-code"></i>
            <div class="img-code" @click="getImgCode">
              <img :src="imgCodeSrc" alt="图片验证码">
            </div>
            <input type="text" maxlength="4" placeholder="请输入图形验证码" v-model.trim="imgCode">
          </div>
        </div>
        <div class="form-item">
          <div>
            <i class="icon-code"></i>
            <i class="delete-all code" v-if="messageCode.length" @click="messageCode = ''"></i>
            <v-message-code ref="messageCode" @click.native="sendMessagecode"></v-message-code>
            <input type="text" maxlength="6" placeholder="请输入短信验证码" v-model.trim="messageCode">
          </div>
        </div> -->
        <!-- <div class="form-btn-wrapper">
          <mt-spinner type="fading-circle" color="#ffffff" :size="20" v-if="loading"></mt-spinner>
          <button class="form-btn" type="submit" :disabled="submitDisabled">{{ loading ? '登录中' : '立即登录' }}</button>
        </div> -->
        <!-- <div class="agreement">
          <span @click="agree">
            <span :class="isAgree ? 'icon-correct' : 'icon-correct-on'"></span>
            我已阅读并接受<a @click.stop="goAgreement">《服务协议》</a>
          </span>
        </div> -->
      </form>
    </div>
</template>

<script>
import { Toast, Spinner } from 'mint-ui'
import VMessageCode from '@/components/MessageCode.vue'
import { getQueryString } from '../assets/js/utils'

export default {
  name: 'login',
  /**
   * @param {boolean} loading - loading状态
   * @param {number} mobile - 手机号
   * @param {string} imgCode - 图片验证码
   * @param {string} captchakey - 图片验证码接口返回的key
   * @param {string} imgCodeSrc - 图片验证码地址
   * @param {string} messageCode - 短信验证码
   */
  data () {
    return {
      loading: false,
      mobile: '',
      imgCode: '',
      captchakey: '',
      imgCodeSrc: '',
      messageCode: '',
      isAgree: true
    }
  },
  components: {
    VMessageCode,
    'mt-spinner': Spinner
  },
  computed: {
    submitDisabled () {
      return this.mobile.length < 11
      // return this.mobile.length < 11 || this.imgCode.length === 0 || this.messageCode.length === 0 || !this.isAgree
    }
  },
  mounted () {
    this.getLog()
  },
  methods: {
    getLog() {
      this.$http.log({
        channel: getQueryString('channel')
      }).then((res) => {
        console.log(res.data.code);
      })
    },
    // 重新获取图片验证码
    getImgCode () {
      this.$http.getCaptcha().then((res) => {
        if (res.data.code === 1) {
          this.imgCodeSrc = `data:image/*;base64,${res.data.response.cont.captchacont}`
          this.captchakey = res.data.response.cont.captchakey
        } else {
          Toast(res.data.msg)
        }
      })
    },
    handleClick() {
      var  reg = /^1\d{10}$/
      if (reg.test(this.mobile)) {
        this.submit();
      }
    },
    // 提交
    submit () {
      if (this.loading) {
        return
      }
      this.loading = true
      this.$http.login({
        channel: getQueryString('channel'),
        phone: this.mobile
      }).then((res) => {
        this.loading = false
        if (res.data.code === 1) {
          localStorage.setItem('token', res.data.response.cont.token)
          localStorage.setItem('phone', res.data.response.cont.phone)
          this.$router.push({
            name: 'loanMarket'
          })
        } else {
          Toast(res.data.msg)
        }
      })
    },
    /* 同意协议 */
    agree () {
      this.isAgree = !this.isAgree
    },
    goAgreement () {
      this.$router.push({
        name: 'FWagreement',
        query: {
          path: 'login'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/login.scss";

.img-code {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 85px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    border-left: 1px solid #dcdcdc;
    box-sizing: border-box;
    width: 1px;
    height: 200%;
    transform: scale(0.5);
    transform-origin: left top;
  }
  img {
    width: 85%;
  }
}
.form-btn-wrapper {
  margin-top: 65px;
  .form-btn {
    letter-spacing: 10px;
    background-color: #ffffff;
  }
}

</style>
