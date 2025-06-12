
const UsersList = (props) => {
  const { usersList } = props;

  const renderUsers = () => {
    return usersList.map((user, index) => (
      <tr key={index}>
        <td>{user.name}</td>
        <td>{user.email}</td>
      </tr>
    ));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody data-testid="users-list">{renderUsers()}</tbody>
    </table>
  );
};

export default UsersList;
