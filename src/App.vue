<template>
	<div>
		<transition  :name="transitionName" >
			    <router-view class="child-view" ></router-view>
    	</transition>
		<svg-icon></svg-icon>	
    </div>
</template>

<script>
	import svgIcon from './components/common/svg';
  	export default {
	    data () {
	      return {
	        transitionName: 'slide-left',
	        transitionMode: 'out-in'
	      }
	    },
	    beforeRouteUpdate (to, from, next) {
	      let isBack = this.$router.isBack
	      if (isBack) {
	        this.transitionName = 'slide-right'
	      } else {
	        this.transitionName = 'slide-left'
	      }
	      this.$router.isBack = false
	      next()
	    },
    	components:{
            svgIcon
        },
  	}

</script> 

<style lang="scss">
  	@import './style/common';
  .child-view {
  transition: all .3s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }
</style>
