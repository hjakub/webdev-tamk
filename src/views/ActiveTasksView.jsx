import { useState, useEffect } from "react";

export default function ActiveTasksView() {
  // sample initial tasks, i will remove them later
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "initial task 1",
      description: "prvni task",
      labels: ["frontend", "react"],
      status: "stopped", // running, paused, stopped
      secondsElapsed: 69,
    },
    {
      id: 2,
      name: "initial task 2",
      description: "druhy task",
      labels: ["backend"],
      status: "stopped",
      secondsElapsed: 0,
    },
  ]);

  // form and ui states
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formLabels, setFormLabels] = useState("");

  // filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLabelFilter, setSelectedLabelFilter] = useState("");

  // timer effect for running tasks
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.status === "running"
            ? { ...task, secondsElapsed: task.secondsElapsed + 1 }
            : task,
        ),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // timer controls
  const handleStart = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: "running" } : t)));
  };
  const handlePause = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: "paused" } : t)));
  };
  const handleStopAndDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // open modal form for adding
  const handleOpenAdd = () => {
    setEditingId(null);
    setFormName("");
    setFormDesc("");
    setFormLabels("");
    setShowForm(true);
  };

  // open modal form for editing
  const handleOpenEdit = (task) => {
    setEditingId(task.id);
    setFormName(task.name);
    setFormDesc(task.description);
    setFormLabels(task.labels.join(", "));
    setShowForm(true);
  };

  // save task (add or edit)
  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!formName.trim()) return;
    const formattedLabels = formLabels
      .split(",")
      .map((l) => l.trim().toLowerCase())
      .filter((l) => l.length > 0);

    if (editingId !== null) {
      // edit existing
      setTasks(
        tasks.map((t) =>
          t.id === editingId
            ? {
                ...t,
                name: formName,
                description: formDesc,
                labels: formattedLabels,
              }
            : t,
        ),
      );
    } else {
      // add new
      const newTask = {
        id: Date.now(),
        name: formName,
        description: formDesc,
        labels: formattedLabels,
        status: "stopped",
        secondsElapsed: 0,
      };
      setTasks([newTask, ...tasks]);
    }

    setShowForm(false);
  };

  // format seconds to HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // filtering logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLabel =
      !selectedLabelFilter || task.labels.includes(selectedLabelFilter);
    return matchesSearch && matchesLabel;
  });

  // extract unique labels for filter dropdown
  const allLabels = Array.from(new Set(tasks.flatMap((t) => t.labels)));

  return (
    <div className="view-card">
      <div className="task-header-row">
        <h2>Active Tasks and Timer</h2>
        <button className="btn-primary" onClick={handleOpenAdd}>
          + Add Task
        </button>
      </div>

      {/* filter section */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Filter by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedLabelFilter}
          onChange={(e) => setSelectedLabelFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Labels</option>
          {allLabels.map((lbl) => (
            <option key={lbl} value={lbl}>
              {lbl}
            </option>
          ))}
        </select>
      </div>

      {/* add (edit) form modal or inline box */}
      {showForm && (
        <div className="task-form-card">
          <h3>{editingId !== null ? "Edit Task" : "Create Task"}</h3>
          <form onSubmit={handleSaveTask}>
            <div className="form-group">
              <label>Task Name</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
                placeholder="Task Name"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                placeholder="Descrbe your task.."
              />
            </div>
            <div className="form-group">
              <label>Labels <i>(comma separated)</i></label>
              <input
                type="text"
                value={formLabels}
                onChange={(e) => setFormLabels(e.target.value)}
                placeholder="e.g., frontend, backend, api"
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn-primary">
                Save
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* task list */}
      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="no-tasks">No tasks found for this filter.</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="task-item">
              <div className="task-info">
                <div className="task-title-row">
                  <h3>{task.name}</h3>
                  <span className={`status-badge ${task.status}`}>
                    {task.status}
                  </span>
                </div>
                <p className="task-desc">{task.description}</p>
                <div className="task-labels">
                  {task.labels.map((lbl) => (
                    <span key={lbl} className="label-pill">
                      #{lbl}
                    </span>
                  ))}
                </div>
              </div>

              <div className="task-actions-panel">
                <div className="timer-display">
                  {formatTime(task.secondsElapsed)}
                </div>
                <div className="task-buttons">
                  {task.status === "running" ? (
                    <button
                      className="btn-warning"
                      onClick={() => handlePause(task.id)}
                    >
                      Pause
                    </button>
                  ) : (
                    <button
                      className="btn-success"
                      onClick={() => handleStart(task.id)}
                    >
                      Start
                    </button>
                  )}
                  <button
                    className="btn-secondary"
                    onClick={() => handleOpenEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleStopAndDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}