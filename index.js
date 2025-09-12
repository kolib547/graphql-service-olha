const { ApolloServer, gql } = require('apollo-server');

// 10 записів
const items = [
  { id: 1, name: 'Item 1', price: 100 },
  { id: 2, name: 'Item 2', price: 200 },
  { id: 3, name: 'Item 3', price: 300 },
  { id: 4, name: 'Item 4', price: 400 },
  { id: 5, name: 'Item 5', price: 500 },
  { id: 6, name: 'Item 6', price: 600 },
  { id: 7, name: 'Item 7', price: 700 },
  { id: 8, name: 'Item 8', price: 800 },
  { id: 9, name: 'Item 9', price: 900 },
  { id: 10, name: 'Item 10', price: 1000 },
];

// Схема GraphQL
const typeDefs = gql`
  type Item {
    id: Int
    name: String
    price: Int
  }

  type Query {
    items: [Item]
    item(id: Int!): Item
  }
`;

// Резолвери з логуванням
const resolvers = {
  Query: {
    items: (_, __, context) => {
      console.log('Query items received');
      return items;
    },
    item: (_, { id }) => {
      console.log(`Query item received with id: ${id}`);
      return items.find(item => item.id === id);
    },
  },
};

// Сервер
const server = new ApolloServer({ typeDefs, resolvers });

// Запуск
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
