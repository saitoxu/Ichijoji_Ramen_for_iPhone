var detailWindow = function(id) {
	var db = new RamenDatabase();
	var ramen = db.fetchOne(id);

	var win = Titanium.UI.createWindow({
		title : ramen.name,
		backgroundColor : '#fff'
	});
	var imageLabel = Titanium.UI.createImageView({
		image : './ramenImages/' + id + 'v.png',
		height : 150,
		width : 150,
		top : 0
	});
	var timeLabel = Titanium.UI.createLabel({
		text : '営業時間：' + ramen.time,
		top : 150,
		height : 30
	});
	var dayoffLabel = Titanium.UI.createLabel({
		text : '定休日：' + ramen.dayoff,
		top : 180,
		height : 30
	});
	var addressLabel = Titanium.UI.createLabel({
		text : '住所：' + ramen.address,
		top : 210,
		height : 30
	});
	win.add(imageLabel);
	win.add(timeLabel);
	win.add(dayoffLabel);
	win.add(addressLabel);

	var mapButton = Ti.UI.createButton({
		title : "マップ",
		height : 30,
		width : 150,
		top : 240
	});

	mapButton.addEventListener('click', function() {
		var mapUrl = 'http://maps.google.com/maps?ll=' + ramen.lat + ',' + ramen.lon;
		Ti.Platform.openURL(mapUrl);
	});

	win.add(mapButton);

	var telButton = Ti.UI.createButton({
		title : "電話",
		height : 30,
		width : 150,
		top : 270
	});

	telButton.addEventListener('click', function() {
		// var telUrl = 'tel:' + ramen.tel;
		var telUrl = 'tel:09079383869';
		Ti.API.info(telUrl);
		Ti.Platform.openURL(telUrl);
	});

	win.add(telButton);

	if (ramen.hp != '') {
		var hpButton = Ti.UI.createButton({
			title : "HP",
			height : 30,
			width : 150,
			top : 300
		});

		hpButton.addEventListener('click', function() {
			var hpUrl = ramen.hp;
			Ti.Platform.openURL(hpUrl);
		});

		win.add(hpButton);
	}

	var tweetButton = Ti.UI.createButton({
		title : "Tweet",
		height : 30,
		width : 150,
		top : 330
	});

	tweetButton.addEventListener('click', function() {
		var tweetUrl = 'https://twitter.com/intent/tweet/?text=' + ramen.name + 'なう - 一乗寺のラーメン食べたい';
		Ti.API.info(tweetUrl);
		Ti.Platform.openURL(tweetUrl);
	});

	win.add(tweetButton);

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
