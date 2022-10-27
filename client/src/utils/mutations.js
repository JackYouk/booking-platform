import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    addProfile(username: $username, email: $email, password: $password) {
      token
      profile {
        username
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        username
        email
        _id
      }
    }
  }
`;

export const ADD_AGENT = gql`
  mutation Mutation($name: String!, $bio: String!) {
    addAgent(name: $name, bio: $bio) {
      _id
      name
      bio
    }
  }
`;

export const CREATE_TAG = gql`
  mutation Mutation($type: String!) {
    createTag(type: $type) {
      _id
      type
    }
  }
`;
