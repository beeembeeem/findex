// import React, { Component } from 'react';
// import symbols from "../symbols"
// import { Auth, API, graphqlOperation } from "aws-amplify";
// import * as mutations from "../graphql/mutations"

// class notFound extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {brand: "Ford"};
//   }
//   componentDidMount() {
//     this.setState({comment: 'Hello'});
//   }
//   add = async()=>{

//     for(var i = 46; symbols.length;i++){
//       console.log(symbols[i])
//       const input = {
//         symbol :  symbols[i].symbol,
//       }
//       if(symbols[i].name){
//         input.name = symbols[i].name
//       } if (symbols[i].name == ""){
//         input.name = "N/A"
//       } else {
//         input.name = symbols[i].name
//       }
//       const putMethod = {
//       method: 'PUT', // Method itself
//       headers: {
//   'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
//  },
//       body: JSON.stringify(input) // We send data in JSON format
// }
//       await global.fetch(`https://search-financeweb-xmgf4biyujgrl4xi256rrdjwau.us-east-1.es.amazonaws.com/stocks/equi/${i}`,putMethod).then(response => response.json())
// .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
// .catch(err => console.log(err)) // Do something with the error
//   this.wait(300)
//   }}
//  wait = (ms) =>{
//    var start = new Date().getTime();
//    var end = start;
//    while(end < start + ms) {
//      end = new Date().getTime();
//   }
// }
//   render() {
//     return (
//     <div className="container"> 
//     <button onClick={this.add}></button>
//     </div>
//     );
//   }
// }

// export default notFound