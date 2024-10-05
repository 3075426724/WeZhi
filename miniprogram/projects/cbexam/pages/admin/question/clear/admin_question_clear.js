const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const fileHelper = require('../../../../../../helper/file_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const PublicBiz = require('../../../../../../comm/biz/public_biz.js');
const QuestionBiz = require('../../../../biz/question_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		let cateIdOptions = QuestionBiz.getCateList();

		this.setData({
			cateIdOptions,
			formCateId: (cateIdOptions.length == 1) ? cateIdOptions[0].val : '',
		})

	},




	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

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
	 * 数据提交
	 */
	bindFormSubmit: async function () {

		if (!AdminBiz.isAdmin(this)) return;

		let cateId = this.data.formCateId;
		if (!cateId) return pageHelper.showModal('请选择分类');

		let cb = async() => {
			try {
				let params = {
					cateId
				}
				let options = {
					title: '清空中'
				}
				await cloudHelper.callCloudSumbit('admin/question_clear', params, options).then(res => {
					PublicBiz.removeCacheList('admin-question-list');
					PublicBiz.removeCacheList('question-list');
					pageHelper.showModal('清空完成');

				});
			} catch (err) {
				console.log(err);
			}
		} 

		pageHelper.showConfirm('确认清空？清空后不可恢复', cb); 


	},


	onPullDownRefresh: async function () {
	},

	url: async function (e) {
		pageHelper.url(e, this);
	},


})