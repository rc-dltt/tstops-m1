import {gql} from 'graphql-tag';

const USER_FEED = gql`
  subscription UserAdded() {
    userAdded {
      id
      name
      email
      roles
    }
  }
`;

export {USER_FEED};