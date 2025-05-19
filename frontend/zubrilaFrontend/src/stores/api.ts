import {defineStore} from "pinia";
import {type Card, type CardData} from "../types/card"
import {type Deck, type DeckData} from "../types/deck"
import api from "../api.ts"

type ApiState = {
    cards: Card[]
    decks: Deck[]
}
type BackendId = {
    _id: string
}
export const useApiStore = defineStore('api', {
    state: (): ApiState => {
        return {
            cards: [],
            decks: []
        }
    },
    actions: {
        async getCards(id: string) {
            const client = api
            if (client) {
                const res = await client.get("/mycards", {
                    params: {
                        deck_id: id
                    }
                });
                if (res.status === 200) {
                    if (!Array.isArray(res.data.cards) && res.data.cards) res.data.cards = [res.data.cards]
                    this.cards = res.data.cards.map((card: CardData & BackendId) => {
                        return {
                            id: card._id,
                            name: card.name,
                            answer: card.answer
                        }
                    });
                }
            }
        },
        async getDecks() {
            const client = api
            if (client) {
                const res = await client.get("/mydecks");
                if (res.status === 200) {
                    if (!Array.isArray(res.data.decks) && res.data.decks) res.data.decks = [res.data.decks]
                    this.decks = res.data.decks.map((deck: DeckData & BackendId) => {
                        return {
                            id: deck._id,
                            name: deck.name,
                            description: deck.description,
                        }
                    });
                }
            }
        },
        async deleteDeck(id: string) {
            const client = api
            if (client) {
                const res = await client.delete(`/mydecks`, {
                    params: {
                        deckId: id
                    }
                });
                if (res.status === 200 && this.decks) {
                    this.decks = this.decks.filter(c => c.id !== id);
                }
            }
        },
        async patchDeck(deck: Deck) {
            const client = api
            if (client) {
                const res = await client.patch(`/mydecks`, deck);
                if (res.status === 200 && this.decks) {
                    this.decks = this.decks.map(storeDeck => storeDeck.id === deck.id ? deck : storeDeck);
                }
            }
        },
        async addDeck(deck: DeckData) {
            const client = api
            if (client) {
                const res = await client.put(`/mydecks`, deck);
                if (res.status === 200 && this.decks) {
                    this.decks.push({
                        id: res.data.deckId,
                        ...deck
                    })
                }
            }
        },
        async deleteCard(id: string) {
            const client = api
            if (client) {
                const res = await client.delete(`/mycards`, {
                    params: {
                        id: id
                    }
                });
                if (res.status === 200 && this.cards) {
                    this.cards = this.cards.filter(c => c.id !== id);
                }
            }
        },
        async patchCard(card: Card) {
            const client = api
            if (client) {
                const res = await client.patch(`/mycards`, card);
                if (res.status === 200 && this.cards) {
                    this.cards = this.cards.map(storeCard => storeCard.id === card.id ? card : storeCard);
                }
            }
        },

        async addCard(card: CardData) {
            const client = api
            if (client) {
                const res = await client.put(`/mycards`, card);
                if (res.status === 200 && this.cards) {
                    this.cards.push({
                        id: res.data.id,
                        ...card
                    })
                }
            }
        }


    }
})