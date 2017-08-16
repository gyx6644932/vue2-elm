<template>
 
    <mu-list>
      <!--动态渲染-->
      <div v-for="item of weatherList" class="item">
        <mu-list-item :title="item.date">
              <span style="color: rgba(0, 0, 0, .5)">{{item.high}}</span>
              <span style="color: rgba(0, 0, 0, .5)">{{item.low}}</span>
              <span style="color: rgba(0, 0, 0, .5)">{{item.type}}</span>
        </mu-list-item>
        <mu-divider inset/>
      </div>
  
    </mu-list>
</template>
<script>
export default {
  name: 'weather',
  computed: {
    // 获取全部好友
    weatherList() {
      return this.$store.state.data.weather
    }
  },
  methods: {
    // 点击展示个人主页
    showPersonindex(e) {
      this.$store.commit('getActiveId', { activeId: e })
      this.$store.commit('showPersonindex')
    }
  }
}
console.log(this.$store)
</script>
