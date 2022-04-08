# Name

- Webbot
- Squid

# Description

Browser extension to automate time-consuming and repetitive tasks in web applications.

# Chrome dev notes

- manifest.json describes the extension for Chrome to load it properly.
- Manifest v3 moved away from support of the `background` attribute.
- useful libraries
    - chrome = api for extensions to access browser functionality
        - chrome.storage = Access to storage per webpage, either local or synced via Google user 
        account.
        - chrome.runtime = Access webpage DOM, read manifest (ex extension version), send messages
        between contexts (content <--> service), url utilities.
        - chrome.action = Modify the extension badge, menu
        - chrome.contextMenu = Customize context menu (right-click menu)

