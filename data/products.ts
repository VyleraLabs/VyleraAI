export type ProductSlug =
  | "google-cloud-platform"
  | "google-workspace"
  | "ticketing-system"
  | "whistleblowing-system";

export type Product = {
  slug: ProductSlug;
  initial: string;
  icon?:
    | {
        type: "image";
        src: string;
        alt: string;
      }
    | {
        type: "ticket" | "whistle";
      };
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  accent: "blue" | "teal" | "purple";
  bullets: string[];
  sections: {
    icon: string;
    title: string;
    description: string;
  }[];
  audience?: {
    title: string;
    description: string;
  }[];
  pricing?: string;
  pricingDetails?: string[];
  note?: string;
};

export const products: Product[] = [
  {
    slug: "google-cloud-platform",
    initial: "G",
    icon: {
      type: "image",
      src: "/assets/google-cloud-logo.svg",
      alt: "Google Cloud logo"
    },
    title: "Google Cloud Platform",
    subtitle: "Cloud Infrastructure, Data Analytics & AI",
    category: "Cloud Infrastructure & AI",
    summary:
      "Enterprise cloud hosting, compute, storage, data analytics, and AI/ML services with preferred partner pricing on GCP services.",
    accent: "blue",
    bullets: [
      "Preferred partner pricing below public rates",
      "Compute, storage, BigQuery, Vertex AI",
      "Google invented Kubernetes (GKE)",
      "Per-second billing, pay only for usage",
      "Direct support through our partnership"
    ],
    sections: [
      {
        icon: "K",
        title: "Kubernetes & GKE",
        description:
          "Run applications at any scale on Google's managed Kubernetes service, built by the original creators of Kubernetes."
      },
      {
        icon: "D",
        title: "Data & BigQuery",
        description:
          "Process petabytes in seconds with BigQuery, supported by Dataflow, Looker, and Pub/Sub for the complete data stack."
      },
      {
        icon: "A",
        title: "AI & Machine Learning",
        description:
          "Use TPUs, Gemini models, and Vertex AI to build, train, and deploy ML models on Google-grade infrastructure."
      },
      {
        icon: "C",
        title: "Compute & Storage",
        description:
          "Deploy with Compute Engine, Cloud Storage, Cloud SQL, and Cloud Run, with per-second billing and sustained-use discounts."
      },
      {
        icon: "N",
        title: "Global Network",
        description:
          "Google's private fiber network moves data on Google's own backbone for speed, scale, and security."
      },
      {
        icon: "S",
        title: "Security & Compliance",
        description:
          "Encryption by default, IAM, VPC, Cloud Armor, and Security Command Center protect workloads with Google-grade controls."
      }
    ],
    audience: [
      {
        title: "Preferred Pricing",
        description:
          "Use the public GCP calculator, then work with VyleraLabs for partner pricing below standard rates."
      },
      {
        title: "Direct Support",
        description:
          "Get account management through our partner channel instead of generic helpdesk escalation."
      },
      {
        title: "Long-Term Discounts",
        description:
          "Larger commitments and longer contracts unlock deeper savings over time."
      },
      {
        title: "One Point of Contact",
        description:
          "Billing, support, migration, and renewals stay coordinated through one partner relationship."
      }
    ],
    note:
      "Show clients the public price, then let us beat it. Same infrastructure, better deal."
  },
  {
    slug: "google-workspace",
    initial: "W",
    icon: {
      type: "image",
      src: "/assets/google-workspace-logo.svg",
      alt: "Google Workspace logo"
    },
    title: "Google Workspace",
    subtitle: "Productivity & Collaboration Suite",
    category: "Productivity & Collaboration",
    summary:
      "Professional email, cloud storage, docs, video conferencing, and Gemini AI - the tools your team already knows.",
    accent: "blue",
    bullets: [
      "Gmail, Drive, Docs, Sheets, Meet",
      "Gemini AI included in every plan",
      "Partner pricing below Google's public rates",
      "Admin controls, security, compliance",
      "Migration and onboarding support"
    ],
    sections: [
      {
        icon: "G",
        title: "Gmail",
        description:
          "Professional business email with spam filtering, search, and deep integration with all Workspace apps."
      },
      {
        icon: "D",
        title: "Drive",
        description:
          "Cloud storage and secure file sharing from 30 GB to unlimited per user, depending on the plan."
      },
      {
        icon: "D",
        title: "Docs, Sheets, Slides",
        description:
          "Create and collaborate in real time without emailing files back and forth."
      },
      {
        icon: "M",
        title: "Meet",
        description:
          "Video conferencing for 100 to 1,000 participants with recording, breakout rooms, and noise cancellation."
      },
      {
        icon: "C",
        title: "Calendar & Chat",
        description:
          "Team scheduling, appointment booking, and messaging synced across the Workspace ecosystem."
      },
      {
        icon: "A",
        title: "Gemini AI",
        description:
          "AI assistance across email, documents, data analysis, and presentations, included in all plans."
      }
    ],
    pricing: "Public plans start at $7/user/month",
    pricingDetails: [
      "Starter: $7/user/month public pricing, 30 GB storage",
      "Standard: $14/user/month public pricing, 2 TB storage",
      "Plus: $22/user/month public pricing, 5 TB storage",
      "Enterprise: custom public pricing, unlimited storage"
    ],
    note:
      "As a direct Google partner, we offer all plans below public prices and support migration, onboarding, and ongoing administration."
  },
  {
    slug: "ticketing-system",
    initial: "T",
    icon: {
      type: "ticket"
    },
    title: "Ticketing System",
    subtitle: "Helpdesk & Incident Management Platform",
    category: "Helpdesk & Incident Management",
    summary:
      "A centralized helpdesk platform for incidents, service requests, and complaints with automated routing and SLA tracking.",
    accent: "teal",
    bullets: [
      "Full ticket lifecycle with audit trail",
      "Automated routing rules built in",
      "SLA engine with breach alerts",
      "Multi-BU dashboards and reporting",
      "White-label ready"
    ],
    sections: [
      {
        icon: "T",
        title: "Ticket Lifecycle",
        description:
          "Manage Open, Pending, Reopen, Cancel, and Closed states with mandatory resolution notes and no silent deletion."
      },
      {
        icon: "R",
        title: "Automated Routing",
        description:
          "Route by category, business unit, location, and working hours with auto-assignment or queue fallback."
      },
      {
        icon: "S",
        title: "SLA Engine",
        description:
          "Set response and resolution SLAs per priority, category, and BU, with near-breach alerts and escalation."
      },
      {
        icon: "D",
        title: "Dashboards & Reports",
        description:
          "Give agents, supervisors, and management role-based views with KPIs, trends, workload monitoring, and exports."
      },
      {
        icon: "A",
        title: "Audit Trail & RBAC",
        description:
          "Log every action by user and timestamp, with role-based access and business-unit scoped data."
      },
      {
        icon: "I",
        title: "Integrations",
        description:
          "Connect SSO/IAM, user directories, email gateways, notifications, BI/DWH, WhatsApp, and custom APIs."
      }
    ],
    audience: [
      {
        title: "IT Helpdesk Teams",
        description:
          "Manage incidents and service requests with accountable SLA tracking."
      },
      {
        title: "Shared Services",
        description:
          "Support HR, finance, facilities, and any internal team handling recurring requests."
      },
      {
        title: "Multi-BU Enterprises",
        description:
          "Centralize ticketing while preserving scoped data access per business unit."
      },
      {
        title: "Growing Companies",
        description:
          "Move beyond spreadsheets without jumping into ServiceNow-level pricing."
      }
    ],
    pricing: "Pricing starts at around $1,700 USD /year",
    pricingDetails: [
      "3 tier packages available: Basic, Standard, and Premium, based on the number of users and features used",
      "Monthly operational costs are GCP usage-based",
      "Maintenance starts at a small price/month"
    ]
  },
  {
    slug: "whistleblowing-system",
    initial: "W",
    icon: {
      type: "whistle"
    },
    title: "Whistleblowing System",
    subtitle: "Compliance & Anonymous Reporting Platform",
    category: "Compliance & Anonymous Reporting",
    summary:
      "A secure whistleblowing platform for anonymous reporting of fraud, corruption, and compliance issues with evidence management.",
    accent: "purple",
    bullets: [
      "True anonymous reporting",
      "Evidence chain of custody",
      "Committee approval workflows",
      "Immutable audit trail",
      "White-label ready"
    ],
    sections: [
      {
        icon: "A",
        title: "Anonymous Reporting",
        description:
          "Protect reporters with no PII stored, secure access codes for status tracking, and no forced identity reveal."
      },
      {
        icon: "C",
        title: "Case Management",
        description:
          "Run triage, assignment, investigation, review, and closure with conflict detection and duplicate linking."
      },
      {
        icon: "E",
        title: "Evidence Management",
        description:
          "Secure uploads with hashing, checksums, logged access, legal hold, and a full chain of custody."
      },
      {
        icon: "M",
        title: "Secure Messaging",
        description:
          "Enable two-way communication between reporter and handling team without revealing reporter identity."
      },
      {
        icon: "W",
        title: "Committee Workflows",
        description:
          "Route high-severity and conflict-of-interest cases to committee review with documented approve/reject decisions."
      },
      {
        icon: "D",
        title: "Masked Analytics",
        description:
          "Track trends, severity heatmaps, and SLA compliance while privacy masking remains enabled by default."
      }
    ],
    audience: [
      {
        title: "Compliance & Legal",
        description:
          "Enforce whistleblowing policy with audit-ready evidence and formal closure records."
      },
      {
        title: "Internal Audit",
        description:
          "Investigate fraud and corruption with a documented chain of custody."
      },
      {
        title: "Multi-Entity Groups",
        description:
          "Operate centralized reporting with entity-level data segregation."
      },
      {
        title: "GCG-Focused Companies",
        description:
          "Establish formal speak-up channels for governance compliance."
      }
    ],
    pricing: "Pricing starts at around $2,600 USD /year",
    pricingDetails: [
      "3 tier packages available: Basic, Standard, and Premium, based on the number of users and features used",
      "Monthly operational costs are GCP usage-based",
      "Maintenance starts at a small price/month"
    ]
  }
];

export const whyVylera = [
  {
    initial: "G",
    title: "Direct Google Partner",
    description:
      "VyleraLabs is a direct Google Cloud partner, giving clients preferred pricing on GCP and Workspace plus dedicated support."
  },
  {
    initial: "$",
    title: "3-15x Cheaper",
    description:
      "Ticketing costs 3-15x less than Jira or ServiceNow. Whistleblowing costs 5-8x less than NAVEX with core capabilities intact."
  },
  {
    initial: "W",
    title: "Weeks, Not Months",
    description:
      "Launch in weeks with setup, training, and hypercare handled by the VyleraLabs team."
  },
  {
    initial: "L",
    title: "White-Label Ready",
    description:
      "Ticketing and Whistleblowing can run under your brand, name, and domain from one reusable codebase."
  },
  {
    initial: "A",
    title: "AI-Powered, GCP Native",
    description:
      "Products run on Google Cloud with AI add-ons powered by Vertex AI and Gemini."
  },
  {
    initial: "1",
    title: "One Partner, Full Stack",
    description:
      "Cloud infrastructure, productivity, operations, and governance are handled through one partner relationship."
  }
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
