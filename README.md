# DocumentTranslator
The Document Translator sample application was developed based on Node.JS and it uses a lot of JavaScript and AJAX. It also uses two Bluemix Watson services: The Language Translator and the Document Conversion services. It integrates both of them to create a simple way to translate .doc, .docx, .pdf or .html documents from english to portuguese.

## Run locally:


1. Download and install [Node.js](http://nodejs.org/) and [npm](https://www.npmjs.com/).


2. Configure the credentials for both services correctly in the app.js file, where they're currently hardcoded.

3. Run the install command from npm to install the packages specified as dependencies:
 
	```node
    $ npm install
    ```

4. Run the application with the following command:

    ```node
    node app.js
    ```
	
5. Open your browser on the URL that shows up on the log:

    server starting on http://localhost:6001

## License

The code here is made public as is, which means it has no support or work guarantee. It was only written in an intent to learn a little more about Node.JS and JavaScript.
	

## Supported Browsers

The supported browsers are Google Chrome and Mozilla Firefox. Internet Explorer has no support because it does not support JavaScript's ```fetch``` method.
