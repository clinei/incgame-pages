/**
@file Initializes the system
*/

/*
global TODO:
+ implement upgrading
+ add upgrade button to item and link
+ implement UpgradeStrategy, which determines how much faster an action gets and how much the next upgrade costs
+ autoclickers, maybe characters or items

nice to have:
+ implement custom event classes instead of using built-in CustomEvent
+ document (members, examples)
*/

function load() {
	const player = new Player;
	const system = new System(player);
}

window.addEventListener("load", load);
