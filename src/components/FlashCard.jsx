export default function FlashCard({
  id,
  title = 'Título do card',
  description = 'Descrição do card',
  showFlashCardTitle = true,
  onToggleFlashCard = null,
}) {
  function handleCardClick() {
    if (onToggleFlashCard) {
      onToggleFlashCard(id);
    }
  }

  const fontSizeClassName = showFlashCardTitle
    ? 'text-xl font-semibold'
    : 'text-sm';

  return (
    <div
      className={`shadow-lg p-4 w-80 h-48 cursor-pointer m-2
                  flex flex-row items-center justify-center 
                   ${fontSizeClassName}`}
      style={{ fontFamily: 'monospace' }}
      onClick={handleCardClick}
    >
      {showFlashCardTitle ? title : description}
    </div>
  );
}
