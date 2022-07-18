import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from "@/utils/storage";

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    // 定义存储token的对象，存储当前用户信息(token等数据)
    // 从本地缓存里拿token
    user: getToken()
  },
  getters: {
  },
  mutations: {
    // 定义添加token
    setUser(state, data) {
      state.user = data
      /**
       * token为什么要存在vuex 和 localStorage：
       * vuex是响应式的，数据修改，视图就会更新，视图变化了数据也会更新；缺点就是数据不持久，存储在内存中，页面刷新数据就丢失了；
       * localStorage：持久化，能够永久存储，除非手动删除；缺点就是不是响应式的。
       * 所有token需要 vuex 和 localStorage 结合起来使用。做一下本地存储
       */
      setToken(state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
