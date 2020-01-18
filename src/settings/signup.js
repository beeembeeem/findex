const login = {
    fields: [
        {id: 1,
        label: 'First Name',
        name: 'Firstname',
        placeholder: '',
        type: 'text',
        attr: 'name'
        },
        {id: 2,
        label: 'Last Name',
        name: 'Lastname',
        placeholder: '',
        type: 'text',
        attr: 'family_name'

        },
        {id: 3,
            label: 'Email',
            name: 'Email',
            placeholder: '',
            type: 'text',
            attr: 'email'

            }   ,
            {id: 4,
                label: 'Username',
                name: 'Username',
                placeholder: '',
                type: 'text',
                attr:'username'
                } ,
                {id: 5,
                    label: 'Password',
                    name: 'Password',
                    placeholder: 'lowercase, uppercase, digits, symbols and above 8 digits',
                    type: 'Password',
                    attr:'password'
                    }
        
    ]
}

module.exports = login;