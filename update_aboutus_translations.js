const fs = require('fs');

const data = {
    en: {
        AboutNarrative: {
            badge: 'Proud Member of Google for Startups',
            title: 'Bridging the fragmented <br class="hidden md:block" /> systems of tomorrow.',
            desc: 'We are a dedicated team of engineers, architects, and designers with a quiet ambition: to build software that simply works better together. Backed by the infrastructure and mentorship of the Google for Startups program, Vylera Labs is deeply focused on practical, high-impact AI developments. We don\'t believe in hype; we believe in unified architecture.',
            sec1Badge: 'Sector 01: Enterprise',
            sec1Title: 'The VyleraSuite.',
            sec1Desc: 'Corporate infrastructure is often paralyzed by fragmented, disconnected tools. We are building the VyleraSuite to act as a unified, intelligent bridge. By bringing CRM, HRIS, and Data Warehousing under one neural roof, we allow businesses to stop managing software and start leveraging intelligence.',
            sec2Badge: 'Sector 02: Residential',
            sec2Title: 'Secure IoT Ecosystems.',
            sec2Desc: 'The modern smart home is a mosaic of vulnerable, fragmented devices. We are deploying military-grade security architectures to the residential sector. Our goal is to unify environmental orchestration while ensuring absolute data sovereignty and protection for the individuals living within it.',
            downloadTitle: 'Discover Our Full Capabilities',
            downloadButton: 'Download Company Profile'
        },
        TeamSection: {
            title: 'The Architects of <span class="italic text-cyan/80">Vylera.</span>',
            roleFounder: 'Founder & CEO',
            bioFounder: 'Former Security Analyst specializing in high-stakes penetration testing (Denuvo) and industrial Oracle architectures. Architecting the secure, sovereign neural fabric of Vylera.',
            roleCTO: 'Co-Founder & CTO',
            bioCTO: 'Senior Systems Engineer with a background in SAP/ABAP architecture. Previously optimized mission-critical logistic networks for UNICEF. Building Vylera\'s reliable edge infrastructure.',
            roleCFO: 'CFO',
            bioCFO: 'A veteran of the Southeast Asian e-commerce ecosystem with high-growth leadership at JD.ID, Lazada, and Bluebird Group. Sandy architects Vylera’s financial infrastructure and capital strategy, ensuring our technical vision is grounded in robust fiscal discipline.',
            roleCOO: 'COO and Lead Hardware Engineer',
            bioCOO: 'A specialist in embedded systems and hardware-software interoperability. Kristiyan leads the development of Vylera\'s physical layer, engineering custom IoT gateways and sensor arrays that bridge the digital Sovereign OS with the physical world at the edge.'
        }
    },
    ru: {
        AboutNarrative: {
            badge: 'Гордый участник программы Google for Startups',
            title: 'Объединяя фрагментированные <br class="hidden md:block" /> системы завтрашнего дня.',
            desc: 'Мы — преданная команда инженеров, архитекторов и дизайнеров со спокойной амбицией: создавать программное обеспечение, которое просто работает лучше вместе. При поддержке инфраструктуры и наставничества программы Google for Startups, Vylera Labs глубоко сфокусирована на практических, высокоэффективных разработках в области ИИ. Мы не верим в хайп; мы верим в унифицированную архитектуру.',
            sec1Badge: 'Сектор 01: Корпоративный',
            sec1Title: 'Платформа VyleraSuite.',
            sec1Desc: 'Корпоративная инфраструктура часто парализована фрагментированными, разобщенными инструментами. Мы создаем VyleraSuite, чтобы служить единым интеллектуальным мостом. Объединяя CRM, HRIS и хранилища данных под одной нейронной крышей, мы позволяем предприятиям перестать управлять программным обеспечением и начать использовать интеллект.',
            sec2Badge: 'Сектор 02: Жилой',
            sec2Title: 'Безопасные IoT-экосистемы.',
            sec2Desc: 'Современный умный дом — это мозаика уязвимых, фрагментированных устройств. Мы внедряем архитектуры безопасности военного уровня в жилой сектор. Наша цель — унифицировать управление средой, обеспечивая абсолютный суверенитет данных и защиту людей, живущих в ней.',
            downloadTitle: 'Откройте для себя наши полные возможности',
            downloadButton: 'Скачать профиль компании'
        },
        TeamSection: {
            title: 'Архитекторы <span class="italic text-cyan/80">Vylera.</span>',
            roleFounder: 'Основатель и генеральный директор',
            bioFounder: 'Бывший аналитик по безопасности, специализирующийся на высокорисковом тестировании на проникновение (Denuvo) и промышленных архитектурах Oracle. Создает безопасную, суверенную нейронную сеть Vylera.',
            roleCTO: 'Сооснователь и технический директор',
            bioCTO: 'Старший системный инженер с опытом работы в архитектуре SAP/ABAP. Ранее оптимизировал критически важные логистические сети для ЮНИСЕФ. Создает надежную периферийную инфраструктуру Vylera.',
            roleCFO: 'Финансовый директор',
            bioCFO: 'Ветеран экосистемы электронной коммерции Юго-Восточной Азии с опытом лидерства в быстрорастущих проектах в JD.ID, Lazada и Bluebird Group. Сэнди разрабатывает финансовую инфраструктуру и стратегию капитала Vylera, гарантируя, что наше техническое видение опирается на строгую финансовую дисциплину.',
            roleCOO: 'Операционный директор и ведущий инженер по аппаратному обеспечению',
            bioCOO: 'Специалист по встроенным системам и совместимости аппаратного и программного обеспечения. Кристиан руководит разработкой физического уровня Vylera, проектируя пользовательские IoT-шлюзы и массивы датчиков, которые соединяют цифровую суверенную ОС с физическим миром на периферии.'
        }
    },
    id: {
        AboutNarrative: {
            badge: 'Anggota Bangga dari Google for Startups',
            title: 'Menjembatani sistem-sistem <br class="hidden md:block" /> esok hari yang terfragmentasi.',
            desc: 'Kami adalah tim insinyur, arsitek, dan desainer yang berdedikasi dengan ambisi yang tenang: untuk membangun perangkat lunak yang hanya bekerja lebih baik bersama. Didukung oleh infrastruktur dan bimbingan dari program Google for Startups, Vylera Labs sangat fokus pada pengembangan AI praktis dan berdampak tinggi. Kami tidak percaya pada hype; kami percaya pada arsitektur terpadu.',
            sec1Badge: 'Sektor 01: Perusahaan',
            sec1Title: 'VyleraSuite.',
            sec1Desc: 'Infrastruktur perusahaan sering dilumpuhkan oleh alat yang terfragmentasi dan terputus. Kami sedang membangun VyleraSuite untuk bertindak sebagai jembatan yang terpadu dan cerdas. Dengan menyatukan CRM, HRIS, dan Gudang Data di bawah satu atap persarafan, kami memungkinkan bisnis untuk berhenti mengelola perangkat lunak dan mulai memanfaatkan kecerdasan.',
            sec2Badge: 'Sektor 02: Residensial',
            sec2Title: 'Ekosistem IoT yang Aman.',
            sec2Desc: 'Rumah pintar modern adalah mosaik perangkat yang rentan dan terfragmentasi. Kami menerapkan arsitektur keamanan tingkat militer ke sektor perumahan. Tujuan kami adalah menyatukan orkestrasi lingkungan sambil memastikan kedaulatan data mutlak dan perlindungan bagi individu yang tinggal di dalamnya.',
            downloadTitle: 'Temukan Kemampuan Penuh Kami',
            downloadButton: 'Unduh Profil Perusahaan'
        },
        TeamSection: {
            title: 'Para Arsitek dari <span class="italic text-cyan/80">Vylera.</span>',
            roleFounder: 'Pendiri & CEO',
            bioFounder: 'Mantan Analis Keamanan dengan spesialisasi dalam pengujian penetrasi tingkat tinggi (Denuvo) dan arsitektur industri Oracle. Merancang jalinan saraf yang aman dan berdaulat dari Vylera.',
            roleCTO: 'Rekan Pendiri & CTO',
            bioCTO: 'Insinyur Sistem Senior dengan latar belakang arsitektur SAP/ABAP. Sebelumnya mengoptimalkan jaringan logistik krusial untuk UNICEF. Membangun infrastruktur tepi Vylera yang dapat diandalkan.',
            roleCFO: 'CFO',
            bioCFO: 'Seorang veteran ekosistem e-commerce Asia Tenggara dengan kepemimpinan pertumbuhan tinggi di JD.ID, Lazada, dan Bluebird Group. Sandy merancang infrastruktur keuangan dan strategi modal Vylera, memastikan visi teknis kami didasarkan pada disiplin fiskal yang kuat.',
            roleCOO: 'COO dan Kepala Insinyur Perangkat Keras',
            bioCOO: 'Seorang spesialis dalam sistem tertanam dan interoperabilitas perangkat keras dan perangkat lunak. Kristiyan memimpin pengembangan lapisan fisik Vylera, merekayasa gateway IoT kustom dan array sensor yang menjembatani OS Berdaulat digital dengan dunia fisik di tepinya.'
        }
    },
    ja: {
        AboutNarrative: {
            badge: 'Google for Startupsの誇りあるメンバー',
            title: '断片化された<br class="hidden md:block" />明日のシステムを架け渡す。',
            desc: '私たちはエンジニア、アーキテクト、デザイナーの専任チームであり、シンプルに連携してうまく機能するソフトウェアを構築するという静かな野心を持っています。Google for Startupsプログラムのインフラストラクチャとメンターシップに支えられ、Vylera Labsは実用的でインパクトの大きいAI開発に深く焦点を当てています。私たちは誇大広告を信じません。統合されたアーキテクチャを信じています。',
            sec1Badge: 'セクター01：エンタープライズ',
            sec1Title: 'VyleraSuite。',
            sec1Desc: '企業のインフラストラクチャは、断片化され切断されたツールによって麻痺することがよくあります。私たちはVyleraSuiteを、統合されたインテリジェントな架け橋として機能するように構築しています。CRM、HRIS、およびデータウェアハウスを1つのニューラル・ルーフの下にまとめることで、企業はソフトウェアの管理をやめ、インテリジェンスの活用を開始できるようになります。',
            sec2Badge: 'セクター02：住宅',
            sec2Title: '安全なIoTエコシステム。',
            sec2Desc: '現代のスマートホームは、脆弱で断片化されたデバイスのモザイクです。私たちは、住宅部門に軍事グレードのセキュリティアーキテクチャを展開しています。私たちの目標は、環境のオーケストレーションを統合し、絶対的なデータの主権とそこに住む個人の保護を確保することです。',
            downloadTitle: 'フル機能をご覧ください',
            downloadButton: '会社概要をダウンロードする'
        },
        TeamSection: {
            title: '<span class="italic text-cyan/80">Vylera</span>のアーキテクトたち。',
            roleFounder: '創設者 兼 CEO',
            bioFounder: '重要な侵入テスト（Denuvo）と産業用Oracleアーキテクチャを専門とする元セキュリティアナリスト。Vyleraの安全で主権的なニューラルファブリックを設計します。',
            roleCTO: '共同創設者 兼 CTO',
            bioCTO: 'SAP/ABAPアーキテクチャのバックグラウンドを持つシニアシステムエンジニア。以前はUNICEFのミッションクリティカルなロジスティクスネットワークを最適化していました。Vyleraの信頼できるエッジインフラストラクチャを構築します。',
            roleCFO: 'CFO',
            bioCFO: '東南アジアのeコマースエコシステムのベテランであり、JD.ID、Lazada、およびBluebird Groupで高成長のリーダーシップを発揮しました。SandyはVyleraの財務インフラストラクチャと資本戦略を設計し、私たちの技術的ビジョンが強固な財政規律に基づいていることを保証します。',
            roleCOO: 'COO 兼 リードハードウェアエンジニア',
            bioCOO: '組み込みシステムとハードウェアとソフトウェアの相互運用性のスペシャリスト。KristiyanはVyleraの物理層の開発を主導し、エッジの物理世界とデジタルのソブリンOSを架け渡すカスタムIoTゲートウェイとセンサーアレイを設計します。'
        }
    }
};

for (const lang of ["en", "ru", "id", "ja"]) {
    const path = `messages/${lang}.json`;
    const dict = JSON.parse(fs.readFileSync(path, 'utf8'));
    dict.AboutNarrative = data[lang].AboutNarrative;
    dict.TeamSection = data[lang].TeamSection;
    fs.writeFileSync(path, JSON.stringify(dict, null, 2));
}
