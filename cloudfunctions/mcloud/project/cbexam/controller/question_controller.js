/**
 * Notes: 场馆模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-06-08 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const QuestionService = require('../service/question_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');

class QuestionController extends BaseProjectController {

	async getAnswerDetail() {

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new QuestionService();
		return await service.getAnswerDetail(input.id);

	}



	/** 产生题库 */
	async genQuestion() {
		// 数据校验
		let rules = {
			cateId: 'must|string|name=分类',
			type: 'must|int|name=类型',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new QuestionService();
		return await service.genQuestion(this._userId, input.type, input.cateId);
	}

	async saveMyAnswer() {
		// 数据校验
		let rules = {
			cateId: 'must|string|name=分类',
			cateName: 'must|string|name=分类名称',
			start: 'must|int',
			end: 'must|int',
			list: 'must|array',
			type: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new QuestionService();
		return await service.saveMyAnswer(this._userId, input);
	}

	async delAnswer() {
		// 数据校验
		let rules = {
			id: 'must|id'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new QuestionService();
		return await service.delAnswer(this._userId, input.id);
	}

	async getMyAnswerList() {

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new QuestionService();
		let result = await service.getMyAnswerList(this._userId, input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			list[k].ANSWER_ADD_TIME = timeUtil.timestamp2Time(list[k].ANSWER_ADD_TIME, 'Y-M-D h:m');
			list[k].start = timeUtil.timestamp2Time(list[k].ANSWER_START, 'Y-M-D h:m:s');
			list[k].end = timeUtil.timestamp2Time(list[k].ANSWER_END, 'h:m:s');
		}

		return result;

	}


	async getScoreRankList() {

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new QuestionService();
		let result = await service.getScoreRankList(input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {

		}

		return result;

	}

}

module.exports = QuestionController;