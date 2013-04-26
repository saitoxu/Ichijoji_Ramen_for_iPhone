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
		var tab = Titanium.UI.createTab({
			icon : './images/list.png',
			title : 'リスト',
			window : topListWin
		});

		var tableView = Titanium.UI.createTableView();

		var db = new RamenDatabase();
		var ramens = db.fetchToList();

		if (ramens.length > 0) {
			for (var i = 0; i < ramens.length; i++) {
				var row = Titanium.UI.createTableViewRow({
					title : ramens[i].name,
					height : 65,
					id : ramens[i].ramen_id
				});
				var uri = './ramenImages/' + row.id + 'v.png';

				var imageLabel = Titanium.UI.createImageView({
					image : uri,
					height : 51,
					width : 51,
					right : 7
				});
				row.add(imageLabel);

				tableView.appendRow(row);
			}

			tableView.addEventListener('click', function(e) {
				tab.open(detailWindow(e.row.id));
			});
		}
		var currentDate = new Date();
		// Ti.App.Properties.setString('endTime', currentDate.toString());
		// Ti.API.info(Ti.App.Properties.getString('endTime'));
		Ti.API.info(currentDate);
		// setInterval(setCouponButton(), 1000);

		// if (Ti.App.Properties.getString('endTime') != null) {
		var leftButton = Titanium.UI.createButton({
			title : 'クーポン'
		});

		leftButton.addEventListener('click', function() {
			tab.open(couponWindow());
		});
		topListWin.setLeftNavButton(leftButton);
		// }

		topListWin.add(tableView);

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
		topListWin.setRightNavButton(button);
		return tab;
	};
})();
