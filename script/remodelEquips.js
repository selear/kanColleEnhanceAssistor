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
					assistant: '-',
					enableDays: [3, 4]
				}],
				remark: ''
			}
		},

		extractEquip: function(equipName) {
			var equip = this.equips[equipName];
			equip.name = equipName;
			equip.clazz = this.map_category_class.extractClass(equip.category);
			console.log(equip.name);
			console.log(equip.clazz);

			return equip;
		},

		map_category_class: {

			map: {
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

			extractClass: function(category) {

				var clazz = this.map[category];

				//如果输入了一个不正确的装备名称
				if (clazz === undefined) {
					throw 'in "map_category_class" : class is NOT found.';
				}

				return clazz;
			},

			extractCategory: function(classString) {

				var map = this.map;

				for (var key in map) {
					if (map[key] === classString) {
						return key;
					} //如果全部没有找到
				}

				throw '无法找到class对应的装备类型';
			}
		},
	}
};

var equips = kanColle.remodel.equips; //TODO 正式运行删除
var remodel = kanColle.remodel; //TODO 正式运行删除

//通过该方法, 返回一个
var equip_template = function() {

	/*	equip_template sample in [HTML]
		<li>
			<div>
				<span class="drag-handle">☰</span>
				<span class="equip-icon anit-sub-weapon"></span>
				<span class="equip-name">暴雷</span>
			</div>
		</li>
	*/

	var CLASS_HANDLE = 'drag-handle';
	var CLASS_EQUIP_ICON = 'equip-icon';
	var CLASS_EQUIP_NAME = 'equip-name';

	var list_item,
		container,
		handle,
		equipIcon,
		equipName;

	//有两个需要设置的属性:
	//1. 固有class
	//2. 设置方便拖拽的符号文字
	handle = document.createElement('span');
	handle.classList.add(CLASS_HANDLE);
	handle.textContent = '☰';

	//两个需要设置的属性:
	//1. 固有class
	//2. 设置另外一个装备相关的class, 需要从对象之中获取
	equipIcon = document.createElement('span');
	equipIcon.classList.add(CLASS_EQUIP_ICON);
	//TODO equipIcon.classList.add(Object.class)

	//两个需要设置的属性:
	//1. 固有class
	//2. 从传送的对象之中获取的装备名称
	equipName = document.createElement('span');
	equipName.classList.add(CLASS_EQUIP_NAME);
	equipName.textContent = 'test sample';

	//按照顺序存放handle, equipIcon, equipName
	container = document.createElement('div');
	container.appendChild(handle);
	container.appendChild(equipIcon);
	container.appendChild(equipName);

	list_item = document.createElement('li');
	list_item.appendChild(container);

	return list_item;
};

/*
	try to code in 'literal' format
 */
var test_equip_template = function(equipObj) {

	/*	equip_template sample in [HTML]
		<li>
			<div>
				<span class="drag-handle">☰</span>
				<span class="equip-icon anit-sub-weapon"></span>
				<span class="equip-name">暴雷</span>
			</div>
		</li>
	*/
	var CLASS_HANDLE = 'drag-handle';
	var CLASS_EQUIP_ICON = 'equip-icon';
	var CLASS_EQUIP_NAME = 'equip-name';

	//有两个需要设置的属性:
	//1. 固有class
	//2. 设置方便拖拽的符号文字

	var createHandle = function() {
		var elem = document.createElement('span');
		elem.classList.add(CLASS_HANDLE);
		elem.textContent = '☰';
		return elem;
	};

	//两个需要设置的属性:
	//1. 固有class
	//2. 设置另外一个装备相关的class, 需要从对象之中获取
	var createEquipIcon = function(equipObj) {
		var elem = document.createElement('span');
		elem.classList.add(CLASS_EQUIP_ICON);
		elem.classList.add(equipObj.clazz);

		return elem;
	};


	//两个需要设置的属性:
	//1. 固有class
	//2. 从传送的对象之中获取的装备名称
	var createEquipName = function(equipObj) {
		var elem = document.createElement('span');
		elem.classList.add(CLASS_EQUIP_NAME);
		elem.textContent = equipObj.name;

		return elem;
	};

	//按照顺序存放handle, equipIcon, equipName
	var createContainer = function(equipObj) {
		var elem = document.createElement('div');
		elem.appendChild(createHandle());
		elem.appendChild(createEquipIcon(equipObj));
		elem.appendChild(createEquipName(equipObj));

		return elem;
	};

	var createListItem = function(equipObj) {
		var elem = document.createElement('li');
		elem.appendChild(createContainer(equipObj));

		return elem;
	};

	return createListItem(equipObj);
};