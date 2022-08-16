const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const timeHelper = require('../../../../../../helper/time_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const HealthBiz = require('../../../../biz/health_biz.js');

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

		if (!pageHelper.getOptions(this, options, 'cateId')) return;
		HealthBiz.setHealthTitle(this, this.data.cateId, '', '-管理');

		this.setData({
			_params: {
				cateId: this.data.cateId,
			}
		});

		//设置搜索菜单
		await this._getSearchMenu();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () { },

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

	url: async function (e) {
		pageHelper.url(e, this);
	},


	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},

	bindDelTap: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let id = pageHelper.dataset(e, 'id');

		let params = {
			id
		}

		let callback = async () => {
			try {
				let opts = {
					title: '删除中'
				}
				await cloudHelper.callCloudSumbit('admin/health_del', params, opts).then(res => {

					pageHelper.delListNode(id, this.data.dataList.list);
					this.data.dataList.total--;
					this.setData({
						dataList: this.data.dataList
					});
					pageHelper.showSuccToast('删除成功');
				});
			} catch (e) {
				console.log(e);
			}
		}
		pageHelper.showConfirm('确认删除？删除不可恢复', callback);

	},


	_getSearchMenu: async function () {

		let sortItems1 = [
			{ label: '日期', type: '', value: '' },
		];
		for (let k = 0; k < 31; k++) {
			let date = timeHelper.time('Y-M-D', -86400 * k)
			let node = {
				label: date,
				type: 'date',
				value: date
			}
			sortItems1.push(node);
		}

		let sortMenus = [
			{ label: '全部', type: '', value: '' },
			{ label: '时间正序', type: 'sort', value: 'HEALTH_DAY|asc' },
			{ label: '时间倒序', type: 'sort', value: 'HEALTH_DAY|desc' },
		]

		this.setData({
			search: '',
			sortItems: [sortItems1],
			sortMenus,
			isLoad: true
		})


	}

})