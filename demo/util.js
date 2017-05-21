/**
@file utilities useful for other modules
*/

/**
@implements EventTarget
*/
class Emitter {
	constructor() {
		this.listeners = new Map;
	}
	addEventListener(type, callback) {
		let typedListeners;
		if (!this.has(type)) {
			typedListeners = new Set;
			this.listeners.set(type, typedListeners);
		} else {
			typedListeners = this.listeners.get(type);
		}
		typedListeners.add(callback);
	}
	removeEventListener(type, callback) {
		if (!this.has(type)) {
			return;
		}
		return this.listeners.get(type).delete(callback);
	}
	dispatchEvent(event) {
		if (!this.has(event.type)) {
			return true;
		}
		for (const [index, cb] of this.listeners.get(event.type).entries()) {
			cb(event);
		}
		return !event.defaultPrevented;
	}
	has(type) {
		return this.listeners.has(type);
	}
}
