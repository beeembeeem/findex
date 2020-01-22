const navbarSettings = {
    brand_name : 'VESTOR',
    buttons_unauth: [
        {   id: 1,
            name: 'Login' ,
            url: '/signin'},
            {   id: 2,
                name: 'Register' ,
                url: '/signup'}    

    ],
    buttons_auth: [
        {   id: 1,
            name: 'Signout' ,
            url: '/signout'}

    ],
    items_unauth : [
        {   id: 1,
            name: 'Home' ,
            url: '/'},
        {   id: 2,
            name: 'Sign In' ,
            url: '/signin'},
        {   id: 3,
            name:'Sign Up', 
            url: '/signup'} 
     ]
    ,
    items_auth : [
        {   id: 1,
            name: 'Dashboard' ,
            url: '/'},
        {   id: 2,
            name: 'Sign Out' ,
            url: '/signout'},
        {   id: 3,
            name:'Help', 
            url: '/help'} 
     ]
    
}
module.exports = navbarSettings;