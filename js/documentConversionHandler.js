function callDocumentConverter(documentId) {	
	fetch("/api/convert/?documentId=" + documentId)
		.then(function(response) {
			return response.text();  
		  })  
		.then(function(text) {			
			return text; 
		  })
		.then(function(convertedText) {
			var convertedTextElement = document.getElementById('conversionResult');
		
			convertedTextElement.textContent = convertedText;
			convertedTextElement.style = "display: block;";
		});  
}