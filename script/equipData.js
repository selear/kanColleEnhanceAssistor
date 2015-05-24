var kanColle = {
	remodel: {
		categoryNameList: ['小口径主砲/副砲', '中口径主砲', '大口径主砲', '魚雷', '反潛裝備', '特種裝備'],
		defaultSelected: ['20.3cm(2号)連装砲', '20.3cm(3号)連装砲', '41cm連装砲', '46cm三連装砲', '61cm五連装(酸素)魚雷', '九一式徹甲弾'],

		/*
		 *  访问路径: kanColle.remodel.extractEquip(equipName)
		 *  返回数据: 一个数据对象
		 *
		 *  返回数据对象sample:
			{
				name: '三式爆雷投射機',
				icon: '爆雷',
				category: '爆雷',
				detail: [{
					assistant: '-',
					enableDays: [3, 4]
				}],
				remark: ''
			}
		 */
		//函数名使用extract，主要考虑到返回的是装备对象。
		extractEquip: function(equipName) {
			var equip = this.equips[equipName];

			if (equip === undefined) {
				return {
					name: '未能寻找到该装备名称'
				};
			}

			equip.clazz = this.map_icon_class.searchClass(equip.icon);

			return equip;
		},

		/*
		 *	访问路径: kanColle.remodel.extractCategoryEquipnames(categoryName)
		 *  返回数据: 包含装备名称的数组
		 */
		//函数名称使用search开头，主要是考虑到返回数组仅包含'string'，而非'object'
		searchEquipnamesByCategory: function(categoryName) {
			var equipnames = [];

			var equip, category;
			for (var index in this.equips) {

				equip = this.equips[index];
				category = equip.category;

				if (category === categoryName) {
					equipnames.push(equip.name);
				}
			}
			return equipnames;
		},

		searchCategoryIconClazzByName: function(categoryName) {
			return this.map_icon_class.searchClass(categoryName);
		},

		calcCategorySize: function(categoryName) {

			var equipnames = this.searchEquipnamesByCategory(categoryName);
			return equipnames.length;
		},

		calcDefaultSts: function() {

			var defaultIndex, i, defaultCheckedSts;
			defaultIndex = 0;
			defaultCheckedSts = '';

			var names = Object.keys(this.equips);

			for (i in names) {

				var name = names[i];
				if (name === this.defaultSelected[defaultIndex]) {
					defaultCheckedSts += 1;
					defaultIndex++;
				} else {
					defaultCheckedSts += 0;
				}
			}
			return defaultCheckedSts;
		},

		map_icon_class: {

			map: {
				'小口径主砲': 'main-cannon-light',
				'小口径主砲/副砲' : 'main-cannon-light',
				'中口径主砲': 'main-cannon-medium',
				'大口径主砲': 'main-cannon-heavy',
				'高角砲': 'high-angle-gun',
				'副砲' : 'secondary-canon',
				'対空機銃': 'anti-air-gun',
				'高射装置': 'anti-air-fire-director',
				'魚雷': 'torpedo',
				'爆雷': 'anti-sub-weapon',
				'聲呐': 'soner',
				'反潛裝備': 'anti-sub-weapon',
				'特種裝備': 'armour-piercing-shell',
				'対艦強化弾': 'armour-piercing-shell',
			},

			searchClass: function(category) {

				var clazz = this.map[category];

				//如果输入了一个不正确的装备名称
				if (clazz === undefined) {
					throw 'in "map_icon_class" : ' + category + ' is NOT found.';
				}

				return clazz;
			},

			searchCategory: function(classStr) {

				var map = this.map;

				for (var key in map) {
					if (map[key] === classStr) {
						return key;
					} //如果全部没有找到
				}

				throw '无法找到class对应的装备类型';
			}
		}
	}
};

kanColle.remodel.equips = {};

/* 小口径主砲/副砲 */
kanColle.remodel.equips['12.7cm連装砲'] = {
	name: '12.7cm連装砲',
	icon: '小口径主砲',
	category: '小口径主砲/副砲',
	detail: [{
		assistant: '-',
		enableDays: [0, 1, 2, 3, 4, 5, 6]
	}],
	remark: ''
};

kanColle.remodel.equips['12.7cm連装砲B型改二'] = {
	name: '12.7cm連装砲B型改二',
	icon: '小口径主砲',
	category: '小口径主砲/副砲',
	detail: [{
		assistant: '夕立改二, 绫波改二',
		enableDays: [1, 2, 3]
	}],
	remark: ''
};

kanColle.remodel.equips['10cm高角砲+高射装置'] = {
	name: '10cm高角砲+高射装置',
	icon: '高角砲',
	category: '小口径主砲/副砲',
	detail: [{
		assistant: '秋月',
		enableDays: [1, 2, 3, 4]
	}],
	remark: '消費装備:10cm連装高角砲'
};

kanColle.remodel.equips['90mm単装高角砲'] = {
	name: '90mm単装高角砲',
	icon: '高角砲',
	category: '小口径主砲/副砲',
	detail: [{
		assistant: 'Littorio',
		enableDays: [1, 2, 3, 4]
	}, {
		assistant: 'Roma',
		enableDays: [0, 4, 5, 6]
	}],
	remark: '初期の改修から消費装備が必要\n消費装備:10cm連装高角砲'
};

kanColle.remodel.equips['15.2cm単装砲'] = {
	name: '15.2cm単装砲',
	icon: '副砲',
	category: '小口径主砲/副砲',
	detail: [{
		assistant: '阿賀野',
		enableDays: [0, 1, 2]
	}, {
		assistant: '金剛',
		enableDays: [0, 1, 6]
	}, {
		assistant: '山城',
		enableDays: [1, 2, 3]
	}],
	remark: ''
};

kanColle.remodel.equips['OTO 152mm三連装速射砲'] = {
	name: 'OTO 152mm三連装速射砲',
	icon: '副砲',
	category: '小口径主砲/副砲',
	detail: [{
		assistant: 'Littorio',
		enableDays: [0, 2, 3, 6]
	}, {
		assistant: 'Roma',
		enableDays: [0, 1, 4, 5]
	}],
	remark: '消費装備:15.5cm三連装砲'
};

/* 中口径主砲 */
kanColle.remodel.equips['14cm単装砲'] = {
	name: '14cm単装砲',
	icon: '中口径主砲',
	category: '中口径主砲',
	detail: [{
		assistant: '-',
		enableDays: [0, 1, 2, 3, 4, 5, 6]
	}],
	remark: ''
};

kanColle.remodel.equips['14cm連装砲'] = {
	name: '14cm連装砲',
	icon: '中口径主砲',
	category: '中口径主砲',
	detail: [{
		assistant: '夕張',
		enableDays: [1, 4]
	}],
	remark: ''
};

kanColle.remodel.equips['15.5cm三連装砲'] = {
	name: '15.5cm三連装砲',
	icon: '中口径主砲',
	category: '中口径主砲',
	detail: [{
		assistant: '最上',
		enableDays: [5, 6]
	}, {
		assistant: '大淀',
		enableDays: [0, 1]
	}],
	remark: ''
};

kanColle.remodel.equips['20.3cm連装砲'] = {
	name: '20.3cm連装砲',
	icon: '中口径主砲',
	category: '中口径主砲',
	detail: [{
		assistant: '青葉, 衣笠',
		enableDays: [0, 1, 2, 3, 4, 5, 6]
	}],
	remark: ''
};

kanColle.remodel.equips['20.3cm(2号)連装砲'] = {
	name: '20.3cm(2号)連装砲',
	icon: '中口径主砲',
	category: '中口径主砲',
	detail: [{
		assistant: '妙高',
		enableDays: [0, 1, 2]
	}],
	remark: ''
};

kanColle.remodel.equips['20.3cm(3号)連装砲'] = {
	name: '20.3cm(3号)連装砲',
	icon: '中口径主砲',
	category: '中口径主砲',
	detail: [{
		assistant: '三隈',
		enableDays: [2, 3]
	}],
	remark: ''
};

/* 大口径主砲 */
kanColle.remodel.equips['35.6cm連装砲'] = {
	name: '35.6cm連装砲',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [{
		assistant: '扶桑',
		enableDays: [0, 5, 6]
	}],
	remark: ''
};

kanColle.remodel.equips['38cm連装砲'] = {
	name: '38cm連装砲',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [{
		assistant: 'Bismarck',
		enableDays: [4, 5, 6]
	}],
	remark: '初期の改修から消費装備が必要\n消費装備:35.6cm連装砲\n更新消費:41cm連装砲'
};

kanColle.remodel.equips['38cm連装砲改'] = {
	name: '38cm連装砲改',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [{
		assistant: 'Bismarck',
		enableDays: [0, 1, 2]
	}],
	remark: '初期の改修から消費装備が必要\n消費装備:41cm連装砲'
};

kanColle.remodel.equips['381mm/50 三連装砲'] = {
	name: '381mm/50 三連装砲',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [{
		assistant: 'Littorio',
		enableDays: [2, 3, 4, 5]
	}, {
		assistant: 'Roma',
		enableDays: [0, 1, 6]
	}],
	remark: '初期の改修から消費装備が必要\n消費装備:35.6cm連装砲\n更新消費:25mm連装機銃'
}

kanColle.remodel.equips['381mm/50 三連装砲改'] = {
	name: '381mm/50 三連装砲改',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [{
		assistant: 'Littorio',
		enableDays: [0, 1, 6]
	}, {
		assistant: 'Roma',
		enableDays: [2, 3, 4, 5]
	}],
	remark: '初期の改修から消費装備が必要\n消費装備:41cm連装砲'
}

kanColle.remodel.equips['41cm連装砲'] = {
	name: '41cm連装砲',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [{
		assistant: '長門',
		enableDays: [2, 5, 6]
	}, {
		assistant: '陸奥',
		enableDays: [0, 1, 4]
	}],
	remark: '初期の改修から消費装備が必要'
};

kanColle.remodel.equips['試製46cm連装砲'] = {
	name: '試製46cm連装砲',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [{
		assistant: '大和',
		enableDays: [0, 1]
	}, {
		assistant: '武蔵',
		enableDays: [2, 3]
	}],
	remark: '初期の改修から消費装備が必要\n消費装備:41cm連装砲\n更新消費:41cm連装砲'
};

kanColle.remodel.equips['46cm三連装砲'] = {
	name: '46cm三連装砲',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [{
		assistant: '大和',
		enableDays: [5, 6]
	}, {
		assistant: '武蔵',
		enableDays: [0, 1]
	}],
	remark: '初期の改修から消費装備が必要'
};

kanColle.remodel.equips['試製51cm連装砲'] = {
	name: '試製51cm連装砲',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [{
		assistant: '大和改',
		enableDays: [1, 2]
	}, {
		assistant: '武蔵改',
		enableDays: [1, 3]
	}],
	remark: '初期の改修から消費装備が必要\n消費装備:46cm三連装砲'
};

/* 魚雷 */
kanColle.remodel.equips['61cm三連装魚雷'] = {
	name: '61cm三連装魚雷',
	icon: '魚雷',
	category: '魚雷',
	detail: [{
		assistant: '吹雪',
		enableDays: [4, 5, 6]
	}, {
		assistant: '叢雲',
		enableDays: [0, 1, 2]
	}],
	remark: ''
};

kanColle.remodel.equips['61cm三連装(酸素)魚雷'] = {
	name: '61cm三連装(酸素)魚雷',
	icon: '魚雷',
	category: '魚雷',
	detail: [{
		assistant: '吹雪改二',
		enableDays: [4, 5, 6]
	}],
	remark: '消費装備:61cm三連装魚雷\n更新装備:61cm四連装魚雷'
};

kanColle.remodel.equips['61cm四連装魚雷'] = {
	name: '61cm四連装魚雷',
	icon: '魚雷',
	category: '魚雷',
	detail: [{
		assistant: '-',
		enableDays: [0, 1, 2, 5, 6]
	}],
	remark: ''
};

kanColle.remodel.equips['61cm四連装(酸素)魚雷'] = {
	name: '61cm四連装(酸素)魚雷',
	icon: '魚雷',
	category: '魚雷',
	detail: [{
		assistant: '北上, 大井',
		enableDays: [0, 1, 2, 3, 4, 5, 6]
	}],
	remark: ''
};

kanColle.remodel.equips['61cm五連装(酸素)魚雷'] = {
	name: '61cm五連装(酸素)魚雷',
	icon: '魚雷',
	category: '魚雷',
	detail: [{
		assistant: '島風',
		enableDays: [3, 4]
	}],
	remark: ''
};

/* 聲呐 */
kanColle.remodel.equips['九四式爆雷投射機'] = {
	name: '九四式爆雷投射機',
	icon: '爆雷',
	category: '反潛裝備',
	detail: [{
		assistant: '-',
		enableDays: [3, 4]
	}],
	remark: ''
};

kanColle.remodel.equips['三式爆雷投射機'] = {
	name: '三式爆雷投射機',
	icon: '爆雷',
	category: '反潛裝備',
	detail: [{
		assistant: '-',
		enableDays: [3, 4]
	}],
	remark: ''
};

kanColle.remodel.equips['九三式水中聴音機'] = {
	name: '九三式水中聴音機',
	icon: '聲呐',
	category: '反潛裝備',
	detail: [{
		assistant: '夕張',
		enableDays: [0, 5, 6]
	}, {
		assistant: '五十鈴改二',
		enableDays: [1, 5, 6]
	}],
	remark: ''
};

kanColle.remodel.equips['三式水中探信儀'] = {
	name: '三式水中探信儀',
	icon: '聲呐',
	category: '反潛裝備',
	detail: [{
		assistant: '夕張',
		enableDays: [2, 3]
	}, {
		assistant: '五十鈴改二',
		enableDays: [0, 2, 3]
	}],
	remark: ''
};

/* 特種裝備 */
kanColle.remodel.equips['九一式徹甲弾'] = {
	name: '九一式徹甲弾',
	icon: '対艦強化弾',
	category: '特種裝備',
	detail: [{
		assistant: '比叡',
		enableDays: [3, 4, 5, 6]
	}, {
		assistant: '霧島',
		enableDays: [0, 1, 5, 6]
	}],
	remark: ''
};

kanColle.remodel.equips['一式徹甲弾'] = {
	name: '一式徹甲弾',
	icon: '対艦強化弾',
	category: '特種裝備',
	detail: [{
		assistant: '金剛',
		enableDays: [0, 5, 6]
	}, {
		assistant: '榛名',
		enableDays: [1, 2, 3]
	}],
	remark: '初期の改修から消費装備が必要\n消費装備(初期～★5):九一式徹甲弾\n消費装備;(★6 ～★9):一式徹甲弾'
};

kanColle.remodel.equips['91式高射装置'] = {
	name: '91式高射装置',
	icon: '高射装置',
	category: '特種裝備',
	detail: [{
		assistant: '摩耶, 秋月',
		enableDays: [0, 1, 5, 6]
	}],
	remark: '消費装備:12.7cm連装高角砲\n更新消費:10cm連装高角砲'
};

kanColle.remodel.equips['94式高射装置'] = {
	name: '94式高射装置',
	icon: '高射装置',
	category: '特種裝備',
	detail: [{
		assistant: '秋月',
		enableDays: [0, 1, 2, 3, 4, 5, 6]
	}, {
		assistant: '吹雪改二',
		enableDays: [0, 4, 5, 6]
	}, {
		assistant: '摩耶改二',
		enableDays: [0, 4, 5, 6]
	}],
	remark: '消費装備:10cm連装高角砲'
};

kanColle.remodel.equips['25mm連装機銃'] = {
	name: '25mm連装機銃',
	icon: '対空機銃',
	category: '特種裝備',
	detail: [{
		assistant: '五十鈴改二',
		enableDays: [0, 5, 6]
	}],
	remark: ''
};

kanColle.remodel.equips['25mm三連装機銃'] = {
	name: '25mm三連装機銃',
	icon: '対空機銃',
	category: '特種裝備',
	detail: [{
		assistant: '五十鈴改二',
		enableDays: [1, 2, 3]
	}, {
		assistant: '摩耶/摩耶改',
		enableDays: [2, 3, 4]
	}, {
		assistant: '摩耶改二',
		enableDays: [0, 1, 5, 6]
	}],
};