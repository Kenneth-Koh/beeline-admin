import assert from 'assert';
import env from './env';

var lock;

lock = new Auth0Lock(
  env.AUTH0_CID,
  env.AUTH0_DOMAIN,
  {
    auth: {
      params: {
        scope: 'openid name email app_metadata user_id offline_access'
      }
    }
  });
var authPromise = new Promise((resolve, reject) => {
  lock.on('authenticated', resolve);
  lock.on('authorization_error', reject);
  lock.on('hash_parsed', (e) => {
    if (e === null) resolve(null);
  });
})


export default function() {
  this.lock = lock;
  this.credentials = {};

  this.ready = authPromise;

  this.refreshToken = function () {
    this.lock.refreshToken()
  }

  this.ready.then((auth) => {
    if (auth) {
      this.credentials = auth;
    }
  })
}
