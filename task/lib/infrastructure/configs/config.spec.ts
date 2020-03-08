import * as sinon from 'sinon';
import * as should from 'should';
import * as dotenv from 'dotenv';

import { InvalidConfiguration } from '../../models';

import { Config } from './config';

describe('Infrastructure', () => {
  describe('Configs', () => {
    describe('Initialize the configuration', () => {
      const envFilePath = 'fake/file/path/';

      it('should call configuration handling library with given path', () => {
        const spy = sinon.spy(dotenv, 'config');

        const config = new Config();
        config.initConfig(envFilePath);

        should(
          spy.calledWith({
            path: envFilePath
          })
        ).true();
      });

      it('should return itself after initialize', () => {
        const config = new Config();
        const returnValue = config.initConfig(envFilePath);

        should(returnValue).instanceOf(Config);
      });
    });

    describe('load config values', () => {
      let config: Config;

      beforeEach(() => {
        delete process.env['github_endpoint'];
        delete process.env['server_port'];
        delete process.env['github_token'];
        delete process.env['DEBUG'];

        config = new Config();
      });

      it('should return GitHub endpoint', () => {
        const ghp = 'http://gh';

        process.env['github_endpoint'] = ghp;

        should(config.getGitHubApiEndPoint()).eql(ghp);
      });

      it('should throw InvalidConfiguration error if GitHub endpoint is not set', () => {
        delete process.env['github_endpoint'];

        should(() => config.getGitHubApiEndPoint()).throw(
          InvalidConfiguration,
          {
            message: 'missing Github endpoint',
            code: 500
          }
        );
      });

      it('should return server port', () => {
        const sp = '123';

        process.env['server_port'] = sp;

        should(config.getServerPort())
          .Number()
          .eql(parseInt(sp, 10));
      });

      it('should throw InvalidConfiguration error if server port is not set', () => {
        delete process.env['server_port'];

        should(() => config.getServerPort()).throw(InvalidConfiguration, {
          message: 'invalid server port',
          code: 500
        });
      });

      it('should throw InvalidConfiguration error if server port is not a number', () => {
        process.env['server_port'] = 'not a number';

        should(() => config.getServerPort()).throw(InvalidConfiguration, {
          message: 'invalid server port',
          code: 500
        });
      });

      it('should throw InvalidConfiguration error if server port is negative', () => {
        process.env['server_port'] = '-20';

        should(() => config.getServerPort()).throw(InvalidConfiguration, {
          message: 'invalid server port',
          code: 500
        });
      });

      it('should return Github token', () => {
        const ght = '123';

        process.env['github_token'] = ght;

        should(config.getGitHubToken()).eql(ght);
      });
    });
  });
});
