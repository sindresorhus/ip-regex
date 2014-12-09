'use strict';
var test = require('ava');
var ipRegex = require('./');

var v4 = [
	'0.0.0.0',
	'8.8.8.8',
	'127.0.0.1',
	'100.100.100.100',
	'192.168.0.1',
	'18.101.25.153',
	'123.23.34.2',
	'172.26.168.134',
	'212.58.241.131',
	'128.0.0.0',
	'23.71.254.72',
	'223.255.255.255',
	'192.0.2.235',
	'99.198.122.146',
	'46.51.197.88',
	'173.194.34.134'
];

var v4not = [
	'.100.100.100.100',
	'100..100.100.100.',
	'100.100.100.100.',
	'999.999.999.999',
	'256.256.256.256',
	'256.100.100.100.100',
	'123.123.123',
	'http://123.123.123'
];

var v6 = [
	'1::',
	'1::8',
	'1::7:8',
	'1:2:3:4:5:6:7:8',
	'1:2:3:4:5:6::8',
	'1:2:3:4:5:6:7::',
	'1:2:3:4:5::7:8',
	'1:2:3:4:5::8',
	'1:2:3::8',
	'1::4:5:6:7:8',
	'1::6:7:8',
	'1::3:4:5:6:7:8',
	'1:2:3:4::6:7:8',
	'1:2::4:5:6:7:8',
	'::2:3:4:5:6:7:8',
	'1:2::8'
];

var v6not = [
	'1:2:3:4:5:6:1.2.3.4',
	'::',
	'1:',
	':1'
];

test('ip', function (t) {
	v4.forEach(function (el) {
		t.assert(ipRegex({exact: true}).test(el), el);
	});

	v4.forEach(function (el) {
		t.assert((ipRegex().exec('foo ' + el + ' bar') || [])[0] === el, el);
	});

	v4not.forEach(function (el) {
		t.assert(!ipRegex({exact: true}).test(el), el);
	});

	v6.forEach(function (el) {
		t.assert(ipRegex({exact: true}).test(el), el);
	});

	v6.forEach(function (el) {
		t.assert((ipRegex().exec('foo ' + el + ' bar') || [])[0] === el, el);
	});

	v6not.forEach(function (el) {
		t.assert(!ipRegex({exact: true}).test(el), el);
	});

	t.end();
});

test('ip v4', function (t) {
	v4.forEach(function (el) {
		t.assert(ipRegex.v4({exact: true}).test(el), el);
	});

	v4.forEach(function (el) {
		t.assert((ipRegex.v4().exec('foo ' + el + ' bar') || [])[0] === el, el);
	});

	v4not.forEach(function (el) {
		t.assert(!ipRegex.v4({exact: true}).test(el), el);
	});

	t.end();
});

test('ip v6', function (t) {
	v6.forEach(function (el) {
		t.assert(ipRegex.v6({exact: true}).test(el), el);
	});

	v6.forEach(function (el) {
		t.assert((ipRegex.v6().exec('foo ' + el + ' bar') || [])[0] === el, el);
	});

	v6not.forEach(function (el) {
		t.assert(!ipRegex.v6({exact: true}).test(el), el);
	});

	t.end();
});
