/**
@file System class
*/

/**
Facade and Controller
@members todo
@todo add members documentation
*/
class System {
	/**
	Initializes the System and renders game items to the DOM
	@param {Player} player - the player the System interacts with
	@param {ItemSpec[]} [itemSpecs=incGame.itemSpecs] - the specifications from which to construct and display Items
	*/
	constructor(player, itemSpecs = incGame.itemSpecs) {
		this.player = player;

		this.target = document.body;

		this.items = Item.createItems(itemSpecs);
		this.renderAllItems();
	}
	/**
	Adds an item to the System
	@param {Item} item - item to add
	*/
	addItem(item) {
		this.items.add(item);
	}
	/**
	Renders an item to the current target (`document.body` by default)
	@param {Item} item - item to render
	*/
	renderItem(item) {
		if (this.target.contains(item.elem)) {
			this.target.removeChild(item.elem);
		}
		item.render();
		this.linkItem(item);
		this.target.appendChild(item.elem);
	}
	/**
	Renders all items that have been added to the System to the current target
	*/
	renderAllItems() {
		for (const item of this.items) {
			this.renderItem(item);
		}
	}
	/**
	Starts an activity that will yield one item to the Player
	@param {Item} item - item to link
	*/
	startItem(item) {
		const that = this;

		for (const elem of document.getElementsByClassName("clickable")) {
			elem.disabled = true;
		}

		const progress = item.progressBar.progress;
		progress.elem.style.transition = `width ${item.time}ms linear`;
		progress.elem.style.width = "100%";

		setTimeout(() => {
			const buttonDeactivateEvent = new CustomEvent('deactivate', {detail: {button: item.button}});
			item.button.dispatchEvent(buttonDeactivateEvent);
			// setTimeout(() => this.dispatchEvent(event), 1000);
			for (const elem of document.getElementsByClassName("clickable")) {
				elem.disabled = false;
			}
			progress.elem.style = "width 0%";

			const newCount = that.player.addItem(item);
			document.getElementById("points").innerHTML = newCount;
		}, item.time);
	}
	/**
	@todo document
	*/
	linkItem(item) {
		item.button.addEventListener('activate', () => this.startItem(item));
	}
}

/**
Describes an Item, is used to construct Items
*/
class ItemSpec {
	/**
	@param {String} name - name of the item
	@param {Integer} baseTime - time in milliseconds to gain one item before upgrades
	@param {Integer} baseCost - how much money player must pay before they can access the item 
	*/
	constructor(name, baseTime, baseCost) {
		this.name = name;
		this.baseTime = baseTime;
		this.baseCost = baseCost;
	}
}

incGame.itemSpecs = [
	new ItemSpec("Dave", 1000, 0),
	new ItemSpec("Stav", 5000, 10),
	new ItemSpec("Trav", 20000, 50)
];