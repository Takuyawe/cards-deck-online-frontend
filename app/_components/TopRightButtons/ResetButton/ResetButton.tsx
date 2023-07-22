"use client"

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useSocketContext } from '@/app/_context/socket';
import { useState } from 'react';
import { Card, Deck } from "@/app/_components/Card/card"


interface Props {
    resetPopup: boolean,
    setResetPopup: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ResetPopupComponent (props: Props) {
    const {socketRef, deck, setDeck, setIsDeckBoxVisible} = useSocketContext()
    const [isShuffle, setIsShuffle] = useState(false)

    const handleReset = () => {
        // bug: when reset, flipped cards act weird
        setDeck(prevDeck => {
            if (isShuffle) {
                return new Deck().shuffle()
            } else {
                const newDeckCards = prevDeck.cards.map(card => 
                    new Card(card.suit, card.number, card.cardType, false, {x: 0, y: 0}, null)
                )
                const newDeck = new Deck(newDeckCards)
                console.log(newDeck)
                if (socketRef.current) socketRef.current?.emit("resetDeck", newDeck)
                return newDeck 
            }
        })
        setIsDeckBoxVisible(true)
        props.setResetPopup(false);
    }

    const handleResetClose = () => {
        props.setResetPopup(false);
    }

    const handleShuffleChange = () => {
        setIsShuffle(!isShuffle)
    }
  
    return (
      <div>
        <Dialog
          open={props.resetPopup}
          onClose={handleResetClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle> */}
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to reset the card deck?
            </DialogContentText>
          </DialogContent>
          <Grid container>
            <Grid item>
                <Switch checked={isShuffle} onChange={handleShuffleChange} inputProps={{ 'aria-label': 'Switch shuffle dialog' }} />
            </Grid>
            <Grid item alignSelf="center">
                <Typography variant='subtitle2'>
                    Shuffle the deck
                </Typography>
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={handleResetClose}>No</Button>
            <Button onClick={handleReset}>Yes</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}