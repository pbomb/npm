const execa = require('execa');
const SemanticReleaseError = require('@semantic-release/error');
const debug = require('debug')('semantic-release:npm');
const setNpmrcAuth = require('./set-npmrc-auth');

module.exports = async (pkg, logger) => {
  await setNpmrcAuth(pkg, logger);
  try {
    await execa('npm', ['whoami', '--userconfig=.npmrc']);
  } catch (err) {
    debug(err);
    throw new SemanticReleaseError('Invalid npm token.', 'EINVALIDNPMTOKEN');
  }
};
