const fs = require('fs');

const data = {
    en: {
        TechHero: {
            status: 'Status: Private Beta (v0.9) // Powered by Google Cloud',
            title: 'The Sovereign OS for Fragmented IoT.',
            description: 'Vylera unifies disparate hardware ecosystems (Tuya, Zigbee, Matter) into a single, intelligent Neural Core. Powered by Google Vertex AI.'
        },
        ProblemSolution: {
            title: 'WHY VYLERA?',
            problemTitle: 'The Problem',
            problemDesc: 'Smart home hardware is fragmented. Devices from different manufacturers (e.g., Tuya, Xiaomi) operate in isolated data silos, locking telemetry in foreign clouds.',
            solutionTitle: 'The Solution',
            solutionDesc: 'Vylera acts as the Universal Interoperability Bridge. We process device signals locally on the Edge, allowing mixed-brand hardware to function as a single, privacy-first organism—without external cloud dependencies.'
        },
        Features: {
            feature1Title: 'Proactive',
            feature1Desc: 'Anticipates needs via Privacy-First Observation. We process locally, ensuring your data never leaves the sanctuary.',
            feature2Title: 'Universal',
            feature2Desc: 'Hardware Agnostic (Tuya/Zigbee). We provide the Brain, connecting disparate devices into a single coherent organism.',
            feature3Title: 'Native Fluency',
            feature3Desc: 'Standard American English core with Hyper-Regional fine-tuning (e.g., Ammani, Jaksel). Conversational, not robotic.',
            techSpecs: 'Technical Specifications',
            spec1Label: 'Ingestion',
            spec1Value: 'Zigbee 3.0, Matter, MQTT, BLE Mesh',
            spec2Label: 'Intelligence',
            spec2Value: 'Google Vertex AI, Vision API, Sentiment Vectorization',
            spec3Label: 'Privacy',
            spec3Value: 'The Sanctuary Protocol (AES-256 Local Encryption)',
            spec4Label: 'Latency',
            spec4Value: 'Sub-100ms Proactive Triggering'
        }
    },
    ru: {
        TechHero: {
            status: 'Статус: Закрытая бета-версия (v0.9) // Работает на Google Cloud',
            title: 'Суверенная ОС для фрагментированного IoT.',
            description: 'Vylera объединяет разрозненные экосистемы оборудования (Tuya, Zigbee, Matter) в единое интеллектуальное нейронное ядро. Работает на Google Vertex AI.'
        },
        ProblemSolution: {
            title: 'ПОЧЕМУ VYLERA?',
            problemTitle: 'Проблема',
            problemDesc: 'Оборудование умного дома фрагментировано. Устройства от разных производителей (например, Tuya, Xiaomi) работают в изолированных хранилищах данных, блокируя телеметрию в зарубежных облаках.',
            solutionTitle: 'Решение',
            solutionDesc: 'Vylera выступает в роли универсального моста взаимодействия. Мы обрабатываем сигналы устройств локально на границе, позволяя оборудованию разных брендов функционировать как единый организм с приоритетом конфиденциальности — без зависимости от внешних облаков.'
        },
        Features: {
            feature1Title: 'Проактивность',
            feature1Desc: 'Предвосхищает потребности с помощью наблюдения с приоритетом конфиденциальности. Мы обрабатываем данные локально, гарантируя, что они никогда не покинут убежище.',
            feature2Title: 'Универсальность',
            feature2Desc: 'Независимость от оборудования (Tuya/Zigbee). Мы предоставляем Мозг, объединяющий разрозненные устройства в единый согласованный организм.',
            feature3Title: 'Естественная речь',
            feature3Desc: 'Ядро стандартного американского английского с гиперрегиональной настройкой (например, амманский, джаксель). Разговорная речь, не роботизированная.',
            techSpecs: 'Технические характеристики',
            spec1Label: 'Сбор данных',
            spec1Value: 'Zigbee 3.0, Matter, MQTT, BLE Mesh',
            spec2Label: 'Интеллект',
            spec2Value: 'Google Vertex AI, Vision API, Векторизация настроений',
            spec3Label: 'Конфиденциальность',
            spec3Value: 'Протокол убежища (локальное шифрование AES-256)',
            spec4Label: 'Задержка',
            spec4Value: 'Проактивное срабатывание до 100 мс'
        }
    },
    id: {
        TechHero: {
            status: 'Status: Private Beta (v0.9) // Didukung oleh Google Cloud',
            title: 'OS Berdaulat untuk IoT yang Terfragmentasi.',
            description: 'Vylera menyatukan ekosistem perangkat keras yang terpisah (Tuya, Zigbee, Matter) menjadi satu Inti Neural yang cerdas. Didukung oleh Google Vertex AI.'
        },
        ProblemSolution: {
            title: 'MENGAPA VYLERA?',
            problemTitle: 'Masalah',
            problemDesc: 'Perangkat keras rumah pintar terfragmentasi. Perangkat dari berbagai produsen (mis. Tuya, Xiaomi) beroperasi dalam silo data yang terisolasi, mengunci telemetri di cloud asing.',
            solutionTitle: 'Solusi',
            solutionDesc: 'Vylera bertindak sebagai Jembatan Interoperabilitas Universal. Kami memproses sinyal perangkat secara lokal di Edge, memungkinkan perangkat keras dari berbagai merek berfungsi sebagai satu organisme yang mengutamakan privasi—tanpa ketergantungan cloud eksternal.'
        },
        Features: {
            feature1Title: 'Proaktif',
            feature1Desc: 'Mengantisipasi kebutuhan melalui Pengamatan yang Mengutamakan Privasi. Kami memproses secara lokal, memastikan data Anda tidak pernah meninggalkan tempat aman.',
            feature2Title: 'Universal',
            feature2Desc: 'Agnostik Perangkat Keras (Tuya/Zigbee). Kami menyediakan Otak, menghubungkan perangkat yang berbeda menjadi satu organisme yang koheren.',
            feature3Title: 'Kefasihan Asli',
            feature3Desc: 'Inti Bahasa Inggris Amerika Standar dengan penyesuaian Hyper-Regional (misalnya, Ammani, Jaksel). Percakapan alami, bukan robot.',
            techSpecs: 'Spesifikasi Teknis',
            spec1Label: 'Ingesti',
            spec1Value: 'Zigbee 3.0, Matter, MQTT, BLE Mesh',
            spec2Label: 'Kecerdasan',
            spec2Value: 'Google Vertex AI, API Visi, Vektorisasi Sentimen',
            spec3Label: 'Privasi',
            spec3Value: 'Protokol Sanctuary (Enkripsi Lokal AES-256)',
            spec4Label: 'Latensi',
            spec4Value: 'Pemicu Proaktif Sub-100ms'
        }
    },
    ja: {
        TechHero: {
            status: 'ステータス: プライベートベータ (v0.9) // Powered by Google Cloud',
            title: '断片化したIoTのためのソブリンOS。',
            description: 'Vyleraは、異なるハードウェアエコシステム（Tuya、Zigbee、Matter）を単一のインテリジェントなニューラルコアに統合します。Google Vertex AIを搭載。'
        },
        ProblemSolution: {
            title: 'なぜVYLERAなのか？',
            problemTitle: '課題',
            problemDesc: 'スマートホームのハードウェアは断片化しています。異なるメーカー（Tuya、Xiaomiなど）のデバイスは隔離されたデータのサイロで動作し、海外のクラウドにテレメトリを固定します。',
            solutionTitle: 'ソリューション',
            solutionDesc: 'Vyleraはユニバーサルな相互運用性ブリッジとして機能します。エッジでデバイス信号をローカルに処理し、外部クラウドに依存することなく、プライバシーを重視した単一のシステムとして異種ハードウェアを機能させます。'
        },
        Features: {
            feature1Title: 'プロアクティブ',
            feature1Desc: 'プライバシー優先の観察を通じてニーズを予測します。ローカルで処理を行い、データが外部に流出しないことを保証します。',
            feature2Title: 'ユニバーサル',
            feature2Desc: 'ハードウェアに依存しません（Tuya/Zigbeeなど）。私たちは頭脳を提供し、バラバラのデバイスを一貫した単一のシステムに統合します。',
            feature3Title: '自然な会話',
            feature3Desc: '標準アメリカ英語のコアとハイパーローカルな微調整（Ammani、Jakselなど）。ロボットではなく、会話的。',
            techSpecs: '技術仕様',
            spec1Label: 'データ取り込み',
            spec1Value: 'Zigbee 3.0, Matter, MQTT, BLE Mesh',
            spec2Label: 'インテリジェンス',
            spec2Value: 'Google Vertex AI, Vision API, 感情ベクトル化',
            spec3Label: 'プライバシー',
            spec3Value: 'サンクチュアリプロトコル (AES-256 ローカル暗号化)',
            spec4Label: 'レイテンシ',
            spec4Value: '100ミリ秒未満のプロアクティブトリガー'
        }
    }
};

for (const lang of ["en", "ru", "id", "ja"]) {
    const path = `messages/${lang}.json`;
    const dict = JSON.parse(fs.readFileSync(path, 'utf8'));
    dict.TechHero = data[lang].TechHero;
    dict.ProblemSolution = data[lang].ProblemSolution;
    dict.Features = data[lang].Features;
    fs.writeFileSync(path, JSON.stringify(dict, null, 2));
}
