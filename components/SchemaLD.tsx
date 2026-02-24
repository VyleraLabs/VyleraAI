export default function SchemaLD() {
    // 1. Core Organizational Data
    const organizationUrl = "https://vyleralabs.com";
    const organizationName = "Vylera Labs";
    const organizationLogo = "https://vyleralabs.com/logo.webp";
    const organizationPhone = "+62 819-9880-0088";

    // 2. Exact HQ Details (Derived from Footer)
    const hqAddress = {
        "@type": "PostalAddress",
        "streetAddress": "Wisma BCA BSD, HQ, Lt. 1 Suite 102, Jl. Pahlawan Seribu No.8, Lengkong Gudang",
        "addressLocality": "Serpong, Kota Tangerang Selatan",
        "addressRegion": "Banten",
        "postalCode": "15310",
        "addressCountry": "ID"
    };

    // 3. Team Roster with Explicit LinkedIn Mappings
    const teamMembers = [
        { "@id": `${organizationUrl}/#person-katherina`, name: "Katherina Aytakin", jobTitle: "Founder & CEO", url: organizationUrl, sameAs: ["https://www.linkedin.com/in/katherina-aytakin"] },
        { "@id": `${organizationUrl}/#person-magna`, name: "Magna Putra", jobTitle: "Co-Founder & CTO", url: organizationUrl, sameAs: ["https://www.linkedin.com/in/magna-bumi-putra-33523555/"] },
        { "@id": `${organizationUrl}/#person-sandy`, name: "Sandy Permadi", jobTitle: "CFO", url: organizationUrl, sameAs: ["https://www.linkedin.com/in/sandy-permadi-462bb63/"] },
        { "@id": `${organizationUrl}/#person-kristiyan`, name: "Kristiyan Dimitrov Mechev", jobTitle: "COO and Lead Hardware Engineer", url: organizationUrl, sameAs: ["https://www.linkedin.com/in/kristiyan-mechev-a51803247/"] }
    ];

    // 4. Enterprise Software Suite Generation
    const enterpriseSuite = [
        { name: "Vylera Pulse (AI POS)", market: "Adaptive Point of Sale", category: "BusinessApplication", keywords: "POS, AI POS, AI based POS, Point of Sale, Smart POS, Cloud POS, Intelligence POS" },
        { name: "Vylera Talent (AI HRIS)", market: "Human Capital Intelligence", category: "BusinessApplication", keywords: "HRIS, AI HRIS, AI Human Resources, Talent Management, Payroll Automation, Smart HR" },
        { name: "Vylera Move (AI FMS)", market: "Autonomous Fleet Intelligence", category: "BusinessApplication", keywords: "FMS, Fleet Management System, AI FMS, Logistics, Route Optimization, Predictive Maintenance" },
        { name: "Vylera Nexus (AI Web)", market: "Intelligent Web Ecosystem", category: "WebApplication", keywords: "Web Development, AI Web Ecosystem, AI Digital Platform, Enterprise Web Solutions" },
        { name: "Vylera Scribe (AI Note Taker)", market: "Executive Intelligence", category: "BusinessApplication", keywords: "AI Note Taker, Meeting Summarizer, Executive Assistant, Voice to Text AI" },
        { name: "Vylera Authenticate (AI E-Sign)", market: "Secure Protocol Signing", category: "SecurityApplication", keywords: "E-Sign, AI E-Sign, Digital Signatures, Document Signing, Secure Protocol" },
        { name: "Vylera Sentinel (AI DLP)", market: "Defensive Security Layer", category: "SecurityApplication", keywords: "DLP, AI DLP, Data Loss Prevention, Cyber Security, Enterprise Defense" },
        { name: "Vylera Core (AI DWH)", market: "Unified Data Warehouse", category: "BusinessApplication", keywords: "DWH, AI DWH, Data Warehouse, Big Data, Enterprise Data Platform" },
        { name: "Vylera Ledger (AI Finance)", market: "Autonomous Accounting", category: "FinanceApplication", keywords: "AI Finance, Autonomous Accounting, AI Bookkeeping, Financial Technology, Fintech ERP" },
        { name: "Vylera Relation (AI CRM)", market: "Predictive Client Mgmt.", category: "BusinessApplication", keywords: "CRM, AI CRM, Predictive AI, Customer Relationship Management, Smart CRM" },
    ].map(software => ({
        "@type": "SoftwareApplication",
        "@id": `${organizationUrl}/#${software.name.replace(/\\s+/g, '-').toLowerCase()}`,
        "name": software.name,
        "applicationCategory": software.category,
        "operatingSystem": "Web, iOS, Android",
        "keywords": software.keywords,
        "description": `${software.name} - ${software.market}. Engineered by Vylera Labs. Keywords: ${software.keywords}`,
        "provider": { "@id": `${organizationUrl}/#organization` },
        "publisher": { "@id": `${organizationUrl}/#organization` },
        "url": `${organizationUrl}/enterprise`
    }));

    // 5. Constructing the Massive Interconnected @graph
    const globalGraph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": `${organizationUrl}/#website`,
                "url": organizationUrl,
                "name": organizationName,
                "publisher": { "@id": `${organizationUrl}/#organization` },
                "inLanguage": "en-US"
            },
            {
                "@type": "Organization",
                "@id": `${organizationUrl}/#organization`,
                "name": organizationName,
                "legalName": "PT Vylera Labs Indonesia",
                "url": organizationUrl,
                "logo": {
                    "@type": "ImageObject",
                    "url": organizationLogo,
                    "width": "1200",
                    "height": "1200"
                },
                "telephone": organizationPhone,
                "address": hqAddress,
                "sameAs": [
                    "https://www.linkedin.com/company/vyleralabs/"
                ],
                "founder": teamMembers.filter(m => m.jobTitle.includes("Founder")).map(founder => ({
                    "@type": "Person",
                    "@id": founder["@id"],
                    "name": founder.name,
                    "jobTitle": founder.jobTitle,
                    "sameAs": founder.sameAs
                })),
                "employee": teamMembers.map(member => ({
                    "@type": "Person",
                    "@id": member["@id"],
                    "name": member.name,
                    "jobTitle": member.jobTitle,
                    "sameAs": member.sameAs
                }))
            },
            ...enterpriseSuite,
            {
                "@type": "Product",
                "@id": `${organizationUrl}/#sovereign-iot-ecosystem`,
                "name": "Sovereign IoT Ecosystem",
                "brand": { "@id": `${organizationUrl}/#organization` },
                "category": "Smart Home Hub",
                "description": "Military-grade secure smart home infrastructure with proactive edge intelligence.",
                "manufacturer": { "@id": `${organizationUrl}/#organization` },
                "url": `${organizationUrl}/tech`
            }
        ]
    };

    return (
        <script
            id="schema-ld-global"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(globalGraph) }}
        />
    );
}
