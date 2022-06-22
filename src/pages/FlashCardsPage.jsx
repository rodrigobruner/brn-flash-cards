import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Error from '../components/Error';
import FlashCard from '../components/FlashCard';
import FlashCards from '../components/FlashCards';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Main from '../components/Main';
import RadionButton from '../components/RadionButton';
import FlashCardItem from '../components/FlashCardItem';

import { helperShuffleArray } from '../helpers/arrayHelpers';
import {
  apiCreateFlashCards,
  apiDeleteFlashCards,
  apiGetAllFlashCards,
  apiUpdateFlashCards,
} from '../services/apiService';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FlasCardForm from '../components/FlasCardForm';
//import { getNewId } from '../services/idService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FlashCardsPage() {
  const [allCards, setAllCards] = useState([]);
  const [studyCards, setStudyCards] = useState([]);
  const [radioButtonShowTitle, setRadioBottonShowTitle] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [createMode, setCreateMode] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFlashCard, setSelectedFlashCard] = useState(null);

  useEffect(() => {
    setStudyCards(allCards.map(card => ({ ...card, showTitle: true })));
  }, [allCards]);

  useEffect(() => {
    async function getAllCards() {
      try {
        //Back End
        const backEndAllCards = await apiGetAllFlashCards();
        //Front End
        setAllCards(backEndAllCards);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    }
    getAllCards();
  }, []);

  function handleShuffle() {
    const shuffleCards = helperShuffleArray(studyCards);
    setStudyCards(shuffleCards);
  }

  function handleRadioShowTitleClick() {
    const updateCards = [...studyCards].map(card => ({
      ...card,
      showTitle: true,
    }));
    setStudyCards(updateCards);
    setRadioBottonShowTitle(true);
  }

  function handleRadioShowDescriptoClick() {
    const updateCards = [...studyCards].map(card => ({
      ...card,
      showTitle: false,
    }));
    setStudyCards(updateCards);
    setRadioBottonShowTitle(false);
  }

  function handleTabSelect(tabIndex) {
    setSelectedTab(tabIndex);
  }

  function handleToggleFlashCard(cardId) {
    const updatedCards = [...studyCards];
    const cardIndex = updatedCards.findIndex(card => card.id === cardId);
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;
    setStudyCards(updatedCards);
  }

  async function handleDeleteFlashCard(cardId) {
    try {
      //Back End
      await apiDeleteFlashCards(cardId);
      //Front End
      setAllCards(allCards.filter(card => card.id !== cardId));
      setError('');
      toast.success('Card excluído com sucesso.');
    } catch (error) {
      setError(error.message);
    }
  }

  function handleEditFlashCard(card) {
    setCreateMode(false);
    setSelectedTab(1);
    setSelectedFlashCard(card);
  }

  function handleNewFlashCard() {
    setCreateMode(true);
    setSelectedFlashCard(null);
  }

  async function handlePersist(title, description) {
    if (createMode) {
      try {
        //Back End
        const newFlashCard = await apiCreateFlashCards(title, description);
        //Front End
        setAllCards([...allCards, newFlashCard]);
        setError('');
        toast.success(`Card "${title}" incluído com sucesso`);
      } catch (error) {
        setError(error);
      }
    } else {
      try {
        //Back End
        await apiUpdateFlashCards(selectedFlashCard.id, title, description);
        //Fornt End
        setAllCards(
          allCards.map(card => {
            if (card.id === selectedFlashCard.id) {
              return { ...card, title, description };
            }
            return card;
          })
        );
        setSelectedFlashCard(null);
        setCreateMode(true);
        setError('');
        toast.success(`Card "${title}" atualizado com sucesso`);
      } catch (error) {
        setError(error);
      }
    }
  }

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>;
  }

  if (!loading && !error) {
    mainJsx = (
      <>
        <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
          <TabList>
            <Tab>Listagem</Tab>
            <Tab>Cadastro</Tab>
            <Tab>Estudo</Tab>
          </TabList>

          <TabPanel>
            {allCards.map(flashCard => {
              return (
                <FlashCardItem
                  key={flashCard.id}
                  onDelete={handleDeleteFlashCard}
                  onEdit={handleEditFlashCard}
                >
                  {flashCard}
                </FlashCardItem>
              );
            })}
          </TabPanel>
          <TabPanel>
            <div className="my-4">
              <Button onButtonClick={handleNewFlashCard}>
                Novo flash card
              </Button>
            </div>
            <FlasCardForm createMode={createMode} onPersist={handlePersist}>
              {selectedFlashCard}
            </FlasCardForm>
          </TabPanel>
          <TabPanel>
            <div className="text-center mb-4">
              <Button onButtonClick={handleShuffle}>Embaralhar cards</Button>
            </div>
            <div className="flex fle-row items-center justify-center space-x-4 m-4">
              <RadionButton
                id="radioButtonShowTitle"
                name="showInfo"
                buttonChecked={radioButtonShowTitle}
                onButtonClick={handleRadioShowTitleClick}
              >
                Mostrar título
              </RadionButton>
              <RadionButton
                id="radioButtonShowDescription"
                name="showInfo"
                buttonChecked={!radioButtonShowTitle}
                onButtonClick={handleRadioShowDescriptoClick}
              >
                Mostrar descrição
              </RadionButton>
            </div>
            <FlashCards>
              {studyCards.map(({ id, title, description, showTitle }) => {
                return (
                  <FlashCard
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    showFlashCardTitle={showTitle}
                    onToggleFlashCard={handleToggleFlashCard}
                  />
                );
              })}
            </FlashCards>
          </TabPanel>
        </Tabs>
      </>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
      <Header>Flash Card</Header>
      <Main className="container mx-auto p-4">{mainJsx}</Main>
    </>
  );
}