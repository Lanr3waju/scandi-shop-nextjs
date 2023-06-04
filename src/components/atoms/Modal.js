export default function Modal({ children }) {
  return (
    <dialog className="modal" id="my_modal_1">
      <form className="modal-box" method="dialog">
        <section className="flex flex-col gap-4 text-base">{children}</section>
        <div className="modal-action">
          <button className="btn">Okay</button>
        </div>
      </form>
    </dialog>
  )
}
