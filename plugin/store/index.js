import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import zmConfig from '@/config/index'

// import {getKeepAlivedState} from '@/utils/help'

import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

/**
 * 获取常驻缓存的state
 */
// const keepAlivedState = getKeepAlivedState()

/**
 * 自动加载子模块
 */
const modules = {}
const files = require.context('./modules', true, /\index.js$/);
files.keys().forEach(key => {
    const mod = files(key)
    modules[key.slice(2, -9)] = mod.__esModule && mod.default ? mod.default : mod
})

/**
 * 自动加载插件
 */
const plugins = []
const pluginsFiles = require.context('./plugins', false, /\.js$/);
pluginsFiles.keys().forEach(key => {
    const mod = pluginsFiles(key)
    const cb = mod.__esModule && mod.default ? mod.default : () => {}
    plugins.push(cb)
})

export default new Vuex.Store({
    state: {
        // ...keepAlivedState,
        ...state
    },
    getters,
    actions,
    mutations,
    modules,
    plugins,
    strict: zmConfig.env != '1' //非正常环境开启debug
})
