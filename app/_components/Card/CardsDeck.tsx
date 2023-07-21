"use client"

import {useEffect, useState, useCallback} from "react"
import Image from "next/image"
import {Card, Deck} from "./card"
import Draggable, {DraggableData, DraggableEvent} from "react-draggable"

import IconButton from '@mui/material/IconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSocketContext } from "@/app/_context/socket"

const CardComponent: React.FC<{card: Card}> = ({ card }) => {
    const [isFlipped, setIsFlipped] = useState(card.isFlipped)
    const [dragStart, setDragStart] = useState({x: 0, y: 0});
    const [rotation, setRotation] = useState(0);
    const [isNotDraggable, setIsNotDraggable] = useState(false)
    const {socketRef, setDeck} = useSocketContext()
    // const [cardPosition, setCardPosition] = useState({x: 0, y: 0})

    // useEffect(() => {
    //     setCardPosition({x: window.innerWidth / 2, y: window.innerHeight / 2})

    //     window.addEventListener("resize", () => {
    //         setCardPosition({x: window.innerWidth / 2, y: window.innerHeight / 2})
    //     }) 
    // }, [])

    // 821, 1440
    // 410.5, 720
    // 720, 410

    const handleMouseDown = (e: React.MouseEvent): void => {
        setDragStart({x: e.clientX, y: e.clientY});
    }

    const handleMouseUp = (e: React.MouseEvent): void => {
        const distance = Math.sqrt(Math.pow(e.clientX - dragStart.x, 2) + Math.pow(e.clientY - dragStart.y, 2));
        // If the mouse has not moved much, consider it a click.
        if (distance < 5) {
            card.flip();
            setIsFlipped(card.isFlipped);
            console.log("card", card.isFlipped)
            if (socketRef.current) {
                socketRef.current.emit("flipCard", card)
            }
        }
    }

    const handleMouseMove = (e: React.MouseEvent): void => {
        // Only perform rotation if Command key (or Control key) is being pressed
        // todo: fix rotation behavior transofrm?
        // if (e.metaKey && e.buttons === 1) {
        //     setIsNotDraggable(true)
        //     console.log(isNotDraggable)
        //     e.preventDefault();
        //     const deltaX = e.clientX - dragStart.x;
        //     const deltaY = e.clientY - dragStart.y;
        //     const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        //     setRotation(angle);
        // }
    }

    const handleDragStart = (e: DraggableEvent, data: DraggableData): void => {
        if (socketRef.current) {
            if (card.owner === null) {
                card.owner = socketRef.current.id
                socketRef.current.emit("ownerDefined", card)
            } else if (card.owner !== socketRef.current.id) {
                setIsNotDraggable(true)
                return
            }
        }
    }

    const handleDragStop = (e: DraggableEvent, data: DraggableData): void => {
        if (socketRef.current) {
            setIsNotDraggable(false)
            card.owner = null
            console.log(card.owner)
            socketRef.current.emit("ownerDefined", card)
        }
    }

    const handleDrag = (e: DraggableEvent, data: DraggableData): void => {
        if (socketRef.current) {
            // console.log(card.owner)
            card.position = {x: data.x, y: data.y}
            setDeck(prevDeck => {
                const newDeckCards = prevDeck.cards.map(prevCard => 
                    prevCard.suit === card.suit && prevCard.number === card.number ? card : prevCard
                )
                return new Deck(newDeckCards)
            })
            socketRef.current?.emit("updateCardPosition", card)
        }    
    }
    
    return (
        <Draggable onStart={handleDragStart} onStop={handleDragStop} onDrag={handleDrag} disabled={isNotDraggable} position={card.position} >  
            <div className="z-999 absolute">
                <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} style={{ transform: `rotate(${rotation}deg)` }}>
                    {card.isFlipped ? (
                        <Image src={card.getImage()} alt="Card Image" width={75} height={100} draggable={false}  />
                    ) : (
                        <Image src="/cards_images/back.jpg" alt="Card Image" width={75} height={100} draggable={false} />
                    )}
                </div>
            </div>
        </Draggable>
    )
}

const CardsDeck: React.FC = () => {
    const {socketRef, deck, setDeck, isDeckBoxVisible, setIsDeckBoxVisible, multiPlayerSettings, setMultiPlayerSettings} = useSocketContext()

    const handleDeckBoxClick = () => {
        setIsDeckBoxVisible(false)
    }

    const updateDeck = (data: any) => {
        // todo: why data: Card is throwing an error?
        const updatedCard = new Card(data.suit, data.number, data.cardType, data.isFlipped, data.position, data.owner)
        setDeck(prevDeck => {
            const newDeckCards = prevDeck.cards.map(card =>
                card.suit === updatedCard.suit && card.number === updatedCard.number && card.cardType === updatedCard.cardType ? updatedCard : card
            );
            return new Deck(newDeckCards);
        });
    }

    useEffect(() => {
        socketRef.current?.on('deck', data => {
            const deck = Deck.deckFromSocket(data)
            setDeck(deck)
            console.log(deck)
        })

        socketRef.current?.on("multiPlayerSettings", data => {
            console.log(data)
            setMultiPlayerSettings(data)
        })

        socketRef.current?.on("multiPlayerSettingsUpdated", data => {
            setMultiPlayerSettings(data)
        })
    
        socketRef.current?.on('deckReset', data => {
            console.log(data)
            const deck = Deck.deckFromSocket(data)
            setDeck(deck)
        })

        socketRef.current?.on("ownerUpdated", data => {
            console.log(data)
            updateDeck(data)
        })

        socketRef.current?.on('cardPositionUpdated', data => {
            console.log(data)
            updateDeck(data)
        })

        socketRef.current?.on('cardFlipped', data => {
            console.log(data)
            updateDeck(data)

        })

    }, [])
    
    return (
        <> 
            {isDeckBoxVisible && (
                <div className="absolute" style={{top: "47%", left: "49.25%"}}>
                    <fieldset className="border-2 rounded w-24 h-36">
                        <legend>Deck</legend>
                        <div className="text-center">
                            <IconButton onClick={handleDeckBoxClick}>
                                <VisibilityOffIcon fontSize="large"/>
                            </IconButton>
                        </div>
                    </fieldset>
                </div>
            )}
            {deck.cards.map((card, index) => (            
                <CardComponent card={card} key={index} />
            ))}
        </>    
    ) 
}

export default CardsDeck