import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import authHeader from "../../Services/authHeader";

import StudentsBar from "./StudentsBar.jsx";
import { StudentsListItem } from "./StudentsListItem.jsx";

import users from "../../data/users.json";

export const StudentsList = () => {
  const { user } = useContext(AuthContext);
  const [dataLoading, setDataLoading] = useState(false);
  const [students, updateStudents] = useState([]);
  const [colleagues, updateColleagues] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/users/",
      headers: authHeader(),
    }).then((res) => {
      updateStudents(res.data);
    });

  var studentsArrayData = [];
  for (var i = 0; i < users.length; i++) {
    if (
      users[i]._id !== user.userID &&
      !colleagues.includes(users[i]._id)
    ) {
      studentsArrayData.push(users[i]);
    }
  }
  const history = useHistory();

  return (
    <div
      className={
        window.location.pathname === "/students"
          ? null
          : "students-list-container"
      }
    >
      {dataLoading ? (
        <div className="loading">Loading....</div>
      ) : (
        <>
          <StudentsBar
            history={history}
            studentsArrayData={studentsArrayData}
          />
          {studentsArrayData.map((student, i) => {
            return (
              <StudentsListItem
                student={student}
                index={i}
                key={student._id}
                history={history}
              />
            );
          })}
        </>
      )}
    </div>
  );
};
