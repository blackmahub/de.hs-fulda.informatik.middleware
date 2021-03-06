module.exports = {
	buildIndexPage: buildIndexPage
};

function buildIndexPage (data, res) {
	res.writeHead(200, {'Content-Type': 'text/html'}); 	
	res.end(loadDataInIndexPage(data));
}

function loadDataInIndexPage (data) {
	return '<html>' + 
				'<head>' + 
					'<title>Tax Calculator</title>' + 
				'</head>' + 
				'<body>' + 
					'<div>' +
						'<h1>Tax Form (WS2017)</h1>' + 
						'<form name="taxForm" method="POST" action="">' + 
						    '<table>' + 
						        '<tbody>' + 
						            '<tr>' + 
						                '<td>Amount:</td>' + 
						                '<td><input name="amount" type="number" required value="' + data[0] + '"></td>' + 
						            '</tr>' + 
						            '<tr>' + 
						                '<td>Tax(%):</td>' + 
						                '<td><input name="tax" type="number" required value="' + data[1] + '"></td>' + 
						            '</tr>' + 
						            '<tr>' + 
						                '<td>Currency:</td>' + 
						                '<td>' + 
						                    '<select name="currency">' + 
						                        '<option value="Dollar"' + (data[3] === 'Dollar' ? 'selected="selected"' : '') + '>Dollar</option>' +
												'<option value="Euro"' + (data[3] === 'Euro' ? 'selected="selected"' : '') + '>Euro</option>' +
						                    '</select>' +  
						                '</td>' + 
						            '</tr>' + 
						            '<tr>' +  
						                '<td><input type="submit" value="Calculate"></td>' + 
						                '<td><input type="reset"></td>' +
						            '</tr>' + 
						        '</tbody>' +         
						    '</table>' + 
						'</form>' + 
					'</div>' +
					'<hr>' + 
					'<div>' + 						 
						'<p>The total amount is ' + data[2] + ' ' + data[3] + '</p>' + 
					'</div>' + 
					'<hr>' +
					'<div>' + 			
						'<p>' + 
							'<h2> Search By Currency </h2>' + 
							'<table>' + 
						        '<tbody>' + 
						            '<tr>' + 
						                '<td>Currency:</td>' + 
						                '<td>' + 
						                    '<select id="currency">' + 
						                        '<option value="Dollar" selected="selected">Dollar</option>' + 
												'<option value="Euro">Euro</option>' + 
						                    '</select>' + 
						                '</td>' + 
										'<td><input type="button" value="Search" onclick="doSearch()"></td>' + 
						            '</tr>' + 
						        '</tbody>' +         
						    '</table>' + 
							'<div id="search-result"></div>' + 						
						'</p>' + 
					'</div>' + 
					'<script type="text/javascript">' + 
						'function doSearch() {' +
				
							'var xhttp = new XMLHttpRequest();' +

							'xhttp.onreadystatechange = function() {' +
								'if (this.readyState == 4 && this.status == 200) {' +
								   'const result = JSON.parse(xhttp.responseText);' +	
								   'const htmlTable = "<table>".concat(' +
										'"<tr>",' +
										'"<td style=\\"border: thin dotted\\">Amount</td>",' +
										'"<td style=\\"border: thin dotted\\">Tax Rate</td>",' +
										'"<td style=\\"border: thin dotted\\">Total Amount</td>",' +
										'"<td style=\\"border: thin dotted\\">Currency</td>",' +
										'"<td style=\\"border: thin dotted\\">Date</td>",' +
										'"<td style=\\"border: thin dotted\\">User-Agent</td>",' +
										'"</tr>",' +							
										'displaySearchResult(result),' +
										'"</table>"' +
									');' +	
								   'document.getElementById("search-result").innerHTML = htmlTable;' +
								'}' +
							'};' +

							'xhttp.open("GET", "/search?currency=" + document.getElementById("currency").value, true);' +

							'xhttp.send();' +				
						'}' +
			
						'function displaySearchResult(result) {' +
				
							'var data = "";' +

							'for	(var i = 0; i < result.length; i++) {' +
					
								'data = data.concat(' +
										'"<tr>",' +
										'"<td style=\\"border: thin dotted\\">",' +
										'result[i].amount,' +	
										'"</td>",' +
										'"<td style=\\"border: thin dotted\\">",' +
										'result[i].taxRate,' +	
										'"</td>",' +
										'"<td style=\\"border: thin dotted\\">",' +
										'result[i].totalAmount,' +	
										'"</td>",' +
										'"<td style=\\"border: thin dotted\\">",' +
										'result[i].currency,' +	
										'"</td>",' +
										'"<td style=\\"border: thin dotted\\">",' +
										'result[i].date,' +	
										'"</td>",' +
										'"<td style=\\"border: thin dotted\\">",' +
										'result[i].userAgent,' +	
										'"</td>",' +
										'"</tr>"' +
								');' +
							'}' +

							'return data;' +
						'}' +
					'</script>' + 
				'</body>' + 
			'</html>'; 
}
