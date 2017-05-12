var kanColle = {
  remodel: {

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
     *  访问路径: kanColle.remodel.extractCategoryEquipnames(categoryName)
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
        // categoryName
        /*
          MainCanonLight - 小口径主炮
          MainCanonMedium - 中口径主炮
          MainCanonHeavy - 大口径主炮
          HighAngleGun - 高角炮
          SecondaryCanon - 副炮
          Torpedo - 鱼雷
          Fighter - 舰战
          TorpedoBomber - 舰攻
          DiveBomber - 舰爆
          ReconPlane - 舰侦
          ReconSeaplane - 水上侦察机
          Rader - 电探
          EngineImprovement - 机关部强化
          AAShell - 三式弹
          APShell - 彻甲弹
          AAGun - 对空机銃
          DamageControl - 损管
          ASW - 爆雷
          Soner - 水听, 声纳
          LandingCraft - 登陆艇
          Autogyro - 直升机
          ArtillerySpotter - 弹着观测
          AntiTorpedoBulge - 防雷凸出部
          Searchlight - 探照灯
          DrumCanister - 运输桶
          Facility - 维修设施
          Flare - 照明弹
          FleetCommandFacility - 舰队司令部
          MaintenancePersonnel - 熟练舰载机整备员
          AntiAircraftFireDirector - 高射装置
          RocketLauncher - 火箭发射器
          SurfaceShipPersonnel - 见张员
          FlyingBoat - 飞行大艇
          CombatRations - 战斗给养, 间宫
          OffshoreResupply - 洋上补给
          AmphibiousLandingCraft - 两栖登陆舰
          LandBasedAttacker - 陆基攻击机
          LandBasedFighter - 陆基战斗机
          JetPowerededBomber1 - 喷气动力轰炸机, 喷式战斗爆击机
          JetPowerededBomber2 - 噴式戦闘爆撃機(橘花, 喷式景云图标不一样)
          Submarine Radar - 潜水艇装备, Submarine Radar & Waterproof Telescope, Submarine Radar & Passive Radiolocator 
        */
        '小口径主砲': 'main-cannon-light',
        '中口径主砲': 'main-cannon-medium',
        '大口径主砲': 'main-cannon-heavy',
        '高角砲': 'high-angle-gun',
        '副砲': 'secondary-canon',
        '魚雷': 'torpedo',
        '艦上戦闘機': 'carrier-fighter',
        '艦上爆撃機': 'carrier-dive-bomber',
        '艦上偵察機': 'carrier-recon-plane',
        '水上偵察機': 'sea-plane-recon',
        '水上戦闘機': 'sea-plane-fighter',
        '電探': 'rader',
        'ソナ｜': 'soner',
        '爆雷': 'anti-sub-weapon',
        '対艦強化弾': 'armour-piercing-shell',
        '対空機銃': 'anti-air-gun',
        '高射装置': 'anti-air-fire-director',
        '上陸用舟艇': 'landing-craft',
        '探照灯': 'search-light',
        'バルジ': 'anti-torpedo-bulge',
        '機関部強化': 'engine-improvement',
        '潜水艦装備': 'submarine-radar',

        // groupName
        '小口径主炮/鱼雷'           : 'main-cannon-light',
        '中口径主炮/副炮'           : 'main-cannon-medium',
        '大口径主炮/强化弹'         : 'main-cannon-heavy',
        '舰战'                      : 'carrier-fighter',
        '舰爆/舰侦'                 : 'default',
        '水侦/水战'                 : 'recon-sea-plane',
        '电探'                      : 'rader',
        '机枪/高射装置'             : 'anti-air-fire-director',
        '声纳/爆雷/潜水艇装备'      : 'anti-sub-weapon',
        '登陆艇/探照灯/装甲带/轮机' : 'search-light'
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

kanColle.remodel.categoryNameList = ['小口径主炮/鱼雷', '中口径主炮/副炮',
      '大口径主炮/强化弹', '舰战', '舰爆/舰侦', '水侦/水战', '电探',
      '机枪/高射装置', '声纳/爆雷/潜水艇装备', '登陆艇/探照灯/装甲带/轮机'];
kanColle.remodel.defaultSelected = ['20.3cm(2号)連装砲', '20.3cm(3号)連装砲', '41cm連装砲', '46cm三連装砲', '61cm五連装(酸素)魚雷', '九一式徹甲弾'];
kanColle.remodel.equips = {
  "12.7cm連装砲": {
    "name": "12.7cm連装砲",
    "icon": "小口径主砲",
    "category": "小口径主炮/鱼雷",
    "detail": [
      {
        "assistant": "-",
        "enableDays": [
          0,
          1,
          2,
          3,
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費：同装備\n⇒12.7cm連装砲B型改二"
  },
  "12.7cm連装砲B型改二": {
    "name": "12.7cm連装砲B型改二",
    "icon": "小口径主砲",
    "category": "小口径主炮/鱼雷",
    "detail": [
      {
        "assistant": "夕立改二/綾波改二",
        "enableDays": [
          1,
          2,
          3
        ]
      }
    ],
    "remark": "消費：同装備"
  },
  "10cm高角砲＋高射装置": {
    "name": "10cm高角砲＋高射装置",
    "icon": "小口径主砲",
    "category": "小口径主炮/鱼雷",
    "detail": [
      {
        "assistant": "秋月 / 初月",
        "enableDays": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "assistant": "照月",
        "enableDays": [
          0,
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費：10cm連装高角砲"
  },
  "61cm三連装魚雷": {
    "name": "61cm三連装魚雷",
    "icon": "魚雷",
    "category": "小口径主炮/鱼雷",
    "detail": [
      {
        "assistant": "吹雪*18",
        "enableDays": [
          4,
          5,
          6
        ]
      },
      {
        "assistant": "叢雲",
        "enableDays": [
          0,
          1,
          2
        ]
      }
    ],
    "remark": "消費：同装備\n⇒61cm三連装(酸素)魚雷"
  },
  "61cm三連装(酸素)魚雷": {
    "name": "61cm三連装(酸素)魚雷",
    "icon": "魚雷",
    "category": "小口径主炮/鱼雷",
    "detail": [
      {
        "assistant": "吹雪改二",
        "enableDays": [
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費：61cm三連装魚雷\n消費(更新)：61cm四連装魚雷\n⇒61cm四連装(酸素)魚雷★+5"
  },
  "61cm四連装魚雷": {
    "name": "61cm四連装魚雷",
    "icon": "魚雷",
    "category": "小口径主炮/鱼雷",
    "detail": [
      {
        "assistant": "-",
        "enableDays": [
          0,
          1,
          2,
          5,
          6
        ]
      }
    ],
    "remark": "消費：同装備\n⇒61cm四連装(酸素)魚雷★+3"
  },
  "61cm四連装(酸素)魚雷": {
    "name": "61cm四連装(酸素)魚雷",
    "icon": "魚雷",
    "category": "小口径主炮/鱼雷",
    "detail": [
      {
        "assistant": "大井 / 北上",
        "enableDays": [
          0,
          1,
          2,
          3,
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費：同装備\n⇒61cm五連装(酸素)魚雷"
  },
  "61cm五連装(酸素)魚雷": {
    "name": "61cm五連装(酸素)魚雷",
    "icon": "魚雷",
    "category": "小口径主炮/鱼雷",
    "detail": [
      {
        "assistant": "島風",
        "enableDays": [
          3,
          4
        ]
      }
    ],
    "remark": "消費：同装備"
  },
  "試製61cm六連装(酸素)魚雷": {
    "name": "試製61cm六連装(酸素)魚雷",
    "icon": "魚雷",
    "category": "小口径主炮/鱼雷",
    "detail": [
      {
        "assistant": "初月",
        "enableDays": [
          3,
          4,
          5,
          6
        ]
      },
      {
        "assistant": "島風",
        "enableDays": [
          0,
          6
        ]
      }
    ],
    "remark": "消費(初期～)：61cm四連装(酸素)魚雷\n消費(★6 ～)：61cm五連装(酸素)魚雷"
  },
  "14cm単装砲": {
    "name": "14cm単装砲",
    "icon": "中口径主砲",
    "category": "中口径主炮/副炮",
    "detail": [
      {
        "assistant": "-",
        "enableDays": [
          0,
          1,
          2,
          3,
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費：同装備\n⇒14cm連装砲"
  },
  "14cm連装砲": {
    "name": "14cm連装砲",
    "icon": "中口径主砲",
    "category": "中口径主炮/副炮",
    "detail": [
      {
        "assistant": "夕張",
        "enableDays": [
          1,
          4
        ]
      }
    ],
    "remark": "消費：同装備"
  },
  "15.2cm連装砲": {
    "name": "15.2cm連装砲",
    "icon": "中口径主砲",
    "category": "中口径主炮/副炮",
    "detail": [
      {
        "assistant": "阿賀野",
        "enableDays": [
          4,
          5,
          6
        ]
      },
      {
        "assistant": "能代",
        "enableDays": [
          0,
          1,
          5,
          6
        ]
      },
      {
        "assistant": "矢矧",
        "enableDays": [
          1,
          2,
          3,
          4
        ]
      }
    ],
    "remark": "消費：同装備\n消費(更新)：22号対水上電探\n⇒15.2cm連装砲改"
  },
  "15.2cm連装砲改": {
    "name": "15.2cm連装砲改",
    "icon": "中口径主砲",
    "category": "中口径主炮/副炮",
    "detail": [
      {
        "assistant": "矢矧",
        "enableDays": [
          3,
          4,
          5,
          6
        ]
      },
      {
        "assistant": "酒匂",
        "enableDays": [
          0,
          1,
          2,
          6
        ]
      }
    ],
    "remark": "消費：15.2cm連装砲"
  },
  "15.5cm三連装砲": {
    "name": "15.5cm三連装砲",
    "icon": "中口径主砲",
    "category": "中口径主炮/副炮",
    "detail": [
      {
        "assistant": "最上",
        "enableDays": [
          5,
          6
        ]
      },
      {
        "assistant": "大淀",
        "enableDays": [
          0,
          1
        ]
      }
    ],
    "remark": "消費：同装備"
  },
  "20.3cm連装砲": {
    "name": "20.3cm連装砲",
    "icon": "中口径主砲",
    "category": "中口径主炮/副炮",
    "detail": [
      {
        "assistant": "青葉",
        "enableDays": [
          0,
          4,
          5,
          6
        ]
      },
      {
        "assistant": "衣笠",
        "enableDays": [
          0,
          1,
          2,
          3,
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費：同装備\n⇒20.3cm(2号)連装砲"
  },
  "20.3cm(2号)連装砲": {
    "name": "20.3cm(2号)連装砲",
    "icon": "中口径主砲",
    "category": "中口径主炮/副炮",
    "detail": [
      {
        "assistant": "妙高",
        "enableDays": [
          0,
          1,
          2
        ]
      }
    ],
    "remark": "消費：同装備\n⇒20.3cm(3号)連装砲"
  },
  "20.3cm(3号)連装砲": {
    "name": "20.3cm(3号)連装砲",
    "icon": "中口径主砲",
    "category": "中口径主炮/副炮",
    "detail": [
      {
        "assistant": "三隈",
        "enableDays": [
          2,
          3
        ]
      }
    ],
    "remark": "消費：同装備"
  },
  "203mm／53 連装砲": {
    "name": "203mm／53 連装砲",
    "icon": "中口径主砲",
    "category": "中口径主炮/副炮",
    "detail": [
      {
        "assistant": "Zara due",
        "enableDays": [
          0,
          1,
          2,
          3
        ]
      }
    ],
    "remark": "消費(初期～)：20.3cm連装砲\n消費(★6 ～)：20.3cm(2号)連装砲"
  },
  "90mm単装高角砲": {
    "name": "90mm単装高角砲",
    "icon": "副砲",
    "category": "中口径主炮/副炮",
    "detail": [
      {
        "assistant": "Littorio",
        "enableDays": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "assistant": "Roma",
        "enableDays": [
          0,
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費：10cm連装高角砲"
  },
  "15.2cm単装砲": {
    "name": "15.2cm単装砲",
    "icon": "副砲",
    "category": "中口径主炮/副炮",
    "detail": [
      {
        "assistant": "金剛",
        "enableDays": [
          0,
          1,
          6
        ]
      },
      {
        "assistant": "山城",
        "enableDays": [
          1,
          2,
          3
        ]
      },
      {
        "assistant": "阿賀野",
        "enableDays": [
          0,
          1,
          2
        ]
      }
    ],
    "remark": "消費：同装備\n⇒15.2cm連装砲"
  },
  "OTO 152mm三連装速射砲": {
    "name": "OTO 152mm三連装速射砲",
    "icon": "副砲",
    "category": "中口径主炮/副炮",
    "detail": [
      {
        "assistant": "Littorio",
        "enableDays": [
          0,
          2,
          3,
          6
        ]
      },
      {
        "assistant": "Roma",
        "enableDays": [
          0,
          1,
          4,
          5
        ]
      }
    ],
    "remark": "消費：15.5cm三連装砲"
  },
  "12.7cm連装高角砲": {
    "name": "12.7cm連装高角砲",
    "icon": "副砲",
    "category": "中口径主炮/副炮",
    "detail": [
      {
        "assistant": "摩耶改二",
        "enableDays": [
          5,
          6
        ]
      },
      {
        "assistant": "鈴谷",
        "enableDays": [
          0,
          5,
          6
        ]
      },
      {
        "assistant": "熊野",
        "enableDays": [
          0,
          1,
          6
        ]
      }
    ],
    "remark": "消費：同装備\n消費(更新)：10cm連装高角砲\n⇒8cm高角砲"
  },
  "8cm高角砲": {
    "name": "8cm高角砲",
    "icon": "副砲",
    "category": "中口径主炮/副炮",
    "detail": [
      {
        "assistant": "阿賀野",
        "enableDays": [
          0,
          1,
          4,
          5,
          6
        ]
      },
      {
        "assistant": "能代",
        "enableDays": [
          0,
          1,
          5,
          6
        ]
      },
      {
        "assistant": "矢矧",
        "enableDays": [
          0,
          1,
          2
        ]
      },
      {
        "assistant": "鈴谷改二",
        "enableDays": [
          2,
          3,
          4
        ]
      },
      {
        "assistant": "鈴谷航改二",
        "enableDays": [
          2,
          3,
          4
        ]
      }
    ],
    "remark": "消費：10cm連装高角砲\n消費(更新)：25mm単装機銃\n⇒8cm高角砲改＋増設機銃\n矢矧のみ？更新可能"
  },
  "8cm高角砲改＋増設機銃": {
    "name": "8cm高角砲改＋増設機銃",
    "icon": "副砲",
    "category": "中口径主炮/副炮",
    "detail": [
      {
        "assistant": "矢矧 / 酒匂",
        "enableDays": [
          2,
          3,
          4
        ]
      },
      {
        "assistant": "鈴谷改二",
        "enableDays": [
          2,
          3,
          4
        ]
      },
      {
        "assistant": "鈴谷航改二",
        "enableDays": [
          2,
          3,
          4
        ]
      }
    ],
    "remark": "消費(初期～)：10cm連装高角砲\n消費(★6 ～)：25mm単装機銃"
  },
  "35.6cm連装砲": {
    "name": "35.6cm連装砲",
    "icon": "大口径主砲",
    "category": "大口径主炮/强化弹",
    "detail": [
      {
        "assistant": "扶桑",
        "enableDays": [
          0,
          5,
          6
        ]
      }
    ],
    "remark": "消費：同装備\n⇒試製35.6cm三連装砲"
  },
  "35.6cm連装砲(ダズル迷彩)": {
    "name": "35.6cm連装砲(ダズル迷彩)",
    "icon": "大口径主砲",
    "category": "大口径主炮/强化弹",
    "detail": [
      {
        "assistant": "榛名改二",
        "enableDays": [
          0,
          1,
          2,
          3,
          6
        ]
      }
    ],
    "remark": "消費：35.6cm連装砲"
  },
  "試製35.6cm三連装砲": {
    "name": "試製35.6cm三連装砲",
    "icon": "大口径主砲",
    "category": "大口径主炮/强化弹",
    "detail": [
      {
        "assistant": "金剛改二",
        "enableDays": [
          3,
          4
        ]
      },
      {
        "assistant": "榛名改二",
        "enableDays": [
          4,
          5
        ]
      },
      {
        "assistant": "扶桑改二",
        "enableDays": [
          3,
          4,
          5,
          6
        ]
      },
      {
        "assistant": "山城改二",
        "enableDays": [
          0,
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費：35.6cm連装砲"
  },
  "38cm連装砲": {
    "name": "38cm連装砲",
    "icon": "大口径主砲",
    "category": "大口径主炮/强化弹",
    "detail": [
      {
        "assistant": "Bismarck",
        "enableDays": [
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費：35.6cm連装砲\n消費(更新)：41cm連装砲\n⇒38cm連装砲改★+3"
  },
  "38cm連装砲改": {
    "name": "38cm連装砲改",
    "icon": "大口径主砲",
    "category": "大口径主炮/强化弹",
    "detail": [
      {
        "assistant": "Bismarck",
        "enableDays": [
          0,
          1,
          2
        ]
      }
    ],
    "remark": "消費：41cm連装砲"
  },
  "38.1cm Mk.I連装砲": {
    "name": "38.1cm Mk.I連装砲",
    "icon": "大口径主砲",
    "category": "大口径主炮/强化弹",
    "detail": [
      {
        "assistant": "Warspite",
        "enableDays": [
          0,
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費(初期～)：35.6cm連装砲\n消費(★6 ～)：41cm連装砲\n消費(更新)：25mm単装機銃\n⇒38.1cm Mk.I/N連装砲改"
  },
  "38.1cm Mk.I/N連装砲改": {
    "name": "38.1cm Mk.I/N連装砲改",
    "icon": "大口径主砲",
    "category": "大口径主炮/强化弹",
    "detail": [
      {
        "assistant": "Warspite",
        "enableDays": [
          2,
          3,
          4,
          5
        ]
      }
    ],
    "remark": "消費：41cm連装砲"
  },
  "381mm/50 三連装砲": {
    "name": "381mm/50 三連装砲",
    "icon": "大口径主砲",
    "category": "大口径主炮/强化弹",
    "detail": [
      {
        "assistant": "Littorio",
        "enableDays": [
          2,
          3,
          4,
          5
        ]
      },
      {
        "assistant": "Roma",
        "enableDays": [
          0,
          1,
          6
        ]
      }
    ],
    "remark": "消費：35.6cm連装砲\n消費(更新)：25mm連装機銃\n⇒381mm/50 三連装砲改★+3"
  },
  "381mm/50 三連装砲改": {
    "name": "381mm/50 三連装砲改",
    "icon": "大口径主砲",
    "category": "大口径主炮/强化弹",
    "detail": [
      {
        "assistant": "Littorio",
        "enableDays": [
          0,
          1,
          6
        ]
      },
      {
        "assistant": "Roma",
        "enableDays": [
          2,
          3,
          4,
          5
        ]
      }
    ],
    "remark": "消費：41cm連装砲"
  },
  "41cm連装砲": {
    "name": "41cm連装砲",
    "icon": "大口径主砲",
    "category": "大口径主炮/强化弹",
    "detail": [
      {
        "assistant": "長門",
        "enableDays": [
          2,
          5,
          6
        ]
      },
      {
        "assistant": "陸奥",
        "enableDays": [
          0,
          1,
          4
        ]
      }
    ],
    "remark": "消費：同装備"
  },
  "試製41cm三連装砲": {
    "name": "試製41cm三連装砲",
    "icon": "大口径主砲",
    "category": "大口径主炮/强化弹",
    "detail": [
      {
        "assistant": "長門改",
        "enableDays": [
          0,
          1,
          3,
          4
        ]
      },
      {
        "assistant": "陸奥改",
        "enableDays": [
          2,
          3,
          5,
          6
        ]
      }
    ],
    "remark": "消費：41cm連装砲"
  },
  "16inch三連装砲 Mk.7": {
    "name": "16inch三連装砲 Mk.7",
    "icon": "大口径主砲",
    "category": "大口径主炮/强化弹",
    "detail": [
      {
        "assistant": "Iowa",
        "enableDays": [
          0,
          1,
          2,
          3,
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費(初期～)：41cm連装砲\n消費(★6 ～)：46cm三連装砲\n消費(更新)：32号対水上電探\n⇒16inch三連装砲 Mk.7＋GFCS"
  },
  "16inch三連装砲 Mk.7＋GFCS": {
    "name": "16inch三連装砲 Mk.7＋GFCS",
    "icon": "大口径主砲",
    "category": "大口径主炮/强化弹",
    "detail": [
      {
        "assistant": "Iowa",
        "enableDays": [
          0,
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費(初期～)：22号対水上電探\n消費(★6 ～)：32号対水上電探"
  },
  "試製46cm連装砲": {
    "name": "試製46cm連装砲",
    "icon": "大口径主砲",
    "category": "大口径主炮/强化弹",
    "detail": [
      {
        "assistant": "大和",
        "enableDays": [
          0,
          1
        ]
      },
      {
        "assistant": "武蔵",
        "enableDays": [
          2,
          3
        ]
      }
    ],
    "remark": "消費：41cm連装砲\n⇒46cm三連装砲★+5"
  },
  "46cm三連装砲": {
    "name": "46cm三連装砲",
    "icon": "大口径主砲",
    "category": "大口径主炮/强化弹",
    "detail": [
      {
        "assistant": "大和",
        "enableDays": [
          5,
          6
        ]
      },
      {
        "assistant": "武蔵",
        "enableDays": [
          0,
          1
        ]
      }
    ],
    "remark": "消費：同装備"
  },
  "試製51cm連装砲": {
    "name": "試製51cm連装砲",
    "icon": "大口径主砲",
    "category": "大口径主炮/强化弹",
    "detail": [
      {
        "assistant": "大和改",
        "enableDays": [
          1,
          2
        ]
      },
      {
        "assistant": "武蔵改",
        "enableDays": [
          1,
          3
        ]
      }
    ],
    "remark": "消費：46cm三連装砲"
  },
  "九一式徹甲弾": {
    "name": "九一式徹甲弾",
    "icon": "対艦強化弾",
    "category": "大口径主炮/强化弹",
    "detail": [
      {
        "assistant": "比叡",
        "enableDays": [
          3,
          4,
          5,
          6
        ]
      },
      {
        "assistant": "霧島",
        "enableDays": [
          0,
          1,
          5,
          6
        ]
      }
    ],
    "remark": "消費：同装備\n⇒一式徹甲弾"
  },
  "一式徹甲弾": {
    "name": "一式徹甲弾",
    "icon": "対艦強化弾",
    "category": "大口径主炮/强化弹",
    "detail": [
      {
        "assistant": "金剛",
        "enableDays": [
          0,
          5,
          6
        ]
      },
      {
        "assistant": "榛名",
        "enableDays": [
          1,
          2,
          3
        ]
      }
    ],
    "remark": "消費(初期～)：九一式徹甲弾\n消費(★6 ～)：一式徹甲弾"
  },
  "九六式艦戦": {
    "name": "九六式艦戦",
    "icon": "艦上戦闘機",
    "category": "舰战",
    "detail": [
      {
        "assistant": "鳳翔",
        "enableDays": [
          0,
          1,
          2,
          3,
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費(初期～)：同装備\n消費(★6 ～)：7.7mm機銃\n消費(更新)：同装備\n⇒零式艦戦21型★+3"
  },
  "零式艦戦21型": {
    "name": "零式艦戦21型",
    "icon": "艦上戦闘機",
    "category": "舰战",
    "detail": [
      {
        "assistant": "赤城",
        "enableDays": [
          4,
          5,
          6
        ]
      },
      {
        "assistant": "加賀",
        "enableDays": [
          0,
          1,
          2
        ]
      }
    ],
    "remark": "消費：同装備\n消費(更新)：7.7mm機銃\n⇒零式艦戦32型★+3"
  },
  "零式艦戦21型(熟練)": {
    "name": "零式艦戦21型(熟練)",
    "icon": "艦上戦闘機",
    "category": "舰战",
    "detail": [
      {
        "assistant": "赤城",
        "enableDays": [
          4,
          5,
          6
        ]
      },
      {
        "assistant": "加賀",
        "enableDays": [
          0,
          1,
          2
        ]
      }
    ],
    "remark": "消費：零式艦戦21型\n消費(更新)：7.7mm機銃\n⇒零式艦戦32型(熟練)★+3"
  },
  "零式艦戦32型": {
    "name": "零式艦戦32型",
    "icon": "艦上戦闘機",
    "category": "舰战",
    "detail": [
      {
        "assistant": "赤城",
        "enableDays": [
          0,
          1
        ]
      },
      {
        "assistant": "加賀",
        "enableDays": [
          3,
          4
        ]
      }
    ],
    "remark": "消費：零式艦戦21型\n消費(更新)：同装備\n⇒零式艦戦52型★+3"
  },
  "零式艦戦32型(熟練)": {
    "name": "零式艦戦32型(熟練)",
    "icon": "艦上戦闘機",
    "category": "舰战",
    "detail": [
      {
        "assistant": "赤城",
        "enableDays": [
          0,
          1
        ]
      },
      {
        "assistant": "加賀",
        "enableDays": [
          3,
          4
        ]
      }
    ],
    "remark": "消費：零式艦戦21型\n消費(更新)：零式艦戦32型\n⇒零式艦戦52型(熟練)★+3"
  },
  "零式艦戦52型": {
    "name": "零式艦戦52型",
    "icon": "艦上戦闘機",
    "category": "舰战",
    "detail": [
      {
        "assistant": "翔鶴",
        "enableDays": [
          4,
          5,
          6
        ]
      },
      {
        "assistant": "瑞鶴",
        "enableDays": [
          0,
          1,
          3
        ]
      }
    ],
    "remark": "消費：同装備"
  },
  "零式艦戦52型(熟練)": {
    "name": "零式艦戦52型(熟練)",
    "icon": "艦上戦闘機",
    "category": "舰战",
    "detail": [
      {
        "assistant": "翔鶴",
        "enableDays": [
          4,
          5,
          6
        ]
      },
      {
        "assistant": "瑞鶴",
        "enableDays": [
          0,
          1,
          3
        ]
      }
    ],
    "remark": "消費：零式艦戦52型"
  },
  "零戦52型丙(六〇一空)": {
    "name": "零戦52型丙(六〇一空)",
    "icon": "艦上戦闘機",
    "category": "舰战",
    "detail": [
      {
        "assistant": "大鳳",
        "enableDays": [
          0,
          1,
          2,
          3,
          4,
          5,
          6
        ]
      },
      {
        "assistant": "雲龍",
        "enableDays": [
          3,
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費(初期～)：零式艦戦52型\n消費(★6 ～)：天山"
  },
  "零戦52型丙(付岩井小隊)": {
    "name": "零戦52型丙(付岩井小隊)",
    "icon": "艦上戦闘機",
    "category": "舰战",
    "detail": [
      {
        "assistant": "瑞鶴",
        "enableDays": [
          2,
          4
        ]
      }
    ],
    "remark": "消費：零式艦戦52型"
  },
  "零戦52型甲(付岩本小隊)": {
    "name": "零戦52型甲(付岩本小隊)",
    "icon": "艦上戦闘機",
    "category": "舰战",
    "detail": [
      {
        "assistant": "瑞鶴",
        "enableDays": [
          5,
          6
        ]
      }
    ],
    "remark": "消費：零式艦戦52型"
  },
  "零式艦戦53型(岩本隊)": {
    "name": "零式艦戦53型(岩本隊)",
    "icon": "艦上戦闘機",
    "category": "舰战",
    "detail": [
      {
        "assistant": "瑞鶴",
        "enableDays": [
          5,
          6
        ]
      }
    ],
    "remark": "消費：零式艦戦52型"
  },
  "F4F-3": {
    "name": "F4F-3",
    "icon": "艦上戦闘機",
    "category": "舰战",
    "detail": [
      {
        "assistant": "Saratoga",
        "enableDays": [
          0,
          3,
          4,
          5,
          6
        ]
      },
      {
        "assistant": "Saratoga改",
        "enableDays": [
          5,
          6
        ]
      }
    ],
    "remark": "消費(★6 ～)：九六式艦戦\n消費(更新)：12.7mm単装機銃\n⇒F4F-4"
  },
  "F4F-4": {
    "name": "F4F-4",
    "icon": "艦上戦闘機",
    "category": "舰战",
    "detail": [
      {
        "assistant": "Saratoga",
        "enableDays": [
          1,
          2
        ]
      },
      {
        "assistant": "Saratoga改",
        "enableDays": [
          1,
          2,
          3
        ]
      }
    ],
    "remark": "消費(初期～)：零式艦戦21型\n消費(★6 ～)：零式艦戦32型\n消費(更新)：零式艦戦52型\n⇒F6F-3"
  },
  "F6F-3": {
    "name": "F6F-3",
    "icon": "艦上戦闘機",
    "category": "舰战",
    "detail": [
      {
        "assistant": "Saratoga改",
        "enableDays": [
          2,
          3,
          4
        ]
      }
    ],
    "remark": "消費(初期～)：零式艦戦52型\n消費(★6 ～)：紫電改二"
  },
  "零式艦戦62型(爆戦)": {
    "name": "零式艦戦62型(爆戦)",
    "icon": "艦上爆撃機",
    "category": "舰爆/舰侦",
    "detail": [
      {
        "assistant": "隼鷹",
        "enableDays": [
          0,
          5,
          6
        ]
      },
      {
        "assistant": "翔鶴",
        "enableDays": [
          0,
          1
        ]
      },
      {
        "assistant": "鈴谷航改二",
        "enableDays": [
          0,
          1
        ]
      }
    ],
    "remark": "消費(初期～)：零式艦戦52型\n消費(★6 ～)：彗星\n消費(更新)：烈風\n⇒零式艦戦63型(爆戦)\n鈴谷航改二のみ更新可能"
  },
  "零戦62型(爆戦／岩井隊)": {
    "name": "零戦62型(爆戦／岩井隊)",
    "icon": "艦上爆撃機",
    "category": "舰爆/舰侦",
    "detail": [
      {
        "assistant": "瑞鶴",
        "enableDays": [
          2,
          4
        ]
      }
    ],
    "remark": "消費(初期～)：零式艦戦52型\n消費(★6 ～)：彗星"
  },
  "零式艦戦63型(爆戦)": {
    "name": "零式艦戦63型(爆戦)",
    "icon": "艦上爆撃機",
    "category": "舰爆/舰侦",
    "detail": [
      {
        "assistant": "鈴谷航改二",
        "enableDays": [
          1,
          2,
          3,
          4
        ]
      }
    ],
    "remark": "消費(初期～)：零式艦戦52型\n消費(★6 ～)：烈風"
  },
  "試製景雲(艦偵型)": {
    "name": "試製景雲(艦偵型)",
    "icon": "艦上偵察機",
    "category": "舰爆/舰侦",
    "detail": [
      {
        "assistant": "翔鶴改二甲",
        "enableDays": [
          0,
          5,
          6
        ]
      },
      {
        "assistant": "瑞鶴改二甲",
        "enableDays": [
          0,
          1,
          2
        ]
      }
    ],
    "remark": "消費(初期～)：流星\n消費(★6 ～)：烈風\n消費(更新)：ネ式エンジン*19\n⇒噴式景雲改"
  },
  "零式水上偵察機": {
    "name": "零式水上偵察機",
    "icon": "水上偵察機",
    "category": "水侦/水战",
    "detail": [
      {
        "assistant": "千歳甲*20",
        "enableDays": [
          5,
          6
        ]
      },
      {
        "assistant": "千代田甲*21",
        "enableDays": [
          3,
          4
        ]
      },
      {
        "assistant": "秋津洲改",
        "enableDays": [
          0,
          4,
          5,
          6
        ]
      },
      {
        "assistant": "瑞穂",
        "enableDays": [
          1,
          2,
          3
        ]
      }
    ],
    "remark": "消費：同装備\n消費(更新)：零式艦戦21型\n⇒二式水戦改"
  },
  "零式水上観測機": {
    "name": "零式水上観測機",
    "icon": "水上偵察機",
    "category": "水侦/水战",
    "detail": [
      {
        "assistant": "武蔵",
        "enableDays": [
          4,
          5,
          6
        ]
      },
      {
        "assistant": "瑞穂",
        "enableDays": [
          1,
          2,
          3
        ]
      }
    ],
    "remark": "消費(初期～)：瑞雲\n消費(★6 ～)：零式水上観測機"
  },
  "九八式水上偵察機(夜偵)": {
    "name": "九八式水上偵察機(夜偵)",
    "icon": "水上偵察機",
    "category": "水侦/水战",
    "detail": [
      {
        "assistant": "川内改二",
        "enableDays": [
          0,
          1,
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費：零式水上偵察機"
  },
  "Ro.43水偵": {
    "name": "Ro.43水偵",
    "icon": "水上偵察機",
    "category": "水侦/水战",
    "detail": [
      {
        "assistant": "Italia",
        "enableDays": [
          0,
          6
        ]
      },
      {
        "assistant": "Roma改",
        "enableDays": [
          2,
          3
        ]
      },
      {
        "assistant": "Zara改*22",
        "enableDays": [
          1,
          2,
          3,
          4,
          5
        ]
      },
      {
        "assistant": "Zara due",
        "enableDays": [
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費(初期～)：零式水上偵察機\n消費(★6 ～)：瑞雲\n消費(更新)：零式水上偵察機\n⇒Ro.44水上戦闘機"
  },
  "二式水戦改": {
    "name": "二式水戦改",
    "icon": "水上戦闘機",
    "category": "水侦/水战",
    "detail": [
      {
        "assistant": "瑞穂",
        "enableDays": [
          0,
          5,
          6
        ]
      }
    ],
    "remark": "消費(初期～)：零式艦戦21型\n消費(★6 ～)：零式水上偵察機\n消費(更新)：瑞雲\n⇒強風改"
  },
  "二式水戦改(熟練)": {
    "name": "二式水戦改(熟練)",
    "icon": "水上戦闘機",
    "category": "水侦/水战",
    "detail": [
      {
        "assistant": "瑞穂",
        "enableDays": [
          0,
          5,
          6
        ]
      }
    ],
    "remark": "消費(初期～)：零式艦戦32型\n消費(★6 ～)：瑞雲"
  },
  "強風改": {
    "name": "強風改",
    "icon": "水上戦闘機",
    "category": "水侦/水战",
    "detail": [
      {
        "assistant": "瑞穂",
        "enableDays": [
          2,
          3,
          4
        ]
      },
      {
        "assistant": "鈴谷改二*23",
        "enableDays": [
          1,
          2,
          3,
          4
        ]
      }
    ],
    "remark": "消費：紫電改二"
  },
  "Ro.44水上戦闘機": {
    "name": "Ro.44水上戦闘機",
    "icon": "水上戦闘機",
    "category": "水侦/水战",
    "detail": [
      {
        "assistant": "Zara due",
        "enableDays": [
          0,
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費：瑞雲\n消費(更新)：同装備\n⇒Ro.44水上戦闘機bis"
  },
  "Ro.44水上戦闘機bis": {
    "name": "Ro.44水上戦闘機bis",
    "icon": "水上戦闘機",
    "category": "水侦/水战",
    "detail": [
      {
        "assistant": "Zara due",
        "enableDays": [
          5,
          6
        ]
      }
    ],
    "remark": "消費(初期～)：瑞雲\n消費(★6 ～)：Ro.44水上戦闘機"
  },
  "13号対空電探": {
    "name": "13号対空電探",
    "icon": "電探",
    "category": "电探",
    "detail": [
      {
        "assistant": "五十鈴改二",
        "enableDays": [
          0,
          1,
          5,
          6
        ]
      },
      {
        "assistant": "時雨改二",
        "enableDays": [
          0,
          4,
          5,
          6
        ]
      },
      {
        "assistant": "秋月",
        "enableDays": [
          2,
          3,
          4
        ]
      },
      {
        "assistant": "照月",
        "enableDays": [
          1,
          2,
          3
        ]
      }
    ],
    "remark": "消費：同装備\n消費(更新)：21号対空電探\n⇒13号対空電探改"
  },
  "13号対空電探改": {
    "name": "13号対空電探改",
    "icon": "電探",
    "category": "电探",
    "detail": [
      {
        "assistant": "初霜改二",
        "enableDays": [
          0,
          5,
          6
        ]
      },
      {
        "assistant": "雪風",
        "enableDays": [
          0,
          1,
          2,
          3
        ]
      },
      {
        "assistant": "磯風改",
        "enableDays": [
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費：13号対空電探"
  },
  "22号対水上電探": {
    "name": "22号対水上電探",
    "icon": "電探",
    "category": "电探",
    "detail": [
      {
        "assistant": "日向",
        "enableDays": [
          0,
          1,
          5,
          6
        ]
      },
      {
        "assistant": "夕雲",
        "enableDays": [
          1,
          2,
          5,
          6
        ]
      },
      {
        "assistant": "島風",
        "enableDays": [
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費：同装備\n⇒22号対水上電探改四"
  },
  "22号対水上電探改四": {
    "name": "22号対水上電探改四",
    "icon": "電探",
    "category": "电探",
    "detail": [
      {
        "assistant": "金剛改二",
        "enableDays": [
          2,
          3,
          4,
          5
        ]
      },
      {
        "assistant": "妙高改二",
        "enableDays": [
          0,
          4,
          5,
          6
        ]
      },
      {
        "assistant": "羽黒改二",
        "enableDays": [
          0,
          1,
          5,
          6
        ]
      }
    ],
    "remark": "消費(初期～)：22号対水上電探\n消費(★6 ～)：22号対水上電探改四"
  },
  "21号対空電探": {
    "name": "21号対空電探",
    "icon": "電探",
    "category": "电探",
    "detail": [
      {
        "assistant": "伊勢",
        "enableDays": [
          0,
          1,
          5,
          6
        ]
      },
      {
        "assistant": "日向",
        "enableDays": [
          3,
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費：同装備\n⇒21号対空電探改"
  },
  "21号対空電探改": {
    "name": "21号対空電探改",
    "icon": "電探",
    "category": "电探",
    "detail": [
      {
        "assistant": "大和",
        "enableDays": [
          0,
          4,
          5,
          6
        ]
      },
      {
        "assistant": "武蔵",
        "enableDays": [
          2,
          3,
          4,
          5
        ]
      }
    ],
    "remark": "消費：21号対空電探"
  },
  "32号対水上電探": {
    "name": "32号対水上電探",
    "icon": "電探",
    "category": "电探",
    "detail": [
      {
        "assistant": "伊勢",
        "enableDays": [
          3,
          4,
          5,
          6
        ]
      },
      {
        "assistant": "日向",
        "enableDays": [
          0,
          1,
          2
        ]
      }
    ],
    "remark": "消費：22号対水上電探\n消費(更新)：32号対水上電探\n⇒32号対水上電探改"
  },
  "32号対水上電探改": {
    "name": "32号対水上電探改",
    "icon": "電探",
    "category": "电探",
    "detail": [
      {
        "assistant": "伊勢",
        "enableDays": [
          0,
          1,
          2
        ]
      },
      {
        "assistant": "日向",
        "enableDays": [
          3,
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費(初期～)：22号対水上電探\n消費(★6 ～)：32号対水上電探"
  },
  "25mm単装機銃": {
    "name": "25mm単装機銃",
    "icon": "対空機銃",
    "category": "机枪/高射装置",
    "detail": [
      {
        "assistant": "鬼怒改二",
        "enableDays": [
          4
        ]
      },
      {
        "assistant": "皐月",
        "enableDays": [
          0,
          5,
          6
        ]
      },
      {
        "assistant": "文月",
        "enableDays": [
          3,
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費：同装備\n⇒25mm連装機銃★+5"
  },
  "25mm連装機銃": {
    "name": "25mm連装機銃",
    "icon": "対空機銃",
    "category": "机枪/高射装置",
    "detail": [
      {
        "assistant": "五十鈴改二",
        "enableDays": [
          0,
          6
        ]
      },
      {
        "assistant": "鬼怒改二",
        "enableDays": [
          3
        ]
      },
      {
        "assistant": "皐月",
        "enableDays": [
          1,
          2
        ]
      },
      {
        "assistant": "文月",
        "enableDays": [
          0,
          1,
          2
        ]
      }
    ],
    "remark": "消費：同装備\n⇒25mm三連装機銃★+3"
  },
  "25mm三連装機銃": {
    "name": "25mm三連装機銃",
    "icon": "対空機銃",
    "category": "机枪/高射装置",
    "detail": [
      {
        "assistant": "摩耶",
        "enableDays": [
          2,
          3,
          4
        ]
      },
      {
        "assistant": "摩耶改二",
        "enableDays": [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "assistant": "五十鈴改二",
        "enableDays": [
          1,
          2,
          3
        ]
      },
      {
        "assistant": "鬼怒改二",
        "enableDays": [
          1,
          2
        ]
      },
      {
        "assistant": "皐月改二",
        "enableDays": [
          3,
          4
        ]
      }
    ],
    "remark": "消費：同装備\n⇒25mm三連装機銃 集中配備\n摩耶/摩耶改は更新不可"
  },
  "25mm三連装機銃 集中配備": {
    "name": "25mm三連装機銃 集中配備",
    "icon": "対空機銃",
    "category": "机枪/高射装置",
    "detail": [
      {
        "assistant": "摩耶改二",
        "enableDays": [
          2,
          3,
          4
        ]
      },
      {
        "assistant": "鬼怒改二",
        "enableDays": [
          0,
          5,
          6
        ]
      }
    ],
    "remark": "消費：25mm三連装機銃"
  },
  "91式高射装置": {
    "name": "91式高射装置",
    "icon": "高射装置",
    "category": "机枪/高射装置",
    "detail": [
      {
        "assistant": "摩耶 / 秋月",
        "enableDays": [
          0,
          1,
          5,
          6
        ]
      },
      {
        "assistant": "照月",
        "enableDays": [
          0,
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費：12.7cm連装高角砲\n消費(更新)：10cm連装高角砲\n⇒94式高射装置"
  },
  "94式高射装置": {
    "name": "94式高射装置",
    "icon": "高射装置",
    "category": "机枪/高射装置",
    "detail": [
      {
        "assistant": "秋月 / 照月",
        "enableDays": [
          0,
          1,
          2,
          3,
          4,
          5,
          6
        ]
      },
      {
        "assistant": "初月",
        "enableDays": [
          0,
          5,
          6
        ]
      },
      {
        "assistant": "吹雪改二",
        "enableDays": [
          0,
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費：10cm連装高角砲\n二番艦で更新先が分岐\n⇒10cm高角砲＋高射装置"
  },
  "九三式水中聴音機": {
    "name": "九三式水中聴音機",
    "icon": "ソナ｜",
    "category": "声纳/爆雷/潜水艇装备",
    "detail": [
      {
        "assistant": "五十鈴改二",
        "enableDays": [
          1
        ]
      },
      {
        "assistant": "夕張",
        "enableDays": [
          0,
          5,
          6
        ]
      }
    ],
    "remark": "消費：同装備\n二番艦で更新先が分岐\n※五十鈴改二では曜日で更新先が分岐\n⇒三式水中探信儀★+3"
  },
  "三式水中探信儀": {
    "name": "三式水中探信儀",
    "icon": "ソナ｜",
    "category": "声纳/爆雷/潜水艇装备",
    "detail": [
      {
        "assistant": "五十鈴改二",
        "enableDays": [
          0,
          2,
          3
        ]
      },
      {
        "assistant": "夕張",
        "enableDays": [
          2,
          3
        ]
      }
    ],
    "remark": "消費：同装備"
  },
  "四式水中聴音機": {
    "name": "四式水中聴音機",
    "icon": "ソナ｜",
    "category": "声纳/爆雷/潜水艇装备",
    "detail": [
      {
        "assistant": "五十鈴改二",
        "enableDays": [
          4,
          5,
          6
        ]
      },
      {
        "assistant": "香取改",
        "enableDays": [
          1,
          2
        ]
      },
      {
        "assistant": "秋月",
        "enableDays": [
          0
        ]
      },
      {
        "assistant": "照月",
        "enableDays": [
          3
        ]
      }
    ],
    "remark": "消費(初期～)：九三式水中聴音機\n消費(★6 ～)：四式水中聴音機"
  },
  "九四式爆雷投射機": {
    "name": "九四式爆雷投射機",
    "icon": "爆雷",
    "category": "声纳/爆雷/潜水艇装备",
    "detail": [
      {
        "assistant": "-",
        "enableDays": [
          3,
          4
        ]
      }
    ],
    "remark": "消費：同装備\n⇒三式爆雷投射機★+3"
  },
  "三式爆雷投射機": {
    "name": "三式爆雷投射機",
    "icon": "爆雷",
    "category": "声纳/爆雷/潜水艇装备",
    "detail": [
      {
        "assistant": "五十鈴改二",
        "enableDays": [
          3,
          4
        ]
      }
    ],
    "remark": "消費：同装備"
  },
  "潜水艦搭載電探＆水防式望遠鏡": {
    "name": "潜水艦搭載電探＆水防式望遠鏡",
    "icon": "潜水艦装備",
    "category": "声纳/爆雷/潜水艇装备",
    "detail": [
      {
        "assistant": "伊401",
        "enableDays": [
          1,
          2,
          3,
          4
        ]
      }
    ],
    "remark": "消費(初期～)：22号対水上電探\n消費(★6 ～)：熟練見張員"
  },
  "大発動艇": {
    "name": "大発動艇",
    "icon": "上陸用舟艇",
    "category": "登陆艇/探照灯/装甲带/轮机",
    "detail": [
      {
        "assistant": "あきつ丸",
        "enableDays": [
          0,
          1,
          2,
          3,
          4,
          5,
          6
        ]
      },
      {
        "assistant": "皐月改二",
        "enableDays": [
          0,
          1,
          2,
          3
        ]
      },
      {
        "assistant": "阿武隈改二",
        "enableDays": [
          0,
          1,
          5,
          6
        ]
      }
    ],
    "remark": "消費(初期～)：ドラム缶(輸送用)\n消費(★6 ～)：7.7mm機銃\n消費(更新)：12.7mm単装機銃\n二番艦で更新先が分岐\n⇒大発動艇(八九式中戦車＆陸戦隊)"
  },
  "大発動艇(八九式中戦車＆陸戦隊)": {
    "name": "大発動艇(八九式中戦車＆陸戦隊)",
    "icon": "上陸用舟艇",
    "category": "登陆艇/探照灯/装甲带/轮机",
    "detail": [
      {
        "assistant": "あきつ丸",
        "enableDays": [
          0,
          1,
          5,
          6
        ]
      },
      {
        "assistant": "皐月改二",
        "enableDays": [
          4,
          5,
          6
        ]
      },
      {
        "assistant": "阿武隈改二",
        "enableDays": [
          2,
          3,
          4
        ]
      }
    ],
    "remark": "消費(初期～)：25mm単装機銃\n消費(★6 ～)：12cm30連装噴進砲\n消費(更新)：7.7mm機銃\n⇒特二式内火艇"
  },
  "特大発動艇": {
    "name": "特大発動艇",
    "icon": "上陸用舟艇",
    "category": "登陆艇/探照灯/装甲带/轮机",
    "detail": [
      {
        "assistant": "鬼怒改二",
        "enableDays": [
          0,
          1,
          5,
          6
        ]
      },
      {
        "assistant": "あきつ丸",
        "enableDays": [
          2,
          3,
          4
        ]
      }
    ],
    "remark": "消費(初期～)：ドラム缶(輸送用)\n消費(★6 ～)：大発動艇"
  },
  "特二式内火艇": {
    "name": "特二式内火艇",
    "icon": "上陸用舟艇",
    "category": "登陆艇/探照灯/装甲带/轮机",
    "detail": [
      {
        "assistant": "伊58",
        "enableDays": [
          0,
          1,
          5,
          6
        ]
      },
      {
        "assistant": "伊8",
        "enableDays": [
          3,
          4,
          5,
          6
        ]
      },
      {
        "assistant": "伊401",
        "enableDays": [
          1,
          2,
          3,
          4
        ]
      }
    ],
    "remark": "消費(初期～)：7.7mm機銃\n消費(★6 ～)：12.7mm単装機銃"
  },
  "探照灯": {
    "name": "探照灯",
    "icon": "探照灯",
    "category": "登陆艇/探照灯/装甲带/轮机",
    "detail": [
      {
        "assistant": "暁",
        "enableDays": [
          4,
          5,
          6
        ]
      },
      {
        "assistant": "神通",
        "enableDays": [
          0,
          5,
          6
        ]
      },
      {
        "assistant": "青葉 / 綾波",
        "enableDays": [
          1,
          2,
          3
        ]
      }
    ],
    "remark": "消費：同装備\n消費(更新)：熟練見張員\n⇒96式150cm探照灯"
  },
  "96式150cm探照灯": {
    "name": "96式150cm探照灯",
    "icon": "探照灯",
    "category": "登陆艇/探照灯/装甲带/轮机",
    "detail": [
      {
        "assistant": "比叡",
        "enableDays": [
          0,
          1,
          5,
          6
        ]
      },
      {
        "assistant": "霧島",
        "enableDays": [
          2,
          3,
          4,
          5
        ]
      }
    ],
    "remark": "消費：探照灯"
  },
  "増設バルジ(中型艦)": {
    "name": "増設バルジ(中型艦)",
    "icon": "バルジ",
    "category": "登陆艇/探照灯/装甲带/轮机",
    "detail": [
      {
        "assistant": "Верный",
        "enableDays": [
          0,
          1,
          2,
          3
        ]
      },
      {
        "assistant": "酒匂",
        "enableDays": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "assistant": "Zara due",
        "enableDays": [
          1,
          2,
          3
        ]
      }
    ],
    "remark": "消費：同装備\n消費(更新)：同装備\n⇒艦本新設計 増設バルジ(中型艦)"
  },
  "艦本新設計 増設バルジ(中型艦)": {
    "name": "艦本新設計 増設バルジ(中型艦)",
    "icon": "バルジ",
    "category": "登陆艇/探照灯/装甲带/轮机",
    "detail": [
      {
        "assistant": "Zara due",
        "enableDays": [
          2,
          3,
          4
        ]
      }
    ],
    "remark": "消費：増設バルジ(中型艦)"
  },
  "増設バルジ(大型艦)": {
    "name": "増設バルジ(大型艦)",
    "icon": "バルジ",
    "category": "登陆艇/探照灯/装甲带/轮机",
    "detail": [
      {
        "assistant": "長門",
        "enableDays": [
          4,
          5,
          6
        ]
      },
      {
        "assistant": "武蔵",
        "enableDays": [
          4,
          5,
          6
        ]
      }
    ],
    "remark": "消費(初期～)：増設バルジ(中型艦)\n消費(★6 ～)：同装備\n消費(更新)：同装備\n⇒艦本新設計 増設バルジ(大型艦)"
  },
  "艦本新設計 増設バルジ(大型艦)": {
    "name": "艦本新設計 増設バルジ(大型艦)",
    "icon": "バルジ",
    "category": "登陆艇/探照灯/装甲带/轮机",
    "detail": [
      {
        "assistant": "大和",
        "enableDays": [
          0,
          6
        ]
      },
      {
        "assistant": "武蔵",
        "enableDays": [
          0,
          2
        ]
      }
    ],
    "remark": "消費：増設バルジ(大型艦)"
  },
  "強化型艦本式缶": {
    "name": "強化型艦本式缶",
    "icon": "機関部強化",
    "category": "登陆艇/探照灯/装甲带/轮机",
    "detail": [
      {
        "assistant": "天津風",
        "enableDays": [
          0,
          1,
          2,
          3,
          4,
          5,
          6
        ]
      },
      {
        "assistant": "島風",
        "enableDays": [
          2,
          3
        ]
      }
    ],
    "remark": "消費(初期～)：改良型艦本式タービン\n消費(★6 ～)：同装備\n消費(更新)：同装備\n⇒新型高温高圧缶"
  },
  "新型高温高圧缶": {
    "name": "新型高温高圧缶",
    "icon": "機関部強化",
    "category": "登陆艇/探照灯/装甲带/轮机",
    "detail": [
      {
        "assistant": "天津風改",
        "enableDays": [
          2,
          3,
          4
        ]
      },
      {
        "assistant": "島風",
        "enableDays": [
          1,
          2,
          5
        ]
      }
    ],
    "remark": "消費(初期～)：改良型艦本式タービン\n消費(★6 ～)：強化型艦本式缶"
  }
};