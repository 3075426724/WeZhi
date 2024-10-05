/**
 * Notes: 问答模块后台管理-控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-08-15 10:20:00 
 */

const BaseProjectAdminController = require('./base_project_admin_controller.js');

const AdminQuestionService = require('../../service/admin/admin_question_service.js');

const timeUtil = require('../../../../framework/utils/time_util.js');
const contentCheck = require('../../../../framework/validate/content_check.js');

class AdminQuestionController extends BaseProjectAdminController {

	/** 状态修改 */
	async statusQuestion() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			status: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminQuestionService();
		await service.statusQuestion(input.id, input.status);

	}

	/** 列表 */
	async getAdminQuestionList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
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

		let service = new AdminQuestionService();
		let result = await service.getAdminQuestionList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].QUESTION_ADD_TIME = timeUtil.timestamp2Time(list[k].QUESTION_ADD_TIME, 'Y-M-D h:m:s');

			if (list[k].QUESTION_OBJ && list[k].QUESTION_OBJ.img)
				delete list[k].QUESTION_OBJ.img;
			if (list[k].QUESTION_OBJ && list[k].QUESTION_OBJ.desc)
				delete list[k].QUESTION_OBJ.desc;

		}
		result.list = list;

		return result;

	}

	async getAdminAnswerList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
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

		let service = new AdminQuestionService();
		let result = await service.getAdminAnswerList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].ANSWER_ADD_TIME = timeUtil.timestamp2Time(list[k].ANSWER_ADD_TIME, 'Y-M-D h:m:s');

			list[k].start = timeUtil.timestamp2Time(list[k].ANSWER_START, 'Y-M-D h:m:s');
			list[k].end = timeUtil.timestamp2Time(list[k].ANSWER_END, 'h:m:s');

		}
		result.list = list;

		return result;

	}


	/** 发布 */
	async insertQuestion() {
		await this.isAdmin();

		// 数据校验 
		let rules = {

		};


		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminQuestionService();
		let result = await service.insertQuestion(input);

		return result;

	}


	/** 获取信息用于编辑修改 */
	async getQuestionDetail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminQuestionService();
		return await service.getQuestionDetail(input.id);

	}

	/** 编辑 */
	async editQuestion() {
		await this.isAdmin();

		let rules = {

		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminQuestionService();
		let result = service.editQuestion(input);


		return result;
	}

	/** 删除 */
	async delQuestion() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminQuestionService();
		await service.delQuestion(input.id);

	}

	async delAnswer() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminQuestionService();
		await service.delAnswer(input.id);

	}

	/** 更新图片信息 */
	async updateQuestionForms() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			hasImageForms: 'array'
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminQuestionService();
		return await service.updateQuestionForms(input);
	}

	async importQuestion() {
		await this.isAdmin();

		// 数据校验
		let rules = {

		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminQuestionService();
		return await service.importQuestion(input);
	}

	async clearQuestion() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			cateId: 'must|string|name=分类',
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminQuestionService();
		return await service.clearQuestion(input.cateId);
	}

}

module.exports = AdminQuestionController;