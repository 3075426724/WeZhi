/**
 * Notes:  回答实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-08-16 19:20:00 
 */

const BaseProjectModel = require('./base_project_model.js');
class AnswerModel extends BaseProjectModel {

}

// 集合名
AnswerModel.CL = BaseProjectModel.C('answer');

AnswerModel.DB_STRUCTURE = {
	_pid: 'string|true',
	ANSWER_ID: 'string|true',

	ANSWER_USER_ID: 'string|true',
	ANSWER_TYPE: 'int|true|default=0|comment=类型 0=测试,1=正式',

	ANSWER_CATE_ID: 'string|true|default=0|comment=分类',
	ANSWER_CATE_NAME: 'string|false|comment=分类冗余', 

	ANSWER_DAY: 'string|true',

	ANSWER_START: 'int|true|default=0',
	ANSWER_END: 'int|true|default=0',
	ANSWER_DURATION: 'string|false',

	ANSWER_PER: 'int|true|default=0',
	ANSWER_SCORE: 'int|true|default=0',
	ANSWER_CNT: 'int|true|default=0',
	ANSWER_SUCC_CNT: 'int|true|default=0',

	ANSWER_LIST: 'array|true|default=[]',

	ANSWER_ADD_TIME: 'int|true',
	ANSWER_EDIT_TIME: 'int|true',
	ANSWER_ADD_IP: 'string|false',
	ANSWER_EDIT_IP: 'string|false',
};

// 字段前缀
AnswerModel.FIELD_PREFIX = "ANSWER_";

/**
 * 状态 0=未启用,1=使用中 
 */
AnswerModel.STATUS = {
	UNUSE: 0,
	COMM: 1
};



module.exports = AnswerModel;