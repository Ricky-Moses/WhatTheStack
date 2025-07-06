import { getLoggedUser } from "../Config/auth.js";

const User = async () => {
  const section = document.createElement("section");
  section.className = "user-section";

  const userProfile = await getLoggedUser();
  // console.log("Profile: ", userProfile);

  const createAt = new Date(userProfile.createdAt).toLocaleDateString()

  section.innerHTML = `
    <article>
    <table>
      <tbody>
        <tr>
          <th>User Name </th>
          <td> : </td>
          <td>${userProfile.firstName ? userProfile.firstName : "User"} ${
    userProfile.lastName ? userProfile.lastName : ""
  }</td>
        </tr>
        <tr>
          <th>Email ID</th>
          <td> : </td>
          <td>${userProfile.email ? userProfile.email : "user@gmail.com"}</td>
        </tr>
        <tr>
          <th>User role</th>
          <td> : </td>
          <td>${userProfile.role ? userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1).toLowerCase()  : "User"}</td>
        </tr>
        <tr>
          <th>Created At</th>
          <td> : </td>
          <td>${userProfile.createdAt ? createAt : "Date of User created!"}</td>
        </tr>
      </tbody>
    </table>
    </article>
    `;

  return section;
};

export default User;
{
  /* <h1>User Name: </h1> */
}
