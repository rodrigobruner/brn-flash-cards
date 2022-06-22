import { useEffect, useState } from 'react';
import Button from './Button';
import Error from './Error';
import Textarea from './Textarea';
import TextInput from './TextInput';

export default function FlasCardForm({
  createMode = true,
  onPersist = null,
  children: flashCard = null,
}) {
  const [title, setTitle] = useState(flashCard?.title || '');
  const [description, setDescription] = useState(flashCard?.description || '');
  const [error, setError] = useState('');
  const backgroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100';

  useEffect(() => {
    if (createMode) {
      clearFields();
    }
  }, [createMode]);

  function clearFields() {
    setTitle('');
    setDescription('');
  }

  function validateForm() {
    return title.trim() !== '' && description.trim() !== '';
  }

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
  }
  function handleDescriptionChange(newDescription) {
    setDescription(newDescription);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      setError('');
      if (onPersist) {
        onPersist(title, description);
        clearFields();
      }
    } else {
      setError('O preenchimento de título e descrição é obrigatório.');
    }
  }

  function handleFormReset() {
    clearFields();
  }

  return (
    <div className={`${backgroundClassName} p-4`}>
      <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
        <h2 className="text-center font-semibold">Manutenção de flash cards</h2>
        <TextInput
          labelDescription="Título:"
          inputValue={title}
          onInputChange={handleTitleChange}
        ></TextInput>
        <Textarea
          labelDescription="Descrição"
          textareaValue={description}
          onTextareaChange={handleDescriptionChange}
        ></Textarea>
        <div className="flex items-center justify-between">
          {error.trim() !== '' ? <Error>{error}</Error> : <span>&nbsp;</span>}
          <div>
            <Button colorClass="bg-red-200" type="reset">
              Limpar
            </Button>
            <Button colorClass="bg-green-300" type="submit">
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
