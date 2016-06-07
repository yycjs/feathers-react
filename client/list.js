import React from 'react';

class SubmissionList extends React.Component {
  componentDidMount() {
    this.props.service.find({ query: {
      $sort: {
        votes: -1
      }
    }})
    .subscribe(submissions => this.setState({ submissions }));
  }

  upvote(submission) {
    this.props.service.patch(submission.id, {
      votes: submission.votes + 1
    });
  }

  downvote(submission) {
    this.props.service.patch(submission.id, {
      votes: submission.votes - 1
    });
  }

  render() {
    if(this.state && this.state.submissions) {
      return <div>
        {this.state.submissions.data.map(submission => 
          <h2 className="page-header" key={submission.id}>
            <small>
              <span className="glyphicon glyphicon-minus"
                onClick={this.downvote.bind(this, submission)}>
              </span>
              {submission.votes}
              <span className="glyphicon glyphicon-plus"
                onClick={this.upvote.bind(this, submission)}>
              </span>
            </small>
            <a href={submission.url}>{submission.title}</a>
          </h2>
        )}
      </div>;
    }

    return <div>Loading...</div>
  }
}

export default SubmissionList;
