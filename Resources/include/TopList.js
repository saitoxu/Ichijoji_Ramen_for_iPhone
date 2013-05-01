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
					height : 47,
					width : 47,
					right : 9
				});
				var sumiLabel = Titanium.UI.createImageView({
					image : './images/sumi.png',
					height : 47,
					width : 47,
					right : 9
				});
				row.add(imageLabel);
				if (ramens[i].flag == 1) {
					row.add(sumiLabel);
				}

				tableView.appendRow(row);
			}

			tableView.addEventListener('click', function(e) {
				tab.open(detailWindow(e.row.id));
			});
		}

		var currentDate = new Date();
		// Ti.API.info(currentDate);
		// Ti.App.Properties.setString('endTime', currentDate.toString());
		// Ti.API.info(Ti.App.Properties.getString('endTime'));
		topListWin.addEventListener('focus', function() {
			currentDate = new Date();
			var currentDateStr = currentDate.getYear() + '/' + currentDate.getMonth() + '/' + currentDate.getDay();
			var endTime = null;
			var days = 9999;

			if (Ti.App.Properties.getString('endTime') != null) {
				endTime = new Date(Ti.App.Properties.getString('endTime'));
			}
			if (endTime != null) {
				days = compareDate(currentDate.getYear(), currentDate.getMonth(), currentDate.getDay(), endTime.getYear(), endTime.getMonth(), endTime.getDay());
				// Ti.API.info(days);
			}
			// クーポン開始日時と終了日時の差が7日以内だったらクーポンボタン出現
			// デフォルトは9999日
			if (days <= 7) {
				topListWin.setLeftNavButton(leftButton);
			} else {
				Ti.API.info('hoge');
				topListWin.setLeftNavButton(null);
			}
			// Ti.API.info(currentDateStr);
		})
		// 日付を比較して差の日数を返す
		function compareDate(year1, month1, day1, year2, month2, day2) {
			var dt1 = new Date(year1, month1 - 1, day1);
			var dt2 = new Date(year2, month2 - 1, day2);
			var diff = dt1 - dt2;
			var diffDay = diff / 86400000;
			//1日は86400000ミリ秒
			return diffDay;
		}

		// alert(compareDate(2013, 1, 1, 2012, 1, 1));
		var leftButton = Titanium.UI.createButton({
			title : 'クーポン'
		});

		leftButton.addEventListener('click', function() {
			tab.open(couponWindow());
		});

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
					var db = new RamenDatabase();
					var ramens = db.fetchToList();
					if (data && data.barcode) {
						for (var i = 0; i < ramens.length; i++) {
							if (data.barcode == ramens[i].password) {
								alert(ramens[i].name);
								// 訪問フラグを1にする
							}
						}
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
		db.close();
		return tab;
	};
})();
