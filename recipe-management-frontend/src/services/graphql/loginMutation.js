import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        userName
        firstname
        lastname
        email
      }
      userToken
      statusCode
      status
    }
  }
`;

export const REGISTER_MUTATION = gql`
mutation Register($input: RegisterInput!) {
    register(input: $input) {
      user {
        id
        userName
        email
      }      
      statusCode
      status
    }
  }
  `;