import { WeddingData } from '@/types/wedding';

export const weddingData: WeddingData = {
  groom: {
    fullName: 'Dedy Kurniawan, S.T.',
    nickName: 'Dedy',
    parents: 'Bapak Bambang Sutrisno & Ibu Sri Wahyuni',
    orderInFamily: 'Putra Pertama dari',
    instagram: 'dedykurniawan',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
  },
  bride: {
    fullName: 'Tiara Anindita, S.Kom.',
    nickName: 'Tiara',
    parents: 'Bapak H. Ahmad Subarkah & Ibu Hj. Ratna Sari',
    orderInFamily: 'Putri Kedua dari',
    instagram: 'tiaraanindita',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
  },
  coverGreeting: 'Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i serta kerabat sekalian untuk menghadiri hari bahagia kami.',
  quote: {
    text: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    source: 'QS. Ar-Rum: 21',
  },
  events: {
    akad: {
      title: 'Akad Nikah',
      date: 'Sabtu, 28 November 2026',
      dateIso: '2026-11-28T08:00:00+07:00',
      time: '08:00 - 10:00 WIB',
      venueName: 'Masjid Agung Al-Barkah',
      venueAddress: 'Jl. Veteran No. 46, Marga Jaya, Kec. Bekasi Selatan, Kota Bekasi',
      mapsUrl: 'https://maps.google.com/?q=Masjid+Agung+Al-Barkah+Bekasi',
      calendarTitle: 'Akad Nikah Dedy & Tiara',
      calendarDescription: 'Akad Nikah Dedy Kurniawan & Tiara Anindita di Masjid Agung Al-Barkah Bekasi',
    },
    resepsi: {
      title: 'Resepsi Pernikahan',
      date: 'Sabtu, 28 November 2026',
      dateIso: '2026-11-28T11:00:00+07:00',
      time: '11:00 - 15:00 WIB',
      venueName: 'Grand Ballroom Hotel Santika Mega City',
      venueAddress: 'Mega Bekasi Hypermall, Jl. Jend. Ahmad Yani No. 1, Kota Bekasi',
      mapsUrl: 'https://maps.google.com/?q=Hotel+Santika+Mega+City+Bekasi',
      calendarTitle: 'Resepsi Pernikahan Dedy & Tiara',
      calendarDescription: 'Resepsi Pernikahan Dedy Kurniawan & Tiara Anindita di Grand Ballroom Hotel Santika Bekasi',
    },
  },
  loveStory: [
    {
      year: '2020',
      title: 'Pertama Kali Bertemu',
      story: 'Takdir mempertemukan kami pertama kali di sebuah project kolaborasi kantor. Berawal dari diskusi pekerjaan, canda tawa mulai tercipta dan menjadi awal cerita hangat kami.',
    },
    {
      year: '2023',
      title: 'Memulai Komitmen Bersama',
      story: 'Setelah melewati berbagai cerita, saling memahami dan belajar satu sama lain, kami memutuskan untuk melangkah ke jenjang yang lebih serius dengan restu kedua orang tua.',
    },
    {
      year: '2026',
      title: 'Hari Lamaran',
      story: 'Dihadapan kedua keluarga besar tercinta, ikatan suci lamaran terjalin. Kami melangkah semakin dekat menuju gerbang pernikahan yang kami nantikan.',
    },
  ],
  gallery: [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop',
      alt: 'Momen Prewedding 1',
      caption: 'Menatap masa depan bersama',
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      alt: 'Momen Prewedding 2',
      caption: 'Langkah pertama menuju keabadian',
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
      alt: 'Momen Prewedding 3',
      caption: 'Dalam pelukan cinta dan doa',
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop',
      alt: 'Momen Prewedding 4',
      caption: 'Saling melengkapi selamanya',
    },
  ],
  bankAccounts: [
    {
      bankName: 'BCA',
      accountNumber: '8720192831',
      accountHolder: 'Dedy Kurniawan',
    },
    {
      bankName: 'Bank Mandiri',
      accountNumber: '156001239921',
      accountHolder: 'Tiara Anindita',
    },
  ],
  giftAddress: {
    recipientName: 'Tiara Anindita & Dedy Kurniawan',
    phoneNumber: '0812-3456-7890',
    fullAddress: 'Jl. Kemang Pratama Raya No. 12, Rawalumbu, Kota Bekasi, Jawa Barat 17116',
    notes: 'Mohon konfirmasi ke nomor penerima sebelum mengirimkan paket kado fisik.',
  },
  audioSrc: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113884.mp3',
  liveStreamingUrl: 'https://youtube.com',
};
