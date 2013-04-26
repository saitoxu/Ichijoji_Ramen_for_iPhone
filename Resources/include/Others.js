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

                var row1 = Ti.UI.createTableViewRow();
                row1.height = 65;

                var title1 = Ti.UI.createLabel({
                        font:{fontSize:20, fontWeight:'bold'},
                        left:15,
                        top:5,
                        height:30,
                        width:200,
                        text:'ヘルプ'
                    });

                row1.add(title1);

                var subtitle1 = Ti.UI.createLabel({
                        color: '#808080',
                        font:{fontSize:15},
                        left:15,
                        top:30,
                        height:30,
                        width:200,
                        text:'スタンプラリーの説明です'
                    });

                row1.add(subtitle1);

                row1.addEventListener('click', function(e){
                    Titanium.UI.createAlertDialog({
                        title: 'スタンプラリーの説明',
                        message: '京都が誇るラーメン街、一乗寺を回るスタンプラリーです！\n' +
                                 '2013/4/8(月)〜7/31(水)の間にスタンプラリー対象店舗10店の' +
                                 'ラーメンを食べ、各店に貼ってあるQRコードをアプリのバーコード' +
                                 'リーダーで取ると、スタンプをGETできます。\n' +
                                 '全店のスタンプを集めると、1週間有効なお得なクーポンが発行されます。\n' +
                                 'この機会に一乗寺のラーメンを食べに行こう！',
                    }).show();
                });

                var row2 = Ti.UI.createTableViewRow();
                row2.height = 65;

                var title2 = Ti.UI.createLabel({
                        font:{fontSize:20, fontWeight:'bold'},
                        left:15,
                        top:5,
                        height:30,
                        width:200,
                        text:'Facebookページ'
                    });

                row2.add(title2);

                var subtitle2 = Ti.UI.createLabel({
                        color: '#808080',
                        font:{fontSize:15},
                        left:15,
                        top:30,
                        height:30,
                        width:300,
                        text:'アプリのFacebookページへとびます'
                    });

                row2.add(subtitle2);

                row2.addEventListener('click', function(e){
                        Ti.Platform.openURL('http://www.facebook.com/IchijojiRamen');
                });

                var row3 = Ti.UI.createTableViewRow();
                row3.height = 65;

                var title3 = Ti.UI.createLabel({
                        font:{fontSize:20, fontWeight:'bold'},
                        left:15,
                        top:5,
                        height:30,
                        width:200,
                        text:'リセット'
                    });

                row3.add(title3);

                var subtitle3 = Ti.UI.createLabel({
                        color: '#808080',
                        font:{fontSize:15},
                        left:15,
                        top:30,
                        height:30,
                        width:200,
                        text:'記録を消去します'
                    });

                row3.add(subtitle3);

                row3.addEventListener('click', function(e){
                    var alert = Titanium.UI.createAlertDialog({
                        title: 'リセットしますか？',
                        message: '今までの記録がなくなってしましますが、よろしいですか？',
                        buttonNames: ['はい','いいえ'],
                        cancel: 1,
                    });
                    alert.addEventListener('click',function(e){
                            if(e.index == 0){
                                var db = new RamenDatabase();
                                // データベースのフラグ消去
                                // アプリのプロパティも消去
                                db.close();
                            }
                    });
                    alert.show();
                });

                var rows = [row1, row2, row3];

                var tableView = Titanium.UI.createTableView({
                    data: rows
                    });

		othersWin.add(tableView);
		return tab;
	};
})();
