const portfolioSettings =  {
    addPortfolioFields : [
        {
            id : 1,
            name : "name",
            label: 'Name:',
            placeholder: '',
            type: 'text'
        },
        
        {
            id : 2,
            name : "type",
            label: 'Type:',
            placeholder: '',
            type: 'text',
            list : "typeList",
            listData:[
                {value : 'High Risk'},
                {value : 'Low Risk'},
                {value : 'Medium Risk'}
            ]
        }
    ]
}
module.exports = portfolioSettings