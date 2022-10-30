const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Tag {
    _id: ID
    type: String
  }

  type Profile {
    _id: ID
    username: String
    email: String
    password: String
    interests: [Tag]
  }

  type Agent {
    _id: ID
    name: String
    bio: String
    expertIn: [Tag]
    clients: [Profile]
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]
    profile(profileId: ID!): Profile
    agents: [Agent]
    me: Profile
    tags: [Tag]
  }

  type Mutation {
    addProfile(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    adminLogin(email: String!, password: String!): Auth
    addAgent(name: String!, bio: String!, expertIn: [ID]): Agent
    deleteAgent(agentId: ID!, adminId: ID!): Agent
    createTag(type: String!): Tag
  }
`;

module.exports = typeDefs;
