import { useNavigate } from "react-router";

const DeleteClassButton = ({ classID }) => {
  const navigate = useNavigate();
  const deleteClass = async () => {
    try {
      const response = await fetch(`/api/faculty/delete-class/${classID}`, {
        method: "DELETE",
      });
      // You might want to redirect or update the UI after deleting the class
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() =>
          document.getElementById("delete_class_modal").showModal()
        }
      >
        Delete Class
      </button>
      <dialog id="delete_class_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Class?</h3>
          <div className="flex gap-4">
            <button className="btn btn-error" onClick={deleteClass}>
              Delete
            </button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-primary">Cancel</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default DeleteClassButton;
