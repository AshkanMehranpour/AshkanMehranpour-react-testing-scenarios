import React from "react";

const UserForm = (props) => {
  const { handleSubmit } = props;
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleOnSubmitClick = (event) => {
    event.preventDefault();

    handleSubmit({
      name: name,
      email: email,
    });

    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleOnSubmitClick}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
