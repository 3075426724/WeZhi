/**
 * Notes:  问题实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-07-27 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class QuestionModel extends BaseProjectModel {

}

// 集合名
QuestionModel.CL = BaseProjectModel.C('question');

QuestionModel.DB_STRUCTURE = {
	_pid: 'string|true',
	QUESTION_ID: 'string|true',

	QUESTION_TITLE: 'string|true|comment=题目',
	QUESTION_STATUS: 'int|true|default=1|comment=状态 0=未启用,1=使用中',

	QUESTION_CATE_ID: 'string|true|default=0|comment=分类',
	QUESTION_CATE_NAME: 'string|false|comment=分类冗余', 

	QUESTION_ORDER: 'int|true|default=9999',

	QUESTION_FORMS: 'array|true|default=[]',
	QUESTION_OBJ: 'object|true|default={}', 

	QUESTION_ADD_TIME: 'int|true',
	QUESTION_EDIT_TIME: 'int|true',
	QUESTION_ADD_IP: 'string|false',
	QUESTION_EDIT_IP: 'string|false',
};

// 字段前缀
QuestionModel.FIELD_PREFIX = "QUESTION_";

/**
 * 状态 0=未启用,1=使用中 
 */
QuestionModel.STATUS = {
	UNUSE: 0,
	COMM: 1
};



module.exports = QuestionModel;