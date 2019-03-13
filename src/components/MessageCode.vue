<template>
  <div>
    <button
      type="button"
      class="get-message-code"
      :disabled="countDown !== 60"
    >{{ messageText }}</button>
  </div>
</template>

<script>
let [initNum, initText] = [60, '点击获取'];

export default {
  data() {
    return {
      messageText: initText,
      countDown: initNum
    };
  },
  methods: {
    getMessageCode() {
      this.messageText = `重新获取${this.countDown}s`;
      this.countDown--;
      setTimeout(() => {
        if (this.countDown === 0) {
          this.messageText = initText;
          this.countDown = initNum;
        } else {
          this.getMessageCode();
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.get-message-code {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 85px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  color: #6494dd;
  background: #ffffff;
  outline: none;
  border: none;
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
  &[disabled="disabled"] {
    color: #525252;
  }
}
</style>
