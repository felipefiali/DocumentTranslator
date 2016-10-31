function callDocumentConverter(documentId) {	
	fetch("/api/convert/?documentId=" + documentId)
		.then(function(response) {
			return response.text();  
		  })  
		.then(function(text) {			
			var convertedTextElement = document.getElementById('conversionResult');			
			convertedTextElement.textContent = text;

			var convertedTextContainer = document.getElementById('conversionResultContainer');			
			convertedTextContainer.style = "display: block;";
			
			translateContent(text);
		  });
}