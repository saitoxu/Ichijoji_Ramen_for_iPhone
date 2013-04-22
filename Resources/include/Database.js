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
		this.db.execute('INSERT INTO ramen (ramen_id, name, coupon, hp, photo_view, photo_ramen, address, password, tel, time, dayoff, lat, lon, flag) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', ramen.ramen_id, ramen.name, ramen.coupon, ramen.hp, ramen.photo_view, ramen.photo_ramen, ramen.address, ramen.password, ramen.tel, ramen.time, ramen.lat, ramen.lon, ramen.flag);
		row = this.db.execute('SELECT MAX(id) FROM ramen');
		id = row.field(0);
		this.close();
		return id;
	};

	this.updateRamen = function(ramen_id, ramen) {
		this.open();
		this.db.execute('UPDATE ramen SET name = ?, coupon = ?, hp = ?, photo_view = ?, photo_ramen = ?, address = ?, password = ?, tel = ?, time = ?, dayoff = ?, lat = ?, lon = ? WHERE ramen_id = ?', ramen.name, ramen.coupon, ramen.hp, ramen.photo_view, ramen.photo_ramen, ramen.address, ramen.password, ramen.tel, ramen.time, ramen.dayoff, ramen.lat, ramen.lon, ramen_id);
		this.close();
		return ramen_id;
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
		ramen.ramen_id = rows.field(0);
		ramen.name = rows.field(1);
		ramen.coupon = rows.field(2);
		ramen.hp = rows.field(3);
		ramen.photo_view = rows.field(4);
		ramen.photo_ramen = rows.field(5);
		ramen.address = rows.field(6);
		ramen.password = rows.field(7);
		ramen.tel = rows.field(8);
		ramen.time = rows.field(9);
		ramen.dayoff = rows.field(10);
		ramen.lat = rows.field(11);
		ramen.lon = rows.field(12);
		ramen.flag = rows.field(13);
		this.close();
		return ramen;
	};

	// this.fetchCell = function(id, attr) {
	// this.open();
	// cell = this.db.execute('SELECT ' + attr + ' FROM task WHERE id = ?', id).field(0);
	// this.close();
	// return cell;
	// };

	// this.updateCell = function(id, attr, val) {
	// this.open();
	// this.db.execute('UPDATE task SET ' + attr + ' = ? WHERE id = ?', val, id);
	// this.close();
	// };

	this.fetchToList = function() {
		this.open();
		var rows = this.db.execute('SELECT * FROM ramen');

		var ramens = new Array(0);
		while (rows.isValidRow()) {
			var ramen = {};
			ramen.ramen_id = rows.field(0);
			ramen.name = rows.field(1);
			ramen.coupon = rows.field(2);
			ramen.hp = rows.field(3);
			ramen.photo_view = rows.field(4);
			ramen.photo_ramen = rows.field(5);
			ramen.address = rows.field(6);
			ramen.password = rows.field(7);
			ramen.tel = rows.field(8);
			ramen.time = rows.field(9);
			ramen.dayoff = rows.field(10);
			ramen.lat = rows.field(11);
			ramen.lon = rows.field(12);
			ramen.flag = rows.field(13);
			ramens.push(ramen);
			rows.next();
		}
		this.close();
		return records;
	};

	// create table
	this.open();

	this.db.execute("CREATE TABLE IF NOT EXISTS task ( id INTEGER PRIMARY KEY AUTOINCREMENT, ramen_id INTEGER NOT NULL, name TEXT NOT NULL, coupon TEXT, hp TEXT DEFAULT '', photo_view BLOB DEFAULT NULL, photo_ramen BLOB DEFAULT NULL, address TEXT DEFAULT '', password TEXT DEFAULT '', tel TEXT DEFAULT '', time TEXT DEFAULT '', dayoff TEXT DEFAULT '', lat TEXT DEFAULT '', lon TEXT DEFAULT '', flag INTEGER DEFAULT 0");
	this.close();
};
