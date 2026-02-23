"use client";

import Script from "next/script";

export default function SchemaLD() {
    const teamMembers = [
        {
            name: "Katherina Aytakin",
            jobTitle: "Founder & CEO",
            url: "https://vylera.app",
            sameAs: ["https://www.linkedin.com/in/katherina-aytakin"]
        },
        {
            name: "Magna Putra",
            jobTitle: "Co-Founder & CTO",
            url: "https://vylera.app",
            sameAs: ["https://www.linkedin.com/in/magna-bumi-putra-33523555/"]
        },
        {
            name: "Sandy Permadi",
            jobTitle: "CFO",
            url: "https://vylera.app",
            sameAs: ["https://www.linkedin.com/in/sandy-permadi-462bb63/"]
        },
        {
            name: "Kristiyan Dimitrov Mechev",
            jobTitle: "COO and Lead Hardware Engineer",
            url: "https://vylera.app",
            sameAs: ["https://www.linkedin.com/in/kristiyan-mechev-a51803247/"]
        }
    ];

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Vylera Labs",
        "url": "https://vylera.app",
        "logo": "https://vylera.app/assets/logowhite.png",
        "sameAs": [
            "https://www.linkedin.com/company/vyleralabs/"
        ],
        "employee": teamMembers.map(member => ({
            "@type": "Person",
            "name": member.name,
            "jobTitle": member.jobTitle,
            "sameAs": member.sameAs
        }))
    };

    return (
        <Script
            id="schema-ld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
    );
}
