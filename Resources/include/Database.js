var RamenDatabase = function() {
	this.dbName = 'ramen';

	this.open = function() {
		this.db = Titanium.Database.open(this.dbName);
	};
	this.close = function() {
		this.db.close();
	};
	this.insertRamen = function(ramen) {
		this.open();
		this.db.execute('INSERT INTO ramen (ramen_id, name, coupon, hp, photo_view, photo_ramen, address, password, tel, time, dayoff, lat, lon) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', ramen.id, ramen.name, ramen.coupon, ramen.HP, ramen.photo_view, ramen.photo_ramen, ramen.address, ramen.password, ramen.TEL, ramen.time, ramen.dayoff, ramen.lat, ramen.lon);
		row = this.db.execute('SELECT MAX(id) FROM ramen');
		id = row.field(0);
		this.close();
		return id;
	};

	// 画像は重いから更新しない
	this.updateRamen = function(ramen) {
		this.open();
		this.db.execute('UPDATE ramen SET name = ?, coupon = ?, hp = ?, address = ?, password = ?, tel = ?, time = ?, dayoff = ?, lat = ?, lon = ? WHERE ramen_id = ?', ramen.name, ramen.coupon, ramen.hp, ramen.address, ramen.password, ramen.tel, ramen.time, ramen.dayoff, ramen.lat, ramen.lon, ramen.ramen_id);
		this.close();
		return ramen.ramen_id;
	};
	this.deleteRamen = function(ramen_id) {
		this.open();
		this.db.execute('DELETE FROM task WHERE ramen_id = ?', ramen_id);
		this.close();
	};

	this.fetchOne = function(ramen_id) {
		this.open();
		var row = this.db.execute('SELECT * FROM task WHERE ramen_id = ?', ramen_id);
		var ramen = {};
		ramen.ramen_id = rows.field(1);
		ramen.name = rows.field(2);
		ramen.coupon = rows.field(3);
		ramen.hp = rows.field(4);
		ramen.photo_view = rows.field(5);
		ramen.photo_ramen = rows.field(6);
		ramen.address = rows.field(7);
		ramen.password = rows.field(8);
		ramen.tel = rows.field(9);
		ramen.time = rows.field(10);
		ramen.dayoff = rows.field(11);
		ramen.lat = rows.field(12);
		ramen.lon = rows.field(13);
		ramen.flag = rows.field(14);
		this.close();
		return ramen;
	};

	this.fetchToList = function() {
		this.open();
		var rows = this.db.execute('SELECT * FROM ramen');

		var ramens = new Array(0);
		while (rows.isValidRow()) {
			var ramen = {};
			ramen.ramen_id = rows.field(1);
			ramen.name = rows.field(2);
			ramen.coupon = rows.field(3);
			ramen.hp = rows.field(4);
			ramen.photo_view = rows.field(5);
			ramen.photo_ramen = rows.field(6);
			ramen.address = rows.field(7);
			ramen.password = rows.field(8);
			ramen.tel = rows.field(9);
			ramen.time = rows.field(10);
			ramen.dayoff = rows.field(11);
			ramen.lat = rows.field(12);
			ramen.lon = rows.field(13);
			ramen.flag = rows.field(14);
			ramens.push(ramen);
			rows.next();
		}
		this.close();
		return ramens;
	};

	// create table
	this.open();

	this.db.execute("CREATE TABLE IF NOT EXISTS ramen ( id INTEGER PRIMARY KEY AUTOINCREMENT, ramen_id INTEGER NOT NULL, name TEXT NOT NULL, coupon TEXT DEFAULT '', hp TEXT DEFAULT '', photo_view TEXT DEFAULT '', photo_ramen TEXT DEFAULT '', address TEXT DEFAULT '', password TEXT DEFAULT '', tel TEXT DEFAULT '', time TEXT DEFAULT '', dayoff TEXT DEFAULT '', lat TEXT DEFAULT '', lon TEXT DEFAULT '', flag INTEGER DEFAULT 0)");
	this.close();
};
