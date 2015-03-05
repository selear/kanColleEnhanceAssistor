(function() {
    console.log('KanColle remodel Helper is ready.');
})();

QUnit.test('extractEquip([name]), 根据装备名称提取数据', function(assert) {

    function searchEquip(name) {
        var equip = kanColle.remodel.extractEquip(name);
        return equip.name;
    }

    var equipNames = ['12.7cm連装砲', '12.7cm連装砲B型改二', '25mm連装機銃', '25mm三連装機銃', 'unknow equipname', '91式高射装置'];

    var size = equipNames.length;
    for (var i = 0; i < size; i++) {
        assert.equal(searchEquip(equipNames[i]), equipNames[i]);
    }
});

QUnit.test('searchEquipnamesByCategory([name]), 根据类别名称获取该类别下的所有装备名称', function(assert) {

    function searchCategoryEquips(name) {
        var equips = kanColle.remodel.searchEquipnamesByCategory(name);
        return equips;
    }

    var lightCannon = ['12.7cm連装砲', '12.7cm連装砲B型改二', '10cm高角砲＋高射装置'];
    var mediumCannon = ['14cm単装砲', '14cm連装砲', '20.3cm連装砲', '20.3cm(2号)連装砲', '20.3cm(3号)連装砲'];
    var heavyCannon = ['35.6cm連装砲', '41cm連装砲'];
    var antiAirGun = ['25mm連装機銃', '25mm三連装機銃'];
    var anitAirDirector = ['91式高射装置', '94式高射装置'];
    var torpedo = ['61cm四連装魚雷', '61cm四連装(酸素)魚雷', '61cm五連装(酸素)魚雷'];
    var antiSubWeapon = ['九四式爆雷投射機', '三式爆雷投射機'];
    var soner = [];
    assert.deepEqual(searchCategoryEquips('小口径主砲'), lightCannon);
    assert.deepEqual(searchCategoryEquips('中口径主砲'), mediumCannon);
    assert.deepEqual(searchCategoryEquips('大口径主砲'), heavyCannon);
    assert.deepEqual(searchCategoryEquips('対空機銃'), antiAirGun);
    assert.deepEqual(searchCategoryEquips('高射装置'), anitAirDirector);
    assert.deepEqual(searchCategoryEquips('魚雷'), torpedo);
    assert.deepEqual(searchCategoryEquips('爆雷'), antiSubWeapon);
    assert.deepEqual(searchCategoryEquips('聲納'), soner);
});

QUnit.test('Category([name]).build(), 能否生成相关HTML元素', function(assert) {

    var categoryNames = ['小口径主砲', '中口径主砲', '大口径主砲', '対空機銃',
        '高射装置', '魚雷', '爆雷'];
    var index;
    for (index in categoryNames) {
        var name = categoryNames[index];
        var category = new Category(name);

        var elem = category.build();

        var $elem = $(elem);
        var temp_01 = $elem.find('.name');

        var text = temp_01[0].textContent;

        console.log(name + ', ' + text);
        assert.equal(name, text);
    }
});