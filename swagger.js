module.exports ={
  "swaggerDefinition": {
    "swagger": "2.0",
    "info": {
      "version": "1.0.0",  
      "title": "Defndor API",
      "description": "Defindor API documentation",
      "license": {
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT"
      }
    },
    "host": process.env.HOST,
    "basePath": "/",
    "schemes": ["https","http"]
    
  },
  "apis": ["./src/routes/*.js"]
}