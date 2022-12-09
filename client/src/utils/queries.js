import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query Query {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_AGENTS = gql`
query Query {
  agents {
    _id
    bio
    acheivements
    expertIn {
      _id
      imgPath
      type
    }
    imgPath
    industries
    instagram
    linkedin
    name
    rating
    twitter
  }
}
`;

export const QUERY_TAGS = gql`
  query Tags {
    tags {
      _id
      type
      imgPath
    }
  }
`;

export const QUERY_FILTERED_AGENTS = gql`
query Query($tagIds: [ID]!) {
  filteredAgents(tagIds: $tagIds) {
    _id
    bio
    acheivements
    expertIn {
      _id
      imgPath
      type
    }
    imgPath
    industries
    instagram
    linkedin
    name
    rating
    twitter
  }
}
`;

export const QUERY_AGENT = gql`
  query Query($agentId: ID!) {
    agent(agentId: $agentId) {
      _id
      acheivements
      bio
      expertIn {
        _id
        imgPath
        type
      }
      imgPath
      industries
      instagram
      linkedin
      name
      rating
      reviews {
        _id
        rating
        review
        username
      }
      twitter
    }
  }
`;