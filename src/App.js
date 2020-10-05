import React, { useState, useEffect } from "react";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";

const App = () => {
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getauthors();
  }, []);

  const selectAuthor = async (authorID) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/${authorID.id}/`
      );
      const author = response.data;
      setCurrentAuthor(author);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const unselectAuthor = () => setCurrentAuthor(null);

  const getContentView = () => {
    if (currentAuthor) {
      return <AuthorDetail author={currentAuthor} />;
    } else {
      if (loading) {
        return <h1>loading</h1>;
      } else {
        return <AuthorList authors={authors} selectAuthor={selectAuthor} />;
      }
    }
  };

  const getauthors = async () => {
    try {
      const response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      const fetchAuthors = response.data;
      setAuthors(fetchAuthors);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="app" className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Sidebar unselectAuthor={unselectAuthor} />
        </div>
        <div className="content col-10">{getContentView()}</div>
      </div>
    </div>
  );
};

export default App;
