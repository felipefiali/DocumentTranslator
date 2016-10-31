function translateContent(contentToBeTranslated) {
	fetch('/api/translate', {
		method: 'POST',
		 headers: {
			    'Content-Type': 'application/json'
	    },
		body: JSON.stringify({
			data: contentToBeTranslated
		})
	})
		.then(function(response) {
			return response.json();  
		  })  
		.then(function(translatedJSON) {
			var text = translatedJSON['translations'][0]['translation']
			
			var translationResultElement = document.getElementById('translationResult');
			
			translationResultElement.textContent = text;
			translationResultElement.style = "display: block;";
			
			return text; 
		  });
}