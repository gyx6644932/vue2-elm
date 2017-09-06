import {
	getUser,
	getAddressList
} from '../service/getData'
import {
	GET_USERINFO,
	SAVE_ADDRESS
} from './mutation-types.js'//分发
import fetch from '../config/fetch'
import {
	getStore
} from '../config/mUtils'
// actions里存放的是异步操作
// 由于vuex中的state的变更只能由mutations进行操作，所以actions不直接进行数据操作，而是调用mutations方法
// 以下出现的that都是vue实例对象，因为把axios绑定在了Vue原型上，vuex无法调用，所以这里需要传入this

const actions = {
	getAllData: async({
		commit,
		state
	}) => {
		let weather = {}
		weather = () => fetch('http://localhost:3000/api/weather');
		commit('getData', {
			weather
		})
	},
	getUserInfo: async({
		commit,
		state
	}) => {
		let res = await getUser();
		commit(GET_USERINFO, res)
	},
	saveAddress: async({
		commit,
		state
	}) => {
		if (state.removeAddress.length > 0) return;

		let addres = await getAddressList(state.userInfo.user_id);
		commit(SAVE_ADDRESS, addres);
	},
}

export default actions