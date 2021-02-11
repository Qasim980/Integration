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
      axios({
        method: "get",
        url: "http://localhost:8080/colleagues/" + user,userID,
        headers: authHeader(),
      }).then((res) => {
        updateColleagues(res.data);
      });
  }, []);  
  
  var studentsArrayData = [];
  for (var i = 0; i < students.length; i++) {
      if (
        students[i]._id !== user.userID &&
        !colleagues.includes(students[i]._id)
      ) {
        studentsArrayData.push(students[i]._id);
      }
    }
    const history = useHistory();
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
