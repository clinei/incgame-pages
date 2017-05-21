/**
@file Player class
*/

/**
Represents a player
*/
class Player {
	constructor() {
		this.items = new Map;
	}
	/**
	Adds an item to the player's inventory
	@param {Item} item - the item to add to the player
	@param {Integer} [count=1] - how many of that item to add
	*/
	addItem(item, count = 1) {
		let oldCount = this.items.get(item);
		if (!oldCount) {
			oldCount = 0;
		}

		const newCount = oldCount + count;
		this.items.set(item, newCount);

		return newCount;
	}
}
