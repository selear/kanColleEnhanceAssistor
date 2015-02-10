/*
 *	equipObj通过kanColle.remodel.extractEquip('装备名称')的方式获取
 *	new Equip(equipObj).buildListElem()
 */
function Equip(equipObj) {
	/*	[prototype] properties & functions
		CLASS_HANDLE,
		CLASS_EQUIP_ICON,
		CLASS_EQUIP_NAME,
		buildListElem()
	*/

	this.clazz = equipObj.clazz;
	this.name = equipObj.name;
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
	CLASS_HANDLE : 'drag-handle',
	CLASS_EQUIP_ICON : 'equip-icon',
	CLASS_EQUIP_NAME : 'equip-name',
	HANDLE_SYMBOL : '☰',
	buildHandle : function() {
		var elem = document.createElement('span');
		elem.classList.add(this.CLASS_HANDLE);
		elem.textContent = this.HANDLE_SYMBOL;
		return elem;
	},

	buildIcon : function() {
		var elem = document.createElement('span');
		elem.classList.add(this.CLASS_EQUIP_ICON);
		elem.classList.add(this.clazz);

		return elem;
	},

	buildName : function() {
		var elem = document.createElement('span');
		elem.classList.add(this.CLASS_EQUIP_NAME);
		elem.textContent = this.name;

		return elem;
	},

	buildContainer : function() {
		var elem = document.createElement('div');
		elem.appendChild(this.buildHandle());
		elem.appendChild(this.buildIcon());
		elem.appendChild(this.buildName());

		return elem;
	},

	buildListElem : function() {
		var elem = document.createElement('li');
		elem.appendChild(this.buildContainer());

		return elem;
	}
};