import "@/css/flipping.css"
import { Card, CardType } from "@/types/card"

const S3 = process.env.NEXT_PUBLIC_S3_ENDPOINT || '/'

type CardProps = {
    cards: Card[]
    pickCard?: number[]
}

// Define the cardLocation object
const cardLocation: Record<CardType, string> = {
    'major-arcana': '/MajorArcana',
    'wands': '/Wands',
    'cups': '/Cups',
    'swords': '/Swords',
    'pentacles': '/Pentacles',
}

const defaultCard = S3 + '/Default/default.png'

const DefaultCard = ({ cards, pickCard = [] }: CardProps) => {

    return (
        <div className="card-section w-full">

            <div className="flipping-cards">

                {pickCard && pickCard?.length > 0 &&
                    <div className="profile-card first-profile-card object-cover">
                        <div className="profile-card-front profile-card-face h-full" style={{ backgroundImage: `url(${S3 + cardLocation[cards[pickCard[0]].type as CardType] + cards[pickCard[0]].src})` }}>
                            <h2 className="name">{cards[pickCard[0]]?.name}</h2>
                            <h3 className="role">{cards[pickCard[0]].type}</h3>
                        </div>
                        <div className="profile-card-back profile-card-face" style={{ backgroundImage: `url(${defaultCard})` }}>
                            <div className="p-4">
                                <p className="pb-4">
                                    <span className="font-bold">Main Meaning: </span>
                                    {cards[pickCard[0]].mainMeaning}
                                </p>
                                <p className="pb-4">
                                    <span className="font-bold">Reverse Meaning: </span>
                                    {cards[pickCard[0]].reverseMeaning}
                                </p>
                                <p className="pb-4">
                                    <span className="font-bold">Meaning: </span>
                                    {cards[pickCard[0]].description}
                                </p>
                            </div>
                        </div>
                    </div>
                }

                {pickCard && pickCard?.length > 1 &&
                    <div className="profile-card second-profile-card">
                        <div className="profile-card-front profile-card-face h-full" style={{ backgroundImage: `url(${S3 + cardLocation[cards[pickCard[1]].type as CardType] + cards[pickCard[1]].src})` }}>
                            <h2 className="name">{cards[pickCard[1]]?.name}</h2>
                            <h3 className="role">{cards[pickCard[1]].type}</h3>
                        </div>
                        <div className="profile-card-back profile-card-face" style={{ backgroundImage: `url(${defaultCard})` }}>
                            <div className="p-4">
                                <p className="pb-4">
                                    <span className="font-bold">Main Meaning: </span>
                                    {cards[pickCard[1]].mainMeaning}
                                </p>
                                <p className="pb-4">
                                    <span className="font-bold">Reverse Meaning: </span>
                                    {cards[pickCard[1]].reverseMeaning}
                                </p>
                                <p className="pb-4">
                                    <span className="font-bold">Meaning: </span>
                                    {cards[pickCard[1]].description}
                                </p>
                            </div>
                        </div>
                    </div>
                }

                {pickCard && pickCard?.length > 2 &&
                    <div className="profile-card third-profile-card">
                        <div className="profile-card-front profile-card-face h-full" style={{ backgroundImage: `url(${S3 + cardLocation[cards[pickCard[2]].type as CardType] + cards[pickCard[2]].src})` }}>
                            <h2 className="name">{cards[pickCard[2]]?.name}</h2>
                            <h3 className="role">{cards[pickCard[2]].type}</h3>
                        </div>
                        <div className="profile-card-back profile-card-face" style={{ backgroundImage: `url(${defaultCard})` }}>
                            <div className="p-4">
                                <p className="pb-4">
                                    <span className="font-bold">Main Meaning: </span>
                                    {cards[pickCard[2]].mainMeaning}
                                </p>
                                <p className="pb-4">
                                    <span className="font-bold">Reverse Meaning: </span>
                                    {cards[pickCard[2]].reverseMeaning}
                                </p>
                                <p className="pb-4">
                                    <span className="font-bold">Meaning: </span>
                                    {cards[pickCard[2]].description}
                                </p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default DefaultCard