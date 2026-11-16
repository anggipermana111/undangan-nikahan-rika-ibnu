import { WeddingData } from '@/types/wedding';

export const weddingData: WeddingData = {
  groom: {
    fullName: 'Ibnu Rizal Aqila, S.I.Kom.',
    nickName: 'Ibnu',
    parents: 'Bapak Engkus & Ibu Yeti',
    orderInFamily: 'Putra Pertama dari',
    instagram: 'ibnunesia',
    // TODO: Ganti dengan foto asli Ibnu (upload ke imgbb.com atau cloudinary.com lalu paste URL-nya)
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
  },
  bride: {
    fullName: 'Rika Nadiyanti, S.A.B.',
    nickName: 'Rika',
    parents: 'Bapak Kusnadi & Ibu Ai Yanti',
    orderInFamily: 'Putri Pertama dari',
    instagram: 'rikandyaa',
    // TODO: Ganti dengan foto asli Rika (upload ke imgbb.com atau cloudinary.com lalu paste URL-nya)
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
  },
  coverGreeting: 'Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i serta kerabat sekalian untuk menghadiri hari bahagia kami.',
  quote: {
    // TODO: Konfirmasi apakah pakai Ar-Rum 21 ini atau ada ayat/kutipan lain yang diinginkan
    text: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    source: 'QS. Ar-Rum: 21',
  },
  events: {
    akad: {
      title: 'Akad Nikah',
      date: 'Kamis, 3 Desember 2026',
      dateIso: '2026-12-03T09:00:00+07:00',
      time: '09:00 WIB - Selesai',
      venueName: 'Gedung Islamic Center Pangandaran',
      venueAddress: 'Jl. Islamic Center, Pangandaran, Kab. Pangandaran, Jawa Barat',
      mapsUrl: 'https://maps.google.com/?q=Islamic+Center+Pangandaran',
      calendarTitle: 'Akad Nikah Ibnu & Rika',
      calendarDescription: 'Akad Nikah Ibnu Rizal Aqila & Rika Nadiyanti di Gedung Islamic Center Pangandaran',
    },
    resepsi: {
      title: 'Resepsi Pernikahan',
      date: 'Kamis, 3 Desember 2026',
      dateIso: '2026-12-03T11:00:00+07:00',
      time: '11:00 WIB - Selesai',
      venueName: 'Gedung Islamic Center Pangandaran',
      venueAddress: 'Jl. Islamic Center, Pangandaran, Kab. Pangandaran, Jawa Barat',
      mapsUrl: 'https://maps.google.com/?q=Islamic+Center+Pangandaran',
      calendarTitle: 'Resepsi Pernikahan Ibnu & Rika',
      calendarDescription: 'Resepsi Pernikahan Ibnu Rizal Aqila & Rika Nadiyanti di Gedung Islamic Center Pangandaran',
    },
  },
  loveStory: [
    // TODO: Minta kakak cerita singkat kapan kenal, kapan PDKT, kapan lamaran
    // Contoh format di bawah ini — ganti dengan cerita asli Ibnu & Rika
    {
      year: '????',
      title: 'Pertama Kali Bertemu',
      story: '(Cerita awal pertemuan Ibnu & Rika — mohon diisi oleh mempelai)',
    },
    {
      year: '????',
      title: 'Memulai Komitmen Bersama',
      story: '(Cerita perjalanan hubungan — mohon diisi oleh mempelai)',
    },
    {
      year: '2026',
      title: 'Hari Lamaran',
      story: '(Cerita hari lamaran — mohon diisi oleh mempelai)',
    },
  ],
  gallery: [
    // TODO: Ganti semua URL foto di bawah ini dengan foto asli prewedding Ibnu & Rika
    // Upload foto ke https://imgbb.com (gratis, mudah) lalu paste URL Direct Link-nya
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop',
      alt: 'Foto Prewedding Ibnu & Rika 1',
      caption: 'Menatap masa depan bersama',
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      alt: 'Foto Prewedding Ibnu & Rika 2',
      caption: 'Langkah pertama menuju keabadian',
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
      alt: 'Foto Prewedding Ibnu & Rika 3',
      caption: 'Dalam pelukan cinta dan doa',
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop',
      alt: 'Foto Prewedding Ibnu & Rika 4',
      caption: 'Saling melengkapi selamanya',
    },
  ],
  bankAccounts: [
    {
      // TODO: Konfirmasi nama bank untuk nomor 901470053224 (kemungkinan BSI?)
      bankName: 'BSI',
      accountNumber: '901470053224',
      accountHolder: 'Rika Nadiyanti',
    },
    {
      // TODO: Konfirmasi nama bank untuk nomor 901885596838 (kemungkinan BSI?)
      bankName: 'BSI',
      accountNumber: '901885596838',
      accountHolder: 'Ibnu Rizal Aqila',
    },
  ],
  giftAddress: {
    recipientName: 'Rika Nadiyanti & Ibnu Rizal Aqila',
    phoneNumber: '082316256857',
    fullAddress: 'Dsn. Cikangkung RT 02/03, Ds. Cikembulan, Kec. Sidamulih, Kab. Pangandaran',
    notes: 'Mohon konfirmasi ke nomor penerima sebelum mengirimkan paket kado fisik.',
  },
  // TODO: Ganti dengan lagu favorit Ibnu & Rika (upload MP3 ke file hosting atau cari link CDN)
  audioSrc: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113884.mp3',
  // TODO: Isi jika ada link YouTube Live / IG Live saat hari H. Kalau tidak ada, hapus baris ini.
  liveStreamingUrl: undefined,
  hashtag: '#IbnuRika2026',
};
