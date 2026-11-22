export interface CouplePerson {
  fullName: string;
  nickName: string;
  parents: string;
  fatherName?: string;
  motherName?: string;
  orderInFamily: string; // e.g. "Putra Pertama dari 2 bersaudara"
  instagram?: string;
  photo: string;
}

export interface WeddingEvent {
  title: string;
  date: string;
  dateIso: string;
  time: string;
  venueName: string;
  venueAddress: string;
  mapsUrl: string;
  calendarTitle: string;
  calendarDescription: string;
}

export interface StoryMilestone {
  year: string;
  title: string;
  story: string;
  icon?: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  logoUrl?: string;
}

export interface GiftAddress {
  recipientName: string;
  phoneNumber: string;
  fullAddress: string;
  notes?: string;
}

export interface WeddingData {
  groom: CouplePerson;
  bride: CouplePerson;
  coverGreeting: string;
  /** Short date for the cover, e.g. "03 . 12 . 2026" */
  dateShort: string;
  /** Long date without weekday, e.g. "3 Desember 2026" */
  dateLong: string;
  quote: {
    text: string;
    source: string;
  };
  events: {
    akad: WeddingEvent;
    resepsi: WeddingEvent;
  };
  loveStory: StoryMilestone[];
  gallery: GalleryPhoto[];
  bankAccounts: BankAccount[];
  giftAddress: GiftAddress;
  audioSrc: string;
  hashtag?: string;
}
