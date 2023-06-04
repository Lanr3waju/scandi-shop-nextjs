export default function Modal({ children }) {
    return (
        <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box">
                <section className="flex flex-col text-base gap-4">{children}</section>
                <div className="modal-action">
                    <button className="btn">Okay</button>
                </div>
            </form>
        </dialog>
    )
}
