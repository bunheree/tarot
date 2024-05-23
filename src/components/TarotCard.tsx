import Image from "next/image"
import { Card, CardType } from "@/types/card"

const S3 = process.env.NEXT_PUBLIC_S3_ENDPOINT || '/'

type CardProps = {
    card: Card,
    handlePickCard: (cardId: number) => void
}

// Define the cardLocation object
const cardLocation: Record<CardType, string> = {
    'major-arcana': '/MajorArcana',
    'wands': '/Wands',
    'cups': '/Cups',
    'swords': '/Swords',
    'pentacles': '/Pentacles',
}

const TarotCard = ({ card, handlePickCard }: CardProps) => {
    const cardType: CardType = (card.type as CardType)
    const src = S3 + cardLocation[cardType] + card.src

    return (
        <div className="w-24" onClick={() => handlePickCard(card.id)}>
            <Image
                className="object-fit"
                src={S3 + '/Default/default.png'}
                alt="Tarot card"
                width={131}
                height={120} />
        </div>
    )
}

export default TarotCard