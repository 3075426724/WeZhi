/**
 * Notes: 健康监测控制模块
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-08-13 10:20:00 
 */

const BaseProjectAdminController = require('./base_project_admin_controller.js');

const HealthModel = require('../../model/health_model.js');
const AdminHealthService = require('../../service/admin/admin_health_service.js');
const HealthService = require('../../service/health_service.js');
const timeUtil = require('../../../../framework/utils/time_util.js');

class AdminHealthController extends BaseProjectAdminController {


	/** 信息 */
	async getHealthDetail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new HealthService();
		let health = await service.getHealthDetail('', input.id, true);

		if (health) {
			// 显示转换  
			health.HEALTH_ADD_TIME = timeUtil.timestamp2Time(health.HEALTH_ADD_TIME);
		}

		return health;
	}


	/** 列表 */
	async getAdminHealthList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			cateId: 'string|must',
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminHealthService();
		let result = await service.getAdminHealthList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].HEALTH_ADD_TIME = timeUtil.timestamp2Time(list[k].HEALTH_ADD_TIME);
		}
		result.list = list;
		return result;
	}

	/** 删除 */
	async delHealth() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new HealthService();
		await service.delHealth('', input.id, true);

	}

	/************** 数据导出 BEGIN ********************* */
	/** 当前是否有导出文件生成 */
	async healthDataGet() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			isDel: 'int|must', //是否删除已有记录
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminHealthService();

		if (input.isDel === 1)
			await service.deleteHealthDataExcel(); //先删除 

		return await service.getHealthDataURL();
	}

	/** 导出数据 */
	async healthDataExport() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			condition: 'string|name=导出条件',
			fields: 'array',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminHealthService();
		return await service.exportHealthDataExcel(input.condition, input.fields);
	}

	/** 删除导出的数据 */
	async healthDataDel() {
		await this.isAdmin();

		// 数据校验
		let rules = {};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminHealthService();
		return await service.deleteHealthDataExcel();
	}
}

module.exports = AdminHealthController;