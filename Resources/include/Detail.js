var detailWindow = function(id) {
	var db = new RamenDatabase();
	var ramen = db.fetchOne(id);

	var win = Titanium.UI.createWindow({
		title : ramen.name,
		backgroundColor : '#fff'
	});
	db.close();

	var button = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.CAMERA
	});

	// TiBarモジュールの読み込み
	var TiBar = require('tibar');

	// clickイベントの中にスキャン動作を定義
	button.addEventListener('click', function() {
		TiBar.scan({
			// 設定パラメータ (JSON形式)
			configure : {
				// ZBarReaderViewController(VC), ZBarReaderController ( C )  の２種
				classType : "ZBarReaderViewController",
				// Library ( C ), Album ( C ), Camera ( VC ) の 3種
				sourceType : "Camera",
				// Default , Sampling , Sequence
				cameraMode : "Default",
				config : {
					"showsCameraControls" : true,
					"showsZBarControls" : true,
					"tracksSymbols" : true, // スキャンする時に四角の枠を表示する
					//"showsSymbols":true,
					"enableCache" : true,
					"showsHelpOnFail" : true,
					"takesPicture" : false
				},
				// この他、Symbol 設定で利用可能なバーコードを決められる
			},

			// 成功した場合の処理定義
			success : function(data) {
				Ti.API.info('TiBar success callback!');
				if (data && data.barcode) {
					Ti.UI.createAlertDialog({
						title : "Scan Result",
						message : "Barcode: " + data.barcode + 'Symbology:' + data.symbology
					}).show();
				};
			},
			// 中止した時の処理定義
			cancel : function() {
				Ti.API.info("TiBar cancel callback!");
			},
			// エラーを起こした場合の定義
			error : function() {
				Ti.API.info("TiBar error callback!");
			}
		});
	});

	// set button
	win.setRightNavButton(button);
	return win;
}
