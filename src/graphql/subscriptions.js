/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePortfolio = `subscription OnCreatePortfolio($owner: String!) {
  onCreatePortfolio(owner: $owner) {
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
export const onUpdatePortfolio = `subscription OnUpdatePortfolio($owner: String!) {
  onUpdatePortfolio(owner: $owner) {
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
export const onDeletePortfolio = `subscription OnDeletePortfolio($owner: String!) {
  onDeletePortfolio(owner: $owner) {
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
export const onCreatePublicPortfolio = `subscription OnCreatePublicPortfolio($owner: String!) {
  onCreatePublicPortfolio(owner: $owner) {
    id
    name
    type
    owner
  }
}
`;
export const onUpdatePublicPortfolio = `subscription OnUpdatePublicPortfolio($owner: String!) {
  onUpdatePublicPortfolio(owner: $owner) {
    id
    name
    type
    owner
  }
}
`;
export const onDeletePublicPortfolio = `subscription OnDeletePublicPortfolio($owner: String!) {
  onDeletePublicPortfolio(owner: $owner) {
    id
    name
    type
    owner
  }
}
`;
export const onCreatePortfolioStockList = `subscription OnCreatePortfolioStockList {
  onCreatePortfolioStockList {
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
export const onUpdatePortfolioStockList = `subscription OnUpdatePortfolioStockList {
  onUpdatePortfolioStockList {
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
export const onDeletePortfolioStockList = `subscription OnDeletePortfolioStockList {
  onDeletePortfolioStockList {
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
export const onCreateGlobalStocks = `subscription OnCreateGlobalStocks {
  onCreateGlobalStocks {
    id
    name
    symbol
    createdAt
  }
}
`;
export const onUpdateGlobalStocks = `subscription OnUpdateGlobalStocks {
  onUpdateGlobalStocks {
    id
    name
    symbol
    createdAt
  }
}
`;
export const onDeleteGlobalStocks = `subscription OnDeleteGlobalStocks {
  onDeleteGlobalStocks {
    id
    name
    symbol
    createdAt
  }
}
`;
export const onCreateEvent = `subscription OnCreateEvent {
  onCreateEvent {
    id
    name
    createdAt
    queryName
  }
}
`;
export const onUpdateEvent = `subscription OnUpdateEvent {
  onUpdateEvent {
    id
    name
    createdAt
    queryName
  }
}
`;
export const onDeleteEvent = `subscription OnDeleteEvent {
  onDeleteEvent {
    id
    name
    createdAt
    queryName
  }
}
`;
