/**
 * Notes: 测试模块控制器
 * Date: 2021-03-15 19:20:00 
 */

const BaseController = require('../../controller/base_project_controller.js');
const fakerLib = require('../../../../framework/lib/faker_lib.js');
const timeUtil = require('../../../../framework/utils/time_util.js');

const UserModel = require('../../model/user_model.js');
const HealthModel = require('../../model/health_model.js');

const JIANKANG_IMG = ['cloud://dev-3gcn1arb83a7c6b5.6465-dev-3gcn1arb83a7c6b5-1307897065/epidemic/example/jiankang.jpg'];

const XINCHENG_IMG = ['cloud://dev-3gcn1arb83a7c6b5.6465-dev-3gcn1arb83a7c6b5-1307897065/epidemic/example/xingcheng.jpg'];

const HESUAN_IMG = ['cloud://dev-3gcn1arb83a7c6b5.6465-dev-3gcn1arb83a7c6b5-1307897065/epidemic/example/hesuan.jpg'];

const YIMIAO_IMG = ['cloud://dev-3gcn1arb83a7c6b5.6465-dev-3gcn1arb83a7c6b5-1307897065/epidemic/example/yimiao.jpg'];


class TestController extends BaseController {

	async test() {
		console.log('TEST>>>>>>>');
		global.PID = 'epidemic';

		 this.mockUser(); 

		/*
		this.mockHealth1('1', '疫情排查')
		this.mockHealth2('2', '出行报备')
		this.mockHealth3('3', '核酸报名')
		this.mockHealth4('4', '隔离统计')
		this.mockHealth5('5', '健康打卡')*/
	}

	async mockUser() {
		console.log('mockUser >>>>>>> Begin....');

		console.log('>>>>delete');
		let delCnt = await UserModel.del({});
		console.log('>>>>delete=' + delCnt);

		for (let k = 1; k <= 50; k++) {
			console.log('>>>>insert >' + k);

			let user = {};
			user.USER_MINI_OPENID = k;
			user.USER_NAME = fakerLib.getName();
			user.USER_MOBILE = fakerLib.getMobile();

			await UserModel.insert(user);

		}

		console.log('mockUse <<<< END');
	}

	async mockHealth1() {
		let cateId = '1';
		let cateName = '疫情排查';

		console.log('mockHealth[' + cateId + '] >>>>>>> Begin....' + cateName);

		console.log('>>>>delete');
		let delCnt = await HealthModel.del({ HEALTH_CATE_ID: cateId });
		console.log('>>>>delete=' + delCnt);


		for (let k = 1; k <= 10; k++) {
			console.log('insert [mockHealth1][' + k + ']');

			let health = {};
			health.HEALTH_USER_ID = k;
			health.HEALTH_CATE_ID = cateId;
			health.HEALTH_CATE_NAME = cateName;
			health.HEALTH_DAY = timeUtil.time('Y-M-D');
			health.HEALTH_FORMS = [
				{ mark: 'jiankang-color', type: 'radio', title: '当前健康码颜色', val: fakerLib.getRdArr(['绿码', '黄码', '红码']) },
				{ mark: 'jiankang-code', type: 'image', title: '健康码截图', val: JIANKANG_IMG },
				{ mark: 'xingcheng-code', type: 'image', title: '行程码截图', val: XINCHENG_IMG },
				{ mark: 'hesuan-date', type: 'date', title: '核酸检测日期', val: fakerLib.getDate(2022, 2022) },
				{ mark: 'hesuan-result', type: 'radio', title: '核酸检测结果', val: fakerLib.getRdArr(['阴性', '阳性', '结果未出']) },
				{ mark: 'hesuan-img', type: 'image', title: '核酸结果截图', val: HESUAN_IMG },
				{ mark: 'area', type: 'area', title: '当前居住区域', val: [fakerLib.getProvince(), fakerLib.getCity(), fakerLib.getArea()] },
				{ mark: 'address', type: 'textarea', title: '当前居住地址', val: fakerLib.getAddress() },
				{ mark: 'xingcheng', type: 'textarea', title: '今日行程', val: fakerLib.getCity() + '出差' },
				{ mark: 'bingli', type: 'switch', title: '当前居住地址是否有确诊病例', val: false },
				{ mark: 'fare', type: 'switch', title: '近期是否有发热,咳嗽等症状', val: false },
				{ mark: 'mijie', type: 'switch', title: '本人及家属是否密接', val: false },
				{ mark: 'geli', type: 'switch', title: '本人及家属是否被隔离', val: false },
				{ mark: 'yimiao-result', type: 'radio', title: '是否接种新冠疫苗', val: fakerLib.getRdArr(['未接种', '未完成所有针剂', '已完成所有针剂']) },
				{ mark: 'yimiao-img', type: 'image', title: '疫苗接种记录截图', val: YIMIAO_IMG },
				{ mark: 'qinshu', type: 'switch', title: '共同居住亲属是否有密接/隔离人员', val: false },
			];
			//	console.log(health)

			await HealthModel.insert(health);
		}

		console.log('mockHealth1 >>>>>>> END');
	}


	async mockHealth2() {
		let cateId = '2';
		let cateName = '出行报备';

		console.log('mockHealth[' + cateId + '] >>>>>>> Begin....' + cateName);

		console.log('>>>>delete');
		let delCnt = await HealthModel.del({ HEALTH_CATE_ID: cateId });
		console.log('>>>>delete=' + delCnt);


		for (let k = 1; k <= 10; k++) {
			console.log('insert [mockHealth2][' + k + ']');

			let health = {};
			health.HEALTH_USER_ID = k;
			health.HEALTH_CATE_ID = cateId;
			health.HEALTH_CATE_NAME = cateName;
			health.HEALTH_DAY = timeUtil.time('Y-M-D');
			health.HEALTH_FORMS = [
				{ mark: 'chusheng', type: 'switch', title: '是否出省', val: false },
				{ mark: 'chushi', type: 'switch', title: '是否出市', val: false },
				{ mark: 'hesuan-date', type: 'date', title: '核酸检测日期', val: fakerLib.getDate(2022, 2022) },
				{ mark: 'hesuan-result', type: 'radio', title: '核酸检测结果', val: fakerLib.getRdArr(['阴性', '阳性', '结果未出']) },
				{ mark: 'hesuan-img', type: 'image', title: '核酸结果截图', val: HESUAN_IMG },
				{ mark: 'chuxing-reason', type: 'textarea', title: '出行原因', val: fakerLib.getRdArr(['出差', '探亲', '公干']) },
				{ mark: 'chuxing-method', type: 'textarea', title: '出行方式', val: fakerLib.getRdArr(['飞机', '高铁', '大巴', '自驾']) },
				{ mark: 'chuxing-route', type: 'textarea', title: '行程路线', val: fakerLib.getDate(2022, 2022) + '日8时， 乘坐' + fakerLib.getRdArr(['飞机', '高铁', '大巴', '自驾']) + '，前往' + fakerLib.getCity() + ' ;' + fakerLib.getDate(2022, 2022) + '日19时， 乘坐交通工具' + fakerLib.getRdArr(['飞机', '高铁', '大巴', '自驾']) + '，返回' + fakerLib.getCity() },
				{ mark: 'target', type: 'textarea', title: '目的地', val: fakerLib.getCity() },
				{ mark: 'fangang', type: 'switch', title: '是否能按时返岗', val: true },
				{ mark: 'fangang-result', type: 'textarea', title: '未按时返岗原因', val: '' },
				{ mark: 'shenpi', type: 'image', title: '审批单', val: [] },
			];
			//console.log(health)

			await HealthModel.insert(health);
		}

		console.log('mockHealth2 >>>>>>> END');
	}

	async mockHealth3() {
		let cateId = '3';
		let cateName = '核酸报名';

		console.log('mockHealth[' + cateId + '] >>>>>>> Begin....' + cateName);

		console.log('>>>>delete');
		let delCnt = await HealthModel.del({ HEALTH_CATE_ID: cateId });
		console.log('>>>>delete=' + delCnt);


		for (let k = 1; k <= 10; k++) {
			console.log('insert [mockHealth3][' + k + ']');

			let health = {};
			health.HEALTH_USER_ID = k;
			health.HEALTH_CATE_ID = cateId;
			health.HEALTH_CATE_NAME = cateName;
			health.HEALTH_DAY = timeUtil.time('Y-M-D');
			health.HEALTH_FORMS = [
				{ mark: 'jiankang-color', type: 'radio', title: '当前健康码颜色', val: fakerLib.getRdArr(['绿码', '黄码', '红码']) },
				{ mark: 'jiankang-date', type: 'date', title: '预约检查日期', val: fakerLib.getDate(2022, 2022) },
			];
			//console.log(health)

			await HealthModel.insert(health);
		}

		console.log('mockHealth3 >>>>>>> END');
	}

	async mockHealth4() {
		let cateId = '4';
		let cateName = '隔离统计';

		console.log('mockHealth[' + cateId + '] >>>>>>> Begin....' + cateName);

		console.log('>>>>delete');
		let delCnt = await HealthModel.del({ HEALTH_CATE_ID: cateId });
		console.log('>>>>delete=' + delCnt);


		for (let k = 1; k <= 10; k++) {
			console.log('insert [mockHealth4][' + k + ']');

			let health = {};
			health.HEALTH_USER_ID = k;
			health.HEALTH_CATE_ID = cateId;
			health.HEALTH_CATE_NAME = cateName;
			health.HEALTH_DAY = timeUtil.time('Y-M-D');
			health.HEALTH_FORMS = [
				{ mark: 'area', type: 'area', title: '当前居住区域', val: [fakerLib.getProvince(), fakerLib.getCity(), fakerLib.getArea()] },
				{ mark: 'address', type: 'textarea', title: '当前居住地址', val: fakerLib.getAddress() },
				{ mark: 'zhonggao', type: 'switch', title: '居住地是否中高风险地区', val: false },
				{ mark: 'geli-method', type: 'radio', title: '隔离方式', val: fakerLib.getRdArr(['集中隔离', '居家隔离']) },
				{ mark: 'jiankang-color', type: 'radio', title: '当前健康码颜色', val: fakerLib.getRdArr(['绿码', '黄码', '红码']) },
				{ mark: 'geli-reason', type: 'textarea', title: '隔离原因', val: '未知' },
				{ mark: 'geli-start', type: 'date', title: '隔离开始日期', val: fakerLib.getDate(2022, 2022) },
				{ mark: 'geli-end', type: 'date', title: '隔离截止日期', val: fakerLib.getDate(2022, 2022) },
				{ mark: 'zuozheng', type: 'image', title: '隔离佐证材料', val: [] },
				{ mark: 'other', type: 'textarea', title: '如有其他情况，请补充说明', val: '暂无' },
			];
			//	console.log(health)

			await HealthModel.insert(health);
		}

		console.log('mockHealth4 >>>>>>> END');
	}


	async mockHealth5() {
		let cateId = '5';
		let cateName = '健康打卡';

		console.log('mockHealth[' + cateId + '] >>>>>>> Begin....' + cateName);

		console.log('>>>>delete');
		let delCnt = await HealthModel.del({ HEALTH_CATE_ID: cateId });
		console.log('>>>>delete=' + delCnt);


		for (let k = 1; k <= 10; k++) {
			console.log('insert [mockHealth5][' + k + ']');

			let health = {};
			health.HEALTH_USER_ID = k;
			health.HEALTH_CATE_ID = cateId;
			health.HEALTH_CATE_NAME = cateName;
			health.HEALTH_DAY = timeUtil.time('Y-M-D');
			health.HEALTH_FORMS = [
				{ mark: 'tiwen', type: 'radio', title: '您今天的体温情况', val: fakerLib.getRdArr(['36~37.2°C', '37.3~37.9°C', '38°C以上']) },
				{ mark: 'status', type: 'radio', title: '本人当前状态', val: fakerLib.getRdArr(['正常', '时空伴随者', '次密接触者', '密接触者', '确诊者']) },
				{ mark: 'jiashu-status', type: 'radio', title: '本人共同生活家属的当前状态', val: fakerLib.getRdArr(['正常', '时空伴随者', '次密接触者', '密接触者', '确诊者']) },
				{ mark: 'jiankang-result', type: 'radio', title: '本人健康码状态', val: fakerLib.getRdArr(['绿码', '黄码', '红码']) },
				{ mark: 'jiankang-code', type: 'image', title: '健康码截图', val: JIANKANG_IMG },
				{ mark: 'xingcheng-result', type: 'radio', title: '本人行程码状态', val: fakerLib.getRdArr(['绿码', '黄码', '橙码', '红码']) },
				{ mark: 'xingcheng-img', type: 'image', title: '行程码截图', val: XINCHENG_IMG }
			];
			//	console.log(health)

			await HealthModel.insert(health);
		}

		console.log('mockHealth5 >>>>>>> END');
	}

}

module.exports = TestController;