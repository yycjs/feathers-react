import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';

const socket = io();
const app = feathers()
  .configure(socketio(socket));

import React from 'react';
import ReactDOM from 'react-dom';

class SubmissionList extends React.Component {
  componentDidMount() {
    submissionService.find().then(submissions => this.setState({ submissions }));
  }

  render() {
    if(!this.state) {
      return <div>Loading...</div>;
    }

    return <ul className="list-unstyled">
      {this.state.submissions.data.map(submission =>
        <li key={submission.id} className="page-header">
          <h2><a href={submission.link}>{submission.title}</a></h2>
        </li>
      )}
    </ul>;
  }
}

ReactDOM.render(<SubmissionList />, document.getElementById('app'));