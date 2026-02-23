const fs = require('fs');

const data = {
    en: {
        Security: {
            subtitle: 'The Sanctuary Protocol',
            title: 'Privacy by Design. <br /> <span class="text-slate-400">Not by Policy.</span>',
            feature1Title: 'The Vectorization Principle',
            feature1Desc: 'Vylera does NOT store images or audio. Raw sensor data is converted into mathematical vectors (tensors) LOCALLY on the edge. Only these abstract vectors reach our logic core.',
            feature2Title: 'AES-256 Vault',
            feature2Desc: 'All telemetry data is encrypted at rest using AES-256 and transmitted via TLS 1.3. Your home’s behavioral signature looks like static to the outside world.',
            feature3Title: 'Zero-Knowledge Architecture',
            feature3Desc: 'We cannot see into your home. Our system only sees anonymized "Intent Triggers" (e.g., "Lights: ON"). We have no access to the raw visual or audio feed.',
            widgetHeader: 'SYSTEM_INTEGRITY',
            widgetRow1Name: 'LOCAL_ENCRYPTION',
            widgetRow1Status: 'ACTIVE',
            widgetRow2Name: 'VECTORIZATION_ENGINE',
            widgetRow2Status: 'SECURE',
            widgetRow3Name: 'CLOUD_BRIDGE (TLS 1.3)',
            widgetRow3Status: 'ENCRYPTED',
            widgetRow4Name: 'ANONYMIZATION_LAYER',
            widgetRow4Status: 'VERIFIED',
            widgetFooter: 'Audited by 3rd Party Security Firm'
        },
        EarlyAccess: {
            subtitle: 'Early Access',
            title: 'Join the Neural Network',
            desc: 'Vylera is currently inviting select residential users to the Private Beta. Experience the first proactive AI OS for your home.',
            cta: 'Request Access Key'
        }
    },
    ru: {
        Security: {
            subtitle: 'Протокол убежища',
            title: 'Конфиденциальность по дизайну. <br /> <span class="text-slate-400">А не по политике.</span>',
            feature1Title: 'Принцип векторизации',
            feature1Desc: 'Vylera НЕ хранит изображения или аудио. Сырые данные датчиков конвертируются в математические векторы (тензоры) ЛОКАЛЬНО на краю. Только эти абстрактные векторы достигают нашего ядра логики.',
            feature2Title: 'Хранилище AES-256',
            feature2Desc: 'Все данные телеметрии шифруются в состоянии покоя с использованием AES-256 и передаются через TLS 1.3. Поведенческая сигнатура вашего дома выглядит для внешнего мира как статика.',
            feature3Title: 'Архитектура с нулевым разглашением',
            feature3Desc: 'Мы не можем заглянуть в ваш дом. Наша система видит только анонимизированные «Триггеры намерений» (например, «Свет: ВКЛЮЧЕН»). У нас нет доступа к сырым визуальным или аудио потокам.',
            widgetHeader: 'ЦЕЛОСТНОСТЬ_СИСТЕМЫ',
            widgetRow1Name: 'ЛОКАЛЬНОЕ_ШИФРОВАНИЕ',
            widgetRow1Status: 'АКТИВНО',
            widgetRow2Name: 'МЕХАНИЗМ_ВЕКТОРИЗАЦИИ',
            widgetRow2Status: 'БЕЗОПАСЕН',
            widgetRow3Name: 'ОБЛАЧНЫЙ_МОСТ (TLS 1.3)',
            widgetRow3Status: 'ЗАШИФРОВАН',
            widgetRow4Name: 'УРОВЕНЬ_АНОНИМИЗАЦИИ',
            widgetRow4Status: 'ПРОВЕРЕН',
            widgetFooter: 'Проверено сторонней фирмой по безопасности'
        },
        EarlyAccess: {
            subtitle: 'Ранний доступ',
            title: 'Присоединяйтесь к нейросети',
            desc: 'В настоящее время Vylera приглашает избранных пользователей к закрытому бета-тестированию. Испытайте первую проактивную ОС с ИИ для вашего дома.',
            cta: 'Запросить ключ доступа'
        }
    },
    id: {
        Security: {
            subtitle: 'Protokol Tempat Tenteram',
            title: 'Privasi Berdasarkan Desain. <br /> <span class="text-slate-400">Bukan Berdasarkan Kebijakan.</span>',
            feature1Title: 'Prinsip Vektorisasi',
            feature1Desc: 'Vylera TIDAK menyimpan gambar atau audio. Data sensor mentah dikonversi menjadi vektor matematis (tensor) SECARA LOKAL di perangkat kerja. Hanya vektor abstrak ini yang mencapai inti logika kami.',
            feature2Title: 'Brankas AES-256',
            feature2Desc: 'Semua data telemetri dienkripsi saat diam menggunakan AES-256 dan ditransmisikan melalui TLS 1.3. Tanda tangan perilaku rumah Anda terlihat seperti statis di dunia luar.',
            feature3Title: 'Arsitektur Pengetahuan Nol',
            feature3Desc: 'Kami tidak bisa melihat ke dalam rumah Anda. Sistem kami hanya melihat "Pemicu Niat" yang dianonimkan (misalnya, "Lampu: NYALA"). Kami tidak memiliki akses ke umpan visual atau audio mentah.',
            widgetHeader: 'INTEGRITAS_SISTEM',
            widgetRow1Name: 'ENKRIPSI_LOKAL',
            widgetRow1Status: 'AKTIF',
            widgetRow2Name: 'MESIN_VEKTORISASI',
            widgetRow2Status: 'AMAN',
            widgetRow3Name: 'JEMBATAN_CLOULD (TLS 1.3)',
            widgetRow3Status: 'TERENKRIPSI',
            widgetRow4Name: 'LAPISAN_ANONIMISASI',
            widgetRow4Status: 'TERVERIFIKASI',
            widgetFooter: 'Diaudit oleh Firma Keamanan Pihak Ke-3'
        },
        EarlyAccess: {
            subtitle: 'Akses Awal',
            title: 'Bergabung dengan Jaringan Neural',
            desc: 'Vylera saat ini mengundang pengguna perumahan terpilih ke Beta Pribadi. Rasakan OS AI proaktif pertama untuk rumah Anda.',
            cta: 'Minta Kunci Akses'
        }
    },
    ja: {
        Security: {
            subtitle: 'サンクチュアリプロトコル',
            title: '設計によるプライバシー。<br /> <span class="text-slate-400">ポリシーによるものではありません。</span>',
            feature1Title: 'ベクトル化の原則',
            feature1Desc: 'Vyleraは画像や音声を保存しません。生のセンサーデータは、エッジでローカルに数学的ベクトル（テンソル）に変換されます。これらの抽象的なベクトルのみがロジックコアに到達します。',
            feature2Title: 'AES-256 ボールト',
            feature2Desc: 'すべてのテレメトリデータは、AES-256を使用して保存時に暗号化され、TLS 1.3を介して送信されます。あなたの家の行動署名は、外界には静的のように見えます。',
            feature3Title: 'ゼロ知識アーキテクチャ',
            feature3Desc: '私たちはあなたの家の中を見ることができません。私たちのシステムは、匿名化された「意図トリガー」（例えば、「照明：オン」）のみを認識します。生の視覚または音声フィードにアクセスすることはできません。',
            widgetHeader: 'システム整合性',
            widgetRow1Name: 'ローカル暗号化',
            widgetRow1Status: 'アクティブ',
            widgetRow2Name: 'ベクトル化エンジン',
            widgetRow2Status: '安全',
            widgetRow3Name: 'クラウドブリッジ（TLS 1.3）',
            widgetRow3Status: '暗号化済み',
            widgetRow4Name: '匿名化レイヤー',
            widgetRow4Status: '検証済み',
            widgetFooter: 'サードパーティのセキュリティ会社による監査済み'
        },
        EarlyAccess: {
            subtitle: 'アーリーアクセス',
            title: 'ニューラルネットワークに参加する',
            desc: 'Vyleraは現在、一部の住宅ユーザーをプライベートベータ版に招待しています。あなたの家のための最初のプロアクティブなAI OSを体験してください。',
            cta: 'アクセスキーをリクエスト'
        }
    }
};

for (const lang of ["en", "ru", "id", "ja"]) {
    const path = `messages/${lang}.json`;
    const dict = JSON.parse(fs.readFileSync(path, 'utf8'));
    dict.Security = data[lang].Security;
    dict.EarlyAccess = data[lang].EarlyAccess;
    fs.writeFileSync(path, JSON.stringify(dict, null, 2));
}
