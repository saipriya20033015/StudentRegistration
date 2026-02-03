import { useState } from "react";
import './App.css';
function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
  });
  const [editId, setEditId] = useState(null);

  const [todoText, setTodoText] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId === null) {
      setStudents([
        ...students,
        { id: Date.now(), ...formData, todos: [] },
      ]);
    } else {
      setStudents(
        students.map((s) =>
          s.id === editId ? { ...s, ...formData } : s
        )
      );
      setEditId(null);
    }

    setFormData({ name: "", email: "", course: "" });
  };

  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      email: student.email,
      course: student.course,
    });
    setEditId(student.id);
  };
  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
    setSelectedStudentId(null);
  };
  const addTodo = () => {
    if (!todoText || !selectedStudentId) return;

    setStudents(
      students.map((s) =>
        s.id === selectedStudentId
          ? {
              ...s,
              todos: [...s.todos, { id: Date.now(), text: todoText }],
            }
          : s
      )
    );
    setTodoText("");
  };

  // Delete TODO
  const deleteTodo = (studentId, todoId) => {
    setStudents(
      students.map((s) =>
        s.id === studentId
          ? { ...s, todos: s.todos.filter((t) => t.id !== todoId) }
          : s
      )
    );
  };

  const selectedStudent = students.find(
    (s) => s.id === selectedStudentId
  );

  return (
    <div className="container">
      <h1>Student Registration </h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editId ? "Update Student" : "Add Student"}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="4">No Students Found</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>
                  <button
                    className="todo-btn"
                    onClick={() => setSelectedStudentId(student.id)}
                  >
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {selectedStudent && (
        <div className="todo-section">
          <h2>TODO for {selectedStudent.name}</h2>

          <div className="todo-input">
            <input
              type="text"
              placeholder="Enter task"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>
          </div>

          <ul>
            {selectedStudent.todos.map((todo) => (
              <li key={todo.id}>
                {todo.text}
                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTodo(selectedStudent.id, todo.id)
                  }
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
