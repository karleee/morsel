import gql from "graphql-tag";

export default {
  FETCH_REVIEW: gql`
    query FetchReview($userId: ID!, $restaurantId: ID!) {
      review(userId: $userId, restaurantId: $restaurantId) {
        _id
        date
        body
        rating
        user {
          _id
          firstName
        }
      }
    }
  `,
  FETCH_REVIEWS_OF_RESTAURANT: gql`
    query FetchReviewsOfRestaurant($_id: ID!) {
      restaurant(_id: $_id) {
        reviews {
          _id
          body
          user {
            _id
            firstName
          }
          date
          rating
        }
      }
    }
  `,
  FETCH_REVIEWS: gql`
    query FetchReviews {
      reviews {
        _id
        user {
          firstName
        }
        body
        date
      }
    }
  `,
  // Query to fetch all restaurants
  FETCH_RESTAURANTS: gql`
    query FetchRestaurants {
      restaurants {
        _id
        name
        price
        category
        location {
          streetAddress
          city
          state
          zipCode
        }
        coordinates {
          latitude
          longitude
        }
        photos {
          user {
            firstName
            lastName
          }
          url
        },
      }
    }
  `,
  // Query to fetch one specific restaurant
  FETCH_RESTAURANT: gql`
    query FetchRestaurant($_id: ID!) {
      restaurant(_id: $_id) {
        _id
        name
        price
        category
        phoneNum
        location {
          streetAddress
          city
          state
          zipCode
        }
        coordinates {
          latitude
          longitude
        }
        hours {
          monday {
            open
            close
          }
          tuesday {
            open
            close
          }
          wednesday {
            open
            close
          }
          thursday {
            open
            close
          }
          friday {
            open
            close
          }
          saturday {
            open
            close
          }
          sunday {
            open
            close
          }
        }
        amenities {
          healthScore
          takesReservations
          happyHourSpecials
          delivery
          vegetarianOptions
          takeOut
          acceptsCreditCards
          wifi
        }
        reviews {
<<<<<<< HEAD
          rating
          body
          date
        }
=======
          _id,
          rating,
          body,
          date,
          user {
            firstName,
            lastName
            _id
            profilePhoto
            friends
            reviews {
              _id
            }
          }
        },
>>>>>>> master
        photos {
          user {
            firstName
            lastName
            profilePhoto
            friends
            reviews {
              _id
            }
          }
          review {
            date
          }
          url
          description
          categories
        }
        popularDishes {
          name
          url
        }
      }
    }
  `,
  FETCH_USERS: gql`
    query FetchUsers {
      users {
        _id
        firstName
        lastName
        email
        zipCode
      }
    }
  `,
  FETCH_USER: gql`
    query FetchUser($_id: ID!) {
      user(_id: $_id) {
        _id
        firstName
        lastName
        email
        zipCode
      }
    }
  `,
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  CURRENT_USER: gql`
    query CurrentUser {
      currentUserId @client
      currentUserFirstName @client
      currentUserLastName @client
    }
  `,
  // see if we can DRY this code up
  SEARCH: gql`
    query Search($find_desc: String) {
      search(find_desc: $find_desc) {
        _id
        name
        price
        category
        phoneNum
        location {
          streetAddress
          city
          state
          zipCode
        }
        coordinates {
          latitude
          longitude
        }
        hours {
          monday {
            open
            close
          }
          tuesday {
            open
            close
          }
          wednesday {
            open
            close
          }
          thursday {
            open
            close
          }
          friday {
            open
            close
          }
          saturday {
            open
            close
          }
          sunday {
            open
            close
          }
        }
        amenities {
          healthScore
          takesReservations
          happyHourSpecials
          delivery
          vegetarianOptions
          takeOut
          acceptsCreditCards
          wifi
        }
        reviews {
          rating
          body
          date
        }
        photos {
          user {
            firstName
            lastName
            profilePhoto
            friends
            reviews {
              _id
            }
          }
          review {
            date
          }
          url
          description
          categories
        }
        popularDishes {
          name
          url
        }
      }
    }
  `
};