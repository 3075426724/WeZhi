const pageHelper = require('../../../../../helper/page_helper.js');
const timeHelper = require('../../../../../helper/time_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const QuestionBiz = require('../../../biz/question_biz.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,

		start: 0,
		time: '',
		type: 0, //0=测试，1=正式

		questionList: [],

		isOver: false,

		index: 0,
		nextIndex: -1, // 控制跳转时候的颜色
	},

	/**
	* 生命周期函数--监听页面加载
	*/
	async onLoad(options) {
		ProjectBiz.initPage(this);

		if (!await PassportBiz.loginMustBackWin(this)) return;

		if (!pageHelper.getOptions(this, options, 'type')) return;
		if (!pageHelper.getOptions(this, options, 'cateId')) return;

		if (this.data.type == 0) {
			wx.setNavigationBarTitle({
				title: '训练场',
			});
		};

		this._loadDetail();
	},

	url: function (e) {
		pageHelper.url(e, this);
	},

	async _loadDetail() {
		try {
			let params = {
				cateId: this.data.cateId,
				type: this.data.type
			};

			await cloudHelper.callCloudSumbit('question/gen', params, { title: 'bar' }).then(res => {

				if (res.data.error) {
					wx.showModal({
						title: '温馨提示',
						content: res.data.error,
						showCancel: false,
						confirmText: '返回',
						complete: (res) => {
							wx.navigateBack();
						}
					});
					return;
				}

				let questionList = res.data.questionList;
				let maxTime = res.data.maxTime;
				if (questionList.length == 0) return pageHelper.showModal('没有合适的题库!');

				this.setData({
					isLoad: true,
					maxTime
				}, () => {
					this.duration();
					this.setData({ questionList });
				});
			})

		}
		catch (err) {
			console.error(err);
		}

	},

	duration() {
		if (!this.data.isLoad) return;
		if (this.data.timer) return;


		let maxTime = this.data.maxTime;
		if (!maxTime) maxTime = 10;

		this.data.timer = setInterval(() => {

			let now = Math.floor(timeHelper.time() / 1000) * 1000;
			if (this.data.start == 0) {
				this.data.start = now;
			}

			let t = this.data.maxTime * 60 * 1000 - (now - this.data.start);
			// console.log('time' + this.data.time, this.data.timer, t)
			let time = timeHelper.calDurationD(t);

			if (t <= 0 || this.data.isOver) {
				if (this.data.isOver) this.setData({ time: '答题结束！' });
				else if (t <= 0) this.setData({ time: '时间到，答题结束！' });

				clearInterval(this.data.timer)

				let endS = Math.floor(timeHelper.time() / 1000) * 1000;
				if (!this.data.isOver) this._submit(endS);
			}
			else {
				this.setData({ time });
			}
		}, 1000)
	},

	bindSelectTap: function (e) {
		let index = this.data.index;

		let idx = pageHelper.dataset(e, 'idx');

		let questionList = this.data.questionList;

		let optionList = questionList[index].optionList;

		if (questionList[index].type == '单选题') {
			for (let k = 0; k < optionList.length; k++) {
				optionList[k].select = false;
			}
			optionList[idx].select = true;
		}
		else if (questionList[index].type == '多选题') {
			optionList[idx].select = !optionList[idx].select;
		}

		// 计算答案
		let input = '';
		for (let k = 0; k < optionList.length; k++) {
			if (optionList[k].select) {
				input += optionList[k].val;
			}
		}
		questionList[index].input = input;
		questionList[index].status = (input === questionList[index].answer);
		this.setData({ questionList });

	},

	bindNextTap: function (e) {
		let index = this.data.index;
		if (index == this.data.questionList.length - 1) return;

		this.setData({
			index: index + 1
		});
	},

	bindPreTap: function (e) {
		let index = this.data.index;
		if (index == 0) return;

		this.setData({
			index: index - 1
		});
	},

	bindSubmitTap: async function (e) {
		let index = this.data.index;

		if (!this.data.questionList[index].input || this.data.questionList[index].input === '未作答') {
			return pageHelper.showModal('请先选择您的答案~');
		}
		else if (this.data.questionList[index].type == '多选题' && this.data.questionList[index].input.length < 2) {
			return pageHelper.showModal('当前为多选题，至少选择2个选项');
		}

		if (index == (this.data.questionList.length - 1)) {

			await this._submit();

		}
		else {
			// 下一题
			index++;

			this.setData({ nextIndex: index - 1 });
			setTimeout(() => {
				this.setData({ index });
			}, 100);

		}
	},

	// 数据统计
	_stat(end) {
		let questionList = this.data.questionList;
		let total = questionList.length;
		let succ = 0;
		for (let k = 0; k < total; k++) {
			if (questionList[k].status) succ++;
		};

		let start = this.data.start;
		let duration = end - start;
		let durationTxt = timeHelper.calDurationD(duration);

		return '本次共' + total + '题，用时' + durationTxt + '，回答正确' + succ + '题！';
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {
		if (this.data.timer) {
			console.log('销毁定时器')
			clearInterval(this.data.timer);
		}
	},

	// 提前结束
	async bindOverTap() {

		let cb = async () => {
			await this._submit();
		}

		pageHelper.showConfirm('未作答的题目将标记为答题错误，确认结束？', cb);
	},

	//   答题完毕
	async _submit(endS = '') {
		try {

			let end = Math.floor(timeHelper.time() / 1000) * 1000;
			let content = this._stat(end);

			if (endS) end = endS;

			let cateId = this.data.cateId;
			let cateName = QuestionBiz.getCateName(cateId);

			let params = {
				cateId,
				cateName,
				start: this.data.start,
				end,
				list: this.data.questionList,
				type: this.data.type
			}

			let options = {
				title: '交卷中'
			}

			this.setData({ isOver: true });
			console.log('3333>>>>>')
			await cloudHelper.callCloudSumbit('question/save_my_answer', params, options).then(res => {
				console.log('>>>>>')
				let title = this.data.type == 1 ? '答题竞赛结果' : '训练场结果';

				let id = res.data.id;

				// 交卷
				wx.showModal({
					title,
					content,
					showCancel: false,
					confirmText: '查看结果',
					complete: (res) => {
						wx.redirectTo({
							url: '../answer_detail/question_answer_detail?id=' + id,
						});
					}
				});

			});
		}
		catch (err) {
			console.error(err);
		}
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	}


})