function truncateString(str) {

	var convFromL = String.fromCharCode(283,353,269,345,382,253,225,237,233,357,367,250,243,271,328,318,314);

	var convToL = String.fromCharCode(101,115,99,114,122,121,97,105,101,116,117,117,111,100,110,108,108);

	var str = str.toLowerCase();
	str = strtr(str,convFromL,convToL);

	var preg = /[^0-9A-Za-z]{1,}?/g;

	str = trim(str.replace(preg, ' '));
	str = str.replace(/[\s]+/g, '-');

	return str;
}

function strtr(s, from, to) {
	var out = new String();
	top:
	for(var i=0; i < s.length; i++) {
		for(var j=0; j < from.length; j++) {
			if(s.charAt(i) == from.charAt(j)) {
				out += to.charAt(j);
				continue top;
			}
		}
		out += s.charAt(i);
	}
	return out;
}

function trim(string) {
	var re= /^\s*|\s*$/g;
	return string.replace(re,"");
}
module.exports = truncateString;