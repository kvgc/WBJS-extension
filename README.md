# WebResearcherJS-extension
<img width="50%" src="logo.png">

> One of the challenges to using the internet as a means to learn is that, we oftentimes are unable to retain the information that we just read. But _maybe_ we would not run into this issue if there was a way to pro-actively engage in the content.

WebResearcherJS is a Firefox web extension which allows users to annotate webpages on the internet.

Try out the extension by downloading from the Firefox add-on page: https://addons.mozilla.org/en-US/firefox/addon/webresearcherjs/

### Features
Enable the extension on any webpage by clicking on the button in the extension popup

<img width="40%" src="3.png">

- Note taking.
<img width="90%" src="1.png">
- Sidebar with a custom URL loader
<img width="90%" src="2.png">
- Export notes to as Text, HTML or JSON.


### Video demo of features

https://youtu.be/ON_1rjPh_Ak.

### Usage
<img width="100%" src="demo.gif">

Select some text on the webpage (this acts as an anchor) and press Ctrl+1. This will create a note near the selected text. Hold down the shift key and drag the note across the webpage.

- **Ctrl + 1**: Create note near selection
  - Hold on the shift key and drag the note anywhere on the webpage
  - Resize as needed
  - Right click on any note to destroy it.
- **Ctrl + 2**: Save all annotations in current webpage to browser storage.
- **Ctrl + 3**: Load annotations from browser storage.
- **Ctrl + 0**: Open Export note dialog box.
- **Ctrl + Alt + Y**: Open Sidebar.




### JS modules that this extension uses
- jQuery: https://jquery.com/
- jQuery-UI: https://jqueryui.com/
- Pell: https://github.com/jaredreich/pell
- Notify: https://notifyjs.jpillora.com/
- Bootstrap: https://getbootstrap.com/