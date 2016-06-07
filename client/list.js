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
      return <ul className="list-group">
        {this.state.submissions.data.map(submission => 
          <li className="submission list-group-item" key={submission.id}>
            <h2>
              <small className="text-center pull-left">
                <span className="glyphicon glyphicon-chevron-up"
                  onClick={this.upvote.bind(this, submission)}>
                </span>
                <br />
                <strong>{submission.votes}</strong><br/>
                <span className="glyphicon glyphicon-chevron-down"
                  onClick={this.downvote.bind(this, submission)}>
                </span>
              </small>
              <a href={submission.url}>{submission.title}</a>
            </h2>
          </li>
        )}
      </ul>;
    }

    return <div>Loading...</div>
  }
}

export default SubmissionList;
