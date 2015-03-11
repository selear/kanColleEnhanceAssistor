/*
 *	equipObj通过kanColle.remodel.extractEquip('装备名称')的方式获取
 *	new Equip(equipObj).buildListElem()
 */

function Category(name) {

	this.equipNames = kanColle.remodel.searchEquipnamesByCategory(name);
	this.name = name;
};

Category.prototype = {

	//创建包含所有装备的类别 
	buildContainer: function() {
		return document.createElement('div');
	},

	buildTitle: function() {
		var nameDiv = document.createElement('div');
		nameDiv.classList.add('name');
		nameDiv.textContent = this.name;
		return nameDiv;
	},

	buildList: function() {
		var equip, index, list, names;
		list = document.createElement('ol');
		names = this.equipNames;

		for (index in names) {
			var listItem = buildEquip(names[index]);
			list.appendChild(listItem);
		}

		return list;

		function buildEquip(equipName) {
			var equip = new Equip(equipName);
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

function Equip(name) {
	/*	[prototype] properties & functions
		CLASS_HANDLE,
		CLASS_EQUIP_ICON,
		CLASS_EQUIP_NAME,
		buildListElem()
	*/

	var equip = kanColle.remodel.extractEquip(name);
	this.name = equip.name;
};

/*	Equip sample in [HTML]
	<li>
		<div>
			<span class="drag-handle">☰</span>
			<span class="equip-icon anit-sub-weapon"></span>
			<span class="equip-name">暴雷</span>
		</div>
	</li>
*/
Equip.prototype = {

	buildName: function() {
		var elem = document.createElement('span');
		//	elem.classList.add(this.CLASS_EQUIP_NAME);
		elem.textContent = this.name;

		return elem;
	},

	buildCheck: function() {
		var checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.value = this.name;

		return checkbox;
	},

	build: function() {
		var item = document.createElement('li');

		/*item.id = this.id;*/

		item.appendChild(this.buildName());
		item.appendChild(this.buildCheck());

		return item;
	}
};