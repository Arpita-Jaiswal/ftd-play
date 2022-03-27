import React, { Component } from "react";
import PackageModal from "./components/PackageModal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packageModal: false,
      activePackage: {
        path: "",
        description: "",
      },
      packageList: []
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
        .get("/api/packages/")
        .then((res) => this.setState({ packageList: res.data }))
        .then(() => console.log(this.state.packageList))
        .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ packageModal: !this.state.packageModal });
  };

  handlePackageSubmit = (item) => {
    this.toggle();

    console.log("handlePackageSubmit", item);
    if (item.id) {
      axios
          .put(`/api/packages/${item.id}/`, item)
          .then((res) => this.refreshList());
      return;
    }
    axios
        .post("/api/packages/", item)
        .then((res) => this.refreshList());

  };

  handleDelete = (item) => {
    alert("delete" + JSON.stringify(item));
  };

  createPackage = () => {
    const item = { path: "", description: "" };

    this.setState({ activePackage: item, packageModal: !this.state.packageModal });
  };


  editPackage = (item) => {
    this.setState({ activePackage: item, packageModal: !this.state.packageModal });
  };

  renderPackages = () => {
    const newItems = this.state.packageList

    return newItems.map((item) => (
        <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
        >
        <span
            className={`todo-title mr-2 ${
                this.state.viewCompleted ? "completed-todo" : ""
            }`}
            title={item.description}
        >
          {item.path}
        </span>
          <span>
          <button
              className="btn btn-secondary mr-2"
              onClick={() => this.editPackage(item)}
          >
            Edit
          </button>
          <button
              className="btn btn-danger"
              onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
        </li>
    ));
  };

  render() {
    return (
        <main className="container">
          <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
          <div className="row">
            <div className="col-sm-4">
              <div className="card p-3">
                <div className="mb-4">
                  <button
                      className="btn btn-primary"
                      onClick={this.createPackage}
                  >
                    Add Document
                  </button>
                  <ul className="list-group list-group-flush border-top-0">
                    {this.renderPackages()}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {this.state.packageModal ? (
              <PackageModal
                  activePackage={this.state.activePackage}
                  toggle={this.toggle}
                  onSave={this.handlePackageSubmit}
              />
          ) : null}
        </main>
    );
  }
}

export default App;