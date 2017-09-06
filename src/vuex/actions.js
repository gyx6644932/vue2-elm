// actions里存放的是异步操作
// 由于vuex中的state的变更只能由mutations进行操作，所以actions不直接进行数据操作，而是调用mutations方法
// 以下出现的that都是vue实例对象，因为把axios绑定在了Vue原型上，vuex无法调用，所以这里需要传入this
import {
  selfdata,
  friendsdata,
  robotapidata
} from '../service/getData'
const actions = {
  // 异步获取基础数据
  // 这里使用了es7的async函数，相当于封装了promis的generator
  getAllData: async ({ commit }, that) => {

    let self = await selfdata();
    let friends = await friendsdata();
    commit('getData', {
      self, friends
    })
  },
  // 聊天机器人
  sendValue: async ({ commit }, { _id, message, that }) => {
    // 声明一个变量用来储存等下ajax获取的数据
    // 处理输入的内容，设置self为true，作为一个标记。
    commit('changeList', { self: true, _id, message })
    // 进行ajax请求，此处的that是从组件内传来的对象this


    let robotData = await robotapidata(message,_id);

    // 判断获取到的数据类型，在进行对应操作
    if (robotData.code === 100000) {
      commit('changeList', { _id, message: robotData.text })
    } else if (robotData.code === 200000) {
      let data = robotData.text + robotData.url
      commit('changeList', { _id, message: data })
    } else if (robotData.code === 302000) {
      commit('changeList', { _id, message: '暂不支持此类对话' })
    } else {
      commit('changeList', { _id, message: '暂不支持此类对话' })
    }
  }
}

export default actions
