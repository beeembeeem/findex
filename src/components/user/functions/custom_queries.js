export const DashboardPortfolios = `query{listPortfolios(
  limit:50
){
    items{
      id
      name
      stocks{
        items{
          id
          name
          symbol
        }
      }
    }
  }}
`