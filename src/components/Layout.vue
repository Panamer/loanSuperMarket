<template>
  <div class="app-wrapper">
    <slot class=""></slot>
    <v-tabbar></v-tabbar>
  </div>
</template>

<script>
import VTabbar from '@/components/Tabbar';

export default {
  name: 'layout',
  components: {
    VTabbar
  }
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
