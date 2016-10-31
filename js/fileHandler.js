function handleFile(formElement) {    	
	var newForm = new FormData(formElement);
	
	var fileInput = document.getElementById('fileInput');
	
	var file = fileInput.files[0];
	
	if (file.size > 1024000) {
		alert('File size should be smaller then 1 MB.');
		
		return;
	}
		
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