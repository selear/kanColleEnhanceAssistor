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

