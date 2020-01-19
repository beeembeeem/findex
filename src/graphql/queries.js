/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPortfolio = `query GetPortfolio($id: ID!) {
  getPortfolio(id: $id) {
    id
    name
    type
    stocks {
      items {
        id
        name
        symbol
        createdAt
      }
      nextToken
    }
    owner
  }
}
`;
export const listPortfolios = `query ListPortfolios(
  $filter: ModelPortfolioFilterInput
  $limit: Int
  $nextToken: String
) {
  listPortfolios(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      type
      stocks {
        nextToken
      }
      owner
    }
    nextToken
  }
}
`;
export const getPublicPortfolio = `query GetPublicPortfolio($id: ID!) {
  getPublicPortfolio(id: $id) {
    id
    name
    type
    owner
  }
}
`;
export const listPublicPortfolios = `query ListPublicPortfolios(
  $filter: ModelPublicPortfolioFilterInput
  $limit: Int
  $nextToken: String
) {
  listPublicPortfolios(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      type
      owner
    }
    nextToken
  }
}
`;
export const getPortfolioStockList = `query GetPortfolioStockList($id: ID!) {
  getPortfolioStockList(id: $id) {
    id
    name
    symbol
    createdAt
    portfolio {
      id
      name
      type
      stocks {
        nextToken
      }
      owner
    }
  }
}
`;
export const listPortfolioStockLists = `query ListPortfolioStockLists(
  $filter: ModelPortfolioStockListFilterInput
  $limit: Int
  $nextToken: String
) {
  listPortfolioStockLists(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      symbol
      createdAt
      portfolio {
        id
        name
        type
        owner
      }
    }
    nextToken
  }
}
`;
export const getGlobalStocks = `query GetGlobalStocks($id: ID!) {
  getGlobalStocks(id: $id) {
    id
    name
    symbol
    createdAt
  }
}
`;
export const listGlobalStockss = `query ListGlobalStockss(
  $filter: ModelglobalStocksFilterInput
  $limit: Int
  $nextToken: String
) {
  listGlobalStockss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      symbol
      createdAt
    }
    nextToken
  }
}
`;
export const getEvent = `query GetEvent($id: ID!) {
  getEvent(id: $id) {
    id
    name
    createdAt
    queryName
  }
}
`;
export const listEvents = `query ListEvents(
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      createdAt
      queryName
    }
    nextToken
  }
}
`;
export const itemsByDate = `query ItemsByDate(
  $queryName: String
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
) {
  itemsByDate(
    queryName: $queryName
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      createdAt
      queryName
    }
    nextToken
  }
}
`;
