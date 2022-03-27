import React, { Component } from "react";
import PackageModal from "./components/PackageModal";
import DocumentModal from "./components/DocumentModal";
import axios from "axios";
import ReactDOM from "react-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packageModal: false,
      activePackage: {
        path: "",
        description: "",
      },
      packageList: [],
      showDocumentList: false,
      documentModal: false,
      activeDocument: {
        path: "",
        content: "",
        base_path: ".",
        package: 0,
      },
      renderHTML: "",
    };
  }

  componentDidMount() {
    this.refreshPackageList();
  }

  refreshPackageList = () => {
    axios
        .get("/api/packages/")
        .then((res) => this.setState({ packageList: res.data }))
        .then(() => console.log(this.state.packageList))
        .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ packageModal: !this.state.packageModal });
  };

  toggleDocument = () => {
    this.setState({ documentModal: !this.state.documentModal });
  };

  handlePackageSubmit = (item) => {
    this.toggle();

    console.log("handlePackageSubmit", item);
    if (item.id) {
      axios
          .put(`/api/packages/${item.id}/`, item)
          .then((res) => this.refreshPackageList());
      return;
    }
    axios
        .post("/api/packages/", item)
        .then((res) => this.refreshPackageList());

  };

  handleDocumentSubmit = (item) => {
    this.toggleDocument();

    if (item.id) {
      axios
          .put(`/api/documents/${item.id}/`, item)
          .then((res) => this.refreshPackageList());
      return;
    }
    axios
        .post("/api/documents/", item)
        .then((res) => this.refreshPackageList());

  };

  handleDelete = (item) => {
    alert("delete" + JSON.stringify(item));
  };

  createPackage = () => {
    const item = { path: "", description: "" };

    this.setState({ activePackage: item, packageModal: !this.state.packageModal });
  };

  createDocument = () => {
    const item = { path: "", content: "", base_path: "", package: this.state.activePackage.id };

    this.setState({ activeDocument: item, documentModal: !this.state.documentModal });
  };


  editPackage = (item) => {
    this.setState({ activePackage: item, packageModal: !this.state.packageModal });
  };

  renderHTML = (item) => {
    this.setState({ activeDocument: item });

    axios
        .get(`/ftd-build/${this.state.activePackage.path}/${item.path}/`)
        .then((res) => {
          console.log("renderHTML", res);
          ReactDOM.render(
              <div dangerouslySetInnerHTML={{ __html: res.data}} />,
              document.getElementById('container')
          );
        });
  }

  editDocument = (item) => {
    this.setState({ activeDocument: item, documentModal: !this.state.documentModal });
  };

  showDocuments = (item) => {
    this.setState({ activePackage: item, showDocumentList: !this.state.showDocumentList });
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
            onClick={() => this.showDocuments(item)}
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

  renderDocuments = () => {
    const newItems = this.state.activePackage.all_documents

    console.log(this.state.activePackage);

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
            onClick={() => this.showDocuments(item)}
        >
          {item.path}
        </span>
          <span>
          <button
              className="btn btn-success mr-2"
              onClick={() => this.renderHTML(item)}
          >
            Show
          </button>
          <button
              className="btn btn-secondary mr-2"
              onClick={() => this.editDocument(item)}
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
          {this.state.showDocumentList ? (
                  <div className="row">
                    <div className="col-sm-10">
                      <div className="card p-3">
                        <div className="mb-4">
                          <button
                              className="btn btn-primary"
                              onClick={this.createDocument}
                          >
                            Add Document
                          </button>
                          <ul className="list-group list-group-flush border-top-0">
                            {this.renderDocuments()}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
          ) : null}
          {this.state.documentModal ? (
              <DocumentModal
                  activeDocument={this.state.activeDocument}
                  toggle={this.toggleDocument}
                  onSave={this.handleDocumentSubmit}
              />
          ) : null}
          <div id="container"></div>
        </main>
    );
  }
}

export default App;