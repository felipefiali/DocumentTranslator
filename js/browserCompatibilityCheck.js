function checkBrowser() {
	var isFirefox = typeof InstallTrigger !== 'undefined';	
    
	var isChrome = !!window.chrome && !!window.chrome.webstore;	
	
	if (isFirefox == false && isChrome == false) {
		var errorElement = document.getElementById('errorMessage');		
		
		errorElement.style.display = "block";
	}
}
