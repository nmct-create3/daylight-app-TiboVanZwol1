const handleData = function(url, callback, method = 'GET', body = null) {
	fetch(url, {
		method: method,
		body: body,
		cache: 'no-cache',
		headers: { 'content-type': 'application/json' }
	})
		.then(function(response) {
			if (!response.ok) {
				throw Error(`Probleem bij de fetch(). Status Code: ${response.status}`);
			} else {
				console.info('Er is een response teruggekomen van de server');
				return response.json();
			}
		})
		.then(function(jsonObject) {
			console.info('json object is aangemaakt');
			console.info('verwerken data');
			callback(jsonObject);
		})
		.catch(function(error) {
			console.error(`fout bij verwerken json ${error}`);
		});
};

const handleXMLData = function(url, callback, method = 'GET', body = null) {
	fetch(url, {
		method: method,
		body: body,
		cache: 'no-cache',
		headers: { 'Access-Control-Allow-Origin': '*' }
	})
		.then(function(response) {
			if (!response.ok) {
				throw Error(`Probleem bij de fetch(). Status Code: ${response.status}`);
			} else {
				console.info('Er is een XML response teruggekomen van de server');
				return response;
			}
		})
		.catch(function(error) {
			console.error(`fout bij verwerken XML ${error}`);
		});
};

function parseXml(xml) {
	var dom = null;
	if (window.DOMParser) {
		try {
			dom = new DOMParser().parseFromString(xml, 'text/xml');
		} catch (e) {
			dom = null;
		}
	} else if (window.ActiveXObject) {
		try {
			dom = new ActiveXObject('Microsoft.XMLDOM');
			dom.async = false;
			if (!dom.loadXML(xml))
				// parse error ..

				window.alert(dom.parseError.reason + dom.parseError.srcText);
		} catch (e) {
			dom = null;
		}
	} else alert('cannot parse xml string!');
	return dom;
}
