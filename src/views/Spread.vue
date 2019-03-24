<template>
    <div class="login-wrapper">
      <form class="form-wrapper" @submit.prevent="submit">
        <div class="form-item">
          <div>
            <i class="icon-mobile"></i>
            <i class="delete-all" v-if="mobile.length" @click="mobile = ''"></i>
            <input type="tel" maxlength="11" placeholder="请输入手机号" v-model.trim="mobile">
          </div>
        </div>
        <div class="form-item">
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
        </div>
        <div class="form-btn-wrapper">
          <button class="form-btn" type="submit" :disabled="submitDisabled">注册领现金</button>
        </div>
      </form>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import VMessageCode from '@/components/MessageCode.vue'

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
      messageCode: ''
    }
  },
  components: {
    VMessageCode
  },
  computed: {
    submitDisabled () {
      return this.mobile.length < 11 || this.imgCode.length === 0 || this.messageCode.length === 0
    }
  },
  mounted () {
    this.getImgCode()
  },
  methods: {
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
    // 发送短信验证码
    sendMessagecode () {
      if (!this.mobile) {
        Toast('请输入手机号')
        return
      }
      if (this.mobile.length < 11) {
        Toast('请输入正确手机号')
        return
      }
      if (!this.imgCode) {
        Toast('请输入图形验证码')
        return
      }
      this.$http.getMessage({
        captcha: this.imgCode,
        captchakey: this.captchakey,
        phone: this.mobile
      }).then((res) => {
        if (res.data.code === 1) {
          this.$refs.messageCode.getMessageCode()
        } else {
          Toast(res.data.msg)
        }
      })
    },
    // 提交
    submit () {
      if (this.loading) {
        return
      }
      this.loading = true
      this.$http.loginForSpread({
        code: this.messageCode,
        phone: this.mobile
      }).then((res) => {
        this.loading = false
        if (res.data.code === 1) {
          localStorage.setItem('token', res.data.response.cont.token)
          localStorage.setItem('phone', res.data.response.cont.phone)
          this.$router.push({
            name: 'download'
          })
        } else {
          Toast(res.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/login.scss";

.login-wrapper {
  background-image: url(../assets/images/tuiguang-bg.jpg);
  background-size: 100% 100%;
}
.login-wrapper .form-wrapper{
  margin-top: 4.1rem;
}
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
  margin-top: 35px;
  .form-btn {
    letter-spacing: 10px;
    background-color: #2b3297;
    border-radius: 8px;
  }
}
</style>
