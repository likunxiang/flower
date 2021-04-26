<template>
	<view class="page">
		<!-- 头部部分 -->
		<memHeader :list="list" :memberInfo="memberInfo" :currCard='currCard' :level="level" @getCurrent='getCurrent'>
		</memHeader>
		<!-- 头部部分 end -->
		<!-- 内容部分 -->
		<view class="main">

			<agencyVip ref="agencyVip" :agencyMenuList="agencyMenuList" :memberInfo="memberInfo" v-if="level>=3">
			</agencyVip>

			<view class="promotion_box" v-if="level>0">
				<view class="promotion_item" @click="$toUrl('/agency/earningsDetail/earningsDetail',{ navIns: 0 })">
					<view class="num font_family_din">
						<text class="icon">￥</text>
						<text class="num ">{{memberInfo.invitation_balance || 0}}</text>
					</view>
					<view class="text">推广收益</view>
					<view class="line"></view>
				</view>
				<!-- <view class="promotion_item"
					@click="$toUrl('/agency/earningsDetail/earningsDetail',{ navIns: 0 })">
					<view class="num font_family_din">{{memberInfo.invite_order_count || 0}}</view>
					<view class="text">推广订单</view>
					<view class="line"></view>
				</view> -->
				<view class="promotion_item" @click="$toUrl('/agency/extendMember/extendMember')">
					<view class="num font_family_din">
						<text class="">{{memberInfo.invite_user_count || 0}}</text>
					</view>
					<view class="text">推广会员</view>
				</view>
			</view>
			<view class="lv_pri">
				<view class="lv_title">- 等级特权 -</view>
				<view class="lv_menu">
					<view class="menu_item" v-for="(item,index) in menuList" :key="index">
						<u-icon class="icon" :name="item.iconName" custom-prefix="custom-icon" size="46" color="#212121"></u-icon>
						<view class="menu_title">{{item.title}}</view>
					</view>
				</view>
			</view>

			<view class="open_brand" v-if="level < 3" @click="$toUrl('/agency/openAgency/openAgency')">
				<image src="../../static/images/member/open_brand_img.png" mode="aspectFill"></image>
			</view>

			<view class="become_mch" v-if="level == 0" @click="$toUrl('/agency/becomeDealer/becomeDealer')">
				<image src="../../static/images/member/become_mch_img.png" mode="aspectFill"></image>
			</view>
		</view>
		<!-- 内容部分 end -->

	</view>
</template>

