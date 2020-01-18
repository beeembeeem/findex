const app = require('./app');
const AWS = require('aws-sdk');
var credentials = new AWS.SharedIniFileCredentials({profile: 'Investfolio'});
AWS.config.credentials = credentials;

console.log(AWS.config.credentials.accessKeyId)
app.listen(3000, () => {
  console.log('Running on port 3000...');
  
});
