/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPortfolio = `mutation CreatePortfolio(
  $input: CreatePortfolioInput!
  $condition: ModelPortfolioConditionInput
) {
  createPortfolio(input: $input, condition: $condition) {
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
export const updatePortfolio = `mutation UpdatePortfolio(
  $input: UpdatePortfolioInput!
  $condition: ModelPortfolioConditionInput
) {
  updatePortfolio(input: $input, condition: $condition) {
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
export const deletePortfolio = `mutation DeletePortfolio(
  $input: DeletePortfolioInput!
  $condition: ModelPortfolioConditionInput
) {
  deletePortfolio(input: $input, condition: $condition) {
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
export const createPublicPortfolio = `mutation CreatePublicPortfolio(
  $input: CreatePublicPortfolioInput!
  $condition: ModelPublicPortfolioConditionInput
) {
  createPublicPortfolio(input: $input, condition: $condition) {
    id
    name
    type
    owner
  }
}
`;
export const updatePublicPortfolio = `mutation UpdatePublicPortfolio(
  $input: UpdatePublicPortfolioInput!
  $condition: ModelPublicPortfolioConditionInput
) {
  updatePublicPortfolio(input: $input, condition: $condition) {
    id
    name
    type
    owner
  }
}
`;
export const deletePublicPortfolio = `mutation DeletePublicPortfolio(
  $input: DeletePublicPortfolioInput!
  $condition: ModelPublicPortfolioConditionInput
) {
  deletePublicPortfolio(input: $input, condition: $condition) {
    id
    name
    type
    owner
  }
}
`;
export const createPortfolioStockList = `mutation CreatePortfolioStockList(
  $input: CreatePortfolioStockListInput!
  $condition: ModelPortfolioStockListConditionInput
) {
  createPortfolioStockList(input: $input, condition: $condition) {
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
export const updatePortfolioStockList = `mutation UpdatePortfolioStockList(
  $input: UpdatePortfolioStockListInput!
  $condition: ModelPortfolioStockListConditionInput
) {
  updatePortfolioStockList(input: $input, condition: $condition) {
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
export const deletePortfolioStockList = `mutation DeletePortfolioStockList(
  $input: DeletePortfolioStockListInput!
  $condition: ModelPortfolioStockListConditionInput
) {
  deletePortfolioStockList(input: $input, condition: $condition) {
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
export const createGlobalStocks = `mutation CreateGlobalStocks(
  $input: CreateGlobalStocksInput!
  $condition: ModelglobalStocksConditionInput
) {
  createGlobalStocks(input: $input, condition: $condition) {
    id
    name
    symbol
    createdAt
  }
}
`;
export const updateGlobalStocks = `mutation UpdateGlobalStocks(
  $input: UpdateGlobalStocksInput!
  $condition: ModelglobalStocksConditionInput
) {
  updateGlobalStocks(input: $input, condition: $condition) {
    id
    name
    symbol
    createdAt
  }
}
`;
export const deleteGlobalStocks = `mutation DeleteGlobalStocks(
  $input: DeleteGlobalStocksInput!
  $condition: ModelglobalStocksConditionInput
) {
  deleteGlobalStocks(input: $input, condition: $condition) {
    id
    name
    symbol
    createdAt
  }
}
`;
export const createEvent = `mutation CreateEvent(
  $input: CreateEventInput!
  $condition: ModelEventConditionInput
) {
  createEvent(input: $input, condition: $condition) {
    id
    name
    createdAt
    queryName
  }
}
`;
export const updateEvent = `mutation UpdateEvent(
  $input: UpdateEventInput!
  $condition: ModelEventConditionInput
) {
  updateEvent(input: $input, condition: $condition) {
    id
    name
    createdAt
    queryName
  }
}
`;
export const deleteEvent = `mutation DeleteEvent(
  $input: DeleteEventInput!
  $condition: ModelEventConditionInput
) {
  deleteEvent(input: $input, condition: $condition) {
    id
    name
    createdAt
    queryName
  }
}
`;
