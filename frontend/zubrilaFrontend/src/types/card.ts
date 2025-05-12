export type CardData = {
    name: string,
    answer:string,
    deck_id:string
}
export type Card = CardData & {
    id:string
}