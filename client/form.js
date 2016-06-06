import React from 'react';

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

    this.props.service.create({
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

export default SubmissionForm;
