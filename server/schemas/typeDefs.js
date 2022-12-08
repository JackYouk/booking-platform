const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Tag {
    _id: ID
    type: String
    imgPath: String
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
    industries: String
    bio: String
    acheivements: String
    instagram: String
    twitter: String
    linkedin: String
    rating: String
    imgPath: String
    expertIn: [Tag]
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
    addAgent(name: String!, industries: String, bio: String, acheivements: String, instagram: String, twitter: String, linkedin: String, rating: String, imgPath: String, expertIn: [ID]): Agent
    deleteAgent(agentId: ID!): Agent
    createTag(type: String!, imgPath: String): Tag
    deleteTag(tagId: ID!): Tag
    editAgent(_id: ID!, name: String, industries: String, bio: String, acheivements: String, instagram: String, twitter: String, linkedin: String, rating: String, imgPath: String, expertIn: [ID]): Agent
    editTag(_id: ID!, type: String, imgPath: String): Tag
  }
`;

module.exports = typeDefs;
