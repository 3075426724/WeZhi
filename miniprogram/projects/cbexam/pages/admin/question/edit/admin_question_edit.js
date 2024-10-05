const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const dataHelper = require('../../../../../../helper/data_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const validate = require('../../../../../../helper/validate.js');
const AdminQuestionBiz = require('../../../../biz/admin_question_biz.js');
const QuestionBiz = require('../../../../biz/question_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		isEdit: true
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;
		if (!pageHelper.getOptions(this, options)) return;

		this._loadDetail();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () { },

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () { },

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () { },

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
		await this._loadDetail();
		this.selectComponent("#cmpt-form").reload();
		wx.stopPullDownRefresh();
	},

	model: function (e) {
		pageHelper.model(this, e);
	},

	_loadDetail: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		let id = this.data.id;
		if (!id) return;

		if (!this.data.isLoad) this.setData(AdminQuestionBiz.initFormData(id)); // 初始化表单数据

		let params = {
			id
		};
		let opt = {
			title: 'bar'
		};
		let question = await cloudHelper.callCloudData('admin/question_detail', params, opt);
		if (!question) {
			this.setData({
				isLoad: null
			})
			return;
		};

		this.setData({
			isLoad: true,

			formTitle: question.QUESTION_TITLE,
			formCateId: question.QUESTION_CATE_ID,
			formOrder: question.QUESTION_ORDER,

			formForms: question.QUESTION_FORMS,
		});
	},

	bindMapTap: function (e) {
		pageHelper.selectLocation(this);
	},


	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		// 数据校验
		let data = this.data;
		data = validate.check(data, AdminQuestionBiz.CHECK_FORM, this);
		if (!data) return;

		let forms = this.selectComponent("#cmpt-form").getForms(true);
		if (!forms) return;
		data.forms = forms;

		data.cateName = QuestionBiz.getCateName(data.cateId);

		try {
			let questionId = this.data.id;
			data.id = questionId;

			// 先修改，再上传 
			let result = await cloudHelper.callCloudSumbit('admin/question_edit', data);

			await cloudHelper.transFormsTempPics(forms, 'question/', questionId, 'admin/question_update_forms');

			let callback = () => {
				// 更新列表页面数据
				let node = {
					'QUESTION_TITLE': data.title,
					'QUESTION_ORDER': data.order,
					'QUESTION_OBJ': {
						'type': dataHelper.getDataByKey(data.forms, 'mark', 'type').val,
						'answer': dataHelper.getDataByKey(data.forms, 'mark', 'answer').val,
					},

				}
				pageHelper.modifyPrevPageListNodeObject(questionId, node);

				wx.navigateBack();

			}
			pageHelper.showSuccToast('修改成功', 2000, callback);

		} catch (err) {
			console.log(err);
		}

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

})