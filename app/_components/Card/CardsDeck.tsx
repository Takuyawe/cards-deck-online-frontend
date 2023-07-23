"use client"

import {useEffect, useState, useCallback, use} from "react"
import Image from "next/image"
import {Card, Deck} from "./card"
import Draggable, {DraggableData, DraggableEvent} from "react-draggable"

import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSocketContext } from "@/app/_context/socket"

const CardComponent: React.FC<{card: Card}> = ({ card }) => {
    const [isFlipped, setIsFlipped] = useState(card.isFlipped)
    const [dragStart, setDragStart] = useState({x: 0, y: 0});
    const [rotation, setRotation] = useState(0);
    const [isNotDraggable, setIsNotDraggable] = useState(false)
    const {socketRef, setDeck} = useSocketContext()
    const [imgSize, setImgSize] = useState({width: 0, height: 0})

    useEffect(() => {
        const changeCardSize = () => {
            switch (true) {
                case window.innerWidth < 768:
                    setImgSize({width: 50, height: 75})
                    break;
                case window.innerWidth < 1024:
                    setImgSize({width: 62.5, height: 87.5})
                    break;
                default:
                    setImgSize({width: 75, height: 100})
                    break;
            }
        }

        changeCardSize()

        window.addEventListener("resize", () => {
            changeCardSize()
        })
    }, [])

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
                setIsNotDraggable(false)
                card.owner = socketRef.current.id
                socketRef.current.emit("ownerDefined", card)
            } else if (card.owner !== socketRef.current.id) {
                setIsNotDraggable(true)
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
                    prevCard.suit === card.suit && prevCard.number === card.number && prevCard.cardType === card.cardType ? card : prevCard
                )
                return new Deck(newDeckCards)
            })
            socketRef.current?.emit("updateCardPosition", card)
        }    
    }
    
    return (
        <Draggable onStart={handleDragStart} onStop={handleDragStop} onDrag={handleDrag} disabled={isNotDraggable} position={card.position}>  
            <div className={`z-999 absolute top-1/2 left-1/2`}>
                <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} style={{ transform: `rotate(${rotation}deg)` }}>
                    {card.isFlipped ? (
                        <Image src={card.getImage()} alt="Card Image" width={imgSize.width} height={imgSize.height} draggable={false} />
                    ) : (
                        <Image src="/cards_images/back.jpg" alt="Card Image" width={imgSize.width} height={imgSize.height} draggable={false} />
                    )}
                </div>
            </div>
        </Draggable>
    )
}

const CardsDeck: React.FC = () => {
    const {socketRef, deck, setDeck, isDeckBoxVisible, setIsDeckBoxVisible, multiPlayerSettings, setMultiPlayerSettings} = useSocketContext()
    const [settingsUpdated, setSettingsUpdated] = useState(false)

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
            setSettingsUpdated(true)
            setMultiPlayerSettings(data)
            setTimeout(() => {
                setSettingsUpdated(false)
            }, 5000)
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
                <div className="absolute top-[47%] left-[49.25%] max-[580px]:left-[48.7%] max-[480px]:left-[48.3%] max-[380px]:left-[48.1%]">
                    <fieldset className="border-2 rounded w-16 h-24 sm:w-16 sm:h-24 md:w-20 md:h-[7.5rem] lg:w-24 lg:h-36">
                        <legend>Deck</legend>
                        <div className="flex h-full items-center justify-center">
                            <IconButton onClick={handleDeckBoxClick}>
                                <VisibilityOffIcon fontSize="large"/>
                            </IconButton>
                        </div>
                    </fieldset>
                </div>
            )}
            {settingsUpdated && (
                <div className="absolute" style={{top: "10%", left: "35%"}}>
                    <Alert severity="info" variant="filled">
                        Other player has changed the settings.
                        Now, the deck will be reset!
                    </Alert>
                </div>
            )}
            {deck.cards.map((card, index) => (            
                <CardComponent card={card} key={index} />
            ))}
        </>    
    ) 
}

export default CardsDeck