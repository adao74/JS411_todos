import React from "react";

function DeleteButton ({index, deleteHandle}) {
  return (
    <button
        key={index}
        onClick={() => deleteHandle(index)}
    >
    Delete me!
    </button>
  )
}

export default DeleteButton