"use strict";
exports.id = 49;
exports.ids = [49];
exports.modules = {

/***/ 48231:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(48421);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20907);
/* harmony import */ var react_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(34647);
/* harmony import */ var react_draggable__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_draggable__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(16816);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_icons_material_VisibilityOff__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(78734);
/* harmony import */ var _app_context_socket__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(53824);
/* __next_internal_client_entry_do_not_use__ default auto */ 







const CardComponent = ({ card })=>{
    const [isFlipped, setIsFlipped] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(card.isFlipped);
    const [dragStart, setDragStart] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        x: 0,
        y: 0
    });
    const [rotation, setRotation] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [isNotDraggable, setIsNotDraggable] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { socketRef, setDeck } = (0,_app_context_socket__WEBPACK_IMPORTED_MODULE_5__.useSocketContext)();
    const handleMouseDown = (e)=>{
        setDragStart({
            x: e.clientX,
            y: e.clientY
        });
    };
    const handleMouseUp = (e)=>{
        const distance = Math.sqrt(Math.pow(e.clientX - dragStart.x, 2) + Math.pow(e.clientY - dragStart.y, 2));
        // If the mouse has not moved much, consider it a click.
        if (distance < 5) {
            card.flip();
            setIsFlipped(card.isFlipped);
            console.log("card", card.isFlipped);
            if (socketRef.current) {
                socketRef.current.emit("flipCard", card);
            }
        }
    };
    const handleMouseMove = (e)=>{
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
    };
    const handleDragStart = (e, data)=>{
        if (socketRef.current) {
            if (card.owner === null) {
                card.owner = socketRef.current.id;
                socketRef.current.emit("ownerDefined", card);
            } else if (card.owner !== socketRef.current.id) {
                setIsNotDraggable(true);
                return;
            }
        }
    };
    const handleDragStop = (e, data)=>{
        if (socketRef.current) {
            setIsNotDraggable(false);
            card.owner = null;
            console.log(card.owner);
            socketRef.current.emit("ownerDefined", card);
        }
    };
    const handleDrag = (e, data)=>{
        if (socketRef.current) {
            // console.log(card.owner)
            card.position = {
                x: data.x,
                y: data.y
            };
            setDeck((prevDeck)=>{
                const newDeckCards = prevDeck.cards.map((prevCard)=>prevCard.suit === card.suit && prevCard.number === card.number ? card : prevCard);
                return new _card__WEBPACK_IMPORTED_MODULE_3__/* .Deck */ .$(newDeckCards);
            });
            socketRef.current?.emit("updateCardPosition", card);
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_draggable__WEBPACK_IMPORTED_MODULE_4___default()), {
        onStart: handleDragStart,
        onStop: handleDragStop,
        onDrag: handleDrag,
        disabled: isNotDraggable,
        position: card.position,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "z-999 absolute",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                onMouseDown: handleMouseDown,
                onMouseUp: handleMouseUp,
                onMouseMove: handleMouseMove,
                style: {
                    transform: `rotate(${rotation}deg)`
                },
                children: card.isFlipped ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
                    src: card.getImage(),
                    alt: "Card Image",
                    width: 50,
                    height: 75,
                    draggable: false
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
                    src: "/cards_images/back.jpg",
                    alt: "Card Image",
                    width: 50,
                    height: 75,
                    draggable: false
                })
            })
        })
    });
};
const CardsDeck = ()=>{
    const [isDeckBoxVisible, setIsDeckBoxVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const { socketRef, deck, setDeck, multiPlayerSettings, setMultiPlayerSettings } = (0,_app_context_socket__WEBPACK_IMPORTED_MODULE_5__.useSocketContext)();
    const handleDeckBoxClick = ()=>{
        setIsDeckBoxVisible(false);
    };
    const updateDeck = (data)=>{
        // todo: why data: Card is throwing an error?
        const updatedCard = new _card__WEBPACK_IMPORTED_MODULE_3__/* .Card */ .Z(data.suit, data.number, data.isFlipped, data.position, data.owner);
        setDeck((prevDeck)=>{
            const newDeckCards = prevDeck.cards.map((card)=>card.suit === updatedCard.suit && card.number === updatedCard.number && card.cardType === updatedCard.cardType ? updatedCard : card);
            return new _card__WEBPACK_IMPORTED_MODULE_3__/* .Deck */ .$(newDeckCards);
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        socketRef.current?.on("deck", (data)=>{
            const deck = _card__WEBPACK_IMPORTED_MODULE_3__/* .Deck */ .$.deckFromSocket(data);
            setDeck(deck);
            console.log(deck);
        });
        socketRef.current?.on("multiPlayerSettings", (data)=>{
            setMultiPlayerSettings(data);
        });
        socketRef.current?.on("multiPlayerSettingsUpdated", (data)=>{
            setMultiPlayerSettings(data);
        });
        socketRef.current?.on("deckReset", (data)=>{
            const deck = _card__WEBPACK_IMPORTED_MODULE_3__/* .Deck */ .$.deckFromSocket(data);
            setDeck(deck);
        });
        socketRef.current?.on("ownerUpdated", (data)=>{
            updateDeck(data);
        });
        socketRef.current?.on("cardPositionUpdated", (data)=>{
            updateDeck(data);
        });
        socketRef.current?.on("cardFlipped", (data)=>{
            updateDeck(data);
        });
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            isDeckBoxVisible && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "absolute",
                style: {
                    top: "47.6%",
                    left: "49.5%"
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("fieldset", {
                    className: "border-2 rounded w-16 h-24",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("legend", {
                            children: "Deck"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "text-center",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6___default()), {
                                onClick: handleDeckBoxClick,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_icons_material_VisibilityOff__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                    fontSize: "large"
                                })
                            })
                        })
                    ]
                })
            }),
            deck.cards.map((card, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CardComponent, {
                    card: card
                }, index))
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardsDeck);


/***/ }),

/***/ 89227:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ CicleMenuComponent)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.cjs.js
var styled_components_cjs = __webpack_require__(3103);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/AccountCircle.js
var AccountCircle = __webpack_require__(5160);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/Settings.js
var Settings = __webpack_require__(56714);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/People.js
var People = __webpack_require__(10932);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Modal/index.js
var Modal = __webpack_require__(91643);
var Modal_default = /*#__PURE__*/__webpack_require__.n(Modal);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/Logout.js
var Logout = __webpack_require__(8207);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Box/index.js
var Box = __webpack_require__(46661);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/List/index.js
var List = __webpack_require__(54436);
var List_default = /*#__PURE__*/__webpack_require__.n(List);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/ListItem/index.js
var ListItem = __webpack_require__(90777);
var ListItem_default = /*#__PURE__*/__webpack_require__.n(ListItem);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/ListItemButton/index.js
var ListItemButton = __webpack_require__(29234);
var ListItemButton_default = /*#__PURE__*/__webpack_require__.n(ListItemButton);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/ListItemIcon/index.js
var ListItemIcon = __webpack_require__(26765);
var ListItemIcon_default = /*#__PURE__*/__webpack_require__.n(ListItemIcon);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Tooltip/index.js
var Tooltip = __webpack_require__(56020);
var Tooltip_default = /*#__PURE__*/__webpack_require__.n(Tooltip);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/MenuRounded.js
var MenuRounded = __webpack_require__(33893);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/CloseRounded.js
var CloseRounded = __webpack_require__(63306);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/index.js
var node = __webpack_require__(64085);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Button/index.js
var Button = __webpack_require__(98511);
var Button_default = /*#__PURE__*/__webpack_require__.n(Button);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Typography/index.js
var Typography = __webpack_require__(43360);
var Typography_default = /*#__PURE__*/__webpack_require__.n(Typography);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Alert/index.js
var Alert = __webpack_require__(74678);
var Alert_default = /*#__PURE__*/__webpack_require__.n(Alert);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(59483);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(48421);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./app/_api/handleSocket.ts
function createConnection(socketRef, deck, multiPlayerSettings, roomId, roomPassword, setRoomIdTakenError, setCreateSuccess, router) {
    // socketRef.current = io(`http://localhost:8000`)
    // socketRef.current.on("connect", () => console.log("client connected!")) 
    // socketRef.current.emit("roomInfo", {roomId: roomId, password: password})
    if (socketRef.current) {
        socketRef.current?.connect();
        socketRef.current?.emit("createRoom", {
            roomId: roomId,
            roomPassword: roomPassword,
            deck: deck,
            multiPlayerSettings: multiPlayerSettings
        }, (error)=>{
            if (error == "This room Id is already taken!") {
                setRoomIdTakenError(true);
            } else {
                setCreateSuccess(true);
                setTimeout(()=>{
                    router.push(roomId);
                }, 2000);
            }
        });
        console.log(socketRef.current);
    }
}
function joinConnection(socketRef, deck, setDeck, roomId, roomPassword, setRoomIdNotExistError, setPasswordDoesNotMatchError, setJoinSuccess, router) {
    if (socketRef.current) {
        socketRef.current?.connect();
        socketRef.current.emit("join", {
            roomId: roomId,
            roomPassword: roomPassword
        }, (error)=>{
            if (error == "Room does not exist!") {
                setPasswordDoesNotMatchError(false);
                setRoomIdNotExistError(true);
            } else if (error == "Password does not match!") {
                setRoomIdNotExistError(false);
                setPasswordDoesNotMatchError(true);
            } else {
                setJoinSuccess(true);
                setTimeout(()=>{
                    router.push(roomId);
                }, 2000);
            }
        });
        console.log(socketRef.current);
    }
}

