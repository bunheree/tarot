'use client'
import { useEffect, useState } from "react"
import tarotCards from "@/data/cards.json"
import TarotCard from "@/components/TarotCard"
import { shuffleArray } from "@/common/shuffle"
import { Card } from "@/types/card"
import DefaultCard from "@/components/DefaultCard"
import { GoogleGenerativeAI } from "@google/generative-ai"

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
const MAX_CALLS_PER_MINUTE = 10

export default function Home() {
  const rootCards: Card[] = tarotCards
  const [cards, setCards] = useState<Card[]>(rootCards)
  const [pickCards, setPickCards] = useState<number[]>([])
  const [prompt, setPrompt] = useState<string>("")
  const [result, setResult] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [callCount, setCallCount] = useState(0)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setCards(shuffleArray(rootCards))
  }, [rootCards])

  useEffect(() => {
    if (pickCards.length > 2) { // Pick enough 3 cards
      setPrompt(`With 3 cards: ${pickCards[0]}, ${pickCards[1]}, and ${pickCards[2]}. Next, look up the corresponding tarot cards and their meanings. Finally, put together an overall reading for me based on the three cards. Answer in Vietnamese`)
    }
  }, [pickCards, cards])

  const handlePickCard = (cardId: number) => {
    if (pickCards.length > 2) {
      console.log('You only can choose 3 cards')
      return
    }
    setPickCards([...pickCards, cardId])
  }

  const handleResetPick = () => {
    setCards(shuffleArray(rootCards))
    setPickCards([])
    setPrompt("")
    setResult("")
  }

  useEffect(() => {
    if (timer === null) {
      const newTimer = setInterval(() => {
        setCallCount(0)
      }, 60000) // Reset count every 60 seconds
      setTimer(newTimer)

      // Clean up timer on component unmount
      return () => clearInterval(newTimer)
    }
  }, [timer])

  const handleReadCards = async () => {
    if (prompt === "") {
      alert('Vui lòng chọn đủ 3 lá bài!')
      return
    }

    if (callCount >= MAX_CALLS_PER_MINUTE) {
      alert('Hệ thống quá tải! Vui lòng chờ 1 phút sau đó thử lại.')
      return
    }

    setCallCount(callCount + 1)
    await handleSendPromptToGemini(prompt)
  }

  const handleSendPromptToGemini = async (prompt: string) => {
    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(API_KEY)
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })

      const result = await model.generateContent(prompt)
      const response = result.response
      const text = response.text()

      setResult(text)
    } catch (error) {
      setResult('Failed to fetch response.')
    }
    setIsLoading(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isLoading &&
        <p className="pb-8">loading...</p>
      }
      <button className={`bg-black text-white p-4 text-center border hover:bg-white hover:text-black ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading} onClick={handleResetPick}>Reset</button>
      {result &&
        <p className="pb-8">{result}</p>
      }
      <div className="relative flex flex-wrap">
        {cards && cards.filter((card) => !pickCards.includes(card.id)).map((card: Card) => (
          <div key={card.id} className="relative -ml-20 hover:-mt-4">
            <TarotCard card={card} handlePickCard={handlePickCard} />
          </div>
        ))}
      </div>
      <button className={`bg-black text-white p-4 text-center border hover:bg-white hover:text-black ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading} onClick={() => handleReadCards()}>Read Cards</button>

      <DefaultCard cards={cards} pickCard={pickCards} />
    </main>
  )
}
