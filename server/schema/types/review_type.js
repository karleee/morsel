const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = graphql;
const User = require('../../models/User');
const Review = require('../../models/Review');

// Creating GraphQL object type for review
const ReviewType = new GraphQLObjectType({
  name: 'ReviewType',
  fields: () => ({
    user: {
      type: require('./user_type'),
      resolve(parentValue) {
        return User.findById(parentValue.user)
          .then(user => user)
          .catch(err => null)
      }
    },
    restaurant: {
      type: require('./restaurant_type'),
      resolve(parentValue) {
        return Review.findById(parentValue._id)
          .populate('restaurant')
          .then(review => {
            return review.restaurant;
          });
      }
    },
    _id: { type: GraphQLID },
    rating: { type: GraphQLInt },
    body: { type: GraphQLString },
    photos: {
      type: new GraphQLList(require('./photo_type')),
      resolve(parentValue) {
        return Review.findPhotos(parentValue._id);
      }
    },
    date: { type: GraphQLString }
  })
})

module.exports = ReviewType;