<template>
	<view class="page">
		<!-- 头部 搜素 -->
		<view class="search_box_box">
			<view class="search_box">
				<view class="input_box">
					<view class="icon_box">
						<u-icon class="icon" name="search" custom-prefix="custom-icon" size="36" color="#999999"></u-icon>
					</view>
					<input class="input" type="text" :value="keyword" confirm-type="search" @blur="inputKeyword" @confirm="toSearch"
						:focus="focus" placeholder="请输入搜索关键字" />
				</view>
				<view class="search_btn">
					取消
				</view>
			</view>

		</view>
		<view class="main">
			<view class="history_box" v-if="historyList.length">
				<view class="title_box">
					<view class="title">历史记录</view>
					<view class="del_icon" @click="delHistory">
						<u-icon class="icon" name="delet" custom-prefix="custom-icon" size="36" color="#212121"></u-icon>
					</view>
				</view>
				<view class="history_list">
					<view class="history_item u-line-1" v-for="(item,index) in historyList" :key="index"
						@click="clickSearch(item)">
						{{item}}
					</view>
				</view>
			</view>

			<view class="hot_box">
				<view class="title_box">
					<view class="title">热门搜索</view>
				</view>
				<view class="hot_list">
					<view class="hot_item" v-for="(item,index) in hotList" :key="index" @click="clickSearch(item)">{{item}}
					</view>
				</view>
			</view>
		</view>
		<!-- 头部 搜素 end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				actionText: '取消', // 搜索框右边按钮文字
				keyword: '',
				historyList: [],
				hotList: [],
				focus: true
			};
		},
		onShow() {
			this.historyList = uni.getStorageSync('historyList') || [];
			this.getSearchKey();
			this.focus = true
		},
		methods: {
			inputKeyword(e) {
				this.keyword = e.detail.value
			},
			rightBtn() {
				this.$goback();
			},
			delHistory() {
				this.historyList = [];
			},
			// 输入搜索
			toSearch(e) {
				let keyWord = e.detail.value.replace(/(^\s*)|(\s*$)/g, "");
				if (keyWord) {
					if (this.historyList.indexOf(keyWord) == -1) {
						this.historyList.unshift(keyWord);
						if (this.historyList.length > 10) {
							this.historyList.splice(10, 1);
						}
						uni.setStorageSync('historyList', this.historyList);
					} else {
						for (let i in this.historyList) {
							if (keyWord === this.historyList[i]) {
								this.historyList.splice(i, 1);
								this.historyList.unshift(keyWord);
								uni.setStorageSync('historyList', this.historyList);
							}
						}
					}
					this.$jumpPage('/pages/index/searchResult/searchResult', {
						keyword: keyWord
					});
					this.focus = false
				} else {
					uni.showToast({
						title: '请输入关键字',
						icon: 'none'
					})
				}


			},
			// 点击搜索
			clickSearch(keyword) {
				let keyWord = keyword.replace(/(^\s*)|(\s*$)/g, "");
				if (keyWord) {
					if (this.historyList.indexOf(keyWord) == -1) {
						this.historyList.unshift(keyWord);
						if (this.historyList.length > 10) {
							this.historyList.splice(10, 1);
						}
						uni.setStorageSync('historyList', this.historyList);
					} else {
						for (let i in this.historyList) {
							if (keyWord === this.historyList[i]) {
								this.historyList.splice(i, 1);
								this.historyList.unshift(keyWord);
								uni.setStorageSync('historyList', this.historyList);
							}
						}
					}
					this.$jumpPage('/pages/index/searchResult/searchResult', {
						keyword: keyWord
					});
					this.focus = false
				} else {
					uni.showToast({
						title: '请输入关键字',
						icon: 'none'
					})
				}
			},
			getSearchKey() {
				this.$api.index.SEARCH_KEY({}).then(res => {
					this.hotList = res.data.keywords;
				});
			},
		}
	}
</script>

<style lang="scss">
	.page {
		::v-deep.u-input {
			margin-left: 48rpx !important;
		}

		.search_box_box {
			padding: 8rpx 24rpx;
			background: #FFFFFF;
			
			.search_box {
				display: flex;
				align-items: center;
				.input_box {
					display: flex;
					align-items: center;
					flex-grow: 1;
					background: #F0F2F5;
					border-radius: 6rpx;
					height: 70rpx;
					padding: 0 40rpx;
					.icon_box {
						flex-grow: 0;
						flex-shrink: 0;
						width: 36rpx;
						height: 36rpx;
						margin-right: 48rpx;

						.icon {
							width: 36rpx;
							height: 36rpx;
						}
					}

					.input {
						flex-grow: 1;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;

					}
				}

				.search_btn {
					flex-grow: 0;
					flex-shrink: 0;
					font-size: 28rpx;
					color: #333333;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					margin-left: 24rpx;
				}
			}
		}

		.main {
			padding: 48rpx 48rpx 48rpx 24rpx;

			.history_box,
			.hot_box {
				margin-bottom: 48rpx;

				.title_box {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 24rpx;

					.title {
						font-size: 24rpx;
						color: #333333;
						font-weight: 500;
					}

					.del_icon {
						width: 36rpx;
						height: 36rpx;
					}
				}

				.history_list,
				.hot_list {
					display: flex;
					flex-wrap: wrap;

					.history_item,
					.hot_item {
						padding: 8rpx 16rpx;
						font-size: 24rpx;
						color: #333333;
						background: #FFFFFF;
						border: 1rpx solid #212121;
						margin-right: 24rpx;
						margin-bottom: 24rpx;
					}
				}
			}
		}
	}
</style>
