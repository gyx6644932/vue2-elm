<template>
	<div>
		<transition  :name="transitionName"> >
			<keep-alive>
			    <router-view class="child-view" v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    	</transition>
		<svg-icon></svg-icon>	
    </div>
</template>

<script>
	import svgIcon from './components/common/svg';
  	export default {
	    data () {
	      return {
	        transitionName: 'slide-left'
	      }
	    },
    	components:{
            svgIcon
        },
  	}

</script>

<style lang="scss">
  	@import './style/common';
  .child-view {
  transition: all .8s cubic-bezier(.55,0,.1,1);
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
