import Vue from 'vue'
import * as help from '@/utils/help'

/**
 * 获取API地址
 */
export const apiUrl = () => {
    return help.getApiUrl()
}

/**
 * 获取socket地址
 */
export const socektUrl = () => {
    return help.getSocektUrl()
}

export const toFixedNum = (value, len = 2) => {
    let toFixedNum = Number(value).toFixed(len * 1 + 1)
    let realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1)
    return realVal;
}
/**
 * 跳转页面
 */
export const toUrl = (url,params) => {
    console.log(url)
    // return uni.navigateTo({
    //     url
    // })
    return help.jumpPage(url,params)
}


/**
 * 返加上一页
 */
export const goback = (index,params) => {
    // console.log('index11', index)
    // return this.$router.go(-1)
    return help.backPage(index,params)
}

/**
 * 缓存
 */
export const cache = (key, data, seconds = 0) => {
    return help.cache(key, data, seconds)
}

/**
 * 全局跳转
 */
export const jumpPage = (path, params, method) => {
    return help.jumpPage(path, params, method)
}

/**
 * 验证手机号
 */
export const changePhone = (cellphone) => {
    return help.changePhone(cellphone)
}