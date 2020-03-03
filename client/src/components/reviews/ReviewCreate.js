import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";

import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import { Redirect } from "react-router-dom";

const { NEW_REVIEW } = Mutations;
const { FETCH_REVIEW, FETCH_REVIEWS } = Queries;

class ReviewCreate extends Component {
  constructor(props) {
      super(props);
      this.state = {
          rating: 0,
          body: "",
          restaurantId: this.props.match.params.id,
      }
  }

  handleSubmit(e, newReview) {
      e.preventDefault();
      debugger;
      newReview({
          variables: {
              rating: this.state.rating,
              body: this.state.body,
              restaurantId: this.state.restaurantId,
          }
      })
      .then(data => {
          this.setState({
              rating: 0,
              body: "",
          })
      })
      
  }

  updateRating(rating) {
      return e=> {
          this.setState({ rating: rating })
      }
  }
  updateBody() {
      return e=> {
          this.setState({ body: e.target.value })
      }
  }

  renderHearts() {
      //not dry, make dry
      if(this.state.rating === 0) {
          return (
              <div>
                  <i className="far fa-heart" onClick={this.updateRating(1)}></i>
                  <i className="far fa-heart" onClick={this.updateRating(2)}></i>
                  <i className="far fa-heart" onClick={this.updateRating(3)}></i>
                  <i className="far fa-heart" onClick={this.updateRating(4)}></i>
                  <i className="far fa-heart" onClick={this.updateRating(5)}></i>
              </div>
          )
      } else if (this.state.rating === 1) {
          return (
              <div>
                  <i className="fas fa-heart" onClick={this.updateRating(1)}></i>
                  <i className="far fa-heart" onClick={this.updateRating(2)}></i>
                  <i className="far fa-heart" onClick={this.updateRating(3)}></i>
                  <i className="far fa-heart" onClick={this.updateRating(4)}></i>
                  <i className="far fa-heart" onClick={this.updateRating(5)}></i>
              </div>
          )
      } else if (this.state.rating === 2) {
          return (
              <div>
                  <i className="fas fa-heart" onClick={this.updateRating(1)}></i>
                  <i className="fas fa-heart" onClick={this.updateRating(2)}></i>
                  <i className="far fa-heart" onClick={this.updateRating(3)}></i>
                  <i className="far fa-heart" onClick={this.updateRating(4)}></i>
                  <i className="far fa-heart" onClick={this.updateRating(5)}></i>
              </div>
          )
      } else if (this.state.rating === 3) {
          return (
              <div>
                  <i className="fas fa-heart" onClick={this.updateRating(1)}></i>
                  <i className="fas fa-heart" onClick={this.updateRating(2)}></i>
                  <i className="fas fa-heart" onClick={this.updateRating(3)}></i>
                  <i className="far fa-heart" onClick={this.updateRating(4)}></i>
                  <i className="far fa-heart" onClick={this.updateRating(5)}></i>
              </div>
          )
      } else if (this.state.rating === 4) {
          return (
              <div>
                  <i className="fas fa-heart" onClick={this.updateRating(1)}></i>
                  <i className="fas fa-heart" onClick={this.updateRating(2)}></i>
                  <i className="fas fa-heart" onClick={this.updateRating(3)}></i>
                  <i className="fas fa-heart" onClick={this.updateRating(4)}></i>
                  <i className="far fa-heart" onClick={this.updateRating(5)}></i>
              </div>
          )
      } else if (this.state.rating === 5) {
          return (
              <div>
                  <i className="fas fa-heart" onClick={this.updateRating(1)}></i>
                  <i className="fas fa-heart" onClick={this.updateRating(2)}></i>
                  <i className="fas fa-heart" onClick={this.updateRating(3)}></i>
                  <i className="fas fa-heart" onClick={this.updateRating(4)}></i>
                  <i className="fas fa-heart" onClick={this.updateRating(5)}></i>
              </div>
          )
      }
  }

  // renderHeartsTwo(){

  // }

  updateCache(cache, { data: { newReview} }) {
      let reviews;
      try {
          // we'll try to read from our cache but if the query isn't in there no sweat!
          // We only want to update the data if it's in the cache already - totally fine if the data will
          // be fetched fresh later
          reviews = cache.readQuery({ query: FETCH_REVIEWS });
      } catch (err) {
          return;
      }

      // then our writeQuery will only run IF the cache already has data in it
      if (reviews) {
          let reviewArray = reviews.reviews;

          cache.writeQuery({
              query: FETCH_REVIEWS,
              data: { reviews: reviewArray.concat(newReview) }
          });
      }
  }

  updateState(review) {
    return () => this.setState({
      rating: review.rating,
      body: review.body,
    })
  }

  render() {
    return (
      <Mutation
        mutation={NEW_REVIEW}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newReview, {data}) => (
          <div>
            {/* <Query query={FETCH_REVIEW} variables={{restaurantId: this.props.restaurantId, userId: currentUserId}} >
              {(reviewData) => {
                if (reviewData.error) {
                  return null
                } else {
                  {this.updateState(reviewData.data.review)}
                }
              }}
            </Query> */}
            {this.renderHearts()}
            <form onSubmit={e=> this.handleSubmit(e, newReview)}>
              <textarea
                onChange={this.updateBody()} 
                value={this.state.body}                               
                placeholder="Body of Review"
              />
              <button type="submit">Publish Review</button>
            </form>
          </div>
        )}
      </Mutation>
    )
  }
}

export default ReviewCreate;