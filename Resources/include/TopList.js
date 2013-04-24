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

		var tableView = Titanium.UI.createTableView();
		var row1 = Titanium.UI.createTableViewRow({
			title : 'pika-shi'
		});
		var row2 = Titanium.UI.createTableViewRow({
			title : 'saitoxu'
		});
		var row3 = Titanium.UI.createTableViewRow({
			title : 'sunlight'
		});
		// row3.add(Titanium.UI.createLabel({
		// title : 'sunlight'
		// }));
		tableView.appendRow(row1);
		tableView.appendRow(row2);
		tableView.appendRow(row3);

		var view = Titanium.UI.createView();

		view.add(tableView);
		topListWin.add(view);

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
