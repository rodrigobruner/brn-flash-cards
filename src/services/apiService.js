import { read, exclude, create, edit } from './httpService';
import { getNewId } from './idService';

export async function apiCreateFlashCards(title, description) {
  const newFlashCard = await create(`/flashcards/`, {
    id: getNewId(),
    title,
    description,
  });
  return newFlashCard;
}

export async function apiGetAllFlashCards() {
  const allFlashCards = await read('/flashcards');
  return allFlashCards;
}

export async function apiUpdateFlashCards(cardId, title, description) {
  const updatedFlashCard = await edit(`/flashcards/${cardId}`, {
    title,
    description,
  });
  return updatedFlashCard;
}

export async function apiDeleteFlashCards(cardId) {
  await exclude(`/flashcards/${cardId}`);
}
