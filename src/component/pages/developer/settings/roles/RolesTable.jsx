import React from "react";

const RolesTable = () => {
  return (
    <>
      <div className="px-4">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Client</td>
              <td>
                A Client provides office support to either an individual or team
                and is vital for the smooth-running...
              </td>
              <td></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Admin</td>
              <td>
                An Administration provides office support to either an
                individual or team and is vital for the smooth-running of a
                business. ...
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RolesTable;
