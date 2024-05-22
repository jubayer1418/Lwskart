"use client";

import { editAddress } from "@/db/action";

const Modal = ({email}:{email:string | null | undefined}) => {
  return (
    <>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box space-y-4">
          <form
            action={async(formData)=>editAddress(formData,email)}
          >
            <h1 className="text-2xl text-primary text-center">
              Add Phone and Address
            </h1>
            <label className="input input-bordered flex items-center gap-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                id="address"
                name="address"
                className="grow"
                placeholder="Address"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="grow"
                placeholder="phoneNumber"
              />
            </label>
            <button className="btn mt-4 btn-primary" type="submit">
              Edit
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;

export const ModalButtonS = () => {
  const handleClick = () => {
    const modal = document.getElementById("my_modal_5") as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <button
      className="text-primary"
      onClick={handleClick}
    >
      Edit
    </button>
  );
};
