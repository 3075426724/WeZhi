/**
 * Notes: 路由配置文件
  * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * User: CC
 * Date: 2020-10-14 07:00:00
 */

module.exports = {
	'test/test': 'test/test_controller@test',

	'job/timer': 'job_controller@minuteJob',

	'home/setup_get': 'home_controller@getSetup',

	'passport/login': 'passport_controller@login',
	'passport/phone': 'passport_controller@getPhone',
	'passport/my_detail': 'passport_controller@getMyDetail',
	'passport/register': 'passport_controller@register',
	'passport/edit_base': 'passport_controller@editBase',

	// 收藏
	'fav/update': 'fav_controller@updateFav',
	'fav/del': 'fav_controller@delFav',
	'fav/is_fav': 'fav_controller@isFav',
	'fav/my_list': 'fav_controller@getMyFavList',




	// 管理
	'admin/home': 'admin/admin_home_controller@adminHome',
	'admin/clear_vouch': 'admin/admin_home_controller@clearVouchData',

	'admin/login': 'admin/admin_mgr_controller@adminLogin',
	'admin/mgr_list': 'admin/admin_mgr_controller@getMgrList',
	'admin/mgr_insert': 'admin/admin_mgr_controller@insertMgr#demo',
	'admin/mgr_del': 'admin/admin_mgr_controller@delMgr#demo',
	'admin/mgr_detail': 'admin/admin_mgr_controller@getMgrDetail',
	'admin/mgr_edit': 'admin/admin_mgr_controller@editMgr#demo',
	'admin/mgr_status': 'admin/admin_mgr_controller@statusMgr#demo',
	'admin/mgr_pwd': 'admin/admin_mgr_controller@pwdMgr#demo',
	'admin/log_list': 'admin/admin_mgr_controller@getLogList',
	'admin/log_clear': 'admin/admin_mgr_controller@clearLog#demo',

	'admin/setup_set': 'admin/admin_setup_controller@setSetup#demo',
	'admin/setup_set_content': 'admin/admin_setup_controller@setContentSetup#demo',
	'admin/setup_qr': 'admin/admin_setup_controller@genMiniQr',

	// 用户
	'admin/user_list': 'admin/admin_user_controller@getUserList',
	'admin/user_detail': 'admin/admin_user_controller@getUserDetail',
	'admin/user_del': 'admin/admin_user_controller@delUser#demo',
	'admin/user_status': 'admin/admin_user_controller@statusUser#demo',

	'admin/user_data_get': 'admin/admin_user_controller@userDataGet',
	'admin/user_data_export': 'admin/admin_user_controller@userDataExport',
	'admin/user_data_del': 'admin/admin_user_controller@userDataDel',

	'admin/rank_data_get': 'admin/admin_user_controller@rankDataGet',
	'admin/rank_data_export': 'admin/admin_user_controller@rankDataExport',
	'admin/rank_data_del': 'admin/admin_user_controller@rankDataDel',


	// 内容  
	'home/list': 'home_controller@getHomeList',
	'news/list': 'news_controller@getNewsList',
	'news/view': 'news_controller@viewNews',

	'admin/news_list': 'admin/admin_news_controller@getAdminNewsList',
	'admin/news_insert': 'admin/admin_news_controller@insertNews#demo',
	'admin/news_detail': 'admin/admin_news_controller@getNewsDetail',
	'admin/news_edit': 'admin/admin_news_controller@editNews#demo',
	'admin/news_update_forms': 'admin/admin_news_controller@updateNewsForms#demo',
	'admin/news_update_pic': 'admin/admin_news_controller@updateNewsPic#demo',
	'admin/news_update_content': 'admin/admin_news_controller@updateNewsContent#demo',
	'admin/news_del': 'admin/admin_news_controller@delNews#demo',
	'admin/news_sort': 'admin/admin_news_controller@sortNews#demo',
	'admin/news_status': 'admin/admin_news_controller@statusNews#demo',
	'admin/news_vouch': 'admin/admin_news_controller@vouchNews#demo',

	// 问答 
	'admin/answer_list': 'admin/admin_question_controller@getAdminAnswerList',
	'admin/question_list': 'admin/admin_question_controller@getAdminQuestionList',
	'admin/question_insert': 'admin/admin_question_controller@insertQuestion#demo',
	'admin/question_detail': 'admin/admin_question_controller@getQuestionDetail',
	'admin/question_edit': 'admin/admin_question_controller@editQuestion#demo',
	'admin/question_import': 'admin/admin_question_controller@importQuestion#demo',
	'admin/question_clear': 'admin/admin_question_controller@clearQuestion#demo',
	'admin/question_update_forms': 'admin/admin_question_controller@updateQuestionForms#demo',
	'admin/question_del': 'admin/admin_question_controller@delQuestion#demo',
	'admin/answer_del': 'admin/admin_question_controller@delAnswer#demo',
	'admin/question_sort': 'admin/admin_question_controller@sortQuestion#demo',
	'admin/question_vouch': 'admin/admin_question_controller@vouchQuestion#demo',
	'admin/question_status': 'admin/admin_question_controller@statusQuestion#demo',

	'question/gen': 'question_controller@genQuestion',
	'question/my_answer_list': 'question_controller@getMyAnswerList',
	'question/answer_detail': 'question_controller@getAnswerDetail',
	'question/answer_del': 'question_controller@delAnswer',
	'question/save_my_answer': 'question_controller@saveMyAnswer',
	'question/rank': 'question_controller@getScoreRankList',


}