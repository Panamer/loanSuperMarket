<template>
    <v-layout>
        <div class="mine-wrapper">wode</div>
    </v-layout>
</template>
<script>
import VLayout from '@/components/Layout.vue'

export default {
    name: 'loan',
    data () {
        return {
        }
    },
    components: {
        VLayout
    }
}
</script>
<style lang="scss" scoped>
.mine-wrapper::-webkit-scrollbar {
    width: 0px;
}
.mine-wrapper {
  width: 100%;
  padding-top: 40px;
  flex: 1;
  -webkit-flex:1;
  overflow: auto;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}
</style>
