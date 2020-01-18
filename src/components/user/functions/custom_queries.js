export const DashboardPortfolios = `query{listPortfolios{
    items{
      id
      name
      stocks{
        items{
          id
          name
          price
        }
      }
    }
  }}
`