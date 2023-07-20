exports.id = 380;
exports.ids = [380];
exports.modules = {

/***/ 23910:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 53824))

/***/ }),

/***/ 20907:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ Deck),
/* harmony export */   Z: () => (/* binding */ Card)
/* harmony export */ });
var Suit;
(function(Suit) {
    Suit[Suit["Clubs"] = 0] = "Clubs";
    Suit[Suit["Spades"] = 1] = "Spades";
    Suit[Suit["Hearts"] = 2] = "Hearts";
    Suit[Suit["Diamonds"] = 3] = "Diamonds";
    Suit[Suit["Joker"] = 4] = "Joker";
})(Suit || (Suit = {}));
var CardNumber;
(function(CardNumber) {
    CardNumber[CardNumber["Ace"] = 0] = "Ace";
    CardNumber[CardNumber["Two"] = 1] = "Two";
    CardNumber[CardNumber["Three"] = 2] = "Three";
    CardNumber[CardNumber["Four"] = 3] = "Four";
    CardNumber[CardNumber["Five"] = 4] = "Five";
    CardNumber[CardNumber["Six"] = 5] = "Six";
    CardNumber[CardNumber["Seven"] = 6] = "Seven";
    CardNumber[CardNumber["Eight"] = 7] = "Eight";
    CardNumber[CardNumber["Nine"] = 8] = "Nine";
    CardNumber[CardNumber["Ten"] = 9] = "Ten";
    CardNumber[CardNumber["Jack"] = 10] = "Jack";
    CardNumber[CardNumber["Queen"] = 11] = "Queen";
    CardNumber[CardNumber["King"] = 12] = "King";
    CardNumber[CardNumber["Joker"] = 13] = "Joker";
})(CardNumber || (CardNumber = {}));
var CardType;
(function(CardType) {
    CardType[CardType["Regular"] = 0] = "Regular";
    CardType[CardType["Joker1"] = 1] = "Joker1";
    CardType[CardType["Joker2"] = 2] = "Joker2";
})(CardType || (CardType = {}));
class Card {
    constructor(suit, number, cardType, isFlipped = false, position = {
        x: 720,
        y: 410
    }, owner = null){
        this.suit = suit;
        this.number = number;
        this.cardType = cardType;
        this.isFlipped = isFlipped;
        this.position = position;
        this.owner = owner;
    }
    flip() {
        this.isFlipped = !this.isFlipped;
    }
    getImage() {
        if (this.cardType === CardType.Joker1) {
            return "cards_images/Joker1.svg";
        } else if (this.cardType === CardType.Joker2) {
            return "cards_images/Joker2.svg";
        } else {
            const suitName = Suit[this.suit];
            const cardNumber = CardNumber[this.number];
            return `cards_images/${suitName}-${cardNumber}.svg`;
        }
    }
    static cardFromSocket(data) {
        const card = new Card(data.suit, data.number, data.cardType, data.isFlipped, data.position, data.owner);
        return card;
    }
}
class Deck {
    constructor(cards){
        this.cards = [];
        if (cards) {
            this.cards = cards;
        } else {
            for(let suit = 0; suit < Object.keys(Suit).length / 2; suit++){
                for(let number = 0; number < Object.keys(CardNumber).length / 2; number++){
                    this.cards.push(new Card(suit, number, CardType.Regular));
                }
            }
        }
    }
    addJokers() {
        this.cards.push(new Card(Suit.Clubs, CardNumber.Ace, CardType.Joker1));
        this.cards.push(new Card(Suit.Clubs, CardNumber.Ace, CardType.Joker2));
    }
    draw() {
        return this.cards.pop();
    }
    shuffle() {
        const shuffledCards = [
            ...this.cards
        ];
        for(let i = shuffledCards.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [
                shuffledCards[j],
                shuffledCards[i]
            ];
        }
        this.cards = shuffledCards;
        return this;
    }
    static deckFromSocket(data) {
        const cards = data.cards.map((cardData)=>Card.cardFromSocket(cardData));
        return new Deck(cards);
    }
}


/***/ }),

/***/ 53824:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SocketContextProvider: () => (/* binding */ SocketContextProvider),
/* harmony export */   useSocketContext: () => (/* binding */ useSocketContext)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(53133);
/* harmony import */ var _components_Card_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20907);
/* __next_internal_client_entry_do_not_use__ SocketContextProvider,useSocketContext auto */ 



const defaultMultiPlayerSettings = {
    game: {
        isJokerIncluded: false,
        isShuffleEnabled: true
    }
};
const defaultSingleModeSettings = {
    theme: {
        tableColor: "green",
        cardColor: "blue"
    },
    account: {
        userName: "",
        password: "",
        createdRooms: []
    }
};
const SocketContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const SocketContextProvider = ({ children })=>{
    const socketRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [multiPlayerSettings, setMultiPlayerSettings] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(defaultMultiPlayerSettings);
    const [singleModeSettings, setSingleModeSettings] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(defaultSingleModeSettings);
    const [deck, setDeck] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new _components_Card_card__WEBPACK_IMPORTED_MODULE_3__/* .Deck */ .$().shuffle());
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        socketRef.current = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_2__.io)("https://cards-deck-online-8a294773806f.herokuapp.com", {
            autoConnect: false
        });
        return ()=>{
            socketRef.current?.disconnect();
            console.log("disconnected");
        };
    }, []);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SocketContext.Provider, {
        value: {
            socketRef,
            deck,
            setDeck,
            multiPlayerSettings,
            setMultiPlayerSettings,
            singleModeSettings,
            setSingleModeSettings
        },
        children: children
    });
};
const useSocketContext = ()=>{
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(SocketContext);
    if (!context) {
        throw new Error("useSocketContext must be used within a SocketContextProvider");
    }
    return context;
};


/***/ }),

/***/ 68745:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  metadata: () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/next/font/google/target.css?{"path":"app/(routes)/layout.tsx","import":"Inter","arguments":[{"subsets":["latin"]}],"variableName":"inter"}
var layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_ = __webpack_require__(32899);
var layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default = /*#__PURE__*/__webpack_require__.n(layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_);
// EXTERNAL MODULE: ./app/globals.css
var globals = __webpack_require__(92817);
;// CONCATENATED MODULE: ./app/head.tsx

function Head() {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("title", {
                children: "Cards Deck Online"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                content: "width=device-width, initial-scale=1",
                name: "viewport"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                name: "description",
                content: "Generated by create next app"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "icon",
                href: "/favicon.ico"
            })
        ]
    });
}

// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(21313);
;// CONCATENATED MODULE: ./app/_context/socket.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`/Users/nemototakuya/workspace/projects/cards-deck-online/frontend/app/_context/socket.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;

const e0 = proxy["SocketContextProvider"];

const e1 = proxy["useSocketContext"];

;// CONCATENATED MODULE: ./app/(routes)/layout.tsx





const metadata = {
    title: "Create Next App",
    description: "Generated by create next app"
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("html", {
        lang: "en",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Head, {}),
            /*#__PURE__*/ jsx_runtime_.jsx("body", {
                className: (layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).className,
                children: /*#__PURE__*/ jsx_runtime_.jsx(e0, {
                    children: children
                })
            })
        ]
    });
}


/***/ }),

/***/ 83174:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(93180);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/x-icon","sizes":"any"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "favicon.ico")

    return [{
      ...imageData,
      url: imageUrl + "",
    }]
  });

/***/ }),

/***/ 92817:
/***/ (() => {



/***/ })

};
;