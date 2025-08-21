
function AutoPopupModel({showModal,setShowModal,setShowOverlay,tittle,body,footer}) {
    return(
        <div id="autoPopupModel">
            {showModal && (
                <div className="modal fade show" style={{display: 'block'}} tabIndex="-1">
                    <div className="modal-dialog ">
                        <div className="modal-content bg-dark text-white">
                            <div className="modal-header border-secondary">
                                <h5 className="modal-title">{tittle}</h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    aria-label="Close"
                                    onClick={() => {
                                        setShowModal(false);
                                        setShowOverlay(false);
                                    }}
                                ></button>
                            </div>
                            <div className="modal-body">

                                {body}
                            </div>
                            <div className="modal-footer border-secondary">
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default AutoPopupModel;