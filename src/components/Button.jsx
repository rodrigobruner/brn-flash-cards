import React from 'react';

export default function Button({
  children: description = 'Decscrição do botão',
  onButtonClick = null,
  type = 'button',
  colorClass = 'bg-gray-200',
}) {
  function handleButtonClick() {
    if (onButtonClick) {
      onButtonClick();
    }
  }

  return (
    <button
      className={`${colorClass} p-2 m-2 rounded-md`}
      onClick={handleButtonClick}
      type={type}
    >
      {description}
    </button>
  );
}
