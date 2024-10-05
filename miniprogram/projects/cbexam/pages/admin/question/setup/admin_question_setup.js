const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const projectSetting = require('../../../../public/project_setting.js');
const ProjectBiz = require('../../../../biz/project_biz.js');

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
		if (!AdminBiz.isAdmin(this)) return;

		this.setData({
			fields: projectSetting.QUESTION_SETUP_FIELDS 
		});

		this._loadDetail();
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

	_loadDetail: async function (e) {
		let formForms = await ProjectBiz.getSetup('answer');
		this.setData({
			isLoad: true,
			formForms: formForms || []
		})
	},

	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;


		let forms = this.selectComponent("#cmpt-form").getForms(true);
		if (!forms) return;


		try {

			let params = {
				key: 'answer',
				content: forms
			}

			// 创建
			await cloudHelper.callCloudSumbit('admin/setup_set', params).then(res => {
				let callback = async function () {

					wx.navigateBack();

				}
				pageHelper.showSuccToast('设置成功', 2000, callback);
			});


		} catch (err) {
			console.log(err);
		}

	},
})