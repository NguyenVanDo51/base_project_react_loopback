import {AuthenticationComponent} from '@loopback/authentication';
import {
  JWTAuthenticationComponent, UserServiceBindings
} from '@loopback/authentication-jwt';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import {DefaultSequence} from '@loopback/rest';
import path from 'path';
import {MongodbDataSource} from './datasources';
import {MySequence} from './sequence';

export {ApplicationConfig};

export class DdTask extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    // this.sequence(MySequence);
    this.sequence(DefaultSequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    // mount authentication system
    this.component(AuthenticationComponent);

    // mount jwt component
    this.component(JWTAuthenticationComponent);

    // bind datasource
    this.dataSource(MongodbDataSource, UserServiceBindings.DATASOURCE_NAME);
  }
}
