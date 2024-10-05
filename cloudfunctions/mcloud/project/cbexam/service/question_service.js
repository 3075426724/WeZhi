/**
 * Notes: 问答模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-06-08 07:48:00 
 */

const BaseProjectService = require('./base_project_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const util = require('../../../framework/utils/util.js');
const dataUtil = require('../../../framework/utils/data_util.js');
const QuestionModel = require('../model/question_model.js');
const AnswerModel = require('../model/answer_model.js');
const UserModel = require('../model/user_model.js');
const setupUtil = require('../../../framework/utils/setup/setup_util.js');

class QuestionService extends BaseProjectService {

	async getAnswerDetail(id) {
		return await AnswerModel.getOne(id);
	}

	async delAnswer(userId, id) {
		return await AnswerModel.del({ ANSWER_USER_ID: userId, _id: id });
	}

	// 得分统计
	async statAnswer(userId) {
		let where = {
			ANSWER_USER_ID: userId,
			ANSWER_TYPE: 1
		}
		let cnt = await AnswerModel.count(where);
		let score = await AnswerModel.sum(where, 'ANSWER_SCORE');

		let data = {
			USER_ANSWER_CNT: cnt,
			USER_ANSWER_SCORE: score
		}
		await UserModel.edit({ USER_MINI_OPENID: userId }, data);
	}

	// 每日可答题次数校验
	async isAnswerTimes(userId, cateId) {
		let dayCnt = 100;
		let setup = await setupUtil.get('answer');
		if (setup) {
			setup = dataUtil.dbForms2Obj(setup);
			dayCnt = Number(setup.daycnt);

			if (setup.open != true) {
				return '竞赛尚未开始!';
			}
		}

		let where = {
			ANSWER_CATE_ID: String(cateId),
			ANSWER_USER_ID: userId,
			ANSWER_TYPE: 1,
			ANSWER_DAY: timeUtil.time('Y-M-D')
		}
		let cnt = await AnswerModel.count(where);
		if (cnt >= dayCnt) {
			return '每日竞赛答题最多' + dayCnt + '次，请明日再来！';
		}

		return '';
	}

	async saveMyAnswer(userId,
		{
			start,
			end,
			list,
			type,
			cateId,
			cateName
		}) {


	}

	// 随机N条记录，生成本次题库
	async genQuestion(userId, type, cateId) {

		return { questionList: [], maxTime: 86400 };
	}


	async getMyAnswerList(userId, {
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
			'ANSWER_ADD_TIME': 'desc'
		};
		let fields = 'ANSWER_SCORE,ANSWER_CATE_NAME,ANSWER_TYPE,ANSWER_ADD_TIME,ANSWER_CNT,ANSWER_PER,ANSWER_SUCC_CNT,ANSWER_DURATION,ANSWER_START,ANSWER_END';

		let where = {};
		where.and = {
			ANSWER_USER_ID: userId,
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [

			];
		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'type': {
					where.and.ANSWER_TYPE = Number(sortVal);
					break;
				}
				case 'cateId': {
					where.and.ANSWER_CATE_ID = String(sortVal);
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'ANSWER_ADD_TIME');
					break;
				}
			}
		}

		return await AnswerModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}


	async getScoreRankList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序 
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = {
			'USER_ANSWER_SCORE': 'desc'
		};
		let fields = 'USER_NAME,USER_ANSWER_SCORE';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [

			];
		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'ANSWER_ADD_TIME');
					break;
				}
			}
		}

		return await UserModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}

}

module.exports = QuestionService;