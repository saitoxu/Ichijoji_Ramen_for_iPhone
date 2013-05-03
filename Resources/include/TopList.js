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

		var setTopListView = function() {
			var rtnView = Ti.UI.createView();
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

					// 訪問済みだったら「済」の画像を貼る
					// Ti.API.info(ramens[i].flag);
					if (ramens[i].flag == 1) {
						row.add(sumiLabel);
					}

					tableView.appendRow(row);
				}

				tableView.addEventListener('click', function(e) {
					tab.open(detailWindow(e.row.id));
				});
			}

			rtnView.add(tableView);
			db.close();
			return rtnView;
		};

		// 日付を比較して差の日数を返す
		function compareDate(year1, month1, day1, year2, month2, day2) {
			var dt1 = new Date(year1, month1 - 1, day1);
			var dt2 = new Date(year2, month2 - 1, day2);
			var diff = dt1 - dt2;
			var diffDay = diff / 86400000;
			//1日は86400000ミリ秒
			return diffDay;
		}

		var mainView = Ti.UI.createView();
		topListWin.add(mainView);

		var currentDate = new Date();

		topListWin.addEventListener('focus', function() {
			currentDate = new Date();
			var endTime = null;
			var days = 1;
			// Ti.API.info(currentDate.toString());
			if (Ti.App.Properties.getString('endTime') != null) {
				endTime = new Date(Ti.App.Properties.getString('endTime') + ' 00:00:00');
			}
			if (endTime != null) {
				days = compareDate(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), endTime.getFullYear(), endTime.getMonth(), endTime.getDate());
			}
			// Ti.API.info('days = ' + days);
			// クーポンの終了日時を過ぎてなかったらクーポンボタン出現
			if (days <= 0) {
				topListWin.setLeftNavButton(leftButton);
			} else {
				topListWin.setLeftNavButton(null);
			}

			topListWin.remove(mainView);
			mainView = setTopListView();
			topListWin.add(mainView);
		});

		var leftButton = Titanium.UI.createButton({
			title : 'クーポン'
		});

		leftButton.addEventListener('click', function() {
			tab.open(couponWindow());
		});

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
					var isNotRamenFlag = true;
					if (data && data.barcode) {
						for (var i = 0; i < ramens.length; i++) {
							if (data.barcode == ramens[i].password) {
								// 訪問フラグを1にする
								if (db.setFlag(ramens[i].ramen_id)) {
									// アラート表示
									var dialog = Titanium.UI.createAlertDialog();
									dialog.setTitle(ramens[i].name);
									dialog.setMessage('スタンプを手に入れました！');
									dialog.show();

									// ここでjsonをポスト
									var json = {};
									json.user_id = Ti.App.Properties.getInt('appId');
									json.shop_id = ramens[i].ramen_id;
									var date = new Date();
									YYYY = date.getYear();
									MM = date.getMonth() + 1;
									DD = date.getDate();
									hh = date.getHours();
									mm = date.getMinutes();
									ss = date.getSeconds();
									if (YYYY < 2000) {
										YYYY += 1900;
									}
									if (MM < 10) {
										MM = "0" + MM;
									}
									if (DD < 10) {
										DD = "0" + DD;
									}
									if (hh < 10) {
										hh = "0" + hh;
									}
									if (mm < 10) {
										mm = "0" + mm;
									}
									if (ss < 10) {
										ss = "0" + ss;
									}
									json.time = YYYY + '/' + MM + '/' + DD + ' ' + hh + ':' + mm + ':' + ss;
									var url = 'http://www.dl.kuis.kyoto-u.ac.jp/~takemura/mayumaro/GetUserData.py';

									if (Titanium.Network.online != false) {
										var xhr = Titanium.Network.createHTTPClient();
										xhr.open('POST', url, false);
										xhr.onload = function() {
											Ti.API.info("Ramen Success");
										}
										xhr.onerror = function(error) {
											Ti.API.info("Ramen Loaded Error");
										};

										xhr.send();
									} else {
										Ti.API.info("Ramen Network Error");
									}

									if (db.isAllFlagsSet()) {
										// if (true) {
										var dialog2 = Titanium.UI.createAlertDialog();
										dialog2.setTitle('おめでとうございます！');
										dialog2.setMessage('クーポンが発行されました！');
										dialog2.show();
										// 時刻のセット
										var start = new Date();
										var end = new Date();
										end.setDate(end.getDate() + 8);
										Titanium.App.Properties.setString('startTime', start.getFullYear() + '/' + (start.getMonth() + 1) + '/' + start.getDate());
										Titanium.App.Properties.setString('endTime', end.getFullYear() + '/' + (end.getMonth() + 1) + '/' + end.getDate());
										// Ti.API.info(Ti.App.Properties.getString('startTime'));
										// Ti.API.info(Ti.App.Properties.getString('endTime'));
									}
								} else {
									var dialog = Titanium.UI.createAlertDialog();
									dialog.setTitle(ramens[i].name);
									dialog.setMessage('訪問済みです');
									dialog.show();
								}
								isNotRamenFlag = false;
							}
						}
						if (isNotRamenFlag) {
							var dialog = Titanium.UI.createAlertDialog();
							dialog.setTitle('Alert');
							dialog.setMessage('ラーメン屋ではありません');
							dialog.show();
						}
					};
					db.close();
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
