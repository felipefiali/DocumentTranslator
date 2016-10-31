function callDocumentConverter(documentId) {	
	fetch("/api/convert/?documentId=" + documentId)
		.then(function(response) {
			return response.text();  
		  })  
		.then(function(text) {			
			var convertedTextElement = document.getElementById('conversionResult');
			
			convertedTextElement.textContent = text;
			convertedTextElement.style = "display: block;"; 
			
			translateContent(text);
		  });
}