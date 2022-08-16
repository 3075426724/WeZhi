const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const HealthBiz = require('../../../biz/health_biz.js');
const PublicBiz = require('../../../../../comm/biz/public_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: true,
		isEdit: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		if (!pageHelper.getOptions(this, options, 'cateId')) return;
		HealthBiz.setHealthTitle(this, this.data.cateId, '填写', '资料');
		wx.setNavigationBarTitle({
			title: '',
		});


		this.setData(HealthBiz.initFormData('', this.data.cateId)); // 初始化表单数据   

	},



	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
	},



	url: function (e) {
		pageHelper.url(e, this);
	},



	bindCheckTap: async function (e) {
		if (!await PassportBiz.loginMustCancelWin(this)) return;
		this.selectComponent("#health-form-show-" + this.data.cateId).checkForms();
	},

	bindSubmitCmpt: async function (e) {
		if (!await PassportBiz.loginMustCancelWin(this)) return;

		let forms = e.detail;

		try {
			let opts = {
				title: '提交中'
			}
			let params = {
				forms,
				cateId: this.data.cateId,
				cateName: this.data.cateName
			}
			// 创建
			let result = await cloudHelper.callCloudSumbit('health/insert', params, opts);
			let healthId = result.data.id;

			// 图片
			await cloudHelper.transFormsTempPics(forms, 'health/', healthId, 'health/health_update_forms');

			let cb = () => {
				PublicBiz.removeCacheList('health-list-' + this.data.cateId);
				/*
				wx.reLaunch({
					url: '../list/health_list?cateId=' + this.data.cateId
				});*/
				wx.navigateBack();
			}
			pageHelper.showSuccToast('填报完成', 2000, cb);


		} catch (err) {
			console.log(err);
		};
	}

})