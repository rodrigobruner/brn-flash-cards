import { getNewId } from '../services/idService';

export default function Textarea({
  labelDescription = 'Descrição do label:',
  textareaValue = 'Valor padrão do textarea',
  onTextareaChange = null,
  id = getNewId(),
  autoFocus = false,
  maxLenght = 230,
  rows = 4,
}) {
  function handleTextareaChange({ currentTarget }) {
    if (onTextareaChange) {
      const newValue = currentTarget.value;
      onTextareaChange(newValue);
    }
  }

  const currentChacacterCount = textareaValue.length;

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescription}
      </label>

      <textarea
        autoFocus={autoFocus}
        id={id}
        className="border p-1"
        type="text"
        value={textareaValue}
        maxLength={maxLenght}
        rows={rows}
        onChange={handleTextareaChange}
      />
      <div className="text-right mr-1">
        <span>
          {currentChacacterCount} / {maxLenght}
        </span>
      </div>
    </div>
  );
}
