function handleFile(formElement) {    	
	var newForm = new FormData(formElement);
	fetch("/upload", { method: 'POST', body: newForm})
		.then(function(response) {
			return response.text();
		})
		.then(function(jsonResponse) {
			var json = JSON.parse(jsonResponse);
			
			return json.documentId;
		})
		.then(function(documentId) {
			callDocumentConverter(documentId);
		});
	
}