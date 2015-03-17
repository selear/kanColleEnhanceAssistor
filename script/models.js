/*
 *	equipObj通过kanColle.remodel.extractEquip('装备名称')的方式获取
 *	new Equip(equipObj).buildListElem()
 */

function Category(name, checkedStsArray) {

	this.equipNames = kanColle.remodel.searchEquipnamesByCategory(name);
	this.name = name;
	this.iconClass = kanColle.remodel.searchCategoryIconClazzByName(name);
	this.checkedStsArray = checkedStsArray;
};

Category.prototype = {

	icon: 'category-icon',
	displayNone: 'f-dn',
	textLeft: 'f-tal',
	textFont: 'f-ff1',
	textBold: 'f-fwb',

	//创建包含所有装备的类别 
	buildContainer: function() {
		return document.createElement('div');
	},

	buildIcon: function() {
		var icon = document.createElement('span');
		icon.classList.add('icon');
	},

	buildTitle: function() {

		var title = document.createElement('div');

		var icon = buildIcon(this);
		var name = buildText(this);

		title.classList.add('name');
		title.classList.add(this.textLeft);
		title.classList.add(this.textFont);
		title.classList.add(this.textBold);

		title.appendChild(icon);
		title.appendChild(name);

		return title;

		function buildIcon(that) {
			var icon = document.createElement('span');
			icon.classList.add(that.icon);
			icon.classList.add(that.iconClass);

			return icon;
		}

		function buildText(that) {
			var name = document.createElement('span');
			name.textContent = that.name;

			return name;
		}
	},

	buildList: function() {
		var equip, i, list, names; //, curIndex;
		list = document.createElement('ol');
		list.classList.add(this.displayNone);
		list.classList.add('u-menu');
		names = this.equipNames;

		for (i in names) {

			var listItem = buildEquip(names[i], this.checkedStsArray[i]);
			list.appendChild(listItem);
		}

		return list;

		function buildEquip(equipName, sts) {
			var equip = new Equip(equipName, sts);
			return equip.build();
		}
	},


	build: function() {
		var container = this.buildContainer();
		container.appendChild(this.buildTitle());
		container.appendChild(this.buildList());

		return container;
	}
};

function Equip(name, checked) {
	/*	[prototype] properties & functions
		CLASS_HANDLE,
		CLASS_EQUIP_ICON,
		CLASS_EQUIP_NAME,
		buildListElem()
	*/

	var equip = kanColle.remodel.extractEquip(name);
	this.name = equip.name;
	this.clazz = equip.clazz;
	this.checked = checked;
};

Equip.prototype = {

	icon: 'equip-icon',
	textFont: 'f-ff1',
	textRight: 'f-fr',

	buildName: function() {
		var name = document.createElement('span');

		var icon = buildIcon(this);
		var text = buildText(this);

		
		name.appendChild(icon);
		name.appendChild(text);

		return name;

		function buildIcon(that) {

			var icon = document.createElement('span');
			icon.classList.add(that.icon);
			icon.classList.add(that.clazz);

			return icon;
		}

		function buildText(that) {

			var text = document.createElement('span');
			text.textContent = that.name;
			return text;
		}
	},

	buildCheck: function() {

		var input = document.createElement('input');
		input.type = 'checkbox';
		input.value = this.name;
		if (this.checked == 1) {
			input.checked = true;
		} else {
			input.checked = false;
		}

		input.classList.add(this.textRight);

		return input;
	},

	build: function() {
		var item = document.createElement('li');

		var label = document.createElement('label');

		label.appendChild(this.buildName());
		label.appendChild(this.buildCheck());

		item.appendChild(label);

		return item;
	}
};