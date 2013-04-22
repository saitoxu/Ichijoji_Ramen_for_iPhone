(function() {
	// name space for others
	app.others = {};
	// tab object
	app.others.createTab = function() {
		// create win
		var othersWin = Titanium.UI.createWindow({
			title : 'その他',
			backgroundColor : '#fff'
		});

		// create tab
		tab = Titanium.UI.createTab({
			icon : './images/more.png',
			title : 'その他',
			window : othersWin
		});

		var scrollView = Titanium.UI.createScrollView({
			contentWidth : 'auto',
			contentHeight : 'auto',
			top : 0
		});
		othersWin.add(scrollView);
		return tab;
	};
})();
