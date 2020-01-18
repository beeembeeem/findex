const navbarSettings = {
    brand_name : 'ForexFolio',
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
            name: 'Services' ,
            url: '/signin'},
        {   id: 3,
            name:'Documentation', 
            url: '/signup'} ,
        {
            id :4,
            name: 'About',
            url:'/hell'
        }  
     ]
    ,
    items_auth : [
        {   id: 1,
            name: 'Home' ,
            url: '/'},
        {   id: 2,
            name: 'Account' ,
            url: '/account'},
        {   id: 3,
            name:'Help', 
            url: '/help'} 
     ]
    
}
module.exports = navbarSettings;