var detailWindow = function(id) {
	var db = new RamenDatabase();
	var ramen = db.fetchOne(id);

	var win = Titanium.UI.createWindow({
		title : ramen.name,
		backgroundColor : '#fff'
	});
	var imageLabel = Titanium.UI.createImageView({
		image : './ramenImages/' + id + 'v.png',
		height : 180,
		width : 180,
		top : 10
	});
	var sumiLabel = Titanium.UI.createImageView({
		image : './images/sumi.png',
		height : 180,
		width : 180,
		top : 10
	});

	var timeTitleLabel = Titanium.UI.createLabel({
		font : {
			fontWeight : 'bold'
		},
		text : '営業時間',
		top : 200,
		width : 100,
		textAlign : 'center',
		height : 20
	});
	var timeLabel = Titanium.UI.createLabel({
		font : {
			fontSize : 12
		},
		text : ramen.time,
		top : 220,
		width : 300,
		textAlign : 'center',
		height : 30
	});
	var dayoffTitleLabel = Titanium.UI.createLabel({
		font : {
			fontWeight : 'bold'
		},
		text : '定休日',
		top : 255,
		width : 100,
		textAlign : 'center',
		height : 20
	});
	var dayoffLabel = Titanium.UI.createLabel({
		font : {
			fontSize : 12
		},
		text : ramen.dayoff,
		top : 275,
		width : 300,
		textAlign : 'center',
		height : 30
	});
	var addressTitleLabel = Titanium.UI.createLabel({
		font : {
			fontWeight : 'bold'
		},
		text : '住所',
		top : 310,
		width : 100,
		textAlign : 'center',
		height : 20
	});
	var addressLabel = Titanium.UI.createLabel({
		font : {
			fontSize : 12
		},
		text : ramen.address,
		top : 330,
		width : 300,
		textAlign : 'center',
		height : 30
	});
	win.add(imageLabel);
	if (ramen.flag == 1) {
		win.add(sumiLabel);
	}
	win.add(timeTitleLabel);
	win.add(timeLabel);
	win.add(dayoffTitleLabel);
	win.add(dayoffLabel);
	win.add(addressTitleLabel);
	win.add(addressLabel);

	db.close();

	var rightButton = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.ACTION
	});

	rightButton.addEventListener('click', function(e) {
		// ダイアログの生成
		var dialog = Titanium.UI.createOptionDialog();

		// タイトルということになっていますが、プロンプト的な位置づけですね。
		dialog.setTitle('機能');

		if (ramen.hp == '') {
			dialog.setOptions(['電話', 'マップ', 'キャンセル']);
			dialog.setCancel(2);
			dialog.addEventListener('click', function(event) {
				if (event.index == 0) {
					var telTemp = ramen.tel;
					var telStr = telTemp.split("-");
					var telUrl = 'tel:';
					for (var i = 0; i < telStr.length; i++) {
						telUrl += telStr[i];
					}
					Ti.Platform.openURL(telUrl);
				} else if (event.index == 1) {
					var mapUrl = 'http://maps.google.com/maps?ll=' + ramen.lat + ',' + ramen.lon;
					Ti.Platform.openURL(mapUrl);
					// } else if (event.index == 2) {
					// var tweetUrl = 'https://twitter.com/intent/tweet/?text=' + ramen.name + 'なう - 一乗寺のラーメン食べたい';
					// Ti.API.info(tweetUrl);
					// Ti.Platform.openURL(tweetUrl);
				}
			});
		} else {
			dialog.setOptions(['電話', 'マップ', 'ホームページ', 'キャンセル']);
			dialog.setCancel(3);
			dialog.addEventListener('click', function(event) {
				if (event.index == 0) {
					var telTemp = ramen.tel;
					var telStr = telTemp.split("-");
					var telUrl = 'tel:';
					for (var i = 0; i < telStr.length; i++) {
						telUrl += telStr[i];
					}
					Ti.Platform.openURL(telUrl);
				} else if (event.index == 1) {
					var mapUrl = 'http://maps.google.com/maps?ll=' + ramen.lat + ',' + ramen.lon;
					Ti.Platform.openURL(mapUrl);
					// } else if (event.index == 2) {
					// var tweetUrl = 'https://twitter.com/intent/tweet/?text=' + ramen.name + 'なう - 一乗寺のラーメン食べたい';
					// Ti.API.info(tweetUrl);
					// Ti.Platform.openURL(tweetUrl);
				} else if (event.index == 2) {
					var hpUrl = ramen.hp;
					Ti.Platform.openURL(hpUrl);
				}
			});
		}
		// ダイアログを表示します。
		dialog.show();
	});

	// set button
	win.setRightNavButton(rightButton);
	return win;
};
