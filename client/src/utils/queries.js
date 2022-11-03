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
      name
      bio
      expertIn {
        _id
        type
      }
    }
  }
`;

export const QUERY_TAGS = gql`
  query Tags {
    tags {
      _id
      type
    }
  }
`;

export const QUERY_FILTERED_AGENTS = gql`
  query FilteredAgents($tagIds: [ID]!) {
    filteredAgents(tagIds: $tagIds) {
      _id
      name
      bio
      expertIn {
        _id
        type
      }
    }
  }
`;