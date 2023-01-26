import React, {useEffect, useState} from 'react';
import './App.css';


function App() {

    const [cardList, setCardList] = useState([
        {id: 1, order: 3, text: 'CARD 3'},
        {id: 2, order: 1, text: 'CARD 1'},
        {id: 3, order: 2, text: 'CARD 2'},
        {id: 4, order: 4, text: 'CARD 4'},
    ])


    const [currentCard, setCurrentCard] = useState<any>(null)

    const dragStarHandler = (e: any, card: any) => {
        setCurrentCard(card)
    }

    const dragEndHandler = (e: any) => {
        e.target.style.background = 'white'
    }
    const dragOverHandler = (e: any) => {
        e.preventDefault()
        e.target.style.background = 'lightgray'
    }

    const dragDropHandler = (e: any, card: any) => {
        e.preventDefault()
        setCardList(cardList.map(c => {
            if (c.id === card.id) {
                return {...c, order: currentCard.order  }
            }

            if (c.id === currentCard.id) {

                return {...c, order: card.order}
            }
            return c
        }))
        e.target.style.background = 'white'
    }

    const sortCards = (a: any, b: any) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }


    return (


        <div className="App">
           <div className={'appPlus'}>
               <div><h1 style={{textAlign:'center'}}>Отсортируй карточки </h1></div>

           <div style={{display:'flex'}}> {cardList.sort(sortCards).map(card => {
                return (
                    <div className={'card'}
                         draggable={true}
                         onDragStart={(e) => dragStarHandler(e, card)} // срабатываает когда взяли карточку
                         onDragLeave={(e) => dragEndHandler(e)} // срабатываает когда вышли за пределы другой карточки
                         onDragEnd={(e) => dragEndHandler(e)}// срабатываает когда мы отпустили перемещение карточки
                         onDragOver={(e) => dragOverHandler(e)}// срабатываает когда мы находимся над другим объектом
                         onDrop={(e) => dragDropHandler(e, card)}// елси мы отпустили карточку и расчитывааем что должно произойти какое то децствие
                    >
                        {card.text}
                    </div>
                )

            })}</div>
           </div>
        </div>

    );
}

export default App;
