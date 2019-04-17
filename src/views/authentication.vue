<template>
    <div class=""></div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {
    this.LivenessSDK()
  },
  methods: {
    LivenessSDK () {
      // 预定义三个动作，单次活体检测只能选取其中一个动作进行。
      var livenessEnum = {
        BLINK: 0, // 眨眼
        MOUTH: 1, // 张嘴
        YAW: 2 // 摇头
      }
      // 指定动作活体检测
      var liveness = new Liveness({
        // 设置代理服务器地址
        host: 'http://47.104.189.49:8008',
        // 在用户采集到视频之后，请求公有云接口之前执行
        beforeCheck: function (data) {
          console.log('before data: ', data)
        },
        // 活体检测完成后的回调函数
        onChecked: function (callbackData) {
          console.log('onCheck')
          console.log(callbackData)
        },
        // 活体检测发生错误后的回调函数
        onError: function (errorMessage) {
          console.error(errorMessage)
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

<style scoped>

</style>
