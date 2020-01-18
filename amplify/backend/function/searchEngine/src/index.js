
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();
const Fuse =  require('fuse.js')
/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = (event, context, callback) => {
    const done = () => {
        callback(null, {
        statusCode: '' ? '400' : '200',
        body: err ? 'err.message' : JSON.stringify('result'),
        headers: {
            'Content-Type': 'application/json',
            'test':'test'
        },
    });
    }
    done()

};
