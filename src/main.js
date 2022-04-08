/**
 * @fileOverview Webbot tests.
 * 
 * @author <github.com/ogallagher> (Owen Gallagher)
 * 
 */

const url = 
	window.location.protocol + '//' + 
	window.location.hostname + 
	window.location.pathname

// mouse buttons
const mouse_btn_left = 1
const mouse_btn_middle = 2
const mouse_btn_right = 3

// tab keycode
const keycode_tab = 9

// storage keys
const store_key_ext_name = 'extension_name'
const store_key_ext_version = 'extension_version'

function main() {
	console.log(`info url=${url}`)
	
	$('body').on('keydown', (e) => {console.log(e)})
	
	wait(1000)
	.then(() => { 
		console.log('debug open search')
		$('button.search-box__btn').click() 
		
		return wait(500) 
	})
	.then(() => {
		console.log('debug find contextMenus')
		
		let keydown = $.Event('keydown')
		keydown.keyCode = 70
		keydown.which = keydown.keyCode
		keydown.key = 'f'
		keydown.originalEvent = new KeyboardEvent(keydown.type, {
			keyCode: keydown.keyCode,
			which: keydown.which,
			key: keydown.key
		})
		
		let keyup= $.Event('keyup')
		keyup.keyCode = 70
		keyup.which = keyup.keyCode
		keyup.key = 'f'
		
		$('input.search-box__input')
		.focus()
		.val('contextMenus')
		.change()
		
		$('input.search-box__input')
		.trigger(keydown)
		.trigger(keyup)
		.trigger('change')
		
		return wait(400)
	})
	.then(() => {
		$('input.search-box__input')
		.focus()
		.val('contextMenus?')
		.change()
	})
	.then(() => {
		console.log('debug waiting for results')
		return wait(1000)
	})
	.then(() => {
		console.log('is it there?')
	})
}

function wait(ms) {
	return new Promise(function(resolve) {
		setTimeout(resolve, ms)
	})
}

/**
 * Load state from persistent storage.
 */
chrome.storage.sync.get(
	[
		store_key_ext_name,
		store_key_ext_version
	], 
	function(res) {
		let ext_name = res[store_key_ext_name]
		let ext_version = res[store_key_ext_version]
		console.log(`info name=${ext_name} version=${ext_version}`)
	}
)

/**
 * Communicate with services.
 * 
 * @param {Object} msg Message.
 * @param {paramType} src Source.
 * @param {Function} res Callback to send response.
 * 
 * @returns {Boolean} Whether the message was recognized.
 */
chrome.runtime.onMessage.addListener(function({ subject }, src, res) {
	if (msg.subject == 'something') {
		res({good: true})
		
		return true
	}
	else {
		res({good: false})
		
		return false
	}
})

/**
 * Handle context menu click.
 * 
 * Parameter examples:
 * 
 ```javascript
	info = {
		editable: false
		frameId: 0
		menuItemId: "show-hide"
	}

	tab = {
		active: true
		audible: false
		autoDiscardable: true
		discarded: false
		favIconUrl: ""
		groupId: -1
		height: 766
		highlighted: true
		id: 81
		incognito: false
		index: 2
		mutedInfo: {muted: false}
		pinned: false
		selected: true
		status: "complete"
		title: "Extensiones"
		url: "chrome://extensions/"
		width: 1440
		windowId: 1
	}
 ```
 * 
 * @param {Object} info Click information.
 * 
 * @param {Object} tab Page information.
 */
// chrome.contextMenus.onClicked.addListener(function(info, tab) {
// 	if (info.menuItemId == ctx_menu_something) {
// 		handle_something
// 	}
// })

main()
