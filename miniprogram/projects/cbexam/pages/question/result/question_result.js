const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const cacheHelper = require('../../../../../helper/cache_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		ProjectBiz.initPage(this);
		pageHelper.getOptions(this, options, 'start');
		pageHelper.getOptions(this, options, 'end');

		if (this.data.start && this.data.end) {
			let questionList = cacheHelper.get('exame-anwer');
			cacheHelper.remove('exame-anwer');
			if (questionList) {
				this.setData({
					isLoad: true,
					questionList
				});
			}
		}

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

	},

	url: function (e) {
		pageHelper.url(e, this);
	},

	top: function (e) {
		// 回页首事件
		pageHelper.top();
	},

	onPageScroll: function (e) {
		// 回页首按钮
		pageHelper.showTopBtn(e, this);

	},

	bindSaveTap: async function (e) {
		try {
			let params = {
				start: this.data.start,
				end: this.data.end,
				list: this.data.questionList,
				type: '0' //测试
			}
			let options = {
				title: '保存中'
			}

			await cloudHelper.callCloudSumbit('question/save_my_answer', params, options).then(res => {
				let cb = () => {
					wx.navigateBack();
				}

				pageHelper.showSuccToast('保存成功', 1500, cb);
			});
		}
		catch (err) {
			console.error(err);
		}
	}

})