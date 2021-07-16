// ---------- ADD IMPORTS -------------
import {authenticate, TokenService} from '@loopback/authentication';
import {Credentials, MyUserService, TokenServiceBindings, User, UserRepository, UserServiceBindings} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {model, property, repository} from '@loopback/repository';
import {get, getModelSchemaRef, post, requestBody, SchemaObject} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';
// ----------------------------------

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    require: true,
  })
  password: string;
};

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  require: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @post('user/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              property: {
                token: {
                  type: 'string'
                }
              }
            }
          },
          'Access-Control-Allow-Origin': '*',
        }
      }
    }
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    const user = await this.userService.verifyCredentials(credentials);
    const userProfile = this.userService.convertToUserProfile(user);

    // create jwt
    const token = await this.jwtService.generateToken(userProfile);
    return {token, ...userProfile};
  }

  @authenticate('jwt')
  @get('profile', {
    responses: {
      '200': {
        description: 'return current user',
        content: {
          'application/json': {
            schema: {
              type: {
                email: 'string',
                name: 'string',
              }
            }
          }
        }
      }
    }
  })
  async profile(@inject(SecurityBindings.USER) currentUser: UserProfile): Promise<any> {
    return {currentUser}
  }

  @post('/signup', {
    responses: {
      '200': {
        description: 'sign a new user',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            }
          }
        }
      }
    }
  })
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewUserRequest, {
            title: 'NewUser',
          }),
        },
      },
    })
    newUserRequest: NewUserRequest,
  ): Promise<User> {
    const password = await hash(newUserRequest.password, await genSalt());
    const saveUser = await this.userRepository.create(_.omit(newUserRequest, 'password'));

    await this.userRepository.userCredentials(saveUser.id).create({password});
    return saveUser;
  }
}
