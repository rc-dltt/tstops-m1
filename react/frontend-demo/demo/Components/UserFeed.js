import {useSubscription} from '@apollo/client';
import {USER_FEED} from '../graphql/users/subscription';

const UserFeed = () => {
  const {data, loading} = useSubscription(USER_FEED, {
    variables: {},
  });
  return <h4>User added: {!loading && data.userAdded.email}</h4>;
};

export {UserFeed};
