const config = {}
const AWS = require('aws-sdk');
config.cognitoPool = {   
        UserPoolId : "us-east-1_kaWEqkAWD",  
        ClientId : "33u8e4l37q9rr0i9pnq5saa295" 
    }
const pool_region = 'us-east-1';

module.exports = config