import React from 'react';
import request from 'superagent';

import Tasks from '../components/Tasks.jsx';

export default class TasksContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };

    this.getTasksFromServer = this.getTasksFromServer.bind(this);
  }

  componentDidMount() {
    this.getTasksFromServer();
    // setInterval(this.getTasksFromServer, this.props.pollInterval);
  }

  getTasksFromServer() {
    request
      .get('http://localhost:3000/tasks')
      .end((err, res) => {
        if (err) {
          throw err;
        }
        this.setState({ tasks: res.body });
      });
  }

  render() {
    const tasks = this.state.tasks.map((task) => {
      return <p>{JSON.stringify(task)}</p>;
    });

    return (
      <div>
        <br />
        {tasks}
        <br /><br />
        <Tasks />
      </div>
    );
  }
}
