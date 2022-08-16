/**
 * Notes:  健康监测实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-08-12 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class HealthModel extends BaseProjectModel {

}

// 集合名
HealthModel.CL = BaseProjectModel.C('ep_health');

HealthModel.DB_STRUCTURE = {
	_pid: 'string|true',
	HEALTH_ID: 'string|true',
	HEALTH_USER_ID: 'string|true|comment=用户ID',
	HEALTH_CATE_ID: 'string|true',
	HEALTH_CATE_NAME: 'string|false',

	HEALTH_DAY: 'string|true',
	HEALTH_STATUS: 'int|true|default=1|comment=状态 0=未启用,1=使用中',

	HEALTH_FORMS: 'array|true|default=[]',
	HEALTH_OBJ: 'object|true|default={}',

	HEALTH_LAST_TIME: 'int|true|default=0',

	HEALTH_ADD_TIME: 'int|true',
	HEALTH_EDIT_TIME: 'int|true',
	HEALTH_ADD_IP: 'string|false',
	HEALTH_EDIT_IP: 'string|false',
};

// 字段前缀
HealthModel.FIELD_PREFIX = "HEALTH_";

/**
 * 状态 0=未启用,1=使用中 
 */
HealthModel.STATUS = {
	UNUSE: 0,
	COMM: 1
};



module.exports = HealthModel;