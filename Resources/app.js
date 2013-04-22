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
// Splash
Titanium.include('./include/Splash.js');
// TopList
Titanium.include('./include/TopList.js');

// call objects
var TopListTab = app.topList.createTab();
var OthersTab = app.others.createTab();

// add tabs
tabGroup.addTab(TopListTab);
tabGroup.addTab(OthersTab);

// open tab group
tabGroup.open();
