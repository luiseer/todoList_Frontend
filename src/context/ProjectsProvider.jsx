import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/clienteAxios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import io from 'socket.io-client';

let socket;

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalFormTodo, setModalFormTodo] = useState(false);
  const [todo, setTodo] = useState({});
  const [modalDeleteTodo, setModalDeleteTodo] = useState(false);
  const [collaborator, setCollaborator] = useState({});
  const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false);
  const [searcher, setSearcher] = useState(false);

  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        const { data } = await clienteAxios.get('/proyects', config);
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, [auth]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  //==========================================================//
  const viewAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert({});
    }, 5000);
  };
  //==========================================================//
  const submitProject = async (project) => {
    if (project.id) {
      await editProject(project);
    } else {
      await newProject(project);
    }
  };

  //==========================================================//
  const editProject = async (project) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await clienteAxios.put(
        `/proyects/${project.id}`,
        project,
        config
      );

      const projectsUpdate = projects.map((p) =>
        p._id === data._id ? data : p
      );
      setProjects(projectsUpdate);

      setAlert({
        msg: 'update project, ok',
        error: false
      });
      setTimeout(() => {
        setAlert({});
        navigate('/projects');
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  };

  //==========================================================//
  const newProject = async (project) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await clienteAxios.post('/proyects', project, config);

      setProjects([...projects, data]);

      setAlert({
        msg: 'Create project success',
        error: false
      });

      setTimeout(() => {
        setAlert({});
        navigate('/projects');
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  };

  //==========================================================//
  const getProject = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await clienteAxios.get(`/proyects/${id}`, config);
      setProject(data);
    } catch (error) {
      navigate('/projects');
      console.log(msg);
      setAlert({
        msg: error.response.data?.msg,
        error: true
      });
      setTimeout(() => {
        setAlert({});
      }, 2500);
    } finally {
      setLoading(false);
    }
  };

  //==========================================================//
  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await clienteAxios.delete(`/proyects/${id}`, config);
      const projectsUpdate = projects.filter((p) => p._id !== id);
      setProjects(projectsUpdate);
      setAlert({
        msg: data.msg,
        error: false
      });
      setTimeout(() => {
        setAlert({});
        navigate('/projects');
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalTodo = () => {
    setModalFormTodo(!modalFormTodo);
    setTodo({});
  };

  const newTodo = async (todo) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await clienteAxios.post(`/todos`, todo, config);

      setAlert({});
      setModalFormTodo(false);

      //socket.io
      socket.emit('new-todo', data);
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = async (todo) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await clienteAxios.put(
        `/todos/${todo.id}`,
        todo,
        config
      );

      setAlert({});
      setModalFormTodo(false);
      //socket.io
      socket.emit('edit-todo', data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitTodo = async (todo) => {
    if (todo?.id) {
      await editTodo(todo);
    } else {
      await newTodo(todo);
    }
  };

  const handleModalEditTodo = (todo) => {
    setTodo(todo);
    setModalFormTodo(true);
  };

  const handleModalDeleteTodo = (todo) => {
    setTodo(todo);
    setModalDeleteTodo(!modalDeleteTodo);
  };

  const deleteTodo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await clienteAxios.delete(`/todos/${todo._id}`, config);
      setAlert({
        msg: data.msg,
        error: false
      });

      setModalDeleteTodo(false);

      //soket io
      socket.emit('delete-todo', todo);
      setTodo({});
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const submitCollaborator = async (email) => {
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await clienteAxios.post(
        `/proyects/collaborators`,
        { email },
        config
      );

      setCollaborator(data);
      setAlert({});
    } catch (error) {
      setAlert({
        msg: error.response.data?.msg,
        error: true
      });
    } finally {
      setTimeout(() => {
        setAlert({});
      }, 3000);

      setLoading(false);
    }
  };

  const addCollaborator = async (email) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await clienteAxios.post(
        `/proyects/collaborators/${project._id}`,
        email,
        config
      );

      setAlert({
        msg: data.msg,
        error: false
      });

      setCollaborator({});
    } catch (error) {
      setAlert({
        msg: error.response?.data?.msg,
        error: true
      });
    } finally {
      setTimeout(() => {
        setAlert({});
      }, 5000);
      setLoading(false);
    }
  };

  const handleModalDeleteCollaborator = (collaborator) => {
    setModalDeleteCollaborator(!modalDeleteCollaborator);
    setCollaborator(collaborator);
  };

  const deleteCollaborator = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await clienteAxios.post(
        `/proyects/delete-collaborator/${project._id}`,
        { id: collaborator._id },
        config
      );

      const projectUpdate = { ...project };
      projectUpdate.collaborators = project.collaborators.filter(
        (c) => c._id !== collaborator._id
      );

      setProject(projectUpdate);

      setAlert({
        msg: data.msg,
        error: false
      });
      setCollaborator({});
      setModalDeleteCollaborator(false);
    } catch (error) {
      console.log(error.response);
    } finally {
      setTimeout(() => {
        setAlert({});
      }, 4000);
    }
  };

  const todoComplete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await clienteAxios.post(
        `/todos/state/${id}`,
        {},
        config
      );
      setTodo({});
      setAlert({});
      //socket.io
      socket.emit('complete-todo', data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (e) => {
    setSearcher(!searcher);
  };

  //socket io
  const submitTodosProject = async (todo) => {
    const projectUpdate = { ...project };
    projectUpdate.todos = [...projectUpdate.todos, todo];
    setProject(projectUpdate);
  };

  const deleteTodoProject = (todo) => {
    const projectUpdate = { ...project };
    projectUpdate.todos = projectUpdate.todos.filter((t) => t._id !== todo._id);
    setProject(projectUpdate);
  };

  const updateTodoProject = (todo) => {
    const projectUpdate = { ...project };
    projectUpdate.todos = project.todos.map((t) =>
      t._id === todo._id ? todo : t
    );
    setProject(projectUpdate);
  };

  const updateStateTodoProject = (todo) => {
    const projectUpdate = { ...project };
    projectUpdate.todos = project.todos.map((t) =>
      t._id === todo._id ? todo : t
    );
    setProject(projectUpdate);
  };

  const logOutProjects = () => {
    setProjects([]);
    setProject({});
    setAlert({});
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        viewAlert,
        alert,
        submitProject,
        getProject,
        project,
        loading,
        deleteProject,
        modalFormTodo,
        handleModalTodo,
        submitTodo,
        newTodo,
        handleModalEditTodo,
        todo,
        handleModalDeleteTodo,
        modalDeleteTodo,
        deleteTodo,
        submitCollaborator,
        collaborator,
        addCollaborator,
        modalDeleteCollaborator,
        handleModalDeleteCollaborator,
        deleteCollaborator,
        todoComplete,
        handleSearch,
        searcher,
        submitTodosProject,
        deleteTodoProject,
        updateTodoProject,
        updateStateTodoProject,
        logOutProjects
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
export { ProjectsProvider };
export default ProjectsContext;
