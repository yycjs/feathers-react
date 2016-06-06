import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import React from 'react';
import ReactDOM  from 'react-dom';
import rx from 'feathers-reactive';
import RxJS from 'rxjs';

import SubmissionList from './list';
import SubmissionForm from './form';

const socket = io();
const app = feathers()
  .configure(socketio(socket))
  .configure(rx(RxJS));

const submissionService = app.service('submissions');

ReactDOM.render(<div>
  <SubmissionList service={submissionService} />
  <SubmissionForm service={submissionService} />
</div>, document.getElementById('app'));
