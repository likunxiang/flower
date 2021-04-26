/**
 * 混入
 */
import Vue from 'vue'
import {mapState} from 'vuex'
import store from "@/plugin/store/index"

let $uStoreStates = []

try {
	$uStoreStates = store.state ? Object.keys(store.state) : []
} catch (e) {

}


Vue.mixin({
	created() {
		/**
		 * 事件处理,通过dispatch调度
		 * @param {String} actionName 事件名称（支持模块）
		 * @param {Object} res 操作数据
		 * 示例:
		 * 1.this.$u.vuex('setName','test') 调用根模块的setName方法
		 * 2.this.$u.vuex('user/setName','test') 调用user模块的setName方法
		 * 3.this.$u.vuex('user/setName','test').then(()=>{}) 调用user模块的setName方法,并做回调处理
		 */
		this.$u.vuex = (actionName, res) => {
			return store.dispatch(actionName, res)
		}

	},
	computed: {
		...mapState($uStoreStates)
	}
})
