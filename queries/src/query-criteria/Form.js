import { useState } from "react";

const Form = () => {
  const [email, setEmail] = useState("ashkan@gmail.com");

  return (
    <form>
      <h3>Fill the form</h3>

      <div data-testid="image tag wrapper">
        <img alt="test" src="test.jpg" />
      </div>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="color">Color</label>
      <input id="color" placeholder="enter color name" />

      <button title="click me for submit">Submit</button>
    </form>
  );
};

export default Form;
