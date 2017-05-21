/**
@file graphical user interface components
*/

/**
Interface for composing graphical interfaces
*/
class Renderable {
	/**
	@returns this
	*/
	render() {
		throw new Error("Abstract function, must be overridden");
	}
}

/**
A graphical interface to create more of a type of Item
@extends Renderable
*/
class Item {
	/**
	@param {ItemSpec} itemSpec - spec from which to create item from
	*/
	constructor(itemSpec) {
		this.itemSpec = itemSpec;
		this.button = new Button(this.itemSpec.name);
		this.progressBar = new ProgressBar;
	}
	/**
	Returns the time in milliseconds it takes to create one of this item
	@todo use current time
	@returns {Integer}
	*/
	get time() {
		return this.itemSpec.baseTime;
	}
	render() {
		const elem = document.createElement('div');
		elem.classList.add("item");
		elem.appendChild(this.button.render().elem);
		elem.appendChild(this.progressBar.render().elem);
		elem._controller = this;

		this.elem = elem;
		return this;
	}
	/**
	@param {ItemSpec[]} itemSpecs - array of specs to create items from
	@returns {Item[]}
	*/
	static createItems(itemSpecs) {
		const items = new Set;
		for (const itemSpec of itemSpecs) {
			items.add(new Item(itemSpec));
		}
		return items;
	}
}

/**
Represents a button primitive
@extends Emitter
@extends Renderable
@listens activate
@listens deactivate
*/
class Button extends Emitter {
	constructor(text) {
		super();

		this.text = text;

		this.addEventListener('activate', (evt) => {
			evt.detail.button.elem.classList.add("active");
		});
		this.addEventListener('deactivate', (evt) => {
			evt.detail.button.elem.classList.remove("active");
		});
	}
	render() {
		const elem = document.createElement('button');
		elem._controller = this;
		// TODO: combine, maybe using inheritance?
		elem.classList.add("button");
		elem.classList.add("clickable");
		elem.appendChild(document.createTextNode(this.text));
		elem.addEventListener('mousedown', (evt) => {
			const that = evt.target._controller;
			if (evt.button === 0) {
				const event = new CustomEvent('activate', {detail: {button: that}});
				// TODO: find a better solution that a magic number
				setTimeout(() => this.dispatchEvent(event), 100);
			}
		});

		this.elem = elem;
		return this;
	}
}

/**
Represents a progress bar primitive
@extends Renderable
*/
class ProgressBar {
	render() {
		const elem = document.createElement('div');
		elem._controller = this;
		elem.classList.add("progressBar");

		const progress = new Progress;
		elem.appendChild(progress.elem);

		this.elem = elem;
		this.progress = progress;
		return this;
	}
}
/**
Dynamic part of ProgressBar, do not use elsewhere
@extends Renderable
*/
class Progress {
	constructor() {
		this.render();
	}
	render() {
		const elem = document.createElement('div');
		elem._controller = this;
		elem.classList.add("progress");

		this.elem = elem;
		return this;
	}
}