// EXTERNAL MODULE: ./app/_context/socket.tsx
var socket = __webpack_require__(53824);
;// CONCATENATED MODULE: ./app/_components/CircleMenu/MultiPlayerMenu/MultiPlayerMenu.tsx












const MainBox = (0,styled_components_cjs/* default */.ZP)(Box["default"])`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    /* border: 2px solid #000; */
    box-shadow: 0px 0px 24px 0px rgba(0,0,0,0.75);`;
const MainButton = (0,styled_components_cjs/* default */.ZP)((Button_default()))`
    font-size: 0.8rem;
    color: #FFFFFF;
    border: 2px solid #144D00;
    border-radius: 25px;
    width: 8rem;
    height: 2.5rem;
`;
const MultiPlayerModeText = (0,styled_components_cjs/* default */.ZP)((Typography_default()))`
    font-size: 1.75rem;
`;
const MainTextField = (0,styled_components_cjs/* default */.ZP)(node.TextField)`
    border: 2px solid #144D00;
    .MuiInputBase-input {
        color: #FFFFFF;
    }
    .MuiOutlinedInput-root {
        &.Mui-focused fieldset {
            border-color: #FFFFFF;
        }
    }
`;
function MultiPlayerComponent() {
    const roomIdRef = (0,react_.useRef)();
    const passwordRef = (0,react_.useRef)();
    const [createSuccess, setCreateSuccess] = (0,react_.useState)(false);
    const [roomIdTakenError, setRoomIdTakenError] = (0,react_.useState)(false);
    const [roomIdNotExistError, setRoomIdNotExistError] = (0,react_.useState)(false);
    const [passwordDoesNotMatchError, setPasswordDoesNotMatchError] = (0,react_.useState)(false);
    const [joinSuccess, setJoinSuccess] = (0,react_.useState)(false);
    const { socketRef, deck, setDeck, multiPlayerSettings } = (0,socket.useSocketContext)();
    const router = (0,navigation.useRouter)();
    function handleCreateRoom() {
        const roomId = roomIdRef.current?.value;
        const password = passwordRef.current?.value;
        if (roomId && password) {
            createConnection(socketRef, deck, multiPlayerSettings, roomId, password, setRoomIdTakenError, setCreateSuccess, router);
        }
    }
    function handleJoinRoom() {
        const roomId = roomIdRef.current?.value;
        const password = passwordRef.current?.value;
        if (roomId && password) {
            joinConnection(socketRef, deck, setDeck, roomId, password, setRoomIdNotExistError, setPasswordDoesNotMatchError, setJoinSuccess, router);
        }
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(MainBox, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                src: "/modal_image.png",
                alt: "modal image",
                width: 400,
                height: 400,
                unoptimized: true
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                style: {
                    position: "absolute",
                    top: "7%",
                    textAlign: "center",
                    width: 400,
                    height: 380
                },
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(node.Grid, {
                    container: true,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(node.Grid, {
                            item: true,
                            xs: 12,
                            sx: {
                                marginBottom: "1.75rem"
                            },
                            children: /*#__PURE__*/ jsx_runtime_.jsx(MultiPlayerModeText, {
                                children: "Multiplayer Mode"
                            })
                        }),
                        roomIdTakenError && /*#__PURE__*/ jsx_runtime_.jsx(node.Grid, {
                            container: true,
                            alignItems: "center",
                            justifyContent: "center",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(node.Grid, {
                                item: true,
                                xs: 8,
                                sx: {
                                    marginBottom: "1.75rem"
                                },
                                children: /*#__PURE__*/ jsx_runtime_.jsx((Alert_default()), {
                                    variant: "standard",
                                    severity: "error",
                                    children: "This room ID is already taken!"
                                })
                            })
                        }),
                        roomIdNotExistError && /*#__PURE__*/ jsx_runtime_.jsx(node.Grid, {
                            container: true,
                            alignItems: "center",
                            justifyContent: "center",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(node.Grid, {
                                item: true,
                                xs: 8,
                                sx: {
                                    marginBottom: "1.75rem"
                                },
                                children: /*#__PURE__*/ jsx_runtime_.jsx((Alert_default()), {
                                    variant: "standard",
                                    severity: "error",
                                    children: "Room ID does not exist!"
                                })
                            })
                        }),
                        passwordDoesNotMatchError && /*#__PURE__*/ jsx_runtime_.jsx(node.Grid, {
                            container: true,
                            alignItems: "center",
                            justifyContent: "center",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(node.Grid, {
                                item: true,
                                xs: 8,
                                sx: {
                                    marginBottom: "1.75rem"
                                },
                                children: /*#__PURE__*/ jsx_runtime_.jsx((Alert_default()), {
                                    variant: "standard",
                                    severity: "error",
                                    children: "Password does not match!"
                                })
                            })
                        }),
                        createSuccess && /*#__PURE__*/ jsx_runtime_.jsx(node.Grid, {
                            container: true,
                            alignItems: "center",
                            justifyContent: "center",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(node.Grid, {
                                item: true,
                                xs: 8,
                                sx: {
                                    marginBottom: "1.75rem"
                                },
                                children: /*#__PURE__*/ jsx_runtime_.jsx((Alert_default()), {
                                    variant: "standard",
                                    severity: "success",
                                    children: "Creating a room!"
                                })
                            })
                        }),
                        joinSuccess && /*#__PURE__*/ jsx_runtime_.jsx(node.Grid, {
                            container: true,
                            alignItems: "center",
                            justifyContent: "center",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(node.Grid, {
                                item: true,
                                xs: 8,
                                sx: {
                                    marginBottom: "1.75rem"
                                },
                                children: /*#__PURE__*/ jsx_runtime_.jsx((Alert_default()), {
                                    variant: "standard",
                                    severity: "success",
                                    children: "Joining a room!"
                                })
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(node.Grid, {
                            item: true,
                            xs: 12,
                            sx: {
                                marginBottom: "1.5rem"
                            },
                            children: /*#__PURE__*/ jsx_runtime_.jsx(MainTextField, {
                                size: "small",
                                inputRef: roomIdRef,
                                inputProps: {
                                    sx: {
                                        width: 180
                                    }
                                },
                                InputLabelProps: {
                                    style: {
                                        color: "#fff"
                                    }
                                },
                                label: "Room ID",
                                variant: "outlined"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(node.Grid, {
                            item: true,
                            xs: 12,
                            sx: {
                                marginBottom: "1.75rem"
                            },
                            children: /*#__PURE__*/ jsx_runtime_.jsx(MainTextField, {
                                size: "small",
                                inputRef: passwordRef,
                                inputProps: {
                                    sx: {
                                        width: 180
                                    }
                                },
                                InputLabelProps: {
                                    style: {
                                        color: "#fff"
                                    }
                                },
                                label: "Password",
                                variant: "outlined"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(node.Grid, {
                            item: true,
                            xs: 12,
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(node.Grid, {
                                container: true,
                                justifyContent: "center",
                                alignItems: "center",
                                spacing: 4,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(node.Grid, {
                                        item: true,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(MainButton, {
                                            onClick: handleJoinRoom,
                                            variant: "outlined",
                                            children: "Join"
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(node.Grid, {
                                        item: true,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(MainButton, {
                                            onClick: handleCreateRoom,
                                            variant: "outlined",
                                            children: "Create"
                                        })
                                    })
                                ]
                            })
                        })
                    ]
                })
            })
        ]
    });
}

;// CONCATENATED MODULE: ./app/_components/CircleMenu/CircleMenuComponent.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 

















const MenuContainerBox = (0,styled_components_cjs/* default */.ZP)(Box["default"])`
  position: absolute;
  top: 0.1%;
  left: 0.5%;
`;
const AnimatedList = (0,styled_components_cjs/* default */.ZP)((List_default()))`
  display: flex;
  transition: max-width 0.75s ease-in-out;
  overflow: hidden;

  &.closed {
    max-width: 2.5rem; 
  }

  &.open {
    max-width: 10rem;
  }
`;
const AnimatedListItemMenu = (0,styled_components_cjs/* default */.ZP)((ListItem_default()))`
  &.closed {
    transition: border-radius 0.1s ease-in-out;
    transition-delay: 0.75s;
    border-radius: 50%;
  }

  &.open {
    border-radius: 50% 0 0 50%;
  }
`;
const AnimatedListItem = (0,styled_components_cjs/* default */.ZP)((ListItem_default()))`
  transition: opacity 0.75s ease-in-out, visibility 0.75s;
  &.closed {
    opacity: 0;
    visibility: hidden;
  }

  &.open {
    opacity: 1;
    visibility: visible;
  }
`;
function CicleMenuComponent() {
    const [openMultiPlayer, setOpenMultiPlayer] = (0,react_.useState)(false);
    const [openSettings, setOpenSettings] = (0,react_.useState)(false);
    const handleMultiPlayerOpen = ()=>setOpenMultiPlayer(true);
    const handleMultiPlayerClose = ()=>setOpenMultiPlayer(false);
    const handleMenuClick = ()=>{
        setOpenSettings(!openSettings);
    };
    const router = (0,navigation.useRouter)();
    const pathname = (0,navigation.usePathname)();
    const handleSettingsClick = ()=>{
        router.push(`${pathname}/settings`);
    };
    const handleLogoutClick = ()=>{
        router.push("/");
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(MenuContainerBox, {
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(AnimatedList, {
                    className: openSettings ? "open" : "closed",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(AnimatedListItemMenu, {
                            disablePadding: true,
                            className: `bg-gray-100 hover:bg-gray-300 ${openSettings ? "open" : "closed"}`,
                            children: /*#__PURE__*/ jsx_runtime_.jsx((ListItemButton_default()), {
                                onClick: handleMenuClick,
                                className: "p-0 h-10 w-10 items-center justify-center",
                                children: /*#__PURE__*/ jsx_runtime_.jsx((ListItemIcon_default()), {
                                    className: "min-w-0",
                                    children: openSettings ? /*#__PURE__*/ jsx_runtime_.jsx(CloseRounded/* default */.Z, {}) : /*#__PURE__*/ jsx_runtime_.jsx(MenuRounded/* default */.Z, {})
                                })
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx((Tooltip_default()), {
                            title: "Account",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(AnimatedListItem, {
                                disablePadding: true,
                                className: `bg-gray-100 hover:bg-gray-300 ${openSettings ? "open" : "closed"}}`,
                                children: /*#__PURE__*/ jsx_runtime_.jsx((ListItemButton_default()), {
                                    className: "p-0 h-10 w-10 items-center justify-center",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx((ListItemIcon_default()), {
                                        className: "min-w-0",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(AccountCircle/* default */.Z, {
                                            color: "success"
                                        })
                                    })
                                })
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx((Tooltip_default()), {
                            title: "Settings",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(AnimatedListItem, {
                                disablePadding: true,
                                className: `bg-gray-100 hover:bg-gray-300 ${openSettings ? "open" : "closed"}}`,
                                children: /*#__PURE__*/ jsx_runtime_.jsx((ListItemButton_default()), {
                                    onClick: handleSettingsClick,
                                    className: "p-0 h-10 w-10 items-center justify-center",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx((ListItemIcon_default()), {
                                        className: "min-w-0",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(Settings/* default */.Z, {
                                            color: "success"
                                        })
                                    })
                                })
                            })
                        }),
                        pathname === "/" ? /*#__PURE__*/ jsx_runtime_.jsx((Tooltip_default()), {
                            title: "MultiPlayer",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(AnimatedListItem, {
                                disablePadding: true,
                                className: `bg-gray-100 hover:bg-gray-300 rounded-r-full ${openSettings ? "open" : "closed"}}`,
                                children: /*#__PURE__*/ jsx_runtime_.jsx((ListItemButton_default()), {
                                    onClick: handleMultiPlayerOpen,
                                    className: "p-0 h-10 w-10 items-center justify-center",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx((ListItemIcon_default()), {
                                        className: "min-w-0",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(People/* default */.Z, {
                                            color: "success"
                                        })
                                    })
                                })
                            })
                        }) : /*#__PURE__*/ jsx_runtime_.jsx((Tooltip_default()), {
                            title: "Leave",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(AnimatedListItem, {
                                disablePadding: true,
                                className: `bg-gray-100 hover:bg-gray-300 rounded-r-full ${openSettings ? "open" : "closed"}}`,
                                children: /*#__PURE__*/ jsx_runtime_.jsx((ListItemButton_default()), {
                                    onClick: handleLogoutClick,
                                    className: "p-0 h-10 w-10 items-center justify-center",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx((ListItemIcon_default()), {
                                        className: "min-w-0",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(Logout/* default */.Z, {
                                            color: "success"
                                        })
                                    })
                                })
                            })
                        })
                    ]
                })
            }),
            openMultiPlayer && /*#__PURE__*/ jsx_runtime_.jsx((Modal_default()), {
                open: openMultiPlayer,
                onClose: handleMultiPlayerClose,
                children: /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                    children: /*#__PURE__*/ jsx_runtime_.jsx(MultiPlayerComponent, {})
                })
            })
        ]
    });
}


/***/ }),

/***/ 30033:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ TopRightButtonsComponent)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Box/index.js
var Box = __webpack_require__(46661);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/List/index.js
var List = __webpack_require__(54436);
var List_default = /*#__PURE__*/__webpack_require__.n(List);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/ListItem/index.js
var ListItem = __webpack_require__(90777);
var ListItem_default = /*#__PURE__*/__webpack_require__.n(ListItem);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/ListItemButton/index.js
var ListItemButton = __webpack_require__(29234);
var ListItemButton_default = /*#__PURE__*/__webpack_require__.n(ListItemButton);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/ListItemIcon/index.js
var ListItemIcon = __webpack_require__(26765);
var ListItemIcon_default = /*#__PURE__*/__webpack_require__.n(ListItemIcon);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Tooltip/index.js
var Tooltip = __webpack_require__(56020);
var Tooltip_default = /*#__PURE__*/__webpack_require__.n(Tooltip);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/RestartAlt.js
var RestartAlt = __webpack_require__(60494);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Button/index.js
var Button = __webpack_require__(98511);
var Button_default = /*#__PURE__*/__webpack_require__.n(Button);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Dialog/index.js
var Dialog = __webpack_require__(33429);
var Dialog_default = /*#__PURE__*/__webpack_require__.n(Dialog);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/DialogActions/index.js
var DialogActions = __webpack_require__(9268);
var DialogActions_default = /*#__PURE__*/__webpack_require__.n(DialogActions);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/DialogContent/index.js
var DialogContent = __webpack_require__(15381);
var DialogContent_default = /*#__PURE__*/__webpack_require__.n(DialogContent);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/DialogContentText/index.js
var DialogContentText = __webpack_require__(67641);
var DialogContentText_default = /*#__PURE__*/__webpack_require__.n(DialogContentText);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Switch/index.js
var Switch = __webpack_require__(77876);
var Switch_default = /*#__PURE__*/__webpack_require__.n(Switch);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Grid/index.js
var Grid = __webpack_require__(89216);
var Grid_default = /*#__PURE__*/__webpack_require__.n(Grid);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Typography/index.js
var Typography = __webpack_require__(43360);
var Typography_default = /*#__PURE__*/__webpack_require__.n(Typography);
// EXTERNAL MODULE: ./app/_context/socket.tsx
var socket = __webpack_require__(53824);
// EXTERNAL MODULE: ./app/_components/Card/card.ts
var Card_card = __webpack_require__(20907);
;// CONCATENATED MODULE: ./app/_components/TopRightButtons/ResetButton/ResetButton.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 











function ResetPopupComponent(props) {
    const { socketRef, deck, setDeck } = (0,socket.useSocketContext)();
    const [isShuffle, setIsShuffle] = (0,react_.useState)(false);
    const handleReset = ()=>{
        // bug: when reset, flipped cards act weird
        setDeck((prevDeck)=>{
            if (isShuffle) {
                return new Card_card/* Deck */.$().shuffle();
            } else {
                const newDeckCards = prevDeck.cards.map((card)=>new Card_card/* Card */.Z(card.suit, card.number, card.cardType, false, {
                        x: 720,
                        y: 410
                    }));
                const newDeck = new Card_card/* Deck */.$(newDeckCards);
                console.log(newDeck);
                if (socketRef.current) socketRef.current?.emit("resetDeck", newDeck);
                return newDeck;
            }
        });
        props.setResetPopup(false);
    };
    const handleResetClose = ()=>{
        props.setResetPopup(false);
    };
    const handleShuffleChange = ()=>{
        setIsShuffle(!isShuffle);
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((Dialog_default()), {
            open: props.resetPopup,
            onClose: handleResetClose,
            "aria-labelledby": "alert-dialog-title",
            "aria-describedby": "alert-dialog-description",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx((DialogContent_default()), {
                    children: /*#__PURE__*/ jsx_runtime_.jsx((DialogContentText_default()), {
                        id: "alert-dialog-description",
                        children: "Do you want to reset the card deck?"
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)((Grid_default()), {
                    container: true,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx((Grid_default()), {
                            item: true,
                            children: /*#__PURE__*/ jsx_runtime_.jsx((Switch_default()), {
                                checked: isShuffle,
                                onChange: handleShuffleChange,
                                inputProps: {
                                    "aria-label": "Switch shuffle dialog"
                                }
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx((Grid_default()), {
                            item: true,
                            alignSelf: "center",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((Typography_default()), {
                                variant: "subtitle2",
                                children: "Shuffle the deck"
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)((DialogActions_default()), {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx((Button_default()), {
                            onClick: handleResetClose,
                            children: "No"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx((Button_default()), {
                            onClick: handleReset,
                            children: "Yes"
                        })
                    ]
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./app/_components/TopRightButtons/TopRightButtonsComponent.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 









function TopRightButtonsComponent() {
    const [resetPopup, setResetPopup] = (0,react_.useState)(false);
    const [pencilEnabled, setPencilEnabled] = (0,react_.useState)(false);
    const handleResetPopupOpen = ()=>{
        setResetPopup(true);
    };
    const handlePencilClick = ()=>{
        setPencilEnabled(true);
    };
    const buttonList = {
        "pencil": {
            "tooltip": "Pencil",
            "onclick": handlePencilClick,
            "icon": /*#__PURE__*/ jsx_runtime_.jsx(RestartAlt/* default */.Z, {})
        },
        "reset": {
            "tooltip": "Reset",
            "onclick": handleResetPopupOpen,
            "icon": /*#__PURE__*/ jsx_runtime_.jsx(RestartAlt/* default */.Z, {})
        }
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Box["default"], {
                position: "absolute",
                top: "1%",
                left: "95%",
                zIndex: "999",
                children: /*#__PURE__*/ jsx_runtime_.jsx((List_default()), {
                    sx: {
                        display: "flex"
                    },
                    disablePadding: true,
                    children: Object.entries(buttonList).map((button)=>/*#__PURE__*/ jsx_runtime_.jsx((Tooltip_default()), {
                            title: button[1].tooltip,
                            children: /*#__PURE__*/ jsx_runtime_.jsx((ListItem_default()), {
                                className: "bg-gray-100 hover:bg-gray-300 rounded-full",
                                disablePadding: true,
                                children: /*#__PURE__*/ jsx_runtime_.jsx((ListItemButton_default()), {
                                    onClick: button[1].onclick,
                                    className: "p-0 h-8 w-8 items-center justify-center",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx((ListItemIcon_default()), {
                                        className: "min-w-0",
                                        children: button[1].icon
                                    })
                                })
                            })
                        }, button[1].tooltip))
                })
            }),
            resetPopup && /*#__PURE__*/ jsx_runtime_.jsx(ResetPopupComponent, {
                resetPopup: resetPopup,
                setResetPopup: setResetPopup
            })
        ]
    });
}


/***/ })

};
;