export type CardType = 'major-arcana' | 'wands' | 'cups' | 'swords' | 'pentacles'

export interface Card {
  id: number;
  name: string;
  mainMeaning: string;
  reverseMeaning: string;
  description: string;
  src: string;
  type?: string;
}
