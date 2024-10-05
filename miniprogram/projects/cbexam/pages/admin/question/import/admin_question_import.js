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
		tempUrl: '',
		isLoad: true,
		temp: ['题目(必填)', '题型(必填)', '正确答案(必填)', '选项A(必填)', '选项B(必填)', '选项C', '选项D', '选项E', '选项F', '选项G', '选项H', '题目解析']
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
		let cateName = QuestionBiz.getCateName(cateId);


		wx.chooseMessageFile({
			count: 1,
			type: 'file',
			extension: ['xlsx'],
			success: async (res) => {
				console.log(res)
				let path = res.tempFiles[0].path;

				wx.showLoading({
					title: '上传中',
					mask: true
				});



				// 上传到云空间 
				let cloudId = await cloudHelper.transTempPicOne(path, 'question/', 'import', false);
				if (!cloudId) return;

				let params = {
					cateId,
					cateName,
					cloudId,
				};

				try {
					let options = {
						title: '导入中'
					}
					await cloudHelper.callCloudSumbit('admin/question_import', params, options).then(res => {
						let data = res.data;



						pageHelper.showModal('本文件共有题目' + data.total + '条，导入成功' + data.succ + '条，格式错误' + data.err + '条');

					});
				} catch (err) {
					console.log(err);
					pageHelper.showModal('导入失败，请重新导入');
				}

			}
		});
	},
 

	onPullDownRefresh: async function () {
		await this._loadDetail();
		wx.stopPullDownRefresh();
	},

	url: async function (e) {
		pageHelper.url(e, this);
	},

	 
})