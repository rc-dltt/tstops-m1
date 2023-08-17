import { gql } from 'graphql-tag';

const usersQuery = gql`
  query users {
    users {
      id
      name
      email
      roles
    }
  }
`;

export {usersQuery};