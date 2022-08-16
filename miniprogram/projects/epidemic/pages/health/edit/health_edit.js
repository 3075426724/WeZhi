const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const HealthBiz = require('../../../biz/health_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
const timeHelper = require('../../../../../helper/time_helper.js');
const dataHelper = require('../../../../../helper/data_helper.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		isEdit: true,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		if (!pageHelper.getOptions(this, options)) return;
		if (!pageHelper.getOptions(this, options, 'cateId')) return;
		HealthBiz.setHealthTitle(this, this.data.cateId, '修改', '资料');
		wx.setNavigationBarTitle({
			title: '',
		});

		if (!await PassportBiz.loginMustBackWin(this)) return;

		this._loadDetail();

	},

	_loadDetail: async function () {
		let id = this.data.id;
		if (!id) return;

		this.setData(HealthBiz.initFormData(id, this.data.cateId)); // 初始化表单数据   

		let params = {
			id,
		};
		let opt = {
			title: 'bar'
		};
		let health = await cloudHelper.callCloudData('health/detail', params, opt);
		if (!health) {
			this.setData({
				isLoad: null
			})
			return;
		}

		this.setData({
			isLoad: true,
			health,
		});

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
		this.setData({
			isLoad: false
		}, async () => {
			await this._loadDetail();
		});
		wx.stopPullDownRefresh();
	},



	url: function (e) {
		pageHelper.url(e, this);
	},


	bindCheckTap: async function (e) {
		this.selectComponent("#health-form-show-" + this.data.cateId).checkForms();
	},

	bindSubmitCmpt: async function (e) {
		let forms = e.detail;

		try {
			let id = this.data.id;
			let params = {
				id,
				forms
			}
			await cloudHelper.callCloudSumbit('health/edit', params);
			await cloudHelper.transFormsTempPics(forms, 'health/', id, 'health/health_update_forms');

			let cb = () => {
				let node = {
					'HEALTH_LAST_TIME': timeHelper.time('Y-M-D h:m'),
				}
				pageHelper.modifyPrevPageListNodeObject(id, node);

				wx.navigateBack();
			};
			pageHelper.showSuccToast('修改成功', 2000, cb);
		} catch (err) {
			console.log(err);
		}
	}

})