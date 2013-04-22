(function() {
	// name space for camera
	app.topList = {};

	// tab object
	app.topList.createTab = function() {
		// create win
		var topListWin = Titanium.UI.createWindow({
			title : 'リスト',
			backgroundColor : '#fff'
		});

		// create tab
		tab = Titanium.UI.createTab({
			icon : './images/list.png',
			title : 'リスト',
			window : topListWin
		});

		var scrollView = Titanium.UI.createScrollView({
			contentWidth : 'auto',
			contentHeight : 'auto',
			top : 0
		});
		topListWin.add(scrollView);

		// create button for add task
		var button = Titanium.UI.createButton({
			systemButton : Titanium.UI.iPhone.SystemButton.CAMERA
		});
		// click addtask button
		button.addEventListener('click', function() {
			var cameraWindow = app.camera.createWindow();
			cameraWindow.title = "カメラ";
			cameraWindow.open();
		});

		// set button
		topListWin.setRightNavButton(button);
		return tab;
	};
})();
