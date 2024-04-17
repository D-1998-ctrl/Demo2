import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './pipeline.css';
import BoardsData from './boardsdata';

const CARD_TYPE = 'CARD';

const Card = ({ id, userName, title, subtitle, dueDate, index, moveCard, chip, userChip, days, boardNumber }) => {
    const [{ isDragging }, drag] = useDrag({
        type: CARD_TYPE, // Define the type property here
        item: { id, index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    console.log(`Card ID: ${id}, Board Number: ${boardNumber}`);

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'pointer' }}>
            <div className='user-card'>
                <div className='cards-title col-12'>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div> <h5>{userName}</h5></div>
                        {userChip && (
                            <div className="chip " style={{ backgroundColor: userChip.backgroundColor, width: '15%', textAlign: 'center', color: '#fff', borderRadius: '100%', float: 'right' }}>
                                {userChip.number}
                            </div>
                        )}
                    </div>

                    <hr style={{ margin: '10px 0 10px 0' }} />
                </div>

                <div>
                    <p>{title}</p>
                    <p>{subtitle}</p>

                    {chip && (
                        <div className="chip " style={{ backgroundColor: chip.backgroundColor, width: '50%', textAlign: 'center', borderRadius: '50px', color: '#fff', margin: '10px 0 10px 0', fontSize: '15px' }}>
                            {chip.chipName}
                        </div>
                    )}
                    <p style={{ fontSize: '15px', color: '#ccc' }}>Due: {dueDate}</p>
                    <p style={{ fontSize: '14px', color: '#ccc' }}>{days}</p>
                    <p style={{ fontSize: '14px', color: '#ccc' }}>Board: {boardNumber}</p>
                </div>
            </div>

        </div>
    );
};

const Board = ({ title, cards, moveCard, boardNumber }) => {
    const [allCardsLoaded, setAllCardsLoaded] = useState(false);

    const [, drop] = useDrop({
        accept: CARD_TYPE,
        drop: (item, monitor) => {
            moveCard(item.id, title);
        },
    });

    const loadAllCards = () => {
        setAllCardsLoaded(true);
    };


    return (
        <div ref={drop} className={` board`} style={{ border: 'none', width: '214px', flexShrink: 0, borderRadius: '10px', background: '#F0F8FF', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', height: 'auto' }}>
            <div className=' board-title' style={{ padding: '0 0 0 10px', }}>

                <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap' }}>{title}</p>
                {cards.length > 0 && <p>({cards.length})</p>}
            </div>
            <hr style={{ margin: '10px' }} />
            <div className=' col-12 board-card-list custom-scroll' style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '10px ', overflowY: 'auto', height: '60vh' }}>
                {allCardsLoaded ? (
                    cards.map((card, index) => (
                        <Card key={card.id} id={card.id} text={card.text} index={index} moveCard={moveCard}
                            userName={card.userName}
                            title={card.title}
                            subtitle={card.subtitle}
                            dueDate={card.dueDate}
                            chip={card.chip}
                            userChip={card.userChip}
                            days={card.days}
                            boardNumber={boardNumber} />
                    ))
                ) : (
                    cards.slice(0, 3).map((card, index) => (
                        <Card key={card.id} id={card.id} text={card.text} index={index} moveCard={moveCard}
                            userName={card.userName}
                            title={card.title}
                            subtitle={card.subtitle}
                            dueDate={card.dueDate}
                            chip={card.chip}
                            userChip={card.userChip}
                            days={card.days}
                            boardNumber={boardNumber} />
                    ))
                )}
            </div>
            {!allCardsLoaded && cards.length > 3 && (
                <button onClick={loadAllCards} style={{ margin: '10px', padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Load More
                </button>
            )}
        </div>
    );
};

const Pipeline = () => {


    const moveCard = (cardId, targetBoard) => {
        const updatedBoards = [...boards];
        const cardIndex = updatedBoards.findIndex(board => board.cards.find(card => card.id === cardId));
        const card = updatedBoards[cardIndex].cards.find(card => card.id === cardId);
        if (cardIndex !== -1) {
            updatedBoards[cardIndex].cards = updatedBoards[cardIndex].cards.filter(card => card.id !== cardId);
            const targetBoardIndex = updatedBoards.findIndex(board => board.title === targetBoard);
            if (targetBoardIndex !== -1) {
                updatedBoards[targetBoardIndex].cards.push(card);
                setBoards(updatedBoards);
            }
        }
    };



    const [boards, setBoards] = useState(BoardsData);


    

    return (
        <div  className="col-12 pipeline-main"style={{marginTop:'10px', marginLeft:'15px',  height:'90vh', overflowY: 'auto'}}>
            <DndProvider backend={HTML5Backend}>
                <div className='pipeline-container col-12' style={{ display: 'flex',  }}>
                    <div className='pipeline col-12 custom-scroll-second' style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', gap: '9px' }}>
                        {boards.map((board, index) => (
                            <Board key={board.id} title={board.title} cards={board.cards} moveCard={moveCard} boardNumber={index + 1} />
                        ))}
                    </div>
                </div>
            </DndProvider>
        </div>

    );
};

export default Pipeline;