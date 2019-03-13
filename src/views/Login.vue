<template>
    <div class="login-wrapper">
        <p class="title">贷超流量</p>
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
          <mt-spinner type="fading-circle" color="#ffffff" :size="20" v-if="loading"></mt-spinner>
          <button class="form-btn" type="submit" :disabled="submitDisabled">{{ loading ? '登录中' : '立即登录' }}</button>
        </div>
      </form>
    </div>
</template>

<script>
import { Toast, Spinner } from 'mint-ui';
import VMessageCode from '@/components/MessageCode.vue';

export default {
  name: 'login',
  /**
   * @param {boolean} loading - loading状态
   * @param {number} mobile - 手机号
   * @param {string} imgCode - 图片验证码
   * @param {string} imgCodeSrc - 图片验证码地址
   * @param {string} messageCode - 短信验证码
   */
  data () {
    return {
      loading: false,
      mobile: '',
      imgCode: '',
      // ! demo src
      imgCodeSrc: 'data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAUCAIAAACVui2AAAACNklEQVR42rWYy03GMBCE0wUnRBmcuf+9UAXiyI0qONMIBQUjo2WYmR37RyKyojzWjr992jmOfzje3z70dpyrWbGrxvyzzNdxnucQPd3xeH+DrZ7X1Oft7cvdsk1hxKZBlseOMMro+L+AaSyFxFua/Saw5VSG16dLtcD2cHleNsJm4GpKa5lVnajpuhi0+lCBxwVCTpmAvQlM5jkoutC2ag3VQr3tTFe21W+T4iab+pp9uHTpQUtzYwtXBwQmiwVgG58T2JpXO6Ilca6oiBz29ZZo8ZVJWp0/T13Yz3TWnrTBk615qZHlQ84j81phjmHKzBrAql0bydafrYUtLQorcIgOotWPfgNb10XmulbtdqmLMnNwQo1elK+8ZdVhndmqlYGpc6jAXcR26Yo+rFO3Fq4Letv5VwA2Lt3lrcxsvRSjN6fxzmNJsnNpnQAWXlQung+yDBWkfTvj5+dKwypI5a0/d0krBMgsvCHiuA5rfrbYlplmqcAdjPXYTh1L4M6N2xgOi8euVqkN7ULSotoUTQOGcoVdyLzWDAys5rU5rAsh9WfrUTqPUJMQuBuhaEPZWwDboNe3Fri2CiGfU68ATLTKPM9l3p068hPDYQmti0q7nCB/zkbukhaVq5As6iFujEJOXVjYrr1yZdIAtvPT7ri00H1SyI4YvWEP5126Y+72EspM/pyXuxa42xXaFVjVXtwqdGJ1bX6A6JIDt5Dhf0oBlzztPekh/Z3Bfb/Kdx+15Ze64MNPq+0ga9KWadQAAAAASUVORK5CYII=',
      messageCode: ''
    };
  },
  components: {
    VMessageCode,
    'mt-spinner': Spinner
  },
  computed: {
    submitDisabled() {
      return this.mobile.length < 11 || this.imgCode.length === 0 || this.messageCode.length === 0;
    }
  },
  methods: {
    // 重新获取图片验证码
    getImgCode() {
      console.log('重新获取图片验证码');
    },
    // 发送短信验证码
    sendMessagecode() {
      if (!this.mobile) {
        Toast('请输入手机号');
        return;
      }
      if (this.mobile.length < 11) {
        Toast('请输入正确手机号');
        return;
      }
      return new Promise((resolve, reject) => {
        resolve(this.$refs.messageCode.getMessageCode());
      });
    },
    // 提交
    submit() {
      if (this.loading) {
        return;
      }
      let data = {
        mobile: this.mobile,
        imgCode: this.imgCode,
        messageCode: this.messageCode
      };
      console.log(data);
      this.loading = true;
      return new Promise((resolve, reject) => {
        resolve(setTimeout(() => {
          Toast('短信验证码验证失败');
          this.loading = false;
        }, 1000));
      });
    }
  }
};
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
  margin-top: 85px;
  .form-btn {
    letter-spacing: 10px;
  }
}
</style>
