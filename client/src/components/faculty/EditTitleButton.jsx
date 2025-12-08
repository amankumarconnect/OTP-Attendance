import React from "react";

const EditTitleButton = ({ classID, classTitle, setClassTitle }) => {
  const updateClassTitle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/faculty/update-class-title/${classID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ classTitle }),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to update class title");
      }
    } catch (error) {
      console.error("Error updating class title:", error);
    }
  };

  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Edit Title
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Edit Class Title</h3>
          <input
            type="text"
            value={classTitle}
            onChange={(e) => setClassTitle(e.target.value)}
            className="input"
          />
          <button className="btn btn-primary" onClick={updateClassTitle}>
            Submit
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default EditTitleButton;
