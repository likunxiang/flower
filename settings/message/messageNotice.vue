<template>
	<view class="page">

		<view class="notice_item" v-for="(item,index) in messageList" :key="index"
			@click="$toUrl('/settings/message/messageDetail',{ id: item.id })">
			<view class="notice_item_time">
				{{item.add_time_format2}}
			</view>
			<view class="notice_item_main">
				<view class="title">
					<view class="">
						{{item.title}}
					</view>
					<!-- 未读时，红点 -->
					<view class="dot" v-if="item.is_read === 0"></view>
				</view>
				<view class="desc">
					{{item.introduce}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				messageList: [],
				currPage: 1,
				totalPage: 1,
				pageStatus: 'loadmore', // 加载状态
				type: ''
			};
		},
		onLoad(options) {
			this.type = options.type;
		},
		onShow(){
			this.getMessageList();
		},
		methods: {
			// 请求消息列表
			getMessageList() {
				this.$api.my.MESSAGE_CENTER({
					type: this.type
				}).then(res => {
					this.messageList = res.data.list;
					this.totalPage = res.data.total_page;
					if (this.currPage >= this.totalPage) 
						this.pageStatus = 'nomore';
					uni.stopPullDownRefresh();
				});
			},
			// 上划加载更多
			loadMore() {
				// 模拟请求成功后的回调
				setTimeout(() => {
					let currPage = this.currPage + 1
					this.$api.index.MESSAGE_CENTER({
						page: currPage
					}).then(res => {

						this.messageList = this.messageList.concat(res.data.list);
						this.currPage = currPage;
						this.$refs.loadRefresh.completed();
					})
					// 1. list数组添加新数据
					// 2. 更新当前页码 currPage
					// 3. 调用completed()方法 this.$refs.loadRefresh.completed()
				}, 800);
			},
		},
		onPullDownRefresh() {
			this.getMessageList();
			this.currPage = 1;
		},
		onReachBottom() {
			if (this.currPage >= this.totalPage) return;
			this.pageStatus = 'loading';
			setTimeout(() => {
				this.loadMore();
				if (this.currPage >= this.totalPage) this.pageStatus = 'nomore';
				else this.pageStatus = 'loading';
			}, 2000);
		}

	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
	}

	.page {
		padding: 16rpx 24rpx;

		.notice_item {
			margin-bottom: 24rpx;

			.notice_item_time {
				font-size: 22rpx;
				color: #999999;
				margin-bottom: 16rpx;
				text-align: center;
			}

			.notice_item_main {
				padding: 0 24rpx;
				background: #FFFFFF;

				.title {
					padding-top: 24rpx;
					padding-bottom: 16rpx;
					font-size: 26rpx;
					color: #333333;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
					.dot {
						width: 12rpx;
						height: 12rpx;
						background: #F1444D;
						border-radius: 50%;
					}
				}

				.desc {
					padding: 16rpx 0;
					color: #999999;
				}
			}
		}

	}
</style>
