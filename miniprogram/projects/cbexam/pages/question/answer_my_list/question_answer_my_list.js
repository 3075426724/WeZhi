const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const projectSetting = require('../../../public/project_setting.js');
const QuestionBiz = require('../../../biz/question_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		cateIdOptions: projectSetting.QUESTION_CATE,
		isLoad: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		ProjectBiz.initPage(this);
		this._getSearchMenu();
	},

	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
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

	bindDelTap: async function (e) {

		let id = pageHelper.dataset(e, 'id');
		let cb = async () => {
			try {
				let params = {
					id
				}
				let opts = {
					title: '删除中'
				}

				await cloudHelper.callCloudSumbit('question/answer_del', params, opts).then(res => {
					let callback = () => {
						pageHelper.delListNode(id, this.data.dataList.list, '_id');
						this.data.dataList.total--;
						this.setData({
							dataList: this.data.dataList
						});
					}
					pageHelper.showSuccToast('删除成功', 1500, callback);
				});
			} catch (err) {
				console.log(err);
			}
		}

		pageHelper.showConfirm('确认删除?', cb);
	},

	_getSearchMenu: function () {

		let sortItems = [];

		let cateIdOptions = QuestionBiz.getCateList(); 

		if (cateIdOptions.length > 1) {
			let sortItem1 = [{ label: '分类', type: '', value: 0 }];
			sortItem1 = sortItem1.concat(cateIdOptions);
			sortItems.push(sortItem1);
		}

		let sortMenus = [
			{ label: '全部', type: 'all', value: '' },
			{ label: '答题竞赛', type: 'type', value: '1' },
			{ label: '训练场', type: 'type', value: '0' },
			{ label: '得分▽', type: 'sort', value: 'ANSWER_SCORE|desc' },
			{ label: '得分△', type: 'sort', value: 'ANSWER_SCORE|asc' },
		];

		this.setData({
			isLoad: true,
			sortItems,
			sortMenus
		})

	}
})