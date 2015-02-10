var kanColle = {
	remodel: {
		equips: {
			'12.7cm連装砲': {
				id: 1,
				name: '12.7cm連装砲',
				category: '小口径主砲',
				detail: [{
					assistant: '-',
					enableDays: [0, 1, 2, 3, 4, 5, 6]
				}],
				remark: ''
			},
			'12.7cm連装砲B型改二': {
				id: 2,
				name: '12.7cm連装砲B型改二',
				category: '小口径主砲',
				detail: [{
					assistant: '夕立改二<br>绫波改二',
					enableDays: [1, 2, 3]
				}],
				remark: ''
			},
			'25mm連装機銃': {
				id: 3,
				name: '25mm連装機銃',
				category: '対空機銃',
				detail: [{
					assistant: '五十鈴改二',
					enableDays: [0, 5, 6]
				}],
				remark: ''
			},
			'25mm三連装機銃': {
				id: 4,
				name: '25mm三連装機銃',
				category: '対空機銃',
				detail: [{
					assistant: '五十鈴改二',
					enableDays: [1, 2, 3]
				}, {
					assistant: '摩耶',
					enableDays: [2, 3, 4]
				}],
			},
			'91式高射装置': {
				id: 5,
				name: '91式高射装置',
				category: '高射装置',
				detail: [{
					assistant: '摩耶<br>秋月',
					enableDays: [0, 1, 5, 6]
				}],
				remark: '消費装備:12.7cm連装高角砲<br>更新消費:10cm連装高角砲'
			},
			'94式高射装置': {
				id: 6,
				name: '94式高射装置',
				category: '高射装置',
				detail: [{
					assistant: '秋月',
					enableDays: [0, 1, 2, 3, 4, 5, 6]
				}],
				remark: '消費装備:10cm連装高角砲'
			},
			'14cm単装砲': {
				id: 7,
				name: '14cm単装砲',
				category: '中口径主砲',
				detail: [{
					assistant: '-',
					enableDays: [0, 1, 2, 3, 4, 5, 6]
				}],
				remark: ''
			},
			'14cm連装砲': {
				id: 8,
				name: '14cm連装砲',
				category: '中口径主砲',
				detail: [{
					assistant: '夕張',
					enableDays: [1, 4]
				}],
				remark: ''
			},
			'20.3cm連装砲': {
				id: 9,
				name: '20.3cm連装砲',
				category: '中口径主砲',
				detail: [{
					assistant: '青葉, 衣笠',
					enableDays: [0, 1, 2, 3, 4, 5, 6]
				}],
				remark: ''
			},
			'20.3cm(2号)連装砲': {
				id: 10,
				name: '20.3cm(2号)連装砲',
				category: '中口径主砲',
				detail: [{
					assistant: '妙高',
					enableDays: [0, 1, 2]
				}],
				remark: ''
			},
			'20.3cm(3号)連装砲': {
				id: 11,
				name: '20.3cm(3号)連装砲',
				category: '中口径主砲',
				detail: [{
					assistant: '三隈',
					enableDays: [2, 3]
				}],
				remark: ''
			},
			'10cm高角砲＋高射装置': {
				id: 12,
				name: '10cm高角砲＋高射装置',
				category: '高角砲',
				detail: [{
					assistant: '秋月',
					enableDays: [1, 2, 3, 4]
				}],
				remark: '消費装備:10cm連装高角砲'
			},
			'35.6cm連装砲': {
				id: 13,
				name: '35.6cm連装砲',
				category: '大口径主砲',
				detail: [{
					assistant: '扶桑',
					enableDays: [0, 5, 6]
				}],
				remark: ''
			},
			'41cm連装砲': {
				id: 14,
				name: '41cm連装砲',
				category: '大口径主砲',
				detail: [{
					assistant: '長門',
					enableDays: [2, 5, 6]
				}, {
					assistant: '陸奥',
					enableDays: [0, 1, 4]
				}],
				remark: '初期の改修から消費装備が必要'
			},
			'61cm四連装魚雷': {
				id: 15,
				name: '61cm四連装魚雷',
				category: '魚雷',
				detail: [{
					assistant: '-',
					enableDays: [0, 1, 2, 5, 6]
				}],
				remark: ''
			},
			'61cm四連装(酸素)魚雷': {
				id: 16,
				name: '61cm四連装(酸素)魚雷',
				category: '魚雷',
				detail: [{
					assistant: '北上<br>大井',
					enableDays: [0, 1, 2, 3, 4, 5, 6]
				}],
				remark: ''
			},
			'61cm五連装(酸素)魚雷': {
				id: 17,
				name: '61cm五連装(酸素)魚雷',
				category: '魚雷',
				detail: [{
					assistant: '島風',
					enableDays: [3, 4]
				}],
				remark: ''
			},
			'九四式爆雷投射機': {
				id: 18,
				name: '九四式爆雷投射機',
				category: '爆雷',
				detail: [{
					assistant: '-',
					enableDays: [3, 4]
				}],
				remark: ''
			},
			'三式爆雷投射機': {
				id: 19,
				name: '三式爆雷投射機',
				category: '爆雷',
				detail: [{
					assistant: '-',
					enableDays: [3, 4]
				}],
				remark: ''
			}
		},

		extractEquip: function(equipName) {
			var equip = this.equips[equipName];

			if(equip === undefined) {
				return { name : '未能寻找到该装备名称'};
			}

			equip.clazz = this.map_category_class.searchClass(equip.category);

			return equip;
		},

		extractCategoryEquips: function(categoryName) {
			var equipNames = [];

			var equip, category;
			for(var index in this.equips) {

				equip = this.equips[index];
				category = equip.category;

				if(category === categoryName) {
					equipNames.push(equip.name);
				}
			}

			return equipNames;
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

			searchClass: function(category) {

				var clazz = this.map[category];

				//如果输入了一个不正确的装备名称
				if (clazz === undefined) {
					throw 'in "map_category_class" : class is NOT found.';
				}

				return clazz;
			},

			searchCategory: function(classString) {

				var map = this.map;

				for (var key in map) {
					if (map[key] === classString) {
						return key;
					} //如果全部没有找到
				}

				throw '无法找到class对应的装备类型';
			}
		}
	}
};