<template>
  <div class="footer">
    <div
      class="footer-item"
      v-for="(item, index) in menus"
      :key="index"
      @click="clickMenus(item.path || '/')"
    >
      <div class="footer-icon">
        <img :src="$router.currentRoute.path === item.path ? item.in : item.out" alt="tabber">
      </div>
      <div :class="{'active': $router.currentRoute.path === item.path}">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
import CONST from '@/assets/js/const'

export default {
  name: 'tabber',
  data () {
    return {
      menus: CONST.menus
    }
  },
  methods: {
    clickMenus (path) {
      this.$router.replace(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 12px;
  color: #989898;
  background: #f8f8f8;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 999;
  .footer-icon {
    margin: 0 auto;
    margin-bottom: 3px;
    width: 22px;
    height: 22px;
  }
  .active {
    // color: #2f89ff;
    color: #e21a1ac4;
    font-weight:bold;
  }
}
</style>
