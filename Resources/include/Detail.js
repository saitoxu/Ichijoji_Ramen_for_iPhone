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
		// backgroundColor : '#0d0',
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
		// backgroundColor : '#0d0',
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
		// backgroundColor : '#00d',
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
		// backgroundColor : '#00d',
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
		// backgroundColor : '#d00',
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
		// backgroundColor : '#d00',
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

	// var mapButton = Ti.UI.createButton({
	// title : "マップ",
	// height : 30,
	// width : 150,
	// top : 240
	// });
	//
	// mapButton.addEventListener('click', function() {
	// var mapUrl = 'http://maps.google.com/maps?ll=' + ramen.lat + ',' + ramen.lon;
	// Ti.Platform.openURL(mapUrl);
	// });
	//
	// win.add(mapButton);
	//
	// var telButton = Ti.UI.createButton({
	// title : "電話",
	// height : 30,
	// width : 150,
	// top : 270
	// });
	//
	// telButton.addEventListener('click', function() {
	// // var telUrl = 'tel:' + ramen.tel;
	// var telUrl = 'tel:09079383869';
	// Ti.API.info(telUrl);
	// Ti.Platform.openURL(telUrl);
	// });
	//
	// win.add(telButton);
	//
	// if (ramen.hp != '') {
	// var hpButton = Ti.UI.createButton({
	// title : "HP",
	// height : 30,
	// width : 150,
	// top : 300
	// });
	//
	// hpButton.addEventListener('click', function() {
	// var hpUrl = ramen.hp;
	// Ti.Platform.openURL(hpUrl);
	// });
	//
	// win.add(hpButton);
	// }
	//
	// var tweetButton = Ti.UI.createButton({
	// title : "Tweet",
	// height : 30,
	// width : 150,
	// top : 330
	// });
	//
	// tweetButton.addEventListener('click', function() {
	// var tweetUrl = 'https://twitter.com/intent/tweet/?text=' + ramen.name + 'なう - 一乗寺のラーメン食べたい';
	// Ti.API.info(tweetUrl);
	// Ti.Platform.openURL(tweetUrl);
	// });
	//
	// win.add(tweetButton);

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
					var telUrl = 'tel:' + ramen.tel;
					// var telUrl = 'tel:09079383869';
					Ti.API.info(telUrl);
					Ti.Platform.openURL(telUrl);
				} else if (event.index == 1) {
					var mapUrl = 'http://maps.google.com/maps?ll=' + ramen.lat + ',' + ramen.lon;
					Ti.Platform.openURL(mapUrl);
				}
			});
		} else {
			dialog.setOptions(['電話', 'マップ', 'ホームページ', 'キャンセル']);
			dialog.setCancel(3);
			dialog.addEventListener('click', function(event) {
				if (event.index == 0) {
					var telUrl = 'tel:' + ramen.tel;
					Ti.API.info(telUrl);
					Ti.Platform.openURL(telUrl);
				} else if (event.index == 1) {
					var mapUrl = 'http://maps.google.com/maps?ll=' + ramen.lat + ',' + ramen.lon;
					Ti.Platform.openURL(mapUrl);
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
