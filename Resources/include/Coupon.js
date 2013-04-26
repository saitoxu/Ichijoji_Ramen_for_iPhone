var couponWindow = function() {
	var db = new RamenDatabase();
	var ramens = db.fetchToList();

	// ramens[i].nameとかramens[i].couponで店名とかクーポン情報取ってこれる
	// クーポンの有効期限はアプリのプロパティにstartTimeとendTimeっていう名前で保存
	// Ti.App.Properties.getString('startTime');
	// Ti.App.Properties.getString('endTime');
	// で取ってこれるけど，今は入ってないのでnullになってる
	// Ti.App.Properties.setString('startTime', 'hogehoge');
	// とかで適当に値セットしてテストしてください
	
	var win = Titanium.UI.createWindow({
		title : 'クーポン',
		backgroundColor : '#fff'
	});
	db.close();
	return win;
}
