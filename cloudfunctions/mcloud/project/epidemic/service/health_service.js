/**
 * Notes: 健康监测模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-08-12 07:48:00 
 */

const BaseProjectService = require('./base_project_service.js');
const util = require('../../../framework/utils/util.js');
const cloudUtil = require('../../../framework/cloud/cloud_util.js');
const dataUtil = require('../../../framework/utils/data_util.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const HealthModel = require('../model/health_model.js');

class HealthService extends BaseProjectService {

	async getHealthDetail(userId, id, isAdmin = false) {
		let where = {
			_id: id
		}
		if (!isAdmin) where.HEALTH_USER_ID = userId;
		return await HealthModel.getOne(where);
	}


	/**添加 */
	async insertHealth(userId, {
		cateId,
		cateName,
		forms
	}) {

		let obj = dataUtil.dbForms2Obj(forms);


		// 重复性判断
		if (cateId == 5) {
			let where = {
				HEALTH_DAY: timeUtil.time('Y-M-D'),
				HEALTH_USER_ID: userId,
				HEALTH_CATE_ID: cateId
			}
			if (await HealthModel.count(where))
				this.AppError('今日已经打卡，明日再来吧~~');
		}


		// 赋值 
		let data = {};
		data.HEALTH_USER_ID = userId;
		data.HEALTH_CATE_ID = cateId;
		data.HEALTH_CATE_NAME = cateName;
		data.HEALTH_DAY = timeUtil.time('Y-M-D');

		data.HEALTH_OBJ = obj;
		data.HEALTH_FORMS = forms;
		data.HEALTH_LAST_TIME = this._timestamp;

		let id = await HealthModel.insert(data);

		return {
			id
		};
	}


	/**修改 */
	async editHealth(userId, {
		id,
		forms
	}) {
 
		let obj = dataUtil.dbForms2Obj(forms);

		// 异步处理 新旧文件
		let oldForms = await HealthModel.getOneField(id, 'HEALTH_FORMS');
		if (!oldForms) return;
		cloudUtil.handlerCloudFilesForForms(oldForms, forms);

		// 赋值 
		let data = {};
		data.HEALTH_USER_ID = userId;
		data.HEALTH_OBJ = obj;
		data.HEALTH_FORMS = forms;
		data.HEALTH_LAST_TIME = this._timestamp;

		await HealthModel.edit(id, data);
	}

	// 更新forms信息
	async updateHealthForms({
		id,
		hasImageForms
	}) {
		await HealthModel.editForms(id, 'HEALTH_FORMS', 'HEALTH_OBJ', hasImageForms);
	}

	/**删除数据 */
	async delHealth(userId, id, isAdmin) {
		let where = {
			_id: id
		}
		if (!isAdmin) where.HEALTH_USER_ID = userId;

		// 异步处理 新旧文件
		let health = await HealthModel.getOne(id, 'HEALTH_FORMS');
		if (!health) return;
		cloudUtil.handlerCloudFilesForForms(health.HEALTH_FORMS, []);

		await HealthModel.del(where);

	}


	/** 取得我的 */
	async getMyHealthList(userId, {
		cateId,
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序 
		page,
		size,
		isTotal = true,
		oldTotal
	}) {
		orderBy = orderBy || {
			'HEALTH_ADD_TIME': 'desc'
		};
		let fields = '*';

		let where = {
			HEALTH_CATE_ID: cateId,
			HEALTH_USER_ID: userId
		};

		if (util.isDefined(search) && search) {
			if (search.includes('#'))
				where = this.fmtSearchDate(where, search, 'HEALTH_DAY');
		} else if (sortType) {
			// 搜索菜单
			switch (sortType) {
				case 'status': {
					where.and.HEALTH_STATUS = Number(sortVal);
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'HEALTH_ADD_TIME');
					break;
				}
			}
		}

		let result = await HealthModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);

		return result;
	}

}

module.exports = HealthService;