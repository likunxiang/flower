import {
	getSocektUrl,
	getKeepAlivedState
} from "@/utils/help";
import store from "@/plugin/store/index";

let socket = null;
let socketOpen = false;

export const zmSocket = () => {
	if (socket === null) {
		socket = true;
		socketOpen = false;
		uni.connectSocket({
			url: getSocektUrl(),
			success: (res) => {},
			fail: (err) => {
				socket = null;
			},
		});
		uni.onSocketOpen((res) => {
			// console.log(123)
			socketOpen = true;
			sendMessage();
		});
		uni.onSocketClose((res) => {
			zmSocket();
			login()
		});
	}
};

export const sendMessage = () => {
	if (socketOpen === true) {
		uni.onSocketMessage(function(res) {
			// console.log('收到服务器内容：' + res.data);
			const data = JSON.parse(res.data);
			// console.log(data)
			if (data.type == "ping") {
				uni.sendSocketMessage({
					data: JSON.stringify({
						type: "pang",
					}),
				});
			}
			switch (data.ws_type) {
				case 1:
					console.log("33")
					break;
				case 6:
					setTimeout(() => {
						console.log("333")
						autoPlay();
					}, 500)
					break;
			}
		});
	}
};
export const autoPlay = () => {
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	innerAudioContext.src =
		//  '../assets/void/ding.mp3'
		"http://saas-tools.oss-cn-shanghai.aliyuncs.com/%E9%98%BF%E5%8F%91/ding.mp3";
	innerAudioContext.onPlay(() => {
		console.log("开始播放");
	});
	innerAudioContext.onError(() => {
		innerAudioContext.onPlay(() => {
			console.log("开始播放");
		});
	})
};
export const login = () => {
	let token = getKeepAlivedState("token");
	// console.log(token)
	// console.log(socket)
	if (socketOpen && token) {
		let params = {
			type: "login",
			token,
		};
		uni.sendSocketMessage({
			data: JSON.stringify(params),
		});
	}
};

export const logOut = () => {
	if (socketOpen) {
		uni.sendSocketMessage({
			data: JSON.stringify({
				type: "out",
			}),
		});
		uni.closeSocket();
		socket = null;
		socketOpen = false;
	}
};
