import React from 'react';

const ShowPotentialsModal = ({ handleClose, showPotentialsModal, children }) => {

  const showHideClassName = showPotentialsModal ? "show-potentials-modal mobile-only display-block " : "show-potentials-modal mobile-only display-none";

  return (

    <div className={showHideClassName}>
      <section className="modal-show-potentials-main">
        <button className="modal-close-button" onClick={handleClose}>x</button>
        <div className="modal-content">
          <h1 className="break-modal-header">Success!</h1>
          <h2>You've set all your Pins. You can now view your potential matches under 'Potentials'.</h2>
  
        </div>
      </section>
    </div>
  );
};

export default ShowPotentialsModal;