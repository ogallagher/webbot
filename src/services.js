/**
 * @fileoverview Code that executes in isolation from any webpage.
 * 
 * @author <github.com/ogallagher> (Owen Gallagher)
 */

/**
 * Handle when the extension is first added to the browser.
 */
chrome.runtime.onInstalled.addListener(function() {
	// get extension version and name from manifest
	let manifest = chrome.runtime.getManifest()
	let ext_version = manifest.version
	let ext_name = manifest.name
	
	// store basic extension info from manifest in synced storage (if possible)
	chrome.storage.sync.set(
		{
			extension_version: ext_version,
			extension_name: ext_name
		}, 
		function() {
			console.log(`set ${ext_name}.extension_version = ${ext_version} in storage`)
		}
	)
})
