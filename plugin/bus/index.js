const install = (Vue) => {
    const Bus = new Vue({
        methods: {
            emit(event, ...args) {
                // console.log('bus emit')
                this.$emit(event, ...args);
            },
            on(event, callback) {
                // console.log('bus on')
                this.$on(event, callback);
            },
            off(event, callback) {
                // console.log('bus off')
                this.$off(event, callback);
            },
        },
    });
    //全局挂载
    Vue.prototype.$bus = Bus;
};

export default {
    install,
};
