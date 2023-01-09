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
  mutation Mutation($name: String!, $industries: String, $bio: String, $acheivements: String, $credentials: [ID], $instagram: String, $twitter: String, $linkedin: String, $rating: String, $imgPath: String, $expertIn: [ID], $packages: [String]) {
    addAgent(name: $name, industries: $industries, bio: $bio, acheivements: $acheivements, credentials: $credentials, instagram: $instagram, twitter: $twitter, linkedin: $linkedin, rating: $rating, imgPath: $imgPath, expertIn: $expertIn, packages: $packages) {
      _id
      acheivements
      credentials {
        _id
        description
        icon
        link
        title
      }
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
      packages
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

export const CREATE_TAG = gql`
  mutation Mutation($type: String!, $imgPath: String) {
    createTag(type: $type, imgPath: $imgPath) {
      _id
      type
      imgPath
    }
  }
`;

export const DELETE_AGENT = gql`
  mutation Mutation($agentId: ID!) {
    deleteAgent(agentId: $agentId) {
      _id
    }
  }
`;

export const DELETE_TAG = gql`
  mutation Mutation($tagId: ID!) {
    deleteTag(tagId: $tagId) {
      _id
    }
  }
`;

export const EDIT_AGENT = gql`
  mutation Mutation($id: ID!, $name: String, $industries: String, $bio: String, $acheivements: String, $instagram: String, $twitter: String, $linkedin: String, $rating: String, $imgPath: String, $expertIn: [ID]) {
    editAgent(_id: $id, name: $name, industries: $industries, bio: $bio, acheivements: $acheivements, instagram: $instagram, twitter: $twitter, linkedin: $linkedin, rating: $rating, imgPath: $imgPath, expertIn: $expertIn) {
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

export const EDIT_TAG = gql`
  mutation Mutation($id: ID!, $type: String, $imgPath: String) {
    editTag(_id: $id, type: $type, imgPath: $imgPath) {
      _id
      type
      imgPath
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation Mutation($username: String!, $review: String!, $agentId: ID!, $rating: String) {
    addReview(username: $username, review: $review, agentId: $agentId, rating: $rating) {
      _id
      rating
      review
      username
    }
  }
`;

export const ADD_CREDENTIAL = gql`
  mutation Mutation($icon: String!, $title: String!, $description: String, $link: String) {
    addCredential(icon: $icon, title: $title, description: $description, link: $link) {
      _id
      description
      icon
      link
      title
    }
  }
`;