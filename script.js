$(function() {
    const $fact1 = $("#fact1");
    const $facts2 = $("#facts2");
    const $facts3 = $("#facts3");

    const numUrl = 'http://numbersapi.com/';
    
    class Number {
        constructor(id) {
            this.id = id;
        }
    
        async oneFact() {
            const response = await axios.get(numUrl + this.id);
            $fact1.text(response.data);
            return response.data;
        }

        async fourFacts() {
            var fourFacts = await Promise.all([
                axios.get(numUrl + this.id),
                axios.get(numUrl + this.id),
                axios.get(numUrl + this.id),
                axios.get(numUrl + this.id)
            ]);
            for (var fact in fourFacts) {
                const li = $("<li></li>").text(fourFacts[fact].data);
                $facts3.append(li);
            }
            return fourFacts;
        }

    }
    
    const num17 = new Number(17);
    num17.oneFact();

    const numArray = [12, 24, 25];

    async function manyFacts() {
        const response = await axios.get(numUrl + numArray);
        for (num in response.data) {
            const li = $("<li></li>").text(response.data[num]);
            $facts2.append(li);
        }
    }

    manyFacts();

    num17.fourFacts();


/////////////////////////////////////////////////////////////////////////////////////

    const $card1 = $("#card1");
    const $card1of2 = $("#card1of2");
    const $card2of2 = $("#card2of2");
    const $btn = $("button");
    const $manyCards = $("#manyCards");

    const deckUrl = 'https://deckofcardsapi.com/api/deck/';

    async function oneCard() {
        const response = await axios.get(deckUrl + "/new/draw");
        const val = response.data.cards[0].value;
        const suit = response.data.cards[0].suit;
        console.log(val + " of " + suit);
        const li = $("<li></li>").text(val + " of " + suit);
        $card1.append(li);
    }
    oneCard();

    async function twoCards() {
        const response1 = await axios.get(deckUrl + "/new/draw");
        const response2 = await axios.get(deckUrl + "/" + response1.data.deck_id + "/draw");
        const val1 = response1.data.cards[0].value;
        const suit1 = response1.data.cards[0].suit;
        console.log(val1 + " of " + suit1);
        const li1 = $("<li></li>").text(val1 + " of " + suit1);
        $card1of2.append(li1);
        const val2 = response2.data.cards[0].value;
        const suit2 = response2.data.cards[0].suit;
        console.log(val2 + " of " + suit2);
        const li2 = $("<li></li>").text(val2 + " of " + suit2);
        $card2of2.append(li2);
    }
    twoCards();

    class Deck {
        constructor() {
            this.id = null;
        }

        async create() {
            const response = await axios.get(deckUrl + "/new/shuffle");
            this.id = response.data.deck_id;
        }

        async drawCard() {
            const response = await axios.get(deckUrl + this.id + "/draw");
            console.log(response.data.cards[0]);
            const val = response.data.cards[0].value;
            const suit = response.data.cards[0].suit;
            const curCard = new Card(val, suit);
            console.log(val + " of " + suit);
            curCard.showCard();
            return curCard;
        }
    }

    class Card {
        constructor(val, suit) {
            this.value = val;
            this.suit = suit;
        }

        showCard() {
            const li = $("<li></li>").text(this.value + " of " + this.suit);
            $manyCards.append(li);
        }
    }

    const curDeck = new Deck();
    curDeck.create();

    $btn.on("click", function() {
        curDeck.drawCard();
    })
});