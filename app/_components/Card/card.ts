enum Suit {
    Clubs,
    Spades,
    Hearts,
    Diamonds,
    Joker
}

enum CardNumber {
    Ace,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Joker
}

enum CardType {
    Regular,
    Joker1,
    Joker2
}

interface CardPosition {
    x: number;
    y: number;
}

export class Card {
    suit: Suit;
    number: CardNumber;
    cardType: CardType;
    isFlipped: boolean;
    position: CardPosition;
    owner: string | null;

    constructor(suit: Suit, number: CardNumber, cardType: CardType, isFlipped = false, position = {x: 720, y: 410}, owner = null) {
        this.suit = suit
        this.number = number
        this.cardType = cardType
        this.isFlipped = isFlipped
        this.position = position
        this.owner = owner
    }

    flip(): void {
        this.isFlipped = !this.isFlipped;
    }

    getImage(): string {
        if (this.cardType === CardType.Joker1) {
            return 'cards_images/Joker1.svg';
        } else if (this.cardType === CardType.Joker2) {
            return 'cards_images/Joker2.svg';
        } else {
            const suitName = Suit[this.suit];
            const cardNumber = CardNumber[this.number];
            return `cards_images/${suitName}-${cardNumber}.svg`;
        }
    }

    static cardFromSocket(data: any): Card {
        const card = new Card(data.suit, data.number, data.cardType, data.isFlipped, data.position, data.owner)
        return card
    }
}

export class Deck {
    cards: Card[] = [];

    constructor(cards?: Card[]) {
        if (cards) {
            this.cards = cards
        } else {
            for (let suit = 0; suit < Object.keys(Suit).length / 2 - 1; suit++) {
                for (let number = 0; number < Object.keys(CardNumber).length / 2 - 1; number++) {
                    this.cards.push(new Card(suit, number, CardType.Regular))
                }
            }
        }
    }

    addJokers(): Deck {
        this.cards.push(new Card(Suit.Joker, CardNumber.Joker, CardType.Joker1))
        this.cards.push(new Card(Suit.Joker, CardNumber.Joker, CardType.Joker2))
        return this
    }

    draw(): Card | undefined {
        return this.cards.pop()
    }

    shuffle(): Deck {
        const shuffledCards = [...this.cards];
        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
        }
        this.cards = shuffledCards
        return this
    }

    static deckFromSocket(data: any): Deck {
        const cards = data.cards.map((cardData: any) => Card.cardFromSocket(cardData));
        return new Deck(cards);
    }
}