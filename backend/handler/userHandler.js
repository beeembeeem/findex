const crypto = require('crypto');
var validator = require("email-validator");
const user = require('../logic/user')
const config = require('../config')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const userPool = new AmazonCognitoIdentity.CognitoUserPool(config.cognitoPool);
global.navigator = {
    userAgent: 'NodeJS'
  };
class userHandler {};

userHandler.signIn = (req, res) => {
    var dataList = {'userName':'','password':''}
    const userName = req.query.userName
    const password = req.query.password
    datalist = userHandler.verify(req,res,dataList)   
    if (datalist == {}){
        return
    }
    var authenticationData = {
        Username : userName,
        Password : password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var poolData = { UserPoolId : config.cognitoPool.UserPoolId,
        ClientId : config.cognitoPool.ClientId
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username : userName,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {


            console.log(result)
            res.send(result)
        },

        onFailure: function(err) {
            console.log(authenticationData);
            console.log(err);
            err = [err,authenticationData]
            res.send(err);
        },

});


}

userHandler.signUp = (req, res) => {
    var dataList  = {'userName':'','firstName':'','lastName':'','password':'','email':''}
    dataList = userHandler.verify(req,res,dataList) 
    if (dataList == {}){
        return
    }
    if(validator.validate(dataList.email)){
        const newUser = new user(dataList.userName,dataList.firstName,dataList.lastName,dataList.password,dataList.email);
        newUser.register();
        res.sendStatus(200)
        } else {
            console.log("Email not valid")
            res.send("Email not valid")
        }

}
userHandler.confirm = (req,res) => {

    var dataList = {'code':'','userName':''}
    const code = req.query.code
    const userName = req.query.userName
    dataList = userHandler.verify(req,res,dataList)
    if (dataList = {}){
        return
    }     
    const userData = {
        Username: userName,
        Pool: userPool
    } 
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
            res.send(JSON.stringify(err));
            return;
        }
    console.log('call result: ' + result);
    res.send(result);
    });
}
userHandler.verify = (req,res,dataList) => {
    console.log("query length: " + Object.keys(req.query).length)
    console.log("datalist length: " + Object.keys(dataList).length)

    if(Object.keys(req.query).length == Object.keys(dataList).length ) {

        for (var x = 0 ; x< Object.values(req.query).length  ; x++ ){
            if (Object.values(req.query)[x] == '' || Object.values(req.query)[x] == undefined || Object.keys(req.query)[x] != Object.keys(dataList)[x] )  {
                res.send('Undefined Value => ' + Object.keys(req.query)[x])
                datalist = {}
                return datalist
            } else {
                dataList[Object.keys(req.query)[x]] = Object.values(req.query)[x]                 }
            }
        } else {
            datalist = {}
            return datalist
        }
        return dataList;
}

module.exports= userHandler;
