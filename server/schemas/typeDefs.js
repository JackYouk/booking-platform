const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Tag {
    _id: ID
    type: String
    imgPath: String
  }

  type Review {
    _id: ID
    username: String
    review: String
    rating: String
  }

  type Credential {
    _id: ID
    icon: String
    title: String
    description: String
    link: String
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
    credentials: [Credential]
    instagram: String
    twitter: String
    linkedin: String
    rating: String
    imgPath: String
    expertIn: [Tag]
    reviews: [Review]
    packages: [String]
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
    addedCredentials(credentialIds: [ID]!): [Credential]
    regexAgents(key: String): [Agent]
  }

  type Mutation {
    addProfile(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    adminLogin(email: String!, password: String!): Auth
    addAgent(name: String!, industries: String, bio: String, acheivements: String, credentials: [ID], instagram: String, twitter: String, linkedin: String, rating: String, imgPath: String, expertIn: [ID], packages: [String]): Agent
    deleteAgent(agentId: ID!): Agent
    createTag(type: String!, imgPath: String): Tag
    deleteTag(tagId: ID!): Tag
    editAgent(_id: ID!, name: String, industries: String, bio: String, acheivements: String, instagram: String, twitter: String, linkedin: String, rating: String, imgPath: String, expertIn: [ID]): Agent
    editTag(_id: ID!, type: String, imgPath: String): Tag
    addReview(agentId: ID!, username: String!, review: String!, rating: String): Review
    addCredential(icon: String!, title: String!, description: String, link: String): Credential
  }
`;

module.exports = typeDefs;
