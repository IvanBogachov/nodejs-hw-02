import createHttpError from 'http-errors';

import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    // console.log('Authorization header missing');
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const [bearer, token] = authHeader.split(' ');

  // const bearer = authHeader.split(' ')[0];
  // const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    // console.log('Invalid Authorization header format');
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  const session = await SessionsCollection.findOne({ accessToken: token });

  if (!session) {
    // console.log('Session not found for token:', token);
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    // console.log('Access token expired for session:', session);
    next(createHttpError(401, 'Access token expired'));
    return;
  }

  const user = await UsersCollection.findById(session.userId);

  if (!user) {
    // console.log('User not found for session:', session.userId);
    next(createHttpError(401));
    return;
  }
  // console.log('Authenticated user:', user);
  req.user = user;

  next();
};
