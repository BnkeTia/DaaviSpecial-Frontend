import React, { useState } from "react";
import Layout from "./Layout";
import TextField from "./components/TextField";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "./reduxUserSlice";
import { v4 as uuidv4 } from "uuid";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  const handleAddUser = () => {
    console.log("adduser", values);

    navigate("/reduxuser/users");
    dispatch(addUser({ id: uuidv4(), name: values.name, email: values.email }));
    setValues({ name: "", email: "" });
  };
  return (
    <Layout>
      <div className="mt-10 max-w-xl">
        <TextField
          label="Name"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          inputProps={{ type: "text", placeholder: "d s" }}
          style={{ backgroundColor: "" }}
        />
        <TextField
          label="Email"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          inputProps={{ type: "email", placeholder: "ds@email.com" }}
        />
      </div>
      <div>
        <Button style={{ backgroundColor: "" }} onClick={handleAddUser}>
          Submit
        </Button>
      </div>
    </Layout>
  );
};

export default AddUser;
