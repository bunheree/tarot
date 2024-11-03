import Image from "next/image"
import { Card, CardType } from "@/types/card"

type CardProps = {
    card: Card,
    handlePickCard: (cardId: number) => void
}

const TarotCard = ({ card, handlePickCard }: CardProps) => {
    return (
        <div className="w-24 " onClick={() => handlePickCard(card.id)}>
            <Image
                className="object-fit rounded-lg border border-white cursor-pointer"
                src={'/images/default.png'}
                alt="Tarot card"
                width={131}
                height={120} />
        </div>
    )
}

export default TarotCard