"use strict";
const config = require('../config')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch'); 
const poolData =  config.cognitoPool
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

class users {
    constructor(username,
        firstName,lastName,
        password,email){   
        if(arguments.length == 5){
            this.id = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
            this.username = username;
            this.firstName = firstName;
            this.lastName = lastName;
            this.password = password;
            this.email = email;
            this.date = new Date();
        } else{
            throw new Error('Parameters are not provided')
        }
        } 
    register(){
        var attributeList = [];
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:this.firstName}));
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"family_name",Value:this.lastName}));
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:this.email}));
        userPool.signUp(this.username, this.password, attributeList, null, function(err, result){
            if (err) {
                console.log(err);
                return;
            }
            var cognitoUser = result;
            console.log(cognitoUser);
        });

        }     
}

module.exports = users;