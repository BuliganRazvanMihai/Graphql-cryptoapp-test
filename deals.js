const { ApolloServer, gql } = require("apollo-server")
const { buildFederatedSchema } = require("@apollo/federation")

const typeDefs = gql`
    
    extend type Coin @key(fields: "asset_id") {
    asset_id: String! @external
    }
    
    type Deal {
        id: Int!
        volume: Int
        timestamp: String
        coin: Coin   
    }
    
    extend type Query {
        deal(id: Int) : Deal
        deals: [Deal]
    }
   `

    const resolvers = {
        Query: {
            deal(_, args) {
                return deals.find(deal => deal.id == args.id)
            },
            deals() {
                return deals
            }
        }
    }

    const server = new ApolloServer({
        schema: buildFederatedSchema([
            {
                typeDefs,
                resolvers
            }
        ])
    })

server.listen({ port: 4001}).then(({ url}) => {
    console.log(`Deals service ready at ${url}`)
})

const deals = [
    { id: 1, volume: 15343, timestamp: "2021-08-05T10:27:12+00:00", coin: { asset_id: "ADA"}},
    { id: 2, volume:5, timestamp: "2021-08-05T10:27:12+00:00", coin: { asset_id: "ETH"}},
]
