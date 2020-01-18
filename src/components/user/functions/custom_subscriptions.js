export const watchDashboardPortfolios = ` 
  subscription{
    onCreatePortfolio(owner:"${this.props.data.user.username}"){
      name
      type
      id
            stocks{
        items{
          id
          name
          price
        }
      }
    }
  }
`