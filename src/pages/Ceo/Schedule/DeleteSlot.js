import React from "react";
import { toast } from "react-toastify";
import TodoApi from "../../../api/Todo";
// import SlotApi from "../../../../api/Slots/index";

function DeleteSlot({ selectedSlot, slotDeletedCallback }) {
  const deleteSlotHandler = () => {
    console.log("delete => ", selectedSlot);

    TodoApi.deleteTodo(selectedSlot._id)
      .then((res) => {
        if (res.status === 200 && res.data.data) {
          toast.success("Todo delete successfully");
          slotDeletedCallback(selectedSlot);
        }
      })
      .catch((err) => {
        toast.error("Failed to delete todo");
        console.log(err);
      });
  };

  return (
    <div
      class="modal fade"
      id="deleteSlot"
      tabindex="-1"
      aria-labelledby="deleteSlotLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body text-center">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span class="icon-close"></span>
            </button>
            <h5 class="text-center mb-4">Delete Slot?</h5>
            <a href="javascript:void(0)" class="btn btn-primary px-5 mx-2">
              NO
            </a>
            <a
              href="javascript:void(0)"
              class="btn btn-danger px-5 mx-2"
              onClick={deleteSlotHandler}
            >
              Delete
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeleteSlot;
