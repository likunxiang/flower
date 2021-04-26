/**
 * 有mutation变动化时（有state变动化时），将state设置到常驻内存
 */

import {
    setKeepAlivedState
} from '@/utils/help'


export default store => {

    // 每次 mutation 之后调用
    store.subscribe((mutation, state) => {
		// console.log(mutation)
        // state名称
        let stateName = ''

        // cache名称
        let cacheName = ''

        // mutation名称 拆分为数组,如user/setName 表示明user模块下面的 mutation 的 setName方法
        let mutationArr = mutation.type.split('/')

        // 转为最终stata名称
        stateName = mutationArr.length > 1 ? mutationArr[1].slice(3) : mutationArr[0].slice(3)

        // 转为首次小写
        stateName = stateName.replace(stateName[0], stateName[0].toLowerCase())

        // 转为最终cache名称
        cacheName = mutationArr.length > 1 ? (mutationArr[0] + '/' + stateName) : stateName

        //设置到常驻内存
        setKeepAlivedState(cacheName, mutation.payload)

    })
}
