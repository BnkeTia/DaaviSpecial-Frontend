import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./components/Button";
import TextField from "./components/TextField";

import Layout from "./Layout";
import { editUsers } from "./reduxUserSlice";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { users } = useSelector((store) => store.reduxuser);
  const id = params.id;
  const user = users.find((user) => user.id === id);
  const { name, email } = user;

  // const existingUser = users.filter((user) => user.id === id)
  // const { name, email } = existingUser[0]

  /*
or to find user

const existingUser = users.filter(user => user.id ===id)
const {name, email} = existingUser[0]

*/

  const [values, setValues] = useState({
    name,
    email,
  });

  useEffect(() => {
    // setValues({
    //   name: user.name,
    //   email: user.email,
    // })
  });

  const handleEditUser = () => {
    setValues({ name: "", email: "" });
    dispatch(
      editUsers({
        id: id,
        name: values.name,
        email: values.email,
      })
    );
    navigate("/reduxuser/users");
  };

  return (
    <Layout>
      <div className="mx-auto mt-10 max-w-xl">
        <TextField
          label="Name"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          inputProps={{ type: "text", placeholder: "d s" }}
        />
        <br />
        <TextField
          label="Email"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          inputProps={{ type: "email", placeholder: "ds@mail.com" }}
        />
        <Button onClick={handleEditUser}>Edit</Button>
      </div>
    </Layout>
  );
};

export default EditUser;
