/**
 * Notes:  问答后台管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-08-15 07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');
const dataUtil = require('../../../../framework/utils/data_util.js');
const cloudBase = require('../../../../framework/cloud/cloud_base.js');
const cloudUtil = require('../../../../framework/cloud/cloud_util.js');
const util = require('../../../../framework/utils/util.js');
const QuestionModel = require('../../model/question_model.js');
const AnswerModel = require('../../model/answer_model.js');
const QuestionService = require('../question_service.js');

class AdminQuestionService extends BaseProjectAdminService {

	checkQuestion(obj) {

	}

	// 修正值
	fixForms(forms) {

	}

	/**添加 */
	async insertQuestion() {


		this.AppError('[知识竞赛]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**删除数据 */
	async delQuestion(id) {
		this.AppError('[知识竞赛]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	async delAnswer(id) {
		this.AppError('[知识竞赛]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/**获取信息 */
	async getQuestionDetail(id) {
		let fields = '*';

		let where = {
			_id: id
		}
		let question = await QuestionModel.getOne(where, fields);
		if (!question) return null;

		return question;
	}

	// 更新forms信息
	async updateQuestionForms({
		id,
		hasImageForms
	}) {
		this.AppError('[知识竞赛]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}


	/**更新数据 */
	async editQuestion() {

		this.AppError('[知识竞赛]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/**取得分页列表 */
	async getAdminQuestionList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'QUESTION_ORDER': 'asc',
			'QUESTION_ADD_TIME': 'desc'
		};
		let fields = '*';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ QUESTION_TITLE: ['like', search] },
			];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.QUESTION_CATE_ID = String(sortVal);
					break;
				}
				case 'status': {
					where.and.QUESTION_STATUS = Number(sortVal);
					break
				}
				case 'type': {
					where.and['QUESTION_OBJ.type'] = String(sortVal);
					break
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'QUESTION_ADD_TIME');
					break;
				}
			}
		}

		return await QuestionModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	/**取得分页列表 */
	async getAdminAnswerList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'ANSWER_ORDER': 'asc',
			'ANSWER_ADD_TIME': 'desc'
		};
		let fields = 'user.USER_NAME,user.USER_MOBILE,ANSWER_CNT,ANSWER_SUCC_CNT,ANSWER_START,ANSWER_TYPE,ANSWER_PER,ANSWER_DAY,ANSWER_DURATION,ANSWER_END,ANSWER_USER_ID,ANSWER_ADD_TIME,ANSWER_CATE_NAME,ANSWER_SCORE';

		let where = {};
		where.and = {
			ANSWER_TYPE: 1,
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ 'user.USER_NAME': ['like', search] },
				{ 'user.USER_MOBILE': ['like', search] },
			];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.ANSWER_CATE_ID = String(sortVal);
					break;
				}
				case 'type': {
					where.and['ANSWER_TYPE'] = Number(sortVal);
					break
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'ANSWER_ADD_TIME');
					break;
				}
			}
		}

		let UserModel = require('../../model/user_model.js');
		let joinParams = {
			from: UserModel.CL,
			localField: 'ANSWER_USER_ID',
			foreignField: 'USER_MINI_OPENID',
			as: 'user',
		};

		return await AnswerModel.getListJoin(joinParams, where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	/**修改状态 */
	async statusQuestion(id, status) {
		this.AppError('[知识竞赛]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}


	async clearQuestion(cateId) {
		this.AppError('[知识竞赛]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}


	//******************导入 */
	async importQuestion({ cloudId, cateId, cateName }) {
		this.AppError('[知识竞赛]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

}

module.exports = AdminQuestionService;