import React, { useEffect, useState } from 'react';

interface Props {
  errorMessage: string;
  onClose: () => void;
}

export const Notification: React.FC<Props> = ({ errorMessage, onClose }) => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;

    if (errorMessage) {
      setShowNotification(true);

      hideTimeout = setTimeout(() => {
        setShowNotification(false);
        onClose();
      }, 3000);
    }

    return () => {
      clearTimeout(hideTimeout);
      setShowNotification(false);
    };
  }, [errorMessage, onClose]);

  const handleClose = () => {
    setShowNotification(false);
    onClose();
  };

  return (
    <div
      className={`notification is-danger is-light has-text-weight-normal ${showNotification
        ? ''
        : 'hidden'}`}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button type="button" className="delete" onClick={handleClose} />

      {errorMessage && (
        <>
          {errorMessage}
          <br />
        </>
      )}
    </div>
  );
};
