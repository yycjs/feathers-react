import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import React from 'react';
import ReactDOM  from 'react-dom';
import rx from 'feathers-reactive';
import RxJS from 'rxjs';

const socket = io();
const app = feathers()
  .configure(socketio(socket))
  .configure(rx(RxJS));

const submissionService = app.service('submissions');

class SubmissionList extends React.Component {
  componentDidMount() {
    submissionService.find({ query: {
      $sort: {
        votes: -1
      }
    }})
    .subscribe(submissions => this.setState({ submissions }));
  }

  upvote(submission) {
    submissionService.patch(submission.id, {
      votes: submission.votes + 1
    });
  }

  downvote(submission) {
    submissionService.patch(submission.id, {
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

class SubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      link: ''
    };
  }
  
  updateProperty(prop, ev) {
    this.setState({ [prop]: ev.target.value });
  }

  submit(ev) {
    ev.preventDefault();

    submissionService.create({
      title: this.state.title,
      link: this.state.link
    }).then(() => this.setState({
      title: '',
      link: ''
    }));
  }

  render() {
    return <form onSubmit={this.submit.bind(this)}>
      <div className="form-group">
        <label for="inputTitle">Title</label>
        <input type="text" className="form-control" id="inputTitle" placeholder="Title" onChange={this.updateProperty.bind(this, 'title')} value={this.state.title} />
      </div>
      <div className="form-group">
        <label for="inputTitle">Link</label>
        <input type="text" className="form-control" id="inputLink" placeholder="Link" onChange={this.updateProperty.bind(this, 'link')} value={this.state.link} />
      </div>
      <div className="form-group">
        <button className="btn btn-primary btn-block" type="submit">Submit</button>
      </div>
    </form>;
  }
}

ReactDOM.render(<div>
  <SubmissionList />
  <SubmissionForm />
</div>, document.getElementById('app'));
