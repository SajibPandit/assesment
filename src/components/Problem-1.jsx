import React, { useState, useEffect } from "react";

const Problem1 = () => {
  //central state
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  //form state
  const [formData, setFormData] = useState({ name: "", status: "Active" });

  //track active button state
  const [show, setShow] = useState("all");

  //handling input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //handle rendering when tasks changes
  useEffect(() => {
    setFilteredTasks(tasks);
    setShow("all");
  }, [tasks]);

  //handling form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, formData]);
    console.log(tasks);
    setFormData({ name: "", status: "Active" });
  };

  //handling filter button click
  const handleClick = (val) => {
    setShow(val)
    
    if (val === "active") {
      return tasks.filter((task) => task.status === "Active");
    } else if (val === "completed") {
      return tasks.filter((task) => task.status === "Completed");
    } else {
      return tasks.sort((a, b) => {
        if (a.status === "Active" && b.status === "Completed") {
          return -1;
        } else if (a.status === "Completed" && b.status === "Active") {
          return 1;
        } else {
          return 0;
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-auto">
              <input
                value={formData.status}
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="Status"
                name="status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => setFilteredTasks(handleClick("all"))}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => setFilteredTasks(handleClick("active"))}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => setFilteredTasks(handleClick("completed"))}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
