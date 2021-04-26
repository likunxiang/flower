import Vue from 'vue'
import store from "@/plugin/store/index"

/**
 * 常驻内存配置到state中
 */

import {
    getKeepAlivedState
} from '@/utils/help'

const install = Vue => {

    /**
     * 获取常驻缓存的state
     */
    const keepAlivedState = getKeepAlivedState()

    Object.keys(keepAlivedState).forEach(state => {
        // state名称
        let stateName = ''

        // action名称
        let actionName = ''

        // state名称 拆分为数组,如user/name 表示明user模块下面的 state name值
        let stateArr = state.split('/')

        // 转为最终stata名称
        stateName = stateArr.length > 1 ? stateArr[1] : stateArr[0]

        // 转为首次字写
        stateName = stateName.replace(stateName[0], stateName[0].toUpperCase())

        // 转为最终action名称, 如:setName 或 user/setName
        actionName = stateArr.length > 1 ? (stateArr[0] + '/set' + stateName) : ('set' + stateName)

        // 调度
        store.dispatch(actionName, keepAlivedState[state])

    })
}

Vue.use(install);
