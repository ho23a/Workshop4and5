import React from 'react';
import {unixTimeToString} from '../util';
import {Link} from 'react-router';
import {likeComment, unlikeComment} from '../server';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      likeCounter: props.likeCounter,
      author: props.author,
      postDate: props.postDate,
      reactKey: props.reactKey
    }
  }

  handleLikeClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      var callbackFunction = (updatedLikeCounter) => {
        this.setState({likeCounter: updatedLikeCounter});
      };

      if (this.didUserLike()) {
        unlikeComment(this.state.data._id, this.state.reactKey, 4, callbackFunction);
      } else {
        likeComment(this.state.data._id, this.state.reactKey, 4, callbackFunction);
      }
    }
  }

  didUserLike() {
    var likeCounter = this.state.likeCounter;
    var liked = false;
    for (var i = 0; i < likeCounter.length; i++) {
      if (likeCounter[i]._id === 4) {
        liked = true;
        break;
      }
    }
    return liked;
  }

  render() {
    var likeButtonText = "Like";
    if (this.didUserLike()) {
      likeButtonText = "Unlike";
    }
    return (
      <div>
        <div className="media-left media-top">
          PIC
        </div>
        <div className="media-body">
          <Link to={"/profile/" + this.props.author._id}>
            {this.props.author.fullName}
          </Link> {this.props.children}
          <br />
          <a href="#" onClick={(e) => this.handleLikeClick(e)}>{likeButtonText}
          </a>  · <a href="#">Reply</a> · <span className="glyphicon glyphicon-thumbs-up"></span>
          <a href="#">{ this.state.likeCounter.length}
          </a> · {unixTimeToString(this.props.postDate)}
          </div>
        </div>
      )
    }
  }
