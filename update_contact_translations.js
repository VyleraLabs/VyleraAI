const fs = require('fs');

const data = {
    en: {
        ContactModal: {
            title: "Direct Connect",
            desc: "Select a department to route your inquiry accurately to the core team.",
            emailLabel: "Email",
            copyLabel: "Copied!",
            deptEnterpriseName: "Enterprise Solutions",
            deptEnterpriseDesc: "For B2B platform integration and corporate architecture.",
            deptInvestorName: "Investor Relations",
            deptInvestorDesc: "For investment inquiries and strategic partnerships.",
            deptResidentialName: "Residential Access",
            deptResidentialDesc: "For early access to the residential Sovereign OS."
        }
    },
    ru: {
        ContactModal: {
            title: "Прямая связь",
            desc: "Выберите отдел, чтобы направить ваш запрос напрямую основной команде.",
            emailLabel: "Эл. почта",
            copyLabel: "Скопировано!",
            deptEnterpriseName: "Корпоративные решения",
            deptEnterpriseDesc: "Для интеграции B2B платформ и корпоративной архитектуры.",
            deptInvestorName: "Связи с инвесторами",
            deptInvestorDesc: "Для вопросов об инвестициях и стратегическом партнерстве.",
            deptResidentialName: "Жилой сектор",
            deptResidentialDesc: "Для раннего доступа к суверенной ОС для жилых помещений."
        }
    },
    id: {
        ContactModal: {
            title: "Koneksi Langsung",
            desc: "Pilih departemen untuk merutekan pertanyaan Anda secara akurat ke tim inti.",
            emailLabel: "Email",
            copyLabel: "Disalin!",
            deptEnterpriseName: "Solusi Perusahaan",
            deptEnterpriseDesc: "Untuk integrasi platform B2B dan arsitektur perusahaan.",
            deptInvestorName: "Hubungan Investor",
            deptInvestorDesc: "Untuk pertanyaan investasi dan kemitraan strategis.",
            deptResidentialName: "Akses Perumahan",
            deptResidentialDesc: "Untuk akses awal ke OS Berdaulat perumahan."
        }
    },
    ja: {
        ContactModal: {
            title: "ダイレクトコネクト",
            desc: "コアチームに正確に問い合わせをルーティングするために部門を選択してください。",
            emailLabel: "メール",
            copyLabel: "コピーしました！",
            deptEnterpriseName: "エンタープライズソリューション",
            deptEnterpriseDesc: "B2Bプラットフォームの統合と企業アーキテクチャについて。",
            deptInvestorName: "投資家情報",
            deptInvestorDesc: "投資に関するお問い合わせと戦略的パートナーシップについて。",
            deptResidentialName: "レジデンシャルアクセス",
            deptResidentialDesc: "住宅用Sovereign OSのアーリーアクセスについて。"
        }
    }
};

const locales = ['en', 'ru', 'id', 'ja'];

locales.forEach(locale => {
    const filePath = `./messages/${locale}.json`;
    let fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    fileData.ContactModal = data[locale].ContactModal;
    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
    console.log(`Updated ${filePath}`);
});
