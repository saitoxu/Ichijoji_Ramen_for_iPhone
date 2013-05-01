var couponWindow = function() {
	var db = new RamenDatabase();
	var ramens = db.fetchToList();

	var tableView;
	var rows = [];

	var win = Titanium.UI.createWindow({
		title : 'クーポン',
		backgroundColor : '#fff'
	});

	// ramens[i].nameとかramens[i].couponで店名とかクーポン情報取ってこれる
	// クーポンの有効期限はアプリのプロパティにstartTimeとendTimeっていう名前で保存
	// Ti.App.Properties.getString('startTime');
	// Ti.App.Properties.getString('endTime');
	// で取ってこれるけど，今は入ってないのでnullになってる
	// Ti.App.Properties.setString('startTime', 'hogehoge');
	// とかで適当に値セットしてテストしてください
	// Ti.App.Properties.setString('startTime', '2013/5/1');
	Ti.App.Properties.setString('endTime', '2013/5/9');

	var header = Ti.UI.createTableViewRow({
		height : 170,
		selectedBackgroundColor : '#fff',
	});
	var aicon = Titanium.UI.createImageView({
		image : './images/aicon.png',
		height : 150,
		width : 150,
		top : -10,
	});
	header.add(aicon);
	var span = Ti.UI.createLabel({
		font : {
			fontSize : 20,
		},
		left : 45,
		top : 120,
		height : 30,
		width : 300,
		text : Ti.App.Properties.getString('startTime') + 'から' + Ti.App.Properties.getString('endTime') + 'まで',
	});
	header.add(span);
	rows.push(header);

	for (var i = 0; i < ramens.length; i++) {
		if (ramens[i].coupon == null)
			continue;
		var row = Ti.UI.createTableViewRow({
			height : 65,
			selectedBackgroundColor : '#fff',
			id : ramens[i].ramen_id
		});

		var uri = './ramenImages/' + row.id + 'v.png';
		var imageLabel = Titanium.UI.createImageView({
			image : uri,
			height : 47,
			width : 47,
			right : 9
		});

		row.add(imageLabel);
		rows.push(row);

		var name = Ti.UI.createLabel({
			font : {
				fontSize : 15,
			},
			left : 15,
			top : 5,
			height : 30,
			width : 200,
			text : ramens[i].name,
		});
		row.add(name);

		var coupon = Ti.UI.createLabel({
			font : {
				fontSize : 15,
				fontWeight : 'bold'
			},
			left : 15,
			top : 30,
			height : 30,
			width : 300,
			text : ramens[i].coupon,
		});
		row.add(coupon);

	}

	var tableView = Titanium.UI.createTableView({
		data : rows
	});

	win.add(tableView);

	db.close();
	return win;
}
