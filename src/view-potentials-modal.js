import React from 'react';

const ShowPotentialsModal = (props ) => {

  const showHideClassName = props.showPotentialsModal ? "show-potentials-modal mobile-only display-block " : "show-potentials-modal mobile-only display-none";

  return (

    <div className={showHideClassName}>
      <section className="modal-show-potentials-main">
        <button className="modal-close-button" onClick={props.handleClose}>x</button>
        <div className="modal-content">
          <h1 className="break-modal-header">Success!</h1>
          <h2>You've set all your Pins. You can now view your potential matches under <span className="view-potentials" onClick={()=> props.pushPotentials()}>Potentials</span>.</h2>
  
        </div>
      </section>
    </div>
  );
};

export default ShowPotentialsModal;