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