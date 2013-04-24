// name space
var app = {};

// connect database
var con = Titanium.Database.open('ramen');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// Camera
Titanium.include('./include/Camera.js');
// Coupon
Titanium.include('./include/Coupon.js');
// Database
Titanium.include('./include/Database.js');
// Detail
Titanium.include('./include/Detail.js');
// Others
Titanium.include('./include/Others.js');
// TopList
Titanium.include('./include/TopList.js');

// サーバーからラーメン屋の情報を受信
var url = 'http://www8350ui.sakura.ne.jp/ramen.json';

if (Titanium.Network.online != false) {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', url, false);
	xhr.onload = function() {
		var json = JSON.parse(this.responseText);

		// データベースに追加
		// 2回目以降の処理を加える
		var db = new RamenDatabase();
		var ramens = db.fetchToList();
		if (ramens.length > 0) {
			// 更新処理だけ．ラーメン屋が増えた場合には対処してません汗
			for (var i = 0; i < ramens.length; i++) {
				db.updateRamen(ramens[i]);
			}
		} else {
			for (var i = 0; i < json.ichijoji.length; i++) {
				db.insertRamen(json.ichijoji[i]);
			}
		}

		Ti.API.info(db.fetchToList());
		db.close();
	}
	xhr.onerror = function(error) {
	};

	xhr.send();
} else {

}

// call objects
var TopListTab = app.topList.createTab();
var OthersTab = app.others.createTab();

// add tabs
tabGroup.addTab(TopListTab);
tabGroup.addTab(OthersTab);

// open tab group
tabGroup.open();
