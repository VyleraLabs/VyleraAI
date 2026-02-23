const fs = require('fs');

const data = {
    en: {
        Pipeline: {
            title: 'The Vylera Translation Engine',
            subtitle: 'Select a hardware input to visualize the transformation from "Dumb Data" to "Sentient Action."',
            cameraLabel: 'Legacy Door Cam',
            cameraOutput: 'Smart Lock',
            cameraLog: '> PROACTIVE ACTION: UNLOCKING (DETECTED DISPLEASURE)',
            cameraDesc: 'Visual Sentiment Analysis',
            thermoLabel: 'Tuya Thermostat',
            thermoOutput: 'Climate Control',
            thermoLog: '> ADJUSTING: OPTIMIZING FOR COMFORT (DETECTED CHILL)',
            thermoDesc: 'Thermal Preference Vector',
            switchLabel: 'Generic Switch',
            switchOutput: 'Ambient Logic',
            switchLog: '> SCENE SET: EVENING RELAXATION MODE',
            switchDesc: 'Contextual Lighting Graph',
            actionExecuted: 'ACTION EXECUTED',
            awaitingLogic: 'AWAITING LOGIC',
            kernelLog: 'VYLERA_KERNEL.log',
            ingesting: '> INGESTING_TELEMETRY_STREAM...',
            vectorizing: '> VECTORIZING_SENTIMENT_NODES...'
        },
        Architecture: {
            subtitle: 'System Architecture',
            title: 'The Edge-to-Core Pipeline',
            node1Title: 'Sensors',
            node1Desc: 'Zigbee / Matter',
            node2Title: 'Vylera AI',
            node2Desc: 'Local Ingestion',
            node3Title: 'Vertex AI',
            node3Desc: 'Inference Core',
            feature1Title: 'Local Vectorization',
            feature1Desc: '0.0ms Latency. Visual and audio data formats are converted to tensors instantly on the local gateway, isolating raw data from the external network.',
            feature2Title: 'Vertex AI Inference',
            feature2Desc: 'Leveraging distributed compute units, high-level intent is extracted from anonymized vector streams, allowing Vylera to "understand" context without "seeing" the home.',
            outcomeLabel: 'Outcome',
            outcomeQuote: '"Ad-Free Ambient Response via YouTube Premium Integration for seamless auditory environments."'
        },
        SystemHealth: {
            subtitle: 'System Architecture',
            title: 'The Vylera Neural Mesh',
            node1Title: 'THE EDGE',
            node1Badge: 'Indonesian Home',
            node1Desc: 'Vylera AI + Matter/Tuya Device Mesh.',
            node2Title: 'THE TRANSPORT',
            node2Badge: 'Meti Cloud',
            node2Desc: 'High-velocity data streaming + Sanctuary Protocol (Local Vectorization).',
            node3Title: 'THE BRAIN',
            node3Badge: 'GCP Jakarta Region',
            node3Desc: 'Vertex AI + Gemini 3 Pro + Memory Bank.',
            node3Loc: 'asia-southeast2 Local Residency',
            node3Tooltip: 'Gemini 3 Deep Reasoning Active.',
            footerQuote: '"Our architecture utilizes <strong>Asynchronous Memory Fact Extraction</strong>. Vylera doesn\'t just process data; it builds a persistent cultural profile for every inhabitant, ensuring 100% \'Unggah-ungguh\' compliance."'
        }
    },
    ru: {
        Pipeline: {
            title: 'Механизм перевода Vylera',
            subtitle: 'Выберите аппаратный вход, чтобы визуализировать преобразование от «глупых данных» к «разумному действию».',
            cameraLabel: 'Устаревшая дверная камера',
            cameraOutput: 'Умный замок',
            cameraLog: '> ПРОАКТИВНОЕ ДЕЙСТВИЕ: РАЗБЛОКИРОВКА (ОБНАРУЖЕНО НЕДОВОЛЬСТВО)',
            cameraDesc: 'Визуальный анализ настроений',
            thermoLabel: 'Термостат Tuya',
            thermoOutput: 'Климат-контроль',
            thermoLog: '> НАСТРОЙКА: ОПТИМИЗАЦИЯ ДЛЯ КОМФОРТА (ОБНАРУЖЕН ХОЛОДОК)',
            thermoDesc: 'Вектор тепловых предпочтений',
            switchLabel: 'Обычный выключатель',
            switchOutput: 'Окружающая логика',
            switchLog: '> УСТАНОВКА СЦЕНЫ: РЕЖИМ ВЕЧЕРНЕГО РАССЛАБЛЕНИЯ',
            switchDesc: 'Контекстный график освещения',
            actionExecuted: 'ДЕЙСТВИЕ ВЫПОЛНЕНО',
            awaitingLogic: 'ОЖИДАНИЕ ЛОГИКИ',
            kernelLog: 'VYLERA_KERNEL.log',
            ingesting: '> ПОГЛОЩЕНИЕ_ПОТОКА_ТЕЛЕМЕТРИИ...',
            vectorizing: '> ВЕКТОРИЗАЦИЯ_УЗЛОВ_НАСТРОЕНИЯ...'
        },
        Architecture: {
            subtitle: 'Системная архитектура',
            title: 'Конвейер от края до ядра',
            node1Title: 'Датчики',
            node1Desc: 'Zigbee / Matter',
            node2Title: 'Vylera AI',
            node2Desc: 'Локальный сбор',
            node3Title: 'Vertex AI',
            node3Desc: 'Ядро вывода',
            feature1Title: 'Локальная векторизация',
            feature1Desc: 'Задержка 0.0 мс. Визуальные и аудио форматы мгновенно преобразуются в тензоры на локальном шлюзе, изолируя сырые данные от внешней сети.',
            feature2Title: 'Вывод Vertex AI',
            feature2Desc: 'Используя распределенные вычислительные модули, высокоуровневые намерения извлекаются из анонимных потоков векторов, позволяя Vylera «понимать» контекст, не «видя» дом.',
            outcomeLabel: 'Результат',
            outcomeQuote: '"Атмосферный ответ без рекламы через интеграцию с YouTube Premium для создания безупречной звуковой среды."'
        },
        SystemHealth: {
            subtitle: 'Системная архитектура',
            title: 'Нейронная сеть Vylera',
            node1Title: 'НА КРАЮ (EDGE)',
            node1Badge: 'Дом в Индонезии',
            node1Desc: 'сеть устройств Vylera AI + Matter/Tuya.',
            node2Title: 'ТРАНСПОРТ',
            node2Badge: 'Облако Meti',
            node2Desc: 'Высокоскоростная потоковая передача данных + протокол убежища (локальная векторизация).',
            node3Title: 'МОЗГ',
            node3Badge: 'Регион GCP Джакарта',
            node3Desc: 'Vertex AI + Gemini 3 Pro + Банк памяти.',
            node3Loc: 'Локальное размещение asia-southeast2',
            node3Tooltip: 'Активно глубокое мышление Gemini 3.',
            footerQuote: '"Наша архитектура использует <strong>асинхронное извлечение фактов из памяти</strong>. Vylera не просто обрабатывает данные; она выстраивает постоянный профиль для каждого жителя, обеспечивая 100% соответствие."'
        }
    },
    id: {
        Pipeline: {
            title: 'Mesin Terjemahan Vylera',
            subtitle: 'Pilih input perangkat keras untuk memvisualisasikan transformasi dari "Data Bisu" ke "Tindakan Cerdas".',
            cameraLabel: 'Kamera Pintu Lama',
            cameraOutput: 'Kunci Pintar',
            cameraLog: '> TINDAKAN PROAKTIF: MEMBUKA KUNCI (MENDETEKSI KETIDAKSENANGAN)',
            cameraDesc: 'Analisis Sentimen Visual',
            thermoLabel: 'Termostat Tuya',
            thermoOutput: 'Kontrol Iklim',
            thermoLog: '> MENYESUAIKAN: MENGOPTIMALKAN UNTUK KENYAMANAN (MENDETEKSI DINGIN)',
            thermoDesc: 'Vektor Preferensi Termal',
            switchLabel: 'Sakelar Biasa',
            switchOutput: 'Logika Ambien',
            switchLog: '> PENGATURAN ADEGAN: MODE SANTAI SORE',
            switchDesc: 'Grafik Pencahayaan Kontekstual',
            actionExecuted: 'TINDAKAN DIEKSEKUSI',
            awaitingLogic: 'MENUNGGU LOGIKA',
            kernelLog: 'VYLERA_KERNEL.log',
            ingesting: '> MENGINGESTI_ALIRAN_TELEMETRI...',
            vectorizing: '> MEMVEKTORISASI_SIMPUL_SENTIMEN...'
        },
        Architecture: {
            subtitle: 'Arsitektur Sistem',
            title: 'Pipa Dari Tepi ke Inti',
            node1Title: 'Sensor',
            node1Desc: 'Zigbee / Matter',
            node2Title: 'Vylera AI',
            node2Desc: 'Ingesti Lokal',
            node3Title: 'Vertex AI',
            node3Desc: 'Inti Inferensi',
            feature1Title: 'Vektorisasi Lokal',
            feature1Desc: 'Latensi 0.0ms. Format data visual dan audio dikonversi menjadi tensor secara instan pada gateway lokal, mengisolasi data mentah dari jaringan eksternal.',
            feature2Title: 'Inferensi Vertex AI',
            feature2Desc: 'Memanfaatkan unit komputasi terdistribusi, niat tingkat tinggi diekstraksi dari aliran vektor yang dianonimkan, memungkinkan Vylera untuk "memahami" konteks tanpa "melihat" ke dalam rumah.',
            outcomeLabel: 'Hasil',
            outcomeQuote: '"Respons Ambien Bebas Iklan melalui Integrasi YouTube Premium untuk lingkungan pendengaran yang mulus."'
        },
        SystemHealth: {
            subtitle: 'Arsitektur Sistem',
            title: 'Jaring Neural Vylera',
            node1Title: 'SUDUT (EDGE)',
            node1Badge: 'Rumah Indonesia',
            node1Desc: 'Jaring Perangkat Vylera AI + Matter/Tuya.',
            node2Title: 'TRANSPORTASI',
            node2Badge: 'Awan Meti',
            node2Desc: 'Streaming data kecepatan tinggi + Protokol Tempat Tenteram (Vektorisasi Lokal).',
            node3Title: 'OTAK',
            node3Badge: 'Wilayah GCP Jakarta',
            node3Desc: 'Vertex AI + Gemini 3 Pro + Bank Memori.',
            node3Loc: 'Residensi Lokal asia-southeast2',
            node3Tooltip: 'Penalaran Mendalam Gemini 3 Aktif.',
            footerQuote: '"Arsitektur kami memanfaatkan <strong>Mengekstrak Fakta Memori Asinkron</strong>. Vylera tidak hanya memproses data; ia membangun profil budaya persisten untuk setiap penghuni, memastikan kepatuhan 100% \'Unggah-ungguh\'."'
        }
    },
    ja: {
        Pipeline: {
            title: 'Vylera翻訳エンジン',
            subtitle: 'ハードウェア入力を選択して、「ダムデータ」から「センティエント・アクション」への変換を視覚化します。',
            cameraLabel: 'レガシードアカメラ',
            cameraOutput: 'スマートロック',
            cameraLog: '> プロアクティブアクション：ロック解除（不快感を検出）',
            cameraDesc: '視覚的センチメント分析',
            thermoLabel: 'Tuyaサーモスタット',
            thermoOutput: '気候制御',
            thermoLog: '> 調整：快適さのために最適化（寒さを検出）',
            thermoDesc: '熱的嗜好ベクトル',
            switchLabel: '汎用スイッチ',
            switchOutput: 'アンビエントロジック',
            switchLog: '> シーン設定：夜のリラックスモード',
            switchDesc: 'コンテキスト照明グラフ',
            actionExecuted: 'アクション実行',
            awaitingLogic: '論理を待機中',
            kernelLog: 'VYLERA_KERNEL.log',
            ingesting: '> テレメトリストリームをインジェスト中...',
            vectorizing: '> センチメントノードをベクトル化中...'
        },
        Architecture: {
            subtitle: 'システムアーキテクチャ',
            title: 'エッジからコアへのパイプライン',
            node1Title: 'センサー',
            node1Desc: 'Zigbee / Matter',
            node2Title: 'Vylera AI',
            node2Desc: 'ローカルインジェスチョン',
            node3Title: 'Vertex AI',
            node3Desc: '推論コア',
            feature1Title: 'ローカルベクトル化',
            feature1Desc: '0.0msのレイテンシ。視覚および音声データ形式はローカルゲートウェイで瞬時にテンソルに変換され、外部ネットワークから生データを隔離します。',
            feature2Title: 'Vertex AI 推論',
            feature2Desc: '分散型計算ユニットを活用して、匿名化されたベクトルストリームから高レベルの意図が抽出され、Vyleraが家庭を「見る」ことなく文脈を「理解」できるようになります。',
            outcomeLabel: '結果',
            outcomeQuote: '「シームレスな聴覚環境のためのYouTubePremium統合を介した広告なしのアンビエントレスポンス。」'
        },
        SystemHealth: {
            subtitle: 'システムアーキテクチャ',
            title: 'Vyleraニューラルメッシュ',
            node1Title: 'エッジ',
            node1Badge: 'インドネシアの家',
            node1Desc: 'Vylera AI + Matter/Tuyaデバイスメッシュ。',
            node2Title: 'トランスポート',
            node2Badge: 'Meti クラウド',
            node2Desc: '高速データストリーミング + サンクチュアリプロトコル（ローカルベクトル化）。',
            node3Title: 'ブレイン',
            node3Badge: 'GCPジャカルタリージョン',
            node3Desc: 'Vertex AI + Gemini 3 Pro + メモリバンク。',
            node3Loc: 'asia-southeast2 ローカルレジデンシー',
            node3Tooltip: 'Gemini 3 ディープリーズニングアクティブ。',
            footerQuote: '「当社のアーキテクチャは<strong>非同期メモリファクト抽出</strong>を活用しています。Vyleraは単にデータを処理するのではなく、すべての居住者の持続的な文化的プロファイルを構築し、100％のコンプライアンスを保証します。」'
        }
    }
};

for (const lang of ["en", "ru", "id", "ja"]) {
    const path = `messages/${lang}.json`;
    const dict = JSON.parse(fs.readFileSync(path, 'utf8'));
    dict.Pipeline = data[lang].Pipeline;
    dict.Architecture = data[lang].Architecture;
    dict.SystemHealth = data[lang].SystemHealth;
    fs.writeFileSync(path, JSON.stringify(dict, null, 2));
}
