const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = graphql;

const AuthService = require("../services/auth");
const UserService = require("../services/user");
const UserType = require("./types/user_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        zipCode: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },
    seedDb: {
      type: UserType,
      args: {},
      resolve() {
        return UserService.seedDb();
      }
    }
  }
});


module.exports = mutation;