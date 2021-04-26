const install = (Vue, vm) => {

    //初始化api为空对象
    vm.$api = {}

    /**
     * 自动加载项目api
     */
    const apiModules = {}
    const files = require.context('@/api', true, /\index.js$/);

    files.keys().forEach(key => {
        const mod = files(key)
        apiModules[key.slice(2, -9)] = mod.__esModule && mod.default ? mod.default(Vue, vm) : mod
    })

    //全局挂载
    Vue.prototype.$api = { ...apiModules }

}

export default {
    install
}
