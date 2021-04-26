<template>
	<view class="header">
		<!-- <u-navbar :is-back="false" title="会员中心" :background="{ background: '#212121' }" title-color="#FFFFFF" title-size="36"
		 :border-bottom="false" :is-fixed="true"></u-navbar> -->
		<view class="user_info">
			<view class="head_pic">
				<u-avatar mode="circle" size="default" :src="memberInfo.avatar" v-if="invitebinding=='isOk'"></u-avatar>
				<u-avatar mode="circle" size="default" v-else></u-avatar>
			</view>
			<view class="nickname" v-if="memberInfo.nickname && invitebinding=='isOk'">
				{{memberInfo.nickname}}
			</view>
			<view class="nickname" v-else @click="$toUrl('/pages/my/login/login/login')">
				点这里登录
			</view>
			<navigator url="/agency/levelExplain/levelExplain" class="right_abs" >
				<u-icon name="info-circle" size="32" color="#FFFFFF"></u-icon>
				<view class="text">等级说明</view>
			</navigator>
		</view>
		<!-- 会员卡类型 可滚动 -->
		<view class="vip_card_content">
			<swiper :indicator-dots="false" :autoplay="false" :duration="500" style="height: 218rpx;"
			 next-margin="40rpx" previous-margin="40rpx" :current="currCard" @change="getCurrent">
				<swiper-item v-for="(item,index) in list" :key="index" style="display: flex; justify-content: center;">
					<view class="swiper_item">
						<image :src="item.image" mode="aspectFill"></image>
						<view class="card_main" v-if="item.showGrow && currCard === index && currCard === level">
							<view class="card_desc">
								{{''}}
							</view>
							<view class="progress" @click="$toUrl('/agency/growUp/growUp')">
								<view class="progress_bg" :style="'background: ' + (currCard === 0?'#B8B8B8':(currCard === 1?'#B48562':'#919AA9'))">
									<view class="progress_reality" :style="'width:' + memberInfo.consume_money/memberInfo.level_consume_money*100 + '%;background: ' + (currCard === 0?'#E4E4E4':(currCard === 1?'#EAC3A7':'#C8CFD9'))"></view>
								</view>
								<view class="progress_value" :style="'color: ' + (currCard === 0?'#666666':(currCard === 1?'#82441C':'#687184'))">{{memberInfo.consume_money || 0}}/{{memberInfo.level_consume_money || 0}}</view>
							</view>
						</view>
						<view class="card_tips">
							{{memberInfo.level == item.level?'当前等级':(memberInfo.level > item.level?'已达等级':'暂未开通')}}
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 会员卡类型 可滚动 end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			// 会员卡类型列表
			list: {
				type: Array,
				default: () => {
					return {}
				}
			},
			// 会员中心所有数据
			memberInfo: {
				type: Object,
				default: () => {
					return {}
				}
			}, 
			// 第一张展示什么卡
			currCard: {
				type: Number,
				default: 0
			},
			//level 
			level: {
				type: Number,
				default: 0
			}
		},
		methods: {
			getCurrent(e) {
				let currCard = e.detail.current;
				this.$emit('getCurrent',currCard);
			},
		}
	}
</script>

<style scoped lang="scss">
	.header {
		width: 100%;
		background: #212121;
		position: sticky;
		top: 0;
		z-index: 1;
	}
	
	.user_info {
		width: 100%;
		padding: 0 57rpx;
		display: flex;
		position: relative;
		margin-bottom: 24rpx;
	
		.head_pic {
			border-radius: 40rpx;
			margin-right: 30rpx;
	
			image {
				width: 100%;
				height: 100%;
				border-radius: 40rpx;
				background: #CCCCCC;
			}
		}
	
		.nickname {
			font-size: 36rpx;
			color: #FFFFFF;
			line-height: 50rpx;
		}
	
		.right_abs {
			position: absolute;
			right: 0rpx;
			top: 3rpx;
			width: 176rpx;
			height: 47rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #333333;
			border-radius: 24rpx 0 0 24rpx;
	
			.text {
				margin-left: 8rpx;
				font-size: 24rpx;
				color: #FFFFFF;
			}
		}
	}
	
	.vip_card_content {
		width: 100%;
		height: 218rpx;
		background: #212121;
	
		.swiper_item {
			width: 636rpx;
			height: 218rpx;
			display: flex;
			justify-content: center;
			position: relative;
			.card_main {
				position: absolute;
				left: 0rpx;
				top: 0rpx;
				width: 636rpx;
				height: 218rpx;
				padding: 42rpx;
				.card_desc {
					font-size: 30rpx;
					color: #82441C;
					font-weight: 500;
					height: 82rpx;
				}
				.progress {
					.progress_bg {
						width: 300rpx;
						height: 10rpx;
						background: #B48562;
						border-radius: 6rpx;
						margin-bottom: 13rpx;
						overflow: hidden;
						.progress_reality {
							width: 0rpx;
							height: 10rpx;
							background: #EAC3A7;
							border-radius: 6rpx;
						}
					}
					.progress_value {
						font-size: 22rpx;
						color: #82441C;
					}
				}
			}
			.card_tips {
				position: absolute;
				right: 0rpx;
				bottom: 40rpx;
				width: 154rpx;
				height: 48rpx;
				border-radius: 24rpx 0 0 24rpx;
				text-align: center;
				line-height: 48rpx;
				background: rgba(255,255,255,0.5);
				font-size: 24rpx;
				color: #666666;
			}
			
		}
	
		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
