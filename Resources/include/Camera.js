(function() {
	// name space for camera
	app.camera = {};

	app.camera.createWindow = function() {
		// create win (global)
		CameraWin = Ti.UI.createWindow({
			title : 'カメラ',
			backgroundColor : '#000'
		});

		var ScrollView = Titanium.UI.createScrollView({
			contentWidth : 'auto',
			contentHeight : 'auto',
			top : 0
		});
		CameraWin.add(ScrollView);

		return CameraWin;
	};
})();
