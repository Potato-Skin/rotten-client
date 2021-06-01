import React from "react";

const DogsContext = React.createContext();

function DogsWrapper(props) {
  const whoLetTheDogsOut = "John Cena";

  return (
    <DogsContext.Provider value={{ whoLetTheDogsOut }}>
      {props.children}
    </DogsContext.Provider>
  );
}

function UltraProtectedNoOneCanSee() {
  return (
    <DogsWrapper>
      <DivComponentJustBecause />
    </DogsWrapper>
  );
}
// {/* <div>
//   <p>Dogs: by {whoLetTheDogsOut}</p>
// </div> */}

function DivComponentJustBecause() {
  return (
    <div>
      <Paragraph />
    </div>
  );
}

function Paragraph() {
  const dogContext = React.useContext(DogsContext);
  const { whoLetTheDogsOut } = dogContext;
  return <p>Dogs by: {whoLetTheDogsOut}</p>;
}

export default UltraProtectedNoOneCanSee;
