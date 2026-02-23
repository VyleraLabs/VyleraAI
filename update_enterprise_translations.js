const fs = require('fs');

const data = {
    en: {
        EnterpriseProducts: {
            subtitle: 'Strategic Intelligence Suite',
            title: 'Enterprise SaaS Lineup',
            desc: 'A proprietary ecosystem of deep-tech solutions engineered to optimize, automate, and dominate across every sector of corporate architecture.',
            products: {
                posMarket: 'Adaptive Point of Sale',
                posDesc: 'Transforms transactions into real-time consumer behavior analytics and inventory foresight.',
                hrMarket: 'Human Capital Intelligence',
                hrDesc: 'Unifies payroll, performance, and recruitment into a frictionless, AI-optimized employee lifecycle.',
                fmsMarket: 'Autonomous Fleet Intelligence',
                fmsDesc: 'Optimizes logistics by embedding AI into route planning, fuel management, and predictive maintenance.',
                webMarket: 'Intelligent Web Ecosystem',
                webDesc: 'Deploys self-optimizing, AI-driven digital platforms designed for maximum conversion and user intent.',
                noteMarket: 'Executive Intelligence',
                noteDesc: 'Context-aware recording that synthesizes meetings into actionable tasks and strategic summaries.',
                esignMarket: 'Secure Protocol Signing',
                esignDesc: 'AI-verified digital signatures that ensure document integrity and cross-platform compliance.',
                dlpMarket: 'Defensive Security Layer',
                dlpDesc: 'High-stakes Data Loss Prevention designed by elite pentesters to safeguard proprietary intelligence.',
                dwhMarket: 'Unified Data Warehouse',
                dwhDesc: 'The \'Single Source of Truth\' that ingests fragmented data from across the enterprise for instant analysis.',
                finMarket: 'Autonomous Accounting',
                finDesc: 'Seamlessly integrates with existing finance systems to automate reconciliation and fiscal forecasting.',
                crmMarket: 'Predictive Client Mgmt.',
                crmDesc: 'Moves beyond basic tracking to predict customer needs and automate high-value relationship building.'
            }
        }
    },
    ru: {
        EnterpriseProducts: {
            subtitle: 'Комплекс стратегического интеллекта',
            title: 'Линейка Enterprise SaaS',
            desc: 'Собственная экосистема высокотехнологичных решений, разработанная для оптимизации, автоматизации и доминирования в каждом секторе корпоративной архитектуры.',
            products: {
                posMarket: 'Адаптивная точка продаж',
                posDesc: 'Преобразует транзакции в аналитику поведения потребителей в реальном времени и предвидение запасов.',
                hrMarket: 'Интеллект человеческого капитала',
                hrDesc: 'Объединяет расчет заработной платы, производительность и найм в плавный, оптимизированный ИИ жизненный цикл сотрудника.',
                fmsMarket: 'Автономный интеллект автопарка',
                fmsDesc: 'Оптимизирует логистику путем внедрения ИИ в планирование маршрутов, управление топливом и профилактическое обслуживание.',
                webMarket: 'Интеллектуальная веб-экосистема',
                webDesc: 'Развертывает самооптимизирующиеся локализованные цифровые платформы, управляемые ИИ, разработанные для максимальной конверсии и намерений пользователя.',
                noteMarket: 'Исполнительный интеллект',
                noteDesc: 'Контекстно-зависимая запись, которая синтезирует встречи в выполнимые задачи и стратегические резюме.',
                esignMarket: 'Протокол безопасной подписи',
                esignDesc: 'Цифровые подписи, проверенные ИИ, которые обеспечивают целостность документов и кроссплатформенную совместимость.',
                dlpMarket: 'Уровень защитной безопасности',
                dlpDesc: 'Предотвращение потери данных с высокими ставками, разработанное элитными пентестерами для защиты частной информации.',
                dwhMarket: 'Единое хранилище данных',
                dwhDesc: '«Единый источник истины», который собирает фрагментированные данные со всего предприятия для мгновенного анализа.',
                finMarket: 'Автономный бухгалтерский учет',
                finDesc: 'Бесшовно интегрируется с существующими финансовыми системами для автоматизации сверки и финансового прогнозирования.',
                crmMarket: 'Предиктивное управление клиентами',
                crmDesc: 'Выходит за рамки базового отслеживания, чтобы прогнозировать потребности клиентов и автоматизировать построение ценных отношений.'
            }
        }
    },
    id: {
        EnterpriseProducts: {
            subtitle: 'Rangkaian Kecerdasan Strategis',
            title: 'Jajaran enterprise SaaS',
            desc: 'Ekosistem eksklusif dari solusi teknologi mendalam yang dirancang untuk mengoptimalkan, mengotomatiskan, dan mendominasi di setiap sektor arsitektur perusahaan.',
            products: {
                posMarket: 'Sistem Tempat Penjualan Adaptif',
                posDesc: 'Mengubah transaksi menjadi analitik perilaku konsumen real-time dan tinjauan inventaris cerdas.',
                hrMarket: 'Sistem Rekrutmen Modal Manusia',
                hrDesc: 'Menyelaraskan penggajian, kinerja, dan rekrutmen ke dalam siklus karyawan yang tanpa gesekan dan dioptimalkan AI.',
                fmsMarket: 'Kecerdasan Armada Otonom',
                fmsDesc: 'Mengoptimalkan logistik dengan menyematkan AI ke dalam perencanaan rute, manajemen bahan bakar, dan pemeliharaan prediktif.',
                webMarket: 'Ekosistem Web Cerdas',
                webDesc: 'Menyebarkan platform digital bertenaga AI yang dioptimalkan sendiri yang dirancang untuk konversi maksimum dan niat pengguna.',
                noteMarket: 'Ringkasan Catatan Eksekutif',
                noteDesc: 'Perekaman yang peka terhadap konteks yang menyintesis pertemuan menjadi tugas yang dapat ditindaklanjuti dan ringkasan strategis.',
                esignMarket: 'Sistem Keamanan Tanda Tangan',
                esignDesc: 'Tanda tangan digital yang diverifikasi AI yang memastikan integritas dokumen dan kepatuhan lintas platform.',
                dlpMarket: 'Perlindungan Berlapis',
                dlpDesc: 'Pencegahan Kehilangan Data tingkat tinggi yang dirancang oleh pentester elit untuk melindungi kecerdasan eksklusif.',
                dwhMarket: 'Pusat Gudang Data',
                dwhDesc: '\'Satu Sumber Kebenaran\' yang menyerap data terfragmentasi dari seluruh perusahaan untuk analisis instan.',
                finMarket: 'Akuntansi & Keuangan Otonom',
                finDesc: 'Terintegrasi secara mulus dengan sistem keuangan yang ada untuk mengotomatisasi rekonsiliasi dan perkiraan fiskal.',
                crmMarket: 'Manajemen Klien Cerdas',
                crmDesc: 'Bergerak melampaui pelacakan dasar untuk memprediksi kebutuhan pelanggan dan mengotomatiskan pembangunan hubungan bernilai tinggi.'
            }
        }
    },
    ja: {
        EnterpriseProducts: {
            subtitle: '戦略的インテリジェンス スイート',
            title: 'エンタープライズSaaSラインナップ',
            desc: '企業アーキテクチャのあらゆるセクターを最適化、自動化、支配するために設計されたディープテック ソリューションの独自エコシステム。',
            products: {
                posMarket: '適応型ポイント オブ セール',
                posDesc: 'トランザクションをリアルタイムの消費者行動分析と在庫予測に変換します。',
                hrMarket: 'ヒューマン キャピタル インテリジェンス',
                hrDesc: '給与、パフォーマンス、採用をシームレスでAIによって最適化された従業員ライフサイクルに統合します。',
                fmsMarket: '自律型フリート インテリジェンス',
                fmsDesc: 'ルート計画、燃料管理、予知保全にAIを組み込むことで物流を最適化します。',
                webMarket: 'インテリジェント Web エコシステム',
                webDesc: '最大のコンバージョンとユーザーの意図に合わせて設計された、自己最適化するAI駆動のデジタルプラットフォームを展開します。',
                noteMarket: 'エグゼクティブ インテリジェンス',
                noteDesc: '会議を実用的なタスクと戦略的な要約に合成するコンテキスト認識型の記録。',
                esignMarket: '安全なプロトコル署名',
                esignDesc: '文書の完全性とクロスプラットフォームのコンプライアンスを保証するAI検証済みのデジタル署名。',
                dlpMarket: '防御的セキュリティレイヤー',
                dlpDesc: '独自のインテリジェンスを保護するためにエリートペンテスターによって設計されたハイリスクデータ損失防止。',
                dwhMarket: '統合データ ウェアハウス',
                dwhDesc: 'エンタープライズ全体からの断片化されたデータを取り込んで即座に分析する「唯一の信頼できる情報源」。',
                finMarket: '自律型会計',
                finDesc: '既存の財務システムとシームレスに統合して、照合と財務予測を自動化します。',
                crmMarket: '予測型クライアント管理 (CRM)',
                crmDesc: '基本的な追跡を超えて顧客のニーズを予測し、価値の高い関係構築を自動化します。'
            }
        }
    }
};

for (const lang of ["en", "ru", "id", "ja"]) {
    const path = `messages/${lang}.json`;
    const dict = JSON.parse(fs.readFileSync(path, 'utf8'));
    dict.EnterpriseProducts = data[lang].EnterpriseProducts;
    fs.writeFileSync(path, JSON.stringify(dict, null, 2));
}
