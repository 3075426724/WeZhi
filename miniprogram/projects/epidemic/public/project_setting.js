module.exports = { //疫情
	PROJECT_COLOR: '#257DFE',
	NAV_COLOR: '#ffffff',
	NAV_BG: '#257DFE',

	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' },
	],

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [
		{ mark: 'sex', title: '性别', type: 'select', selectOptions: ['男', '女'], must: true },
		{ mark: 'area', title: '所在地区', type: 'area' },
	],

	NEWS_NAME: '公告通知',
	NEWS_CATE: [
		{ id: 1, title: '公告通知', style: 'leftbig1' }, 
	],
	NEWS_FIELDS: [

	],


	// 健康监测
	HEALTH_NAME1: '疫情排查',
	HEALTH_FIELDS1: [
		{ mark: 'jiankang_color', type: 'radio', title: '当前健康码颜色' , selectOptions: ['绿码', '黄码', '红码'], must: true },
		{ mark: 'jiankang_code', type: 'image', title: '健康码截图', len: 1, must: true },
		{ mark: 'xingcheng_code', type: 'image', title: '行程码截图', len: 1, must: true },
		{ mark: 'hesuan_date', type: 'date', title: '核酸检测日期', must: true },
		{ mark: 'hesuan_result', type: 'radio', title: '核酸检测结果', selectOptions: ['阴性', '阳性', '结果未出'], must: true },
		{ mark: 'hesuan_img', type: 'image', title: '核酸结果截图', len: 1, must: true },
		{ mark: 'area', type: 'area', title: '当前居住区域', must: true },
		{ mark: 'address', type: 'textarea', title: '当前居住地址', must: true, max: 300 },
		{ mark: 'xingcheng', type: 'textarea', title: '今日行程', desc: '请填写行程路线; 例如X年X月X日X时， 乘坐交通工具X，前往某地X ;X年X月X日X时， 乘坐交通工具X，返回某地X', must: false },
		{ mark: 'bingli', type: 'switch', title: '当前居住地址是否有确诊病例', def: false, must: true },
		{ mark: 'fare', type: 'switch', title: '近期是否有发热,咳嗽等症状', def: false, must: true },
		{ mark: 'mijie', type: 'switch', title: '本人及家属是否密接', def: false, must: true },
		{ mark: 'geli', type: 'switch', title: '本人及家属是否被隔离', def: false, must: true },
		{ mark: 'yimiao_result', type: 'radio', title: '是否接种新冠疫苗', selectOptions: ['未接种', '未完成所有针剂', '已完成所有针剂'], must: true },
		{ mark: 'yimiao_img', type: 'image', title: '疫苗接种记录截图', max: 3, must: false },
		{ mark: 'qinshu', type: 'switch', title: '共同居住亲属是否有密接/隔离人员', must: true },
	],

	HEALTH_NAME2: '出行报备',
	HEALTH_FIELDS2: [
		{ mark: 'chuxing_start', type: 'date', title: '出行日期', must: true },
		{ mark: 'chuxing_end', type: 'date', title: '返程日期', must: true },
		{ mark: 'chusheng', type: 'switch', title: '是否出省',def:false, must: true },
		{ mark: 'chushi', type: 'switch', title: '是否出市',def:false, must: true },
		{ mark: 'hesuan_date', type: 'date', title: '核酸检测日期', must: true },
		{ mark: 'hesuan_result', type: 'radio', title: '核酸检测结果', selectOptions: ['阴性', '阳性', '结果未出'], must: true },
		{ mark: 'hesuan_img', type: 'image', title: '核酸结果截图', len: 1, must: true },
		{ mark: 'chuxing_reason', type: 'textarea', title: '出行原因', must: true },
		{ mark: 'chuxing_method', type: 'textarea', title: '出行方式', must: true },
		{ mark: 'chuxing_route', type: 'textarea', title: '行程路线', desc: '请填写行程路线; 例如X年X月X日X时， 乘坐交通工具X，前往某地X ;X年X月X日X时， 乘坐交通工具X，返回某地X', must: true },
		{ mark: 'target', type: 'textarea', title: '目的地', must: true },
		{ mark: 'fangang', type: 'switch', title: '是否能按时返岗',def:false, must: true },
		{ mark: 'fangang_result', type: 'textarea', title: '未按时返岗原因', must: false },
		{ mark: 'shenpi', type: 'image', title: '审批单', max: 3, must: false }, 
	],

	HEALTH_NAME3: '核酸报名',
	HEALTH_FIELDS3: [
		{ mark: 'jiankang_color', type: 'radio', title: '当前健康码颜色' , selectOptions: ['绿码', '黄码', '红码'], must: true },
		{ mark: 'jiankang_date', type: 'date', title: '预约检查日期',  must: true },
	],

	HEALTH_NAME4: '隔离统计',
	HEALTH_FIELDS4: [
		{ mark: 'area', type: 'area', title: '当前居住区域', must: true },
		{ mark: 'address', type: 'textarea', title: '当前居住地址', must: true, max: 300 },
		{ mark: 'zhonggao', type: 'switch', title: '居住地是否中高风险地区',def:false, must: true },
		{ mark: 'geli_method', type: 'radio', title: '隔离方式',selectOptions:['集中隔离','居家隔离'], must: true },
		{ mark: 'jiankang_color', type: 'radio', title: '当前健康码颜色' , selectOptions: ['绿码', '黄码', '红码'], must: true },
		{ mark: 'geli_reason', type: 'textarea', title: '隔离原因', must: true },
		{ mark: 'geli_start', type: 'date', title: '隔离开始日期', must: true },
		{ mark: 'geli_end', type: 'date', title: '隔离截止日期', must: true },
		{ mark: 'zuozheng', type: 'image', title: '隔离佐证材料', max: 3, must: false },
		{ mark: 'other', type: 'textarea', title: '如有其他情况，请补充说明', must: false },
	],

	HEALTH_NAME5: '健康打卡',
	HEALTH_FIELDS5: [ 
		{ mark: 'tiwen', type: 'radio', title: '您今天的体温情况', selectOptions: ['36~37.2°C', '37.3~37.9°C', '38°C以上'], must: true },
		{ mark: 'status', type: 'radio', title: '本人当前状态', selectOptions: ['正常', '时空伴随者', '次密接触者','密接触者','确诊者'], must: true },
		{ mark: 'jiashu_status', type: 'radio', title: '本人共同生活家属的当前状态', selectOptions: ['正常', '时空伴随者', '次密接触者','密接触者','确诊者'], must: true }, 
		{ mark: 'jiankang_result', type: 'radio', title: '本人健康码状态', selectOptions: ['绿码', '黄码', '红码'], must: true },
		{ mark: 'jiankang_code', type: 'image', title: '健康码截图', len: 1, must: true },
		{ mark: 'xingcheng_result', type: 'radio', title: '本人行程码状态', selectOptions: ['绿码', '黄码', '橙码','红码'], must: true },
		{ mark: 'xingcheng_img', type: 'image', title: '行程码截图', len: 1, must: true },
	],

}