<script>
	import memHeader from '@/component/member/memberInfo.vue'
	import agencyVip from '@/component/member/agencyVip.vue'
	export default {
		data() {
			return {
				list: [{
						image: '../../static/images/member/general_bg.png',
						title: '注册会员',
						showGrow: true, // 是否展示成长值
						level: 0, // 级别，0注册会员,5vip会员,10银卡会员,20金卡代理,30黑卡代理,40经销商,50服务商,60合伙人
					},
					{
						image: '../../static/images/member/vip_member_bg.png',
						title: 'vip会员',
						showGrow: true, // 是否展示成长值
						level: 5, // 级别，0注册会员,5vip会员,10银卡会员,20金卡代理,30黑卡代理,40经销商,50服务商,60合伙人
					},
					{
						image: '../../static/images/member/silver_member_bg.png',
						title: '银卡会员',
						showGrow: false, // 是否展示成长值
						level: 10, // 级别，0注册会员,5vip会员,10银卡会员,20金卡代理,30黑卡代理,40经销商,50服务商,60合伙人
					},
					{
						image: '../../static/images/member/golden_card.png',
						title: '金卡代理',
						showGrow: false, // 是否展示成长值
						level: 20, // 级别，0注册会员,5vip会员,10银卡会员,20金卡代理,30黑卡代理,40经销商,50服务商,60合伙人
					},
					{
						image: '../../static/images/member/black_card.png',
						title: '黑卡代理',
						showGrow: false, // 是否展示成长值
						level: 30, // 级别，0注册会员,5vip会员,10银卡会员,20金卡代理,30黑卡代理,40经销商,50服务商,60合伙人
					}, {
						image: '../../static/images/member/dealer_bg.png',
						title: '经销商',
						showGrow: false, // 是否展示成长值
						level: 40, // 级别，0注册会员,5vip会员,10银卡会员,20金卡代理,30黑卡代理,40经销商,50服务商,60合伙人
					}
				],
				menuList: [{
						iconName: 'redbag',
						title: '见面红包'
					},
					{
						iconName: 'freepostage',
						title: '全场包邮'
					},
					{
						iconName: '1v1sever',
						title: '专属客服'
					},
					{
						iconName: 'membermedal',
						title: '会员勋章'
					},
					{
						iconName: 'freeuse',
						title: '免费试用'
					},
					{
						iconName: 'promotion',
						title: '推广收益'
					},
					{
						iconName: 'freeusenew',
						title: '免费试新'
					},
				],
				eye: true,
				agencyMenuList: [{
						num: '0',
						title: '未成功',
						status: '1'
					},
					{
						num: '0',
						title: '待发货',
						status: '2'
					},
					{
						num: '0',
						title: '待收货',
						status: '3'
					},
					{
						num: '0',
						title: '已完成',
						status: '4'
					},
					{
						num: '0',
						title: '售后',
						status: '10'
					},
				],
				memberInfo: {}, // 会员中心的数据
				currCard: 0, // 第一张卡
				level: 0, // 等级预存，用于显示进度条
			}
		},
		components: {
			memHeader: memHeader,
			agencyVip: agencyVip
		},
		onLoad() {

		},
		onShow() {
			this.getMemberCenter();
		},
		onHide() {
			// 关闭售后地址弹窗
			if (this.$refs.agencyVip) {
				this.$refs.agencyVip.closeRefundLay()
			}
		},
		methods: {

			changeEye() {
				this.eye = !this.eye;
			},
			getCurrent(e) {
				this.currCard = e || 0;
			},
			// 获取会员中心接口数据
			getMemberCenter() {
				this.$api.member.MEMBER_CENTER({

				}).then(res => {
					this.memberInfo = res.data;
					if (this.memberInfo.level === 0) {
						this.currCard = 0;
						this.level = 0;

					} else if (this.memberInfo.level === 5) {
						this.currCard = 1;
						this.level = 1;
					} else if (this.memberInfo.level === 10) {
						this.currCard = 2;
						this.level = 2;
					} else if (this.memberInfo.level === 20) {
						this.currCard = 3;
						this.level = 3;
					} else if (this.memberInfo.level === 30) {
						this.currCard = 4;
						this.level = 4;
					} else if (this.memberInfo.level === 40) {
						this.currCard = 5;
						this.level = 5;
					}
					if (this.level === 0) {
						this.menuList = [{
								iconName: 'redbag',
								title: '见面红包'
							},
							{
								iconName: 'freepostage',
								title: '全场包邮'
							},
							{
								iconName: '1v1sever',
								title: '专属客服'
							}
						]
					} else {
						this.menuList = [{
								iconName: 'redbag',
								title: '见面红包'
							},
							{
								iconName: 'freepostage',
								title: '全场包邮'
							},
							{
								iconName: '1v1sever',
								title: '专属客服'
							},
							{
								iconName: 'membermedal',
								title: '会员勋章'
							},
							{
								iconName: 'freeuse',
								title: '免费试用'
							},
							{
								iconName: 'promotion',
								title: '推广收益'
							},
							{
								iconName: 'freeusenew',
								title: '免费试新'
							},
						]
					};

					// 代理数组赋值
					this.agencyMenuList[0].num = res.data.unsuccess_order_count;
					this.agencyMenuList[1].num = res.data.unshipped_order_count;
					this.agencyMenuList[2].num = res.data.dispatched_order_count;
					this.agencyMenuList[3].num = res.data.complete_order_count;
					this.agencyMenuList[4].num = res.data.refunding_order_count;

					// this.getCurrent() 3.24号注释的
					uni.stopPullDownRefresh();
				})
			},
		},
		onPullDownRefresh() {
			this.getMemberCenter();
		},
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
	}

	.page {

		.main {
			padding: 16rpx 24rpx;

			.promotion_box {
				width: 100%;
				background: #FFFFFF;
				display: flex;
				margin-bottom: 16rpx;

				.promotion_item {
					flex: 1;
					text-align: center;
					color: #333333;
					padding: 40rpx 0;
					position: relative;

					.num {
						font-size: 36rpx;
						margin-bottom: 16rpx;

						.icon {
							font-size: 26rpx;
						}

						.text_small {
							font-size: 22rpx;
						}
					}

					.text {
						font-family: PingFangSC-Regular, PingFang SC;
						font-size: 26rpx;
					}

					.line {
						position: absolute;
						right: 0rpx;
						top: 50%;
						margin-top: -50rpx;
						width: 1rpx;
						height: 100rpx;
						background: rgba(0, 0, 0, .1);
					}
				}
			}

			.lv_pri {
				background: #FFFFFF;
				margin-bottom: 16rpx;

				.lv_title {
					text-align: center;
					font-size: 26rpx;
					color: #333333;
					padding: 32rpx;
				}

				.lv_menu {
					display: flex;
					flex-wrap: wrap;

					.menu_item {
						width: 25%;
						text-align: center;
						margin-bottom: 60rpx;
						
						.icon {
							margin-bottom: 16rpx;
						}

						.menu_title {
							font-size: 22rpx;
							color: #333333;
							font-family: PingFangSC-Regular, PingFang SC;
						}
					}
				}
			}

			.open_brand,
			.become_mch {
				width: 100%;
				height: 230rpx;
				margin-bottom: 16rpx;

				image {
					width: 100%;
					height: 230rpx;
				}
			}
		}
	}
</style>
