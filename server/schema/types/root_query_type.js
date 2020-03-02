const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const RestaurantType = require("./restaurant_type");
const Restaurant = mongoose.model("restaurant");
const Review = require("../");
const ReviewType = require("./review_type")

const RootQueryType = new GraphQLObjectType({ 
    name: "RootQueryType",
    fields: () => ({
        restaurant: {
            type: RestaurantType,
            args: { id: { type: new GraphQLNonNull(GraphQLID)}},
            resolve(parentValue, {id} ) {
                return Restaurant.findbyId(id)
            }
        },
        review: {
            type: ReviewType,
            args: { id: { type: new GraphQLNonNull(GraphQLID)}},
            resolve(parentValue, {id} ) {
                return Review.findbyId(id)
            }
        },

    })
})

module.exports = RootQueryType;