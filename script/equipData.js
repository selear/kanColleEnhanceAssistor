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
        'default': 'default',
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
        '水上爆撃機': 'sea-plane-recon',
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
        '特二式内火艇': 'amphibious-landing-craft',

        // groupName
        '小口径主炮/鱼雷'           : 'main-cannon-light',
        '中口径主炮/副炮'           : 'main-cannon-medium',
        '大口径主炮/强化弹'         : 'main-cannon-heavy',
        '舰战'                      : 'carrier-fighter',
        '舰爆/舰侦'                 : 'carrier-dive-bomber',
        '水侦/水战/水爆'                 : 'sea-plane-recon',
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
      '大口径主炮/强化弹', '舰战', '舰爆/舰侦', '水侦/水战/水爆', '电探',
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
    ]
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
    ]
  },
  "10cm高角砲＋高射装置": {
    "name": "10cm高角砲＋高射装置",
    "icon": "高角砲",
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
    ]
  },
  "61cm三連装魚雷": {
    "name": "61cm三連装魚雷",
    "icon": "魚雷",
    "category": "小口径主炮/鱼雷",
    "detail": [
      {
        "assistant": "吹雪*25",
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
          1,
          5,
          6
        ]
      }
    ]
  },
  "15.5cm三連装砲改": {
    "name": "15.5cm三連装砲改",
    "icon": "中口径主砲",
    "category": "中口径主炮/副炮",
    "detail": [
      {
        "assistant": "大淀改",
        "enableDays": [
          0,
          5,
          6
        ]
      }
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  },
  "90mm単装高角砲": {
    "name": "90mm単装高角砲",
    "icon": "高角砲",
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
    ]
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
    ]
  },
  "15.5cm三連装副砲": {
    "name": "15.5cm三連装副砲",
    "icon": "副砲",
    "category": "中口径主炮/副炮",
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
          5,
          6
        ]
      },
      {
        "assistant": "武蔵改",
        "enableDays": [
          5,
          6
        ]
      }
    ]
  },
  "15.5cm三連装副砲改": {
    "name": "15.5cm三連装副砲改",
    "icon": "副砲",
    "category": "中口径主炮/副炮",
    "detail": [
      {
        "assistant": "大和改",
        "enableDays": [
          5,
          6
        ]
      },
      {
        "assistant": "武蔵改",
        "enableDays": [
          0,
          1
        ]
      }
    ]
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
    ]
  },
  "12.7cm連装高角砲": {
    "name": "12.7cm連装高角砲",
    "icon": "高角砲",
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
    ]
  },
  "8cm高角砲": {
    "name": "8cm高角砲",
    "icon": "高角砲",
    "category": "中口径主炮/副炮",
    "detail": [
      {
        "assistant": "鈴谷改二",
        "enableDays": [
          2,
          3,
          4
        ]
      },
      {
        "assistant": "熊野改二",
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
      }
    ]
  },
  "8cm高角砲改＋増設機銃": {
    "name": "8cm高角砲改＋増設機銃",
    "icon": "高角砲",
    "category": "中口径主炮/副炮",
    "detail": [
      {
        "assistant": "鈴谷改二",
        "enableDays": [
          2,
          3,
          4
        ]
      },
      {
        "assistant": "熊野改二",
        "enableDays": [
          1,
          2,
          3
        ]
      },
      {
        "assistant": "矢矧 / 酒匂",
        "enableDays": [
          2,
          3,
          4
        ]
      }
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  },
  "41cm三連装砲改": {
    "name": "41cm三連装砲改",
    "icon": "大口径主砲",
    "category": "大口径主炮/强化弹",
    "detail": [
      {
        "assistant": "長門改二",
        "enableDays": [
          1,
          2,
          3
        ]
      }
    ]
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
    ]
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
    ]
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
    ]
  },
  "46cm三連装砲": {
    "name": "46cm三連装砲",
    "icon": "大口径主砲",
    "category": "大口径主炮/强化弹",
    "detail": [
      {
        "assistant": "大和",
        "enableDays": [
          2,
          3,
          4,
          5,
          6
        ]
      },
      {
        "assistant": "大和改",
        "enableDays": [
          2,
          3,
          4
        ]
      },
      {
        "assistant": "武蔵",
        "enableDays": [
          0,
          1
        ]
      }
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  },
  "零式艦戦62型(爆戦)": {
    "name": "零式艦戦62型(爆戦)",
    "icon": "艦上爆撃機",
    "category": "舰爆/舰侦",
    "detail": [
      {
        "assistant": "翔鶴鈴谷航改二",
        "enableDays": [
          0,
          1
        ]
      },
      {
        "assistant": "隼鷹",
        "enableDays": [
          0,
          5,
          6
        ]
      }
    ]
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
    ]
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
      },
      {
        "assistant": "熊野航改二",
        "enableDays": [
          2,
          3,
          4,
          5
        ]
      }
    ]
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
    ]
  },
  "零式水上偵察機": {
    "name": "零式水上偵察機",
    "icon": "水上偵察機",
    "category": "水侦/水战/水爆",
    "detail": [
      {
        "assistant": "千歳甲*27",
        "enableDays": [
          5,
          6
        ]
      },
      {
        "assistant": "千代田甲*28",
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
    ]
  },
  "零式水上観測機": {
    "name": "零式水上観測機",
    "icon": "水上偵察機",
    "category": "水侦/水战/水爆",
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
    ]
  },
  "九八式水上偵察機(夜偵)": {
    "name": "九八式水上偵察機(夜偵)",
    "icon": "水上偵察機",
    "category": "水侦/水战/水爆",
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
    ]
  },
  "Ro.43水偵": {
    "name": "Ro.43水偵",
    "icon": "水上偵察機",
    "category": "水侦/水战/水爆",
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
        "assistant": "Zara改*29",
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
    ]
  },
  "二式水戦改": {
    "name": "二式水戦改",
    "icon": "水上戦闘機",
    "category": "水侦/水战/水爆",
    "detail": [
      {
        "assistant": "瑞穂",
        "enableDays": [
          0,
          5,
          6
        ]
      }
    ]
  },
  "二式水戦改(熟練)": {
    "name": "二式水戦改(熟練)",
    "icon": "水上戦闘機",
    "category": "水侦/水战/水爆",
    "detail": [
      {
        "assistant": "瑞穂",
        "enableDays": [
          0,
          5,
          6
        ]
      }
    ]
  },
  "強風改": {
    "name": "強風改",
    "icon": "水上戦闘機",
    "category": "水侦/水战/水爆",
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
        "assistant": "鈴谷改二*30",
        "enableDays": [
          1,
          2,
          3,
          4
        ]
      }
    ]
  },
  "Ro.44水上戦闘機": {
    "name": "Ro.44水上戦闘機",
    "icon": "水上戦闘機",
    "category": "水侦/水战/水爆",
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
    ]
  },
  "Ro.44水上戦闘機bis": {
    "name": "Ro.44水上戦闘機bis",
    "icon": "水上戦闘機",
    "category": "水侦/水战/水爆",
    "detail": [
      {
        "assistant": "Zara due",
        "enableDays": [
          5,
          6
        ]
      }
    ]
  },
  "瑞雲": {
    "name": "瑞雲",
    "icon": "水上爆撃機",
    "category": "水侦/水战/水爆",
    "detail": [
      {
        "assistant": "伊勢改日向改",
        "enableDays": [
          0,
          5,
          6
        ]
      },
      {
        "assistant": "最上改",
        "enableDays": [
          1,
          2,
          3,
          4
        ]
      }
    ]
  },
  "瑞雲(六三四空)": {
    "name": "瑞雲(六三四空)",
    "icon": "水上爆撃機",
    "category": "水侦/水战/水爆",
    "detail": [
      {
        "assistant": "伊勢改日向改",
        "enableDays": [
          0,
          5,
          6
        ]
      }
    ]
  },
  "瑞雲(六三四空／熟練)": {
    "name": "瑞雲(六三四空／熟練)",
    "icon": "水上爆撃機",
    "category": "水侦/水战/水爆",
    "detail": [
      {
        "assistant": "日向改",
        "enableDays": [
          0,
          5,
          6
        ]
      }
    ]
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
    ]
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
    ]
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
        "assistant": "日向改",
        "enableDays": [
          1
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
    ]
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
    ]
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
        "assistant": "伊勢改",
        "enableDays": [
          1
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
      },
      {
        "assistant": "日向改",
        "enableDays": [
          3,
          4
        ]
      }
    ]
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
          4
        ]
      },
      {
        "assistant": "武蔵",
        "enableDays": [
          2,
          3,
          4
        ]
      }
    ]
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
      },
      {
        "assistant": "日向改",
        "enableDays": [
          1,
          2
        ]
      }
    ]
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
      },
      {
        "assistant": "日向改",
        "enableDays": [
          3,
          4
        ]
      }
    ]
  },
  "25mm単装機銃": {
    "name": "25mm単装機銃",
    "icon": "対空機銃",
    "category": "机枪/高射装置",
    "detail": [
      {
        "assistant": "鬼怒",
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
    ]
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
        "assistant": "鬼怒",
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  },
  "大発動艇": {
    "name": "大発動艇",
    "icon": "上陸用舟艇",
    "category": "登陆艇/探照灯/装甲带/轮机",
    "detail": [
      {
        "assistant": "阿武隈改二",
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
          0,
          1,
          2,
          3
        ]
      },
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
      }
    ]
  },
  "大発動艇(八九式中戦車＆陸戦隊)": {
    "name": "大発動艇(八九式中戦車＆陸戦隊)",
    "icon": "上陸用舟艇",
    "category": "登陆艇/探照灯/装甲带/轮机",
    "detail": [
      {
        "assistant": "阿武隈改二",
        "enableDays": [
          2,
          3,
          4
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
        "assistant": "あきつ丸",
        "enableDays": [
          0,
          1,
          5,
          6
        ]
      }
    ]
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
    ]
  },
  "特二式内火艇": {
    "name": "特二式内火艇",
    "icon": "特二式内火艇",
    "category": "登陆艇/探照灯/装甲带/轮机",
    "detail": [
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
        "assistant": "伊58",
        "enableDays": [
          0,
          1,
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
    ]
  },
  "探照灯": {
    "name": "探照灯",
    "icon": "探照灯",
    "category": "登陆艇/探照灯/装甲带/轮机",
    "detail": [
      {
        "assistant": "青葉 / 綾波",
        "enableDays": [
          1,
          2,
          3
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
        "assistant": "暁",
        "enableDays": [
          4,
          5,
          6
        ]
      }
    ]
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
    ]
  },
  "増設バルジ(中型艦)": {
    "name": "増設バルジ(中型艦)",
    "icon": "バルジ",
    "category": "登陆艇/探照灯/装甲带/轮机",
    "detail": [
      {
        "assistant": "Zara due",
        "enableDays": [
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
        "assistant": "Верный",
        "enableDays": [
          0,
          1,
          2,
          3
        ]
      }
    ]
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
    ]
  },
  "増設バルジ(大型艦)": {
    "name": "増設バルジ(大型艦)",
    "icon": "バルジ",
    "category": "登陆艇/探照灯/装甲带/轮机",
    "detail": [
      {
        "assistant": "長門 / 武蔵",
        "enableDays": [
          4,
          5,
          6
        ]
      },
      {
        "assistant": "陸奥 / 大和",
        "enableDays": [
          3,
          4,
          5
        ]
      }
    ]
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
    ]
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
    ]
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
    ]
  }
};