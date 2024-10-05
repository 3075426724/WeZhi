
const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const projectSetting = require('../../../public/project_setting.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		cateList: projectSetting.QUESTION_CATE
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		ProjectBiz.initPage(this);
		if (!pageHelper.getOptions(this, options, 'type')) return;

		if (this.data.type == 0) {
			wx.setNavigationBarTitle({
				title: '训练场',
			});
		};


		if (this.data.cateList.length == 1) {
			wx.redirectTo({
				url: '../run/question_run?cateId=' + this.data.cateList[0].id + '&type=' + this.data.type,
			});
			return;
		}
	
	},

	url: function (e) {
		pageHelper.url(e, this);
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

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})