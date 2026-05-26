/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Character, DialogNode, DayData } from '../types';

export const CHARACTERS: Record<string, Character> = {
  narator: {
    id: 'narator',
    name: 'Sistem',
    role: 'Pemandu Edukasi',
    avatarColor: 'bg-slate-800',
    borderColor: 'border-slate-700',
    avatarStyle: 'system',
  },
  cheryl: {
    id: 'cheryl',
    name: 'Cheryl',
    role: 'Desain Grafis OSIS (Junior)',
    avatarColor: 'bg-indigo-100',
    borderColor: 'border-indigo-400',
    avatarStyle: 'cheryl',
  },
  roy: {
    id: 'roy',
    name: 'Roy',
    role: 'Ketua Divisi Acara (Senior-Kakak Kelas)',
    avatarColor: 'bg-rose-100',
    borderColor: 'border-rose-400',
    avatarStyle: 'roy',
  },
  sarah: {
    id: 'sarah',
    name: 'Sarah',
    role: 'Bendahara & Humas (Senior)',
    avatarColor: 'bg-amber-100',
    borderColor: 'border-amber-400',
    avatarStyle: 'sarah',
  },
  bimo: {
    id: 'bimo',
    name: 'Bimo',
    role: 'Anggota Divisi (Sebaya - Slacker)',
    avatarColor: 'bg-emerald-100',
    borderColor: 'border-emerald-400',
    avatarStyle: 'bimo',
  },
  alika: {
    id: 'alika',
    name: 'Alika',
    role: 'Teman Kelas / Sesama OSIS',
    avatarColor: 'bg-sky-100',
    borderColor: 'border-sky-400',
    avatarStyle: 'alika',
  },
};

export const DAYS: DayData[] = [
  {
    dayNumber: 1,
    title: 'Hari 1: Terjebak Tugas Titipan',
    description: 'Bimo melempar tugas posternya secara sepihak ke Cheryl di malam hari dengan dalih les bimbel tambahan. Bagaimana Cheryl menavigasi tekanan grup chat ini?',
    initialDialogueId: 'day1_intro',
    targetTaskProgress: 25,
    taskName: 'Konsep Desain Poster Pensi',
    taskType: 'poster',
  },
  {
    dayNumber: 2,
    title: 'Hari 2: Rapat Evaluasi Tanpa Solusi',
    description: 'Rapat offline diadakan di kelas setelah pulang sekolah. Bukannya membantu, Roy dan Sarah malah mengkritik habis-habisan rancangan poster Cheryl tanpa masukan konkret.',
    initialDialogueId: 'day2_intro',
    targetTaskProgress: 50,
    taskName: 'Revisi Proposal & Desain Poster',
    taskType: 'proposal',
  },
  {
    dayNumber: 3,
    title: 'Hari 3: Blaming di Grup Chat Malam',
    description: 'Terjadi salah cetak pamflet anggaran karena revisi dadakan dari Sarah. Tapi Sarah dan Roy malah menyudutkan Cheryl secara publik di grup chat OSIS.',
    initialDialogueId: 'day3_intro',
    targetTaskProgress: 75,
    taskName: 'Koreksi Anggaran & Desain Final',
    taskType: 'anggaran',
  },
  {
    dayNumber: 4,
    title: 'Hari 4: Puncak Acara & Keberanian Cheryl',
    description: 'Acara Festival Pensi dimulai dengan sukses. Roy berpidato bangga menepuk dada, sementara Cheryl dibalik layar menatap masa depannya. Saatnya memilih jalan keluar.',
    initialDialogueId: 'day4_intro',
    targetTaskProgress: 100,
    taskName: 'Finalisasi Laporan Publikasi',
    taskType: 'poster',
  },
];

export const DIALOGUE_TREE: Record<string, DialogNode> = {
  // === DAY 1 ===
  day1_intro: {
    id: 'day1_intro',
    speakerId: 'narator',
    text: 'Malam menunjukkan pukul 21:30 WIB. Cheryl sedang bersantai di rumah untuk bersiap-siap tidur, namun tiba-tiba handphone-nya terus bergetar. Sebuah pesan masuk di grup kepanitiaan Pensi SMA Garuda...',
    nextId: 'day1_bimo1',
  },
  day1_bimo1: {
    id: 'day1_bimo1',
    speakerId: 'bimo',
    expression: 'sombong',
    text: 'Guys, sorry banget nih, gila tugas les bimbel SNMPTN gue numpuk puolll sampai gak bisa tidur. Ada yang bisa take over tugas bikin poster publikasi festival gak? @Cheryl kan lo anak des graf, merem juga kelar lah ya. Share design besok pagi jam 7!',
    nextId: 'day1_roy1',
  },
  day1_roy1: {
    id: 'day1_roy1',
    speakerId: 'roy',
    expression: 'normal',
    text: 'Nah bener tuh, kita yang lain lagi ngerjain proposal sponsor. @Cheryl tolong dibantu ya, ini kan demi kesuksesan organisasi kita juga. Jangan sampai ada yang egois gak mau gerak.',
    nextId: 'day1_cheryl_pikir',
  },
  day1_cheryl_pikir: {
    id: 'day1_cheryl_pikir',
    speakerId: 'cheryl',
    expression: 'lelah',
    text: '(Aduh... padahal besok aku ada kuis Matematika bab trigonometri kelas pagi. Bimo kan harusnya yang megang poster dari minggu lalu, kenapa baru dilempar sekarang?)',
    choices: [
      {
        text: 'Nolak langsung: "Maaf Bimo, malam-malam gini dadakan banget. Besok aku juga ada kuis pagi."',
        nextId: 'day1_path_tolak',
        mhpChange: 5,
        taskChange: 0,
        feedbackText: 'Sikap asertif pertamamu membuat dada terasa lega, namun grup mulai menembakkan respon dingin.',
        educationalTip: 'Menolak secara sopan adalah bentuk asertivitas yang sehat. Menolak bukan berarti kamu bermalas-malasan, melainkan sadar akan batas energimu.',
      },
      {
        text: 'People Pleasing: "Oh... iya Kak Roy, Bimo. Aku coba kerjain sebisa aku ya malam ini..."',
        nextId: 'day1_path_terima',
        mhpChange: -20,
        taskChange: 15,
        feedbackText: 'Kamu memilih mengorbankan waktu tidur dan belajarmu demi menyenangkan orang lain.',
        educationalTip: 'Sikap "People Pleasing" sering dipicu takut ditolak, namun biayanya sangat mahal: waktu tidur, nilai sekolah, dan kesehatan mentalmu habis terkuras.',
      },
      {
        text: 'Cari solusi tegas: "Aku bisa bantu kasih template dasarnya aja malam ini, tapi Bimo yang masukin teks dan isinya besok pagi gimana?"',
        nextId: 'day1_path_kompromi',
        mhpChange: 0,
        taskChange: 10,
        feedbackText: 'Kamu berusaha membuat titik tengah yang adil di antara kewajiban tim dan kesehatan mentalmu.',
        educationalTip: 'Kompromi kolaboratif adalah solusi cerdas untuk menunjukkan kontribusi tanpa harus menanggung beban kesalahan orang lain seutuhnya.',
      },
    ],
  },

  // Day 1: Path Tolak
  day1_path_tolak: {
    id: 'day1_path_tolak',
    speakerId: 'sarah',
    expression: 'sombong',
    text: 'Yah Chér, masa gitu doang gak bisa? Semuanya juga sibuk kok, ada yang ulangan harian bab fisika juga tetep ngerjain proposal. Kan tinggal copy-paste doang gak nyampe 20 menit kok. Solidaritasnya mana nih?',
    nextId: 'day1_path_tolak_roy',
  },
  day1_path_tolak_roy: {
    id: 'day1_path_tolak_roy',
    speakerId: 'roy',
    expression: 'marah',
    text: 'Udah, Cheryl kerjain aja. Malu dong sama posisi kamu di OSIS. Kalo poster besok pagi gak naik, sponsor bisa mundur lho. Tanggung jawab ya, Cheryl.',
    nextId: 'day1_path_tolak_akhir',
  },
  day1_path_tolak_akhir: {
    id: 'day1_path_tolak_akhir',
    speakerId: 'cheryl',
    expression: 'sedih',
    text: '(Dadaku sesak membaca chat mereka... Mereka membuatku merasa seperti penjahat egois yang akan menghancurkan nama baik sekolah...)',
    choices: [
      {
        text: 'Terpaksa mengalah demi meredam konflik: "Iya, ok Kak, maaf..."',
        nextId: 'day1_desk_prepare',
        mhpChange: -15,
        taskChange: 10,
        feedbackText: 'Kamu menyerah pada tekanan emosional (Guilt tripping) yang mereka lancarkan.',
        educationalTip: 'Guilt Tripping adalah manipulasi psikologis agar korban merasa bersalah. Memahami bahwa rasa bersalah ini "dititipkan" orang lain membantumu melepas beban emosi tersebut.',
      },
      {
        text: 'Teguh batas privasi: "Malam ini saya hanya bisa mencicil konsep sketsa kasar di kertas 10 menit, setelah itu HP saya matikan untuk persiapan kuis."',
        nextId: 'day1_desk_prepare',
        mhpChange: 10,
        taskChange: 5,
        feedbackText: 'Keberanianmu menyalakan mode batas privasi menjaga kesehatan mentalmu tetap aman dari racun grup chat.',
        educationalTip: 'Menegakkan batasan waktu (boundary setting) seperti mematikan HP di jam tidur sangat vital untuk mencegah paparan racun yang memicu kecemasan.',
      },
    ],
  },

  // Day 1: Path Terima
  day1_path_terima: {
    id: 'day1_path_terima',
    speakerId: 'bimo',
    expression: 'normal',
    text: 'Wih mantappp Cheryl! Emang penyelamat deh lo, emang paling gercep di OSIS! Nanti kalo udah kelar, submit di drive terus tag gue ya. Thx a lot ya Cheryl bestie!',
    nextId: 'day1_path_terima_sarah',
  },
  day1_path_terima_sarah: {
    id: 'day1_path_terima_sarah',
    speakerId: 'sarah',
    expression: 'normal',
    text: 'Nah gitu dong Cheryl. Kerja kerasmu pasti dipandang kok nanti di LPJ akhir jabatan. Semangat ya, jangan lupa resolusinya harus HD biar ga pecah gambarnya.',
    nextId: 'day1_desk_prepare',
  },

  // Day 1: Path Kompromi
  day1_path_kompromi: {
    id: 'day1_path_kompromi',
    speakerId: 'roy',
    expression: 'normal',
    text: 'Ok deh kalau gitu. Lebih baik daripada gak ada perkembangan sama sekali. Heh @Bimo besok pagi-pagi jam 6 lo harus udah bangun buat isi teks poster yang udah dibikin kasarnya sama Cheryl ya! Jangan tidur mulu!',
    nextId: 'day1_path_kompromi_bimo',
  },
  day1_path_kompromi_bimo: {
    id: 'day1_path_kompromi_bimo',
    speakerId: 'bimo',
    expression: 'sedih',
    text: 'Duh iya-iya, ntar jam 6 subuh gue paksain melek deh. Thx ya Cheryl bantuannya.',
    nextId: 'day1_desk_prepare',
  },

  day1_desk_prepare: {
    id: 'day1_desk_prepare',
    speakerId: 'narator',
    text: 'Di akhir perdebatan digital yang melelahkan ini, Cheryl kini terduduk lesu di depan meja belajarnya. Bantulah Cheryl menyelesaikan tugas "Desain Poster" serta menjaga kondisi mentalnya agar bisa segera beristirahat.',
    nextId: 'GOTO_DESK', // Special keyword to redirect to interactive play area
  },

  // === DAY 2 ===
  day2_intro: {
    id: 'day2_intro',
    speakerId: 'narator',
    text: 'Keesokan harinya pukul 15:30 WIB. Setelah melewati kuis matematika dengan kepala berdenyut, Cheryl dipaksa berkumpul di kelas XI-B untuk rapat koordinasi offline yang dipimpin oleh Kak Roy...',
    nextId: 'day2_roy1',
  },
  day2_roy1: {
    id: 'day2_roy1',
    speakerId: 'roy',
    expression: 'sombong',
    text: 'Langsung aja ya. Cheryl, poster yang lo sebar tadi pagi mana? Kita semua lagi liatin nih. Jujur yah, gue agak kecewa sama hasilnya. Desainnya polos banget kayak mading SD. Kurang greget dan gak ada nuansa mewah!',
    nextId: 'day2_sarah1',
  },
  day2_sarah1: {
    id: 'day2_sarah1',
    speakerId: 'sarah',
    expression: 'sombong',
    text: 'Iya Cheryl, liat deh pembuatannya. Pemilihan warnanya pucat banget lho, kusam. Terus font sizenya kenapa sekecil ini? Kemarin kan aku minta nuansanya neon futuristik estetik gitu ya. Kok jadinya monoton hambar gini?',
    nextId: 'day2_cheryl_pikir',
  },
  day2_cheryl_pikir: {
    id: 'day2_cheryl_pikir',
    speakerId: 'cheryl',
    expression: 'sedih',
    text: '(Padahal poster itu aku yang cicil hampir semalaman suntuk sendirian, sementara Bimo yang dibilang mau ikutan ngedit malah asyik mabar game dari subuh... Mengapa mereka langsung memojokkanku di depan publik?)',
    choices: [
      {
        text: 'Meminta maaf dengan pasrah: "Maaf Kak Roy, Sarah, kemarin aku emang ngantuk banget. Nanti aku buat ulang dari nol lagi aja..."',
        nextId: 'day2_path_pasrah',
        mhpChange: -25,
        taskChange: 5,
        feedbackText: 'Kamu menyerap kritikan tanpa pelindung ego, membiarkan rasa tidak percaya diri menguasai emosimu.',
        educationalTip: 'Menyalahkan diri sepenuhnya tanpa filtrasi objektif adalah kebiasaan "negative self-talk" yang mempercepat timbulnya cemas dan depresi klinis.',
      },
      {
        text: 'Menjelaskan data objektif dengan asertif: "Desain ini menggunakan palet minimalis agar teks mudah dibaca kelas X-XII. Untuk nuansa neon, saya butuh brief materi dari Sarah terkait warna tema resmi."',
        nextId: 'day2_path_asertif',
        mhpChange: 10,
        taskChange: 15,
        feedbackText: 'Kamu merespon kritik subjektif dengan data logis dan memperjelas hak pembagian kerja.',
        educationalTip: 'Kritikan beracun seringkali bersifat tidak terarah dan menyerang personal. Membawa kembali ke batasan profesional (data & deskripsi kerja) menyaring energi toksiknya.',
      },
      {
        text: 'Membongkar peran Bimo: "Kak, sebenarnya kemarin poster ini aku yang bikin hampir 100% sendirian karena Bimo tidur dan gak masukin teks tepat waktu sesuai janji."',
        nextId: 'day2_path_bongkar',
        mhpChange: 0,
        taskChange: 10,
        feedbackText: 'Kamu membuka fakta sesungguhnya di hadapan rapat tim.',
        educationalTip: 'Berani menyuarakan ketidakadilan kerja kelompok adalah langkah berani agar rekan kerja parasit tidak selamanya menumpang hasil di atas peluh keringatmu.',
      },
    ],
  },

  // Day 2: Path Pasrah
  day2_path_pasrah: {
    id: 'day2_path_pasrah',
    speakerId: 'roy',
    expression: 'normal',
    text: 'Nah gitu dong, berani tanggung jawab. Jangan baperan ya Cheryl, kita kan evaluasi ini biar event kita rame. Pokoknya besok sore harus ada 3 opsi alternatif desain baru di meja gue ya. Tanpa alasan!',
    nextId: 'day2_alika_support1',
  },

  // Day 2: Path Asertif
  day2_path_asertif: {
    id: 'day2_path_asertif',
    speakerId: 'sarah',
    expression: 'marah',
    text: 'Lho, kok malah jadi nuntut balik aku sih? Kan lo desainer OSIS-nya, harusnya udah tahu dong selera anak SMA jaman sekarang tanpa harus didekte satu-satu! Masa minta dibimbing terus?',
    nextId: 'day2_asertif_alika',
  },
  day2_asertif_alika: {
    id: 'day2_asertif_alika',
    speakerId: 'alika',
    expression: 'khawatir',
    text: 'Izin memberi saran Kak Roy, Sarah... Sebenarnya poster Cheryl sudah oke kok keterbacaannya, informasinya terlihat dari jauh. Mungkin tinggal kita poles sedikit saja bagian logonya tanpa perlu Cheryl buat ulang dari nol.',
    nextId: 'day2_asertif_roy',
  },
  day2_asertif_roy: {
    id: 'day2_asertif_roy',
    speakerId: 'roy',
    expression: 'normal',
    text: 'Hm... bener juga sih Alika. Ya udah, Cheryl poles pelan-pelan ajalah. Yang penting jangan monoton. Selipkan ide-ide modern di sela-sela kesibukan OSIS kamu.',
    nextId: 'day2_alika_support1',
  },

  // Day 2: Path Bongkar
  day2_path_bongkar: {
    id: 'day2_path_bongkar',
    speakerId: 'bimo',
    expression: 'marah',
    text: 'Wah Cheryl, kok lo nusuk gue dari belakang sih di depan rapat? Kan semalam gue udah bilang lagi sibuk les intensif ujian! Masa hal sepele gini aja diungkit-ungkit kayak anak kecil lapor guru?',
    nextId: 'day2_bongkar_sarah',
  },
  day2_bongkar_sarah: {
    id: 'day2_bongkar_sarah',
    speakerId: 'sarah',
    expression: 'sombong',
    text: 'Aduh, internal tim kalian jangan didebatin di sini dong, bikin pusing kepala aja deh. Intinya kita cuma tau hasil jadinya bersih, profesional, as-soon-as possible!',
    nextId: 'day2_alika_support1',
  },

  day2_alika_support1: {
    id: 'day2_alika_support1',
    speakerId: 'alika',
    expression: 'normal',
    text: 'Setelah rapat ditutup dengan dingin, Alika menarik Cheryl ke sudut lorong kelas XI yang sepi, kemudian merangkul bahu Cheryl dengan hangat...',
    nextId: 'day2_alika_bicara',
  },
  day2_alika_bicara: {
    id: 'day2_alika_bicara',
    speakerId: 'alika',
    expression: 'normal',
    text: 'Cheryl... aku tahu banget kok usaha kamu semalam. Keren banget postermu itu sebenernya. Tolong jangan dengerin mulut beracun mereka sampai masuk ke relung hati ya. Malam ini, istirahatlah yang cukup, yuk kita cicil tugas OSIS bareng-bareng besok biar lebih enteng.',
    nextId: 'day2_desk_prepare',
  },
  day2_desk_prepare: {
    id: 'day2_desk_prepare',
    speakerId: 'narator',
    text: 'Sore harinya di rumah, setelah disingkirkan oleh rapat evaluasi yang menyudutkan, Cheryl kembali terduduk di meja belajarnya. Dengan dorongan semangat dari Alika, Cheryl bersiap menuangkan emosinya ke dalam revisi dan melatih asertivitas dirinya.',
    nextId: 'GOTO_DESK',
  },

  // === DAY 3 ===
  day3_intro: {
    id: 'day3_intro',
    speakerId: 'narator',
    text: 'Dua hari menjelang festival utama. Tiba-tiba di pukul 22:15 WIB, kepanitiaan dilanda kepanikan dahsyat. Sarah mengunggah foto tumpukan flyer promosi cetak yang salah format ukuran...',
    nextId: 'day3_sarah1',
  },
  day3_sarah1: {
    id: 'day3_sarah1',
    speakerId: 'sarah',
    expression: 'marah',
    text: 'Gila sih ini! Kerugian anggaran kas hampir 400 ribu rupiah karena salah format cetak! Kok bisa filenya gak di-double-check sih size marginnya? @Cheryl lo sengaja ya mau bikin event kita boncos hancur sebelum mulai?',
    nextId: 'day3_roy1',
  },
  day3_roy1: {
    id: 'day3_roy1',
    speakerId: 'roy',
    expression: 'marah',
    text: 'Parah banget Cheryl! Ini kesalahan fatal anak buah! Duit kas itu susah dicari tahu, kita harus muter cari dana talangan lagi sempit begini! Mau ditaruh mana muka OSIS kita di depan Kepala Sekolah nanti?',
    nextId: 'day3_cheryl_pikir',
  },
  day3_cheryl_pikir: {
    id: 'day3_cheryl_pikir',
    speakerId: 'cheryl',
    expression: 'khawatir',
    text: '(Hah?! Salah format cetak? Padahal di obrolan pribadi kemarin malam Sarah sendiri yang mengirim pesan suara mendesakku meng-export file ukuran portrait 3:4 bukan landscape 16:9 karena vendornya mendadak ganti mesin! Kenapa sekarang aku dituduh penyabotase?)',
    choices: [
      {
        text: 'Lawan balik dengan melampirkan bukti screenshot: "Kak Roy, Sarah, tolong dilihat dulu bukti screenshot chat ini. Kemarin malam Sarah sendiri yang instruksi ganti format ke portrait."',
        nextId: 'day3_path_bukti',
        mhpChange: 15,
        taskChange: 15,
        feedbackText: 'Menyajikan fakta kuat melumpuhkan upaya menyimpang gaslighting mereka kepadamu.',
        educationalTip: 'Menyimpan jejak digital secara rapi (screenshot, arsip chat) adalah instrumen perlindungan diri terbaik dari kambing hitam dalam kepemimpinan beracun.',
      },
      {
        text: 'Panik & Menangis: "Maaf banget Kak, aku gak teliti, aku bersedia ganti rugi pakai uang jajanku sebulan..."',
        nextId: 'day3_path_korban',
        mhpChange: -30,
        taskChange: 5,
        feedbackText: 'Kamu rela menjadi tumbal keuangan akibat manipulasi status sosial demi terbebas dari jeratan kemarahan.',
        educationalTip: 'Menawarkan ganti rugi instan untuk kesalahan sistemik yang dipaksakan orang lain hanya akan memelihara siklus predator di dalam ekosistem humas toxic.',
      },
      {
        text: 'Alihkan fokus ke solusi: "Masalah salah format sudah terlanjur basah. Solusinya, aku bisa ubah layout agar muat dicetak ulang separuh harga malam ini, laporannya mari kita diskusikan esok pagi secara kepala dingin."',
        nextId: 'day3_path_solutif',
        mhpChange: 5,
        taskChange: 20,
        feedbackText: 'Kamu menutup pintu drama kepanikan dengan menghadirkan solusi konkret yang berkelas.',
        educationalTip: 'Tindakan beralih ke orientasi pemecahan masalah (Problem-solving focus) dapat mereduksi tingkat kecemasan diri sendiri sekaligus membungkam tuduhan provokatif lawan bicara.',
      },
    ],
  },

  // Day 3: Path Bukti
  day3_path_bukti: {
    id: 'day3_path_bukti',
    speakerId: 'sarah',
    expression: 'sedih',
    text: 'Eh... aduh... apa iya ya akù kirim begitu? Duh... mungkin aku khilaf pas ngantuk, sorry ya cheryl. Tapi ya harusnya kan lo sebagai penanggung jawab materi tetep bisa ngingetin aku yang lagi pusing mondar-mandir ngurusin perizinan birokrasi!',
    nextId: 'day3_roy_adem',
  },
  day3_roy_adem: {
    id: 'day3_roy_adem',
    speakerId: 'roy',
    expression: 'normal',
    text: 'Ehem... Oh ternyata Sarah salah koordinasi ya. Ya sudah, stop tunjuk-tunjukan jari tidak guna. Cheryl, revisi cepat sesuai standar baru supaya besok pagi langsung naik cetak ke vendor lokal.',
    nextId: 'day3_alika_support',
  },

  // Day 3: Path Korban
  day3_path_korban: {
    id: 'day3_path_korban',
    speakerId: 'sarah',
    expression: 'normal',
    text: 'Oke, makasih ya Cheryl atas komitmennya buat ganti kas. Berarti uang kas aman ya. Tolong transfer uangnya besok sebelum apel pagi, sekalian file PDF perbaikan harus beres.',
    nextId: 'day3_alika_marah',
  },
  day3_alika_marah: {
    id: 'day3_alika_marah',
    speakerId: 'alika',
    expression: 'marah',
    text: 'Maaf Kak, jangan seenak itu dong membungkam adek kelas! Ini salah paham instruksi yang tidak singkron, tidak boleh serta-merta melimpahkan ganti rugi pribadi ke pundak Cheryl sendirian! Mari kita patungan pakai kas divisi lain!',
    nextId: 'day3_shutup_bimo',
  },
  day3_shutup_bimo: {
    id: 'day3_shutup_bimo',
    speakerId: 'bimo',
    expression: 'normal',
    text: 'Udah sstt, Alika jangan bikin ribut grup malem-malem deh. Intinya yang penting kelar damai kan.',
    nextId: 'day3_alika_support',
  },

  // Day 3: Path Solutif
  day3_path_solutif: {
    id: 'day3_path_solutif',
    speakerId: 'roy',
    expression: 'normal',
    text: 'Nah ini baru bener, solutif langsung ke aksi nyata. Cheryl, tolong buatkan format alternatif mini-flyer itu malam ini juga biar bisa hemat setengah pengeluaran kertas sekolah.',
    nextId: 'day3_alika_support',
  },

  day3_alika_support: {
    id: 'day3_alika_support',
    speakerId: 'alika',
    expression: 'normal',
    text: 'Waktu terus bergulir, menyisakan sepi malam yang dingin. Dada Cheryl bergemuruh menahan luapan emosi campur aduk. Namun, Cheryl tahu esok adalah hari penentu segalanya. Mari dampingi Cheryl melewati pengerjaan tugas krusial malam ini.',
    nextId: 'GOTO_DESK',
  },

  // === DAY 4 ===
  day4_intro: {
    id: 'day4_intro',
    speakerId: 'narator',
    text: 'Hari H Event Festival Pensi telah tiba di Aula Utama SMA Garuda! Musik menggelegar riuh rendah, dekorasi megah berkilauan, dan ratusan penonton bersorak bahagia menikmati pentas panggung.',
    nextId: 'day4_roy_pidato',
  },
  day4_roy_pidato: {
    id: 'day4_roy_pidato',
    speakerId: 'roy',
    expression: 'sombong',
    text: 'Terima kasih Bapak-Ibu guru dan seluruh rekan siswa! Kesuksesan dahsyat event ini adalah buah perjuangan kepemimpinan saya yang gigih, rapat lembur tanpa henti, serta koordinasi tim inti yang super terorganisir!',
    nextId: 'day4_sarah_puji',
  },
  day4_sarah_puji: {
    id: 'day4_sarah_puji',
    speakerId: 'sarah',
    expression: 'sombong',
    text: 'Sukses besar Kak Roy! Kita bener-bener panitia elit tanpa tanding nih di sekolah! Gila capek kita kebayar lunas!',
    nextId: 'day4_cheryl_pikir',
  },
  day4_cheryl_pikir: {
    id: 'day4_cheryl_pikir',
    speakerId: 'cheryl',
    expression: 'lelah',
    text: '(Mereka berdiri melambaikan tangan dengan bangga di depan panggung, menikmati gemuruh tepuk tangan... Sementara aku duduk menyendiri di sudut gelap operator suara, memegang file laporan administrasi yang baru saja kuketik rapi sendirian... Apakah aku harus selamanya tinggal di lingkungan seperti ini?)',
    choices: [
      {
        text: 'Keputusan 1 - Beranikan Diri Keluar demi Kesehatan Mental: "Tugas panitiaku sudah selesai secara penuh. Laporan sudah saya upload di link drive. Dengan ini, saya Cheryl resmi mengundurkan diri dari kepengurusan OSIS secara baik-baik demi memprioritaskan kesehatan mental saya."',
        nextId: 'day4_path_keluar',
        mhpChange: 30,
        taskChange: 25,
        feedbackText: 'Sebuah keberanian luar biasa! Kamu memutus rantai ketergantungan manipulatif.',
        educationalTip: 'Menutup babak kehidupan yang beracun bukan tanda menyerah atau kegagalan, melainkan manifesto tertinggi atas rasa cinta pada dirimu sendiri.',
      },
      {
        text: 'Keputusan 2 - Tetap Bertahan (People Pleasing): "Selamat Kak atas kesuksesannya... Aku akan tetap lanjut di divisi ini demi kelancaran proyek evaluasi bulan depan..."',
        nextId: 'day4_path_bertahan',
        mhpChange: -30,
        taskChange: 25,
        feedbackText: 'Kamu memilih menekan luka batinmu demi menjaga formalitas persahabatan semu.',
        educationalTip: 'Terus bertahan di tempat yang merusak jiwa karena rasa sungkan atau takut dihakimi dapat berujung pada akumulasi trauma kronis (Burnout berkepanjangan).',
      },
    ],
  },

  // Day 4: Path Keluar
  day4_path_keluar: {
    id: 'day4_path_keluar',
    speakerId: 'roy',
    expression: 'marah',
    text: 'Lho... loh... kok tiba-tiba keluar? Cheryl, ga profesional banget lo resign di puncak acara begini! Kurang bersyukur banget lo, padahal nama lo bakal nampang di sertifikat prestasi OSIS lho!',
    nextId: 'day4_keluar_alika',
  },
  day4_keluar_alika: {
    id: 'day4_keluar_alika',
    speakerId: 'alika',
    expression: 'senang',
    text: 'Aku bangga banget sama keberanian kamu, Cheryl! Aku juga mau pamit bersamamu dari grup ini. Mari kita fokus belajar untuk masa depan kita yang damai tanpa intimidasi.',
    nextId: 'day4_keluar_narasi',
  },
  day4_keluar_narasi: {
    id: 'day4_keluar_narasi',
    speakerId: 'narator',
    text: 'Meninggalkan grup chat beracun itu terasa bagai melepaskan beban besi berton-ton dari pundakmu. Cheryl menggandeng tangan Alika, berjalan keluar dari aula sekolah menuju sinar senja yang hangat, senyuman lebar akhirnya terpancar tulus di wajahnya.',
    nextId: 'GOTO_ENDING_GOOD', // Redirect to victory screen
  },

  // Day 4: Path Bertahan
  day4_path_bertahan: {
    id: 'day4_path_bertahan',
    speakerId: 'roy',
    expression: 'sombong',
    text: 'Bagus Cheryl, emang anak buah penurut andalan gue. Beresin ya sampah-sampah di aula itu sama Bimo sekarang, terus nanti malam kita rapat lagi jam 10 buat nyusun LPJ pendanaan.',
    nextId: 'day4_bertahan_narasi',
  },
  day4_bertahan_narasi: {
    id: 'day4_bertahan_narasi',
    speakerId: 'narator',
    text: 'Tidakk... Rantai penderitaan ini tidak pernah putus. Cheryl berjalan gontai memunguti sampah botol air di tengah gemerlap lampu malam, merasa jiwanya kosong melompong...',
    nextId: 'CHECK_FINAL_MHP', // Will decide good or bad ending based on final MHP score
  },
};
