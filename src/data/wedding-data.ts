import { WeddingData } from '@/types/wedding';

export const weddingData: WeddingData = {
  groom: {
    fullName: 'Ibnu Rizal Aqila, S.I.Kom.',
    nickName: 'Ibnu',
    parents: 'Bapak Engkus & Ibu Yeti',
    orderInFamily: 'Putra Pertama dari',
    instagram: 'ibnunesia',
    photo: '/images/photo-4.jpg',
  },
  bride: {
    fullName: 'Rika Nadiyanti, S.A.B.',
    nickName: 'Rika',
    parents: 'Bapak Kusnadi & Ibu Ai Yanti',
    orderInFamily: 'Putri Pertama dari',
    instagram: 'rikandyaa',
    photo: '/images/photo-5.jpg',
  },
  coverGreeting: 'Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i serta kerabat sekalian untuk menghadiri hari bahagia kami.',
  quote: {
    text: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.',
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
    {
      year: '2021',
      title: 'Pertemuan di Kafe',
      story: 'Tidak pernah terbayangkan bahwa sebuah pertemuan sederhana di sebuah kafe pada tahun 2021 akan menjadi awal dari perjalanan panjang kami.',
    },
    {
      year: 'Perjalanan Cerita',
      title: 'Tumbuh Bersama',
      story: 'Berawal dari pertemuan yang tak pernah direncanakan, kemudian dipertemukan kembali oleh waktu dan berbagai cerita. Tanpa disadari, dua orang yang awalnya hanya saling mengenal perlahan menjadi bagian penting dalam kehidupan satu sama lain.',
    },
    {
      year: '2026',
      title: 'Menuju Hari Bahagia',
      story: 'Hari demi hari, cerita kami terus berlanjut. Hingga akhirnya, setelah melewati berbagai perjalanan bersama, kami sampai pada satu keputusan indah: untuk tidak lagi berjalan sendiri, melainkan melangkah bersama dalam sebuah ikatan suci pernikahan. Karena ternyata, pertemuan yang tidak disengaja bisa menjadi awal dari selamanya. 🤍',
    },
  ],
  gallery: [
    {
      id: '1',
      src: '/images/photo-1.jpg',
      alt: 'Momen Prewedding Ibnu & Rika 1',
      caption: 'Menatap masa depan bersama',
    },
    {
      id: '2',
      src: '/images/photo-3.jpg',
      alt: 'Momen Prewedding Ibnu & Rika 2',
      caption: 'Dalam pelukan cinta dan doa',
    },
    {
      id: '3',
      src: '/images/photo-4.jpg',
      alt: 'Momen Prewedding Ibnu & Rika 3',
      caption: 'Langkah pertama menuju keabadian',
    },
    {
      id: '4',
      src: '/images/photo-5.jpg',
      alt: 'Momen Prewedding Ibnu & Rika 4',
      caption: 'Kehangatan dalam kesederhanaan',
    },
    {
      id: '5',
      src: '/images/photo-6.jpg',
      alt: 'Momen Prewedding Ibnu & Rika 5',
      caption: 'Satu rasa, satu tujuan',
    },
    {
      id: '6',
      src: '/images/photo-8.jpg',
      alt: 'Momen Prewedding Ibnu & Rika 6',
      caption: 'Janji suci di setiap tatapan',
    },
  ],
  bankAccounts: [
    {
      bankName: 'SeaBank',
      accountNumber: '901470053224',
      accountHolder: 'Rika Nadiyanti',
    },
    {
      bankName: 'SeaBank',
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
  audioSrc: '/audio.mp3',
  liveStreamingUrl: undefined,
  hashtag: '#RikaIbnu2026',
};
