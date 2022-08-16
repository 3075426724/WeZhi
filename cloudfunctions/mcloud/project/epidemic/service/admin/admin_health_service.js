/**
 * Notes: 健康管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-08-22  07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');

const util = require('../../../../framework/utils/util.js');
const exportUtil = require('../../../../framework/utils/export_util.js');
const timeUtil = require('../../../../framework/utils/time_util.js');
const dataUtil = require('../../../../framework/utils/data_util.js');
const HealthModel = require('../../model/health_model.js');
const UserModel = require('../../model/user_model.js');

// 导出数据KEY
const EXPORT_HEALTH_DATA_KEY = 'EXPORT_HEALTH_DATA';

class AdminHealthService extends BaseProjectAdminService {


	/** 取得分页列表 */
	async getAdminHealthList({
		cateId,
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件 
		page,
		size,
		oldTotal = 0
	}) {

		orderBy = orderBy || {
			HEALTH_ADD_TIME: 'desc'
		};
		let fields = 'HEALTH_CATE_NAME,HEALTH_CATE_ID,HEALTH_DAY,HEALTH_STATUS,HEALTH_OBJ,HEALTH_ADD_TIME,user._pid,user.USER_MOBILE,user.USER_NAME';


		let where = {};
		where.and = {
			HEALTH_CATE_ID: cateId,
			_pid: this.getProjectId(), //复杂的查询在此处标注PID  
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ ['user.USER_NAME']: ['like', search] },
				{ ['user.USER_MOBILE']: ['like', search] },
			];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'date': {
					where.and.HEALTH_DAY = sortVal;
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'HEALTH_ADD_TIME');
					break;
				}
			}
		}

		let joinParams = {
			from: UserModel.CL,
			localField: 'HEALTH_USER_ID',
			foreignField: 'USER_MINI_OPENID',
			as: 'user',
		};

		let result = await HealthModel.getListJoin(joinParams, where, fields, orderBy, page, size, true, oldTotal, false);


		// 为导出增加一个参数condition
		result.condition = encodeURIComponent(JSON.stringify(where));

		return result;
	}

	// #####################导出数据

	/**获取数据 */
	async getHealthDataURL() {
		return await exportUtil.getExportDataURL(EXPORT_HEALTH_DATA_KEY);
	}

	/**删除数据 */
	async deleteHealthDataExcel() {
		return await exportUtil.deleteDataExcel(EXPORT_HEALTH_DATA_KEY);
	}

	/**导出数据 */
	async exportHealthDataExcel(condition, fields) {

		this.AppError('该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

}

module.exports = AdminHealthService;