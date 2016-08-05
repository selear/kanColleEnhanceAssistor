var kanColle = {
	remodel: {
		categoryNameList: ['小口径主砲/副砲', '中口径主砲', '大口径主砲', '魚雷', '反潛裝備', '特種裝備', '電探', '艦載機'],
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
				'小口径主砲/副砲': 'main-cannon-light',
				'中口径主砲': 'main-cannon-medium',
				'大口径主砲': 'main-cannon-heavy',
				'高角砲': 'high-angle-gun',
				'副砲': 'secondary-canon',
				'対空機銃': 'anti-air-gun',
				'高射装置': 'anti-air-fire-director',
				'魚雷': 'torpedo',
				'爆雷': 'anti-sub-weapon',
				'聲呐': 'soner',
				'反潛裝備': 'anti-sub-weapon',
				'特種裝備': 'armour-piercing-shell',
				'対艦強化弾': 'armour-piercing-shell',
				'電探': 'rader',
				'探照灯': 'search-light',
				'水上偵察機' : 'recon-sea-plane',
				'大発動艇' : 'landing-craft',
				'艦載機' : 'carrier-fighter',
				'艦上戦闘機' : 'carrier-fighter',
				'艦上爆撃機' : 'carrier-dive-bomber'
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

var equips = kanColle.remodel.equips

/* 小口径主砲/副砲 */
equips['12.7cm連装砲'] = {
	name: '12.7cm連装砲',
	icon: '小口径主砲',
	category: '小口径主砲/副砲',
	detail: [
		{assistant: '-', enableDays: [0, 1, 2, 3, 4, 5, 6]}
	],
	remark: ''
};

equips['12.7cm連装砲B型改二'] = {
	name: '12.7cm連装砲B型改二',
	icon: '小口径主砲',
	category: '小口径主砲/副砲',
	detail: [
		{assistant: '夕立改二, 绫波改二', enableDays: [1, 2, 3]}
	],
	remark: ''
};

equips['10cm高角砲+高射装置'] = {
	name: '10cm高角砲+高射装置',
	icon: '高角砲',
	category: '小口径主砲/副砲',
	detail: [
		{assistant: '秋月', enableDays: [1, 2, 3, 4]}
	],
	remark: '消費装備:10cm連装高角砲'
};

equips['90mm単装高角砲'] = {
	name: '90mm単装高角砲',
	icon: '高角砲',
	category: '小口径主砲/副砲',
	detail: [
		{assistant: 'Littorio', enableDays: [1, 2, 3, 4]},
		{assistant: 'Roma',	enableDays: [0, 4, 5, 6]}
	],
	remark: '消費：10cm連装高角砲'
};

equips['15.2cm単装砲'] = {
	name: '15.2cm単装砲',
	icon: '副砲',
	category: '小口径主砲/副砲',
	detail: [
		{assistant: '阿賀野', enableDays: [0, 1, 2]},
		{assistant: '金剛', enableDays: [0, 1, 6]},
		{assistant: '山城', enableDays: [1, 2, 3]}
	],
	remark: ''
};

equips['OTO 152mm三連装速射砲'] = {
	name: 'OTO 152mm三連装速射砲',
	icon: '副砲',
	category: '小口径主砲/副砲',
	detail: [
		{assistant: 'Littorio', enableDays: [0, 2, 3, 6]},
		{assistant: 'Roma', enableDays: [0, 1, 4, 5]}
	],
	remark: '消費装備:15.5cm三連装砲'
};

/* 中口径主砲 */
equips['14cm単装砲'] = {
	name: '14cm単装砲',
	icon: '中口径主砲',
	category: '中口径主砲',
	detail: [
		{assistant: '-', enableDays: [0, 1, 2, 3, 4, 5, 6]}
	],
	remark: ''
};

equips['14cm連装砲'] = {
	name: '14cm連装砲',
	icon: '中口径主砲',
	category: '中口径主砲',
	detail: [
		{assistant: '夕張', enableDays: [1, 4]}
	],
	remark: ''
};

equips['15.2cm連装砲'] = {
	name: '15.2cm連装砲',
	icon: '中口径主砲',
	category: '中口径主砲',
	detail: [
		{assistant: '阿賀野', enableDays: [4, 5, 6]},
		{assistant: '能代', enableDays: [0, 1, 5, 6]},
		{assistant: '矢矧', enableDays: [1, 2, 3, 4]}
	],
	remark: '更新:22号対水上電探'
};

equips['15.2cm連装砲改'] = {
	name: '15.2cm連装砲改',
	icon: '中口径主砲',
	category: '中口径主砲',
	detail: [{
		assistant: '矢矧',
		enableDays: [3, 4, 5, 6]
	}, {
		assistant: '酒匂',
		enableDays: [0, 1, 2, 6]
	}],
	remark: '消費:15.2cm連装砲'
};

equips['15.5cm三連装砲'] = {
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

equips['20.3cm連装砲'] = {
	name: '20.3cm連装砲',
	icon: '中口径主砲',
	category: '中口径主砲',
	detail: [{
		assistant: '青葉, 衣笠',
		enableDays: [0, 1, 2, 3, 4, 5, 6]
	}],
	remark: ''
};

equips['20.3cm(2号)連装砲'] = {
	name: '20.3cm(2号)連装砲',
	icon: '中口径主砲',
	category: '中口径主砲',
	detail: [{
		assistant: '妙高',
		enableDays: [0, 1, 2]
	}],
	remark: ''
};

equips['20.3cm(3号)連装砲'] = {
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
equips['35.6cm連装砲'] = {
	name: '35.6cm連装砲',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [
		{assistant: '扶桑', enableDays: [0, 5, 6]}
	],
	remark: '⇒試製35.6cm三連装砲'
};

equips['試製35.6cm三連装砲'] = {
	name: '試製35.6cm三連装砲',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [
		{assistant: '金剛改二', enableDays: [3, 4]},
		{assistant: '榛名改二', enableDays: [4, 5]},
		{assistant: '扶桑改二', enableDays: [3, 4, 5, 6]},
		{assistant: '山城改二', enableDays: [0, 4, 5, 6]}
	],
	remark: '消費：35.6cm連装砲'
};

equips['35.6cm連装砲(ダズル迷彩)'] = {
	name: '35.6cm連装砲(ダズル迷彩)',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [
		{assistant: '榛名改二', enableDays: [0, 1, 2, 3, 6]}
	],
	remark: '消費：35.6cm連装砲'
};

equips['38cm連装砲'] = {
	name: '38cm連装砲',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [
		{assistant: 'Bismarck', enableDays: [4, 5, 6]}
	],
	remark: '初期の改修から消費装備が必要\n消費装備:35.6cm連装砲\n更新消費:41cm連装砲'
};

equips['38cm連装砲改'] = {
	name: '38cm連装砲改',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [
		{assistant: 'Bismarck', enableDays: [0, 1, 2]}
	],
	remark: '初期の改修から消費装備が必要\n消費装備:41cm連装砲'
};

equips['381mm/50 三連装砲'] = {
	name: '381mm/50 三連装砲',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [
		{assistant: 'Littorio', enableDays: [2, 3, 4, 5]},
		{assistant: 'Roma', enableDays: [0, 1, 6]}
	],
	remark: '初期の改修から消費装備が必要\n消費装備:35.6cm連装砲\n更新消費:25mm連装機銃'
}

equips['381mm/50 三連装砲改'] = {
	name: '381mm/50 三連装砲改',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [
		{assistant: 'Littorio', enableDays: [0, 1, 6]},
		{assistant: 'Roma', enableDays: [2, 3, 4, 5]}
	],
	remark: '初期の改修から消費装備が必要\n消費装備:41cm連装砲'
}

equips['41cm連装砲'] = {
	name: '41cm連装砲',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [
		{assistant: '長門', enableDays: [2, 5, 6]},
		{assistant: '陸奥', enableDays: [0, 1, 4]}
	],
	remark: '消費：同装備'
};

equips['試製41cm三連装砲'] = {
	name: '試製41cm三連装砲',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [
		{assistant: '長門改', enableDays: [0, 1, 3, 4]},
		{assistant: '陸奥改', enableDays: [2, 3, 5, 6]}
	],
	remark: '消費：41cm連装砲'
};

equips['試製46cm連装砲'] = {
	name: '試製46cm連装砲',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [
		{assistant: '大和', enableDays: [0, 1]},
		{assistant: '武蔵', enableDays: [2, 3]}
	],
	remark: '初期の改修から消費装備が必要\n消費装備:41cm連装砲\n更新消費:41cm連装砲'
};

equips['46cm三連装砲'] = {
	name: '46cm三連装砲',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [
		{assistant: '大和', enableDays: [5, 6]},
		{assistant: '武蔵', enableDays: [0, 1]}
	],
	remark: '初期の改修から消費装備が必要'
};

equips['試製51cm連装砲'] = {
	name: '試製51cm連装砲',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [
		{assistant: '大和改', enableDays: [1, 2]},
		{assistant: '武蔵改', enableDays: [1, 3]}
	],
	remark: '初期の改修から消費装備が必要\n消費装備:46cm三連装砲'
};

equips['16inch三連装砲 Mk.7'] = {
	name: '16inch三連装砲 Mk.7',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [
		{assistant: 'Iowa', enableDays: [0, 1, 2, 3, 4, 5, 6]},
	],
	remark: '消費(初期～)：41cm連装砲\n消費(★6 ～)：46cm三連装砲\n消費(更新)：32号対水上電探\n⇒16inch三連装砲 Mk.7＋GFCS'
};

equips['16inch三連装砲 Mk.7＋GFCS'] = {
	name: '16inch三連装砲 Mk.7＋GFCS',
	icon: '大口径主砲',
	category: '大口径主砲',
	detail: [
		{assistant: 'Iowa', enableDays: [0, 4, 5, 6]},
	],
	remark: '消費(初期～)：22号対水上電探\n消費(★6 ～)：32号対水上電探'
};

/* 魚雷 */
equips['61cm三連装魚雷'] = {
	name: '61cm三連装魚雷',
	icon: '魚雷',
	category: '魚雷',
	detail: [
		{assistant: '吹雪', enableDays: [4, 5, 6]},
		{assistant: '叢雲', enableDays: [0, 1, 2]}
	],
	remark: ''
};

equips['61cm三連装(酸素)魚雷'] = {
	name: '61cm三連装(酸素)魚雷',
	icon: '魚雷',
	category: '魚雷',
	detail: [
		{assistant: '吹雪改二', enableDays: [4, 5, 6]}
	],
	remark: '消費装備:61cm三連装魚雷\n更新装備:61cm四連装魚雷'
};

equips['61cm四連装魚雷'] = {
	name: '61cm四連装魚雷',
	icon: '魚雷',
	category: '魚雷',
	detail: [
		{assistant: '-', enableDays: [0, 1, 2, 5, 6]}
	],
	remark: ''
};

equips['61cm四連装(酸素)魚雷'] = {
	name: '61cm四連装(酸素)魚雷',
	icon: '魚雷',
	category: '魚雷',
	detail: [
		{assistant: '北上, 大井', enableDays: [0, 1, 2, 3, 4, 5, 6]}
	],
	remark: ''
};

equips['61cm五連装(酸素)魚雷'] = {
	name: '61cm五連装(酸素)魚雷',
	icon: '魚雷',
	category: '魚雷',
	detail: [
		{assistant: '島風', enableDays: [3, 4]}
	],
	remark: ''
};

equips['試製61cm六連装(酸素)魚雷'] = {
	name: '試製61cm六連装(酸素)魚雷',
	icon: '魚雷',
	category: '魚雷',
	detail: [
		{assistant: '初月', enableDays: [3, 4, 5, 6]},
		{assistant: '島風', enableDays: [0, 6]}
	],
	remark: '消費(初期～)：61cm四連装(酸素)魚雷\n消費(★6 ～)：61cm五連装(酸素)魚雷'
};

/* 聲呐 */
equips['九四式爆雷投射機'] = {
	name: '九四式爆雷投射機',
	icon: '爆雷',
	category: '反潛裝備',
	detail: [
		{assistant: '-', enableDays: [3, 4]}
	],
	remark: ''
};

equips['三式爆雷投射機'] = {
	name: '三式爆雷投射機',
	icon: '爆雷',
	category: '反潛裝備',
	detail: [
		{assistant: '五十鈴改二', enableDays: [3, 4]}
	],
	remark: ''
};

equips['九三式水中聴音機 - 三式水中探信儀'] = {
	name: '九三式水中聴音機 - 三式水中探信儀',
	icon: '聲呐',
	category: '反潛裝備',
	detail: [
		{assistant: '夕張',	enableDays: [0, 5, 6]},
		{assistant: '五十鈴改二', enableDays: [1]}
	],
	remark: ''
};

equips['九三式水中聴音機 - 四式水中聴音機'] = {
	name: '九三式水中聴音機 - 四式水中聴音機',
	icon: '聲呐',
	category: '反潛裝備',
	detail: [
		{assistant: '時雨改二', enableDays: [0, 4, 5, 6]},
		{assistant: '五十鈴改二', enableDays: [4, 5]},
		{assistant: '香取改', enableDays: [0, 5, 6]}
	],
	remark: ''
};

equips['三式水中探信儀'] = {
	name: '三式水中探信儀',
	icon: '聲呐',
	category: '反潛裝備',
	detail: [
		{assistant: '夕張', enableDays: [2, 3]},
		{assistant: '五十鈴改二', enableDays: [0, 2, 3]}
	],
	remark: ''
};

equips['四式水中聴音機'] = {
	name: '四式水中聴音機',
	icon: '聲呐',
	category: '反潛裝備',
	detail: [
		{assistant: '五十鈴改二', enableDays: [4, 5, 6]},
		{assistant: '秋月', enableDays: [0]},
		{assistant: '照月', enableDays: [3]},
		{assistant: '香取改', enableDays: [1, 2]}
	],
	remark: ''
};

/* 特種裝備 */
equips['九一式徹甲弾'] = {
	name: '九一式徹甲弾',
	icon: '対艦強化弾',
	category: '特種裝備',
	detail: [
		{assistant: '比叡', enableDays: [3, 4, 5, 6]},
		{assistant: '霧島', enableDays: [0, 1, 5, 6]}
	],
	remark: ''
};

equips['一式徹甲弾'] = {
	name: '一式徹甲弾',
	icon: '対艦強化弾',
	category: '特種裝備',
	detail: [
		{assistant: '金剛', enableDays: [0, 5, 6]},
		{assistant: '榛名', enableDays: [1, 2, 3]}
	],
	remark: '初期の改修から消費装備が必要\n消費装備(初期～★5):九一式徹甲弾\n消費装備;(★6 ～★9):一式徹甲弾'
};

equips['91式高射装置'] = {
	name: '91式高射装置',
	icon: '高射装置',
	category: '特種裝備',
	detail: [
		{assistant: '摩耶, 秋月', enableDays: [0, 1, 5, 6]}
	],
	remark: '消費装備:12.7cm連装高角砲\n更新消費:10cm連装高角砲'
};

equips['94式高射装置'] = {
	name: '94式高射装置',
	icon: '高射装置',
	category: '特種裝備',
	detail: [
		{assistant: '秋月', enableDays: [0, 1, 2, 3, 4, 5, 6]},
		{assistant: '吹雪改二', enableDays: [0, 4, 5, 6]},
		{assistant: '摩耶改二', enableDays: [0, 4, 5, 6]}
	],
	remark: '消費装備:10cm連装高角砲'
};

equips['25mm单装機銃'] = {
	name: '25mm单装機銃',
	icon: '対空機銃',
	category: '特種裝備',
	detail: [
		{assistant: '皋月/皋月改/皋月改二', enableDays: [0, 1, 5, 6]},
		{assistant: '文月/文月改', enableDays: [3, 4, 5, 6]}
	],
	remark: ''
};

equips['25mm連装機銃'] = {
	name: '25mm連装機銃',
	icon: '対空機銃',
	category: '特種裝備',
	detail: [
		{assistant: '五十鈴改二', enableDays: [0, 5, 6]}
	],
	remark: ''
};

equips['25mm三連装機銃'] = {
	name: '25mm三連装機銃',
	icon: '対空機銃',
	category: '特種裝備',
	detail: [
		{assistant: '五十鈴改二', enableDays: [1, 2, 3]},
		{assistant: '摩耶/摩耶改', enableDays: [2, 3, 4]},
		{assistant: '摩耶改二', enableDays: [0, 1, 5, 6]}
	],
	remark: ''
};

equips['探照灯'] = {
	name: '探照灯',
	icon: '探照灯',
	category: '特種裝備',
	detail: [
		{assistant: '暁', enableDays: [4, 5, 6]},
		{assistant: '神通', enableDays: [0, 5, 6]},
		{assistant: '青葉, 綾波', enableDays: [1, 2, 3]}
	],
	remark: '更新:熟練見張員'
};

equips['96式150cm探照灯'] = {
	name: '96式150cm探照灯',
	icon: '探照灯',
	category: '特種裝備',
	detail: [
		{assistant: '比叡', enableDays: [0, 1, 5, 6]},
		{assistant: '霧島', enableDays: [2, 3, 4, 5]}
	],
	remark: ''
};

equips['13号対空電探'] = {
	name: '13号対空電探',
	icon: '電探',
	category: '電探',
	detail: [
		{assistant: '時雨改二', enableDays: [0, 4, 5, 6]},
		{assistant: '五十鈴改二', enableDays: [0, 1, 5, 6]},
		{assistant: '秋月', enableDays: [2, 3, 4]}
	],
	remark: ''
};

equips['13号対空電探改'] = {
	name: '13号対空電探改',
	icon: '電探',
	category: '電探',
	detail: [
		{assistant: '磯風改', enableDays: [4, 5, 6]},
		{assistant: '初霜改二', enableDays: [0, 5, 6]},
		{assistant: '雪風', enableDays: [0, 1, 2, 3]}
	],
	remark: '消費:13号対空電探'
};

equips['21号対空電探'] = {
	name: '21号対空電探',
	icon: '電探',
	category: '電探',
	detail: [
		{assistant: '伊勢', enableDays: [0, 1, 5, 6]},
		{assistant: '日向', enableDays: [3, 4, 5, 6]}
	],
	remark: ''
};

equips['21号対空電探改'] = {
	name: '21号対空電探改',
	icon: '電探',
	category: '電探',
	detail: [
		{assistant: '大和', enableDays: [0, 4, 5, 6]},
		{assistant: '武蔵', enableDays: [2, 3, 4, 5]}
	],
	remark: '消費:21号対空電探'
};

equips['22号対水上電探'] = {
	name: '22号対水上電探',
	icon: '電探',
	category: '電探',
	detail: [
		{assistant: '日向', enableDays: [0, 1, 5, 6]},
		{assistant: '夕雲', enableDays: [1, 2, 5, 6]},
		{assistant: '島風', enableDays: [3, 4, 5, 6]}
	],
	remark: ''
};

equips['22号対水上電探改四'] = {
	name: '22号対水上電探改四',
	icon: '電探',
	category: '電探',
	detail: [
		{assistant: '妙高改二', enableDays: [0, 4, 5, 6]},
		{assistant: '羽黒改二', enableDays: [0, 1, 5, 6]},
		{assistant: '金剛改二', enableDays: [2, 3, 4, 5]}
	],
	remark: '消費(初期～):22号対水上電探\n消費(★6 ～):22号対水上電探改四'
};

equips['32号対水上電探'] = {
	name: '32号対水上電探',
	icon: '電探',
	category: '電探',
	detail: [
		{assistant: '伊勢', enableDays: [3, 4, 5, 6]},
		{assistant: '日向', enableDays: [0, 1, 2]}
	],
	remark: '消費：22号対水上電探\n消費(更新)：32号対水上電探'
};

equips['32号対水上電探改'] = {
	name: '32号対水上電探改',
	icon: '電探',
	category: '電探',
	detail: [
		{assistant: '伊勢', enableDays: [0, 1, 2]},
		{assistant: '日向', enableDays: [3, 4, 5, 6]}
	],
	remark: '消費(初期～)：22号対水上電探\n消費(★6 ～)：32号対水上電探'
};

equips['零式水上観測機'] = {
	name: '零式水上観測機',
	icon: '水上偵察機',
	category: '特種裝備',
	detail: [
		{assistant: '瑞穂', enableDays: [0, 1, 2, 3, 6]},
		{assistant: '武蔵', enableDays: [4, 5, 6]}
	],
	remark: '消費(初期～)：瑞雲\n消費(★6 ～)：零式水上観測機'
};

equips['Ro.43水偵'] = {
	name: 'Ro.43水偵',
	icon: '水上偵察機',
	category: '特種裝備',
	detail: [
		{assistant: 'Zara改', enableDays: [1, 2, 3, 4, 5]},
		{assistant: 'Italia', enableDays: [0, 6]},
		{assistant: 'Roma改', enableDays: [2, 3]}
	],
	remark: '消費(初期～)：零式水上偵察機\n消費(★6 ～)：瑞雲'
};

equips['零式水上偵察機'] = {
	name: '零式水上偵察機',
	icon: '水上偵察機',
	category: '特種裝備',
	detail: [
		{assistant: '千歳甲', enableDays: [ 5, 6]},
		{assistant: '千代田甲', enableDays: [3, 4]},
		{assistant: '秋津洲改', enableDays: [0, 4, 5, 6]},
		{assistant: '瑞穗/瑞穗改', enableDays: [0, 1, 2, 5, 6]}
	],
	remark: '消費(初期～)：零式水上偵察機×1\n消費(★6 ～)：零式水上偵察機×2\n升级：零式舰战21型×3'
};

equips['大発動艇'] = {
	name: '大発動艇',
	icon: '大発動艇',
	category: '特種裝備',
	detail: [
		{assistant: 'あきつ丸', enableDays: [0, 1, 2, 3, 4, 5, 6]},
		{assistant: '皐月改二', enableDays: [0, 1, 2, 3]},
		{assistant: '阿武隈改二', enableDays: [0, 1, 5, 6]}
	],
	remark: '消費(初期～)：ドラム缶(輸送用)\n消費(★6～)：7.7mm機銃\n消費(更新)：12.7mm単装機銃×3\n⇒大発動艇(八九式中戦車＆陸戦隊)'
};

equips['大発動艇(八九式中戦車＆陸戦隊)'] = {
	name: '大発動艇(八九式中戦車＆陸戦隊)',
	icon: '大発動艇',
	category: '特種裝備',
	detail: [
		{assistant: 'あきつ丸', enableDays: [0, 1, 5, 6]},
		{assistant: '皐月改二', enableDays: [4, 5, 6]},
		{assistant: '阿武隈改二', enableDays: [2, 3, 4]}
	],
	remark: '消費(初期～)：25mm単装機銃\n消費(★6～)：12cm30連装噴進砲\n消費(更新)：7.7mm機銃\n⇒特二式内火艇'
};

equips['特二式内火艇'] = {
	name: '特二式内火艇',
	icon: '大発動艇',
	category: '特種裝備',
	detail: [
		{assistant: '伊58', enableDays: [0, 1, 5, 6]},
		{assistant: '伊8', enableDays: [3, 4, 5, 6]},
		{assistant: '伊401', enableDays: [1, 2, 3, 4]},
	],
	remark: '消費(初期～)：7.7mm機銃\n消費(★6～)：12.7mm単装機銃'
};

equips['九六式艦戦'] = {
	name: '九六式艦戦',
	icon: '艦上戦闘機',
	category: '艦載機',
	detail: [
		{assistant: '鳳翔', enableDays: [0, 1, 2, 3, 4, 5, 6]},
	],
	remark: '消費(初期～)：九六式艦戦\n消費(★6～)：7.7mm機銃\n消費(更新)：同装備⇒零式艦戦21型★+3'
};

equips['零式艦戦21型'] = {
	name: '零式艦戦21型',
	icon: '艦上戦闘機',
	category: '艦載機',
	detail: [
		{assistant: '赤城', enableDays: [4, 5, 6]},
		{assistant: '加賀', enableDays: [0, 1, 2]},
	],
	remark: '消費：零式艦戦21型\n消費(更新)：7.7mm機銃\n⇒零式艦戦32型★+3'
};

equips['零式艦戦21型(熟練)'] = {
	name: '零式艦戦21型(熟練)',
	icon: '艦上戦闘機',
	category: '艦載機',
	detail: [
		{assistant: '赤城', enableDays: [4, 5, 6]},
		{assistant: '加賀', enableDays: [0, 1, 2]},
	],
	remark: '消費(初期～)：零式艦戦21型\n消費(★6 ～)：零式艦戦21型\n消費(更新)：7.7mm機銃\n⇒零式艦戦32型(熟練)★+3'
};

equips['零式艦戦32型'] = {
	name: '零式艦戦32型',
	icon: '艦上戦闘機',
	category: '艦載機',
	detail: [
		{assistant: '赤城', enableDays: [0, 1]},
		{assistant: '加賀', enableDays: [3, 4]},
	],
	remark: '消費(初期～)：零式艦戦21型\n消費(更新)：\n⇒零式艦戦52型'
};

equips['零式艦戦32型(熟練)'] = {
	name: '零式艦戦32型(熟練)',
	icon: '艦上戦闘機',
	category: '艦載機',
	detail: [
		{assistant: '赤城', enableDays: [0, 1]},
		{assistant: '加賀', enableDays: [3, 4]},
	],
	remark: '消費(初期～)：零式艦戦21型'
};

equips['零式艦戦52型'] = {
	name: '零式艦戦52型',
	icon: '艦上戦闘機',
	category: '艦載機',
	detail: [
		{assistant: '翔鶴', enableDays: [4, 5, 6]},
		{assistant: '瑞鶴', enableDays: [0, 1, 3]},
	],
	remark: '消費(初期～)：零式艦戦52型'
};

equips['零式艦戦52型(熟練)'] = {
	name: '零式艦戦52型(熟練)',
	icon: '艦上戦闘機',
	category: '艦載機',
	detail: [
		{assistant: '翔鶴', enableDays: [4, 5, 6]},
		{assistant: '瑞鶴', enableDays: [0, 1, 3]},
	],
	remark: '消費(初期～)：零式艦戦52型'
};

equips['零戦52型丙(六〇一空)'] = {
	name: '零戦52型丙(六〇一空)',
	icon: '艦上戦闘機',
	category: '艦載機',
	detail: [
		{assistant: '大鳳', enableDays: [0, 1, 2, 3, 4, 5, 6]},
		{assistant: '雲龍', enableDays: [3, 4, 5, 6]},
	],
	remark: '消費(初期～)：零式艦戦52型\n消費(★6 ～)：天山'
};

equips['零戦52型丙(付岩井小隊)'] = {
	name: '零戦52型丙(付岩井小隊)',
	icon: '艦上戦闘機',
	category: '艦載機',
	detail: [
		{assistant: '瑞鶴', enableDays: [2, 4]},
	],
	remark: '消費：零式艦戦52型'
};

equips['零戦52型甲(付岩本小隊)'] = {
	name: '零戦52型甲(付岩本小隊)',
	icon: '艦上戦闘機',
	category: '艦載機',
	detail: [
		{assistant: '瑞鶴', enableDays: [5, 6]},
	],
	remark: '消費：零式艦戦52型'
};

equips['零式艦戦53型(岩本隊)'] = {
	name: '零式艦戦53型(岩本隊)',
	icon: '艦上戦闘機',
	category: '艦載機',
	detail: [
		{assistant: '瑞鶴', enableDays: [5, 6]},
	],
	remark: '消費：零式艦戦52型'
};

equips['零式艦戦62型(爆戦)'] = {
	name: '零式艦戦62型(爆戦)',
	icon: '艦上爆撃機',
	category: '艦載機',
	detail: [
		{assistant: '隼鷹', enableDays: [0, 5, 6]},
		{assistant: '翔鶴', enableDays: [0, 1]},
	],
	remark: '消費(初期～)：零式艦戦52型\n消費(★6 ～)：彗星'
};

equips['零戦62型(爆戦／岩井隊)'] = {
	name: '零戦62型(爆戦／岩井隊)',
	icon: '艦上爆撃機',
	category: '艦載機',
	detail: [
		{assistant: '瑞鶴', enableDays: [2, 4]},
	],
	remark: '消費(初期～)：零式艦戦52型\n消費(★6 ～)：彗星'
};
equips = null;