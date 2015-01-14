var kanColle = {
	remodel: {
		equips: {
			'12.7cm連装砲': {
				category: '小口径主砲',
				remodelDetail: [{
					assistant: '-',
					enableDays: [0, 1, 2, 3, 4, 5, 6]
				}],
				remark: ''
			},

			'12.7cm連装砲B型改二': {
				category: '小口径主砲',
				remodelDetail: [{
					assistant: '夕立改二<br>绫波改二',
					enableDays: [1, 2, 3]
				}],
				remark: ''
			},
			'25mm連装機銃': {
				category: '対空機銃',
				remodelDetail: [{
					assistant: '五十鈴改二',
					enableDays: [0, 5, 6]
				}],
				remark: ''
			},
			'25mm三連装機銃': {
				category: '対空機銃',
				remodelDetail: [{
					assistant: '五十鈴改二',
					enableDays: [1, 2, 3]
				}, {
					assistant: '摩耶',
					enableDays: [2, 3, 4]
				}],
			},
			'91式高射装置': {
				category: '高射装置',
				remodelDetail: [{
					assistant: '摩耶<br>秋月',
					enableDays: [0, 1, 5, 6]
				}],
				remark: '消費装備:12.7cm連装高角砲<br>更新消費:10cm連装高角砲'
			},
			'94式高射装置': {
				category: '高射装置',
				remodelDetail: [{
					assistant: '秋月',
					enableDays: [0, 1, 2, 3, 4, 5, 6]
				}],
				remark: '消費装備:10cm連装高角砲'
			},
			'14cm単装砲': {
				category: '中口径主砲',
				remodelDetail: [{
					assistant: '-',
					enableDays: [0, 1, 2, 3, 4, 5, 6]
				}],
				remark: ''
			},
			'14cm連装砲': {
				category: '中口径主砲',
				remodelDetail: [{
					assistant: '夕張',
					enableDays: [1, 4]
				}],
				remark: ''
			},
			'20.3cm連装砲': {
				category: '中口径主砲',
				remodelDetail: [{
					assistant: '青葉, 衣笠',
					enableDays: [0, 1, 2, 3, 4, 5, 6]
				}],
				remark: ''
			},
			'20.3cm(2号)連装砲': {
				category: '中口径主砲',
				remodelDetail: [{
					assistant: '妙高',
					enableDays: [0, 1, 2]
				}],
				remark: ''
			},
			'20.3cm(3号)連装砲': {
				category: '中口径主砲',
				remodelDetail: [{
					assistant: '三隈',
					enableDays: [2, 3]
				}],
				remark: ''
			},
			'10cm高角砲＋高射装置': {
				category: '高角砲',
				remodelDetail: [{
					assistant: '秋月',
					enableDays: [1, 2, 3, 4]
				}],
				remark: '消費装備:10cm連装高角砲'
			},
			'35.6cm連装砲': {
				category: '大口径主砲',
				remodelDetail: [{
					assistant: '扶桑',
					enableDays: [0, 5, 6]
				}],
				remark: ''
			},
			'41cm連装砲': {
				category: '大口径主砲',
				remodelDetail: [{
					assistant: '長門',
					enableDays: [2, 5, 6]
				}, {
					assistant: '陸奥',
					enableDays: [0, 1, 4]
				}],
				remark: '初期の改修から消費装備が必要'
			},
			'61cm四連装魚雷': {
				category: '魚雷',
				remodelDetail: [{
					assistant: '-',
					enableDays: [0, 1, 2, 5, 6]
				}],
				remark: ''
			},
			'61cm四連装(酸素)魚雷': {
				category: '魚雷',
				remodelDetail: [{
					assistant: '北上<br>大井',
					enableDays: [0, 1, 2, 3, 4, 5, 6]
				}],
				remark: ''
			},
			'61cm五連装(酸素)魚雷': {
				category: '魚雷',
				remodelDetail: [{
					assistant: '島風',
					enableDays: [3, 4]
				}],
				remark: ''
			},
			'九四式爆雷投射機': {
				category: '爆雷',
				remodelDetail: [{
					assistant: '-',
					enableDays: [3, 4]
				}],
				remark: '爆雷'
			},
			'三式爆雷投射機': {
				category: '',
				remodelDetail: [{
					assistant: '',
					enableDays: [3, 4]
				}],
				remark: ''
			},

			search: function(equipName) {
				return this[equipName];
			},

			searchToday : function() {

			}
		}
	}
};

//将装备类型, 与DOM属性class相关联起来
var map_equipCategory_class = {

	category: {
		'小口径主砲': 'main-cannon-light',
		'中口径主砲': 'main-cannon-medium',
		'大口径主砲': 'main-cannon-heavy',
		'高角砲': 'high-angle-gun',
		'対空機銃': 'anti-air-gun',
		'高射装置': 'anti-air-fire-director',
		'魚雷': 'torpedo',
		'爆雷': 'anit-sub-weapon',
		'聲納': 'soner',
	},

	searchClass: function(equipName) {
		return this.category[equipName];
	},

	searchCategory: function(classString) {

		var category = this.category;

		for (var propertyName in category) {
			if (category[propertyName] === classString) {
				return propertyName;
			} //如果全部没有找到
		}

		throw '无法找到class对应的装备类型';
	}
};

var equips = kanColle.remodel.equips;

//通过该方法, 返回一个
var item_template = function() {

	var CLASS_HANDLE = 'drag-handle';
	var CLASS_EQUIP_ICON = 'equip-icon';
	var CLASS_EQUIP_NAME = 'equip-name';

	var list_item,
		container,
		handle,
		equipIcon,
		equipName;

	//需要设置class, 有且仅有CLASS_HANDLE
	handle = document.createElement('span');
	handle.classList.add(CLASS_HANDLE);

	//需要设置class, 总共两个, 仅需设置CLASS_EQUIP_ICON, 另一个为该元素固有clss, 可通过输入对象来实现class的填充
	equipIcon = document.createElement('span');
	equipIcon.classList.add(CLASS_EQUIP_ICON);

	//需要设置class, 有切仅有CLASS_EQUIP_NAME
	equipName = document.createElement('span');
	equipName.classList.add(CLASS_EQUIP_NAME);

	//用于存放handle, equipIcon, equipName
	container = document.createElement('div');
	//TODO 引用对象之后, 将对象之中的属性填充到其中
	//container.textContent = 'inputTextHere'

	list_item = document.createElement('li');
};