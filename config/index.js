import zmEnv from "@/zm-env";
const smallVersion = require("@/package.json").smallVersion;
/**
 * 配置参数
 */
export default {
	// 环境 1=> 测试环境, 2=> 正式环境
	env:zmEnv.env,
	// 小程序版本号
	smallVersion: smallVersion,
	// //身份
	auth: {
		// 身份保存类型
		tokenType: "1",
		// 身份名称
		tokenName: "api-token",
	},
	//URL
	url: {
		// 登陆地址 /pages/my/login/login/login
		loginUrl: "/pages/my/login/login/login",
		// 开放的API接口（不需要TOKEN）
		noTokenUrls: [
			"no_login/wxa_login",
			"no_login/get_wxa_userinfo", // 新登录 4.1
			"home.index/index",//首页
			"home.index/get_recommend_product",//好物推荐
			"product.product/sell_well_list",//热销榜单
			"product.product/detail",//商品详情
			"product.product/new_goods_list",//最新到货
			"home.brand/index",//精选品牌
			"home.brand/detail",//精选品牌详情
			"home.article/index",//种草列表
			"home.article/detail",//种草详情
			// "home.joybuy/detail",//欢乐福利购
		],
		//如果token存在 不需要token的接口
		noTokenUrlsOk: [
			"no_login/wxa_login",
			"no_login/get_wxa_userinfo", // 新登录 4.1
			"home.index/index",//首页
			"home.index/get_recommend_product",//好物推荐
			"product.product/sell_well_list",//热销榜单
			"product.product/new_goods_list",//最新到货
			"home.brand/index",//精选品牌
			"home.brand/detail",//精选品牌详情
			"home.article/index",//种草列表
			"home.article/detail",//种草详情
			// "home.joybuy/detail",//欢乐福利购
		],
		//判断要不要授权的页面
		noTokenPush:[
			"/pages/my/login/login/login",//登录页
			"/pages/my/login/register/register",//注册页
			"/pages/my/login/inviteCode/inviteCode",//邀请码
			"/pages/index/index",//首页
			"/pages/index/goods/goods",//商品详情
			"/pages/index/hotRanking/hotRanking",//热销榜单
			"/pages/index/newest/newest",//最新到货
			"/pages/index/choiceness/choiceness",//精选品牌详情
			"/pages/index/brand/brand",//精选品牌详情
			"/pages/index/seedingList/seedingList",//种草专场
			"/pages/index/seeding/seeding",//种草专场详情
			// "/pages/index/welfareGo/welfareGo",//欢乐福利购
		]
	},
	//STORE
	store: {
		// 常驻缓存的数据
		keepAlivedStateKeys: ["token","user","usertel","invitecode","invitebinding","sharecode","incomeeye"],
		// 常驻缓存的数据前缀
		keepAlivedStatePrefix: "vx-",
	},
	//CACHE
	cache: {
		expireDay: 365,
	},
};
