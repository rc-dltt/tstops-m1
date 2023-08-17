import { gql } from 'graphql-tag';

const loginMutation = gql`
mutation login(
  $email: String!
  $password: String!
  ) {
  login(
    email: $email
    password: $password
    )
}
`;

const registerMutation = gql`
  mutation register($command: RegisterInput!) {
    register(command: $command) {
      id
      name
      email
      roles
    }
  }
`;

export {
    loginMutation,
    registerMutation,
  };