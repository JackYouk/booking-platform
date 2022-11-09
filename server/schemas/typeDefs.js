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
    imgPath: String
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
    agent(agentId: ID!): Agent
    filteredAgents(tagIds: [ID]!): [Agent]
  }

  type Mutation {
    addProfile(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    adminLogin(email: String!, password: String!): Auth
    addAgent(name: String!, bio: String!, expertIn: [ID], imgPath: String): Agent
    deleteAgent(agentId: ID!): Agent
    createTag(type: String!): Tag
    deleteTag(tagId: ID!): Tag
  }
`;

module.exports = typeDefs;
