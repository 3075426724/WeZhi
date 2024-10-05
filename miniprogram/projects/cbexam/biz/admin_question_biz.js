/**
 * Notes: 问答后台管理模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-08-15 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const projectSetting = require('../public/project_setting.js'); 
const QuestionBiz = require('./question_biz.js');

class AdminQuestionBiz extends BaseBiz {

	static initFormData(id = '') {
		let cateIdOptions = QuestionBiz.getCateList();

		return {
			id,

			cateIdOptions,
			fields: projectSetting.QUESTION_FIELDS,

			formTitle: '', 

			formCateId: (cateIdOptions.length == 1) ? cateIdOptions[0].val : '',
			formOrder: 9999,

			formForms: [],
		}

	} 
 

    static setCateTitle() {

        let curPage = pageHelper.getPrevPage(1);
        if (!curPage) return;

        let cateId = null;
        if (curPage.options && curPage.options.id) {
            cateId = curPage.options.id;
        }
        let cateList = projectSetting.QUESTION_CATE;
        for (let k = 0; k < cateList.length; k++) {
            if (cateList[k].id == cateId) {
                wx.setNavigationBarTitle({
                    title: cateList[k].title
                });
                return;
            }
        }

    } 
}

AdminQuestionBiz.CHECK_FORM = {
	title: 'formTitle|must|string|min:2|max:200|name=题目内容',
	cateId: 'formCateId|must|id|name=分类',
	order: 'formOrder|must|int|min:0|max:9999|name=排序号',
	forms: 'formForms|array',
};


module.exports = AdminQuestionBiz;