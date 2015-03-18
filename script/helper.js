(function() {
	var checkboxSts = loadCheckboxSts();

	renderingSelectPart(checkboxSts);

	$('input[type=checkbox]').on('change', report);
})();

function renderingSelectPart(checkboxSts) {
	var $tar = $('.g-mn');

	var categoryNames = kanColle.remodel.categoryNameList;
	var begin = 0;
	for (var i in categoryNames) {

		var cName = categoryNames[i];
		var cSize = kanColle.remodel.calcCategorySize(cName);

		var end = begin + cSize;
		var categoryStsStr = checkboxSts.substring(begin, end);
		begin = end;

		//console.log('categoryName : ' + cName + '\n' + 'categoryStsStr : ' + categoryStsStr);
		var category = new Category(cName, categoryStsStr);
		var cDom = category.build();

		$tar.append(cDom);
	}

	$('.name').on('click', function() {

		var $thisNext = $(this).next();

		$('ol').not($thisNext).hide(250);
		$thisNext.toggle(250);
	});
}

function loadCheckboxSts() {

	var storage = getLocalStorage();
	var restoredSts = storage.getItem('checkedSts');
	if (!restoredSts) {
		restoredSts = kanColle.remodel.calcDefaultSts();
	}
	return restoredSts;
}

function getLocalStorage() {

	if (typeof localStorage == 'object') {
		return localStorage;
	} else if (typeof globalStorage == 'object') {
		return globalStorage[location.host];
	} else {
		throw new Error('本浏览器不支持本次存储功能，勾选的改修装备暂无法存储');
	}
}

var checkedEquips, availiableEquips;
function report() {

	checkedEquips = [];
	availiableEquips = [];
	var checkedSts = '';
	var now = new Date();

	var today = getWeekdayInJapan();
	var tomorrow = today + 1;

	function getWeekdayInJapan() {

		Date.prototype.getDateInJapan = function() {

			return new Date(
				this.getUTCFullYear(),
				this.getUTCMonth(),
				this.getUTCDate(),
				this.getUTCHours() + 9,
				this.getUTCMinutes(),
				this.getUTCSeconds()
			);
		};

		var japanDate = new Date().getDateInJapan();

		return japanDate.getDay();
	}

	$('input[type=checkbox]').each(function() {

		if (this.checked) {
			checkedSts += 1;
			record(this);
		} else {
			checkedSts += 0;
		}
	});

	saveCheckedSts();

	function saveCheckedSts() {
		var storage = getLocalStorage();
		storage.setItem('checkedSts', checkedSts);
	}

	var report = '';
	report += '可改修装备 :\n\n' + generateAssistShipsReport(availiableEquips);

	report = report.replace(/\n/g, '<br>');
	report = report.replace(/\t/g, '||');

	$('.g-sd').html(report);

	// console.log('勾选装备序列 : ' + checkedSts + '\n\t\t' + storage.getItem('checkedSts'));

	function generateAssistShipsReport(array) {

		if (array.length === 0) {
			return '今日没有可以改修的装备';
		}

		//var title = '可改修装备有 ' + array.length + ' 个\n';

		var content = [];
		for (var i in array) {

			var arr = array[i];
			var name = arr.name;
			var ships = arr.assistShips;

			var oneLineText = '&emsp;' + name + '\t' + ships;
			content.push(oneLineText);
		}

		var sum = content.join('\n\n');

		return sum;
	}

	function record(selectedElement) {
		var name = selectedElement.value;
		checkedEquips.push(name);

		var assistShips = canRemodelToday(name);
		if (assistShips.length > 0) {
			var o = {};
			o.name = name;
			o.assistShips = assistShips;
			availiableEquips.push(o);
		}

		/*
		 *  根据'装备名称', 计算该装备今天是否能够改修
		 *  如果能够改修, 将二号舰的名称, 以及对应的装备名称封装起来返回
		 */
		function canRemodelToday(name) {
			var equip = kanColle.remodel.extractEquip(name);
			var remodelDetails = equip.detail;

			var assistShips = [];

			/*
			 *  Equip(*name*)之中的details部分, 可能拥有多个符合判定条件的船只, 因此使用Loop方式进行逐个检查
			 */
			for (var i in remodelDetails) {

				var d = remodelDetails[i];

				if ($.inArray(today, d.enableDays) > -1) {

					var assistShip = formatAssistShip(d.assistant);

					assistShips.push(assistShip);
				}
			}

			return assistShips.join(', ');

			function formatAssistShip(ship) {

				var shipName;

				if (ship === '-') {
					shipName = '无需协助舰娘';
				} else {
					shipName = ship;
				}
				return shipName;
			}
		}
	}
}