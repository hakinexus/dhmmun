export interface Committee {
  id: string;
  type: 'large' | 'small' | 'bento';
  iconName: 'Shield' | 'Users' | 'ShieldAlert' | 'Banknote' | 'HeartPulse';
  title: string;
  topic?: string;
  description: string;
  badge?: string;
  colSpan: string;
  seats?: string;
  format?: string;
  bgImg?: string;
  actionText?: string;
  statusBadge?: string;
  hasGuideLink?: boolean;
}

export const COMMITTEES_DATA: Committee[] = [
  {
    id: "unsc",
    type: "large",
    iconName: "Shield",
    title: "United Nations Security Council",
    topic: "Post-Quantum Cybersecurity Threats in Sovereignty",
    description: "The Security Council will navigate the unprecedented challenges of encrypted warfare and the ethical implications of autonomous defense systems in a multipolar world.",
    badge: "CRITICAL THRESHOLD",
    colSpan: "md:col-span-8",
    seats: "15 Seats",
    format: "Double Delegate",
    bgImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtdWd-Pg-ZwRsYRJmopuNWBCryp95-mo3HzKAEWDYFGS9Xt5_4JX6OLAmIX9NNavs8FusqRdXmqwPbeA54YAyXCPjLauT5X-yHlWhysHckgQH2bDKu5nPy3pMYIcPgnCCTeJ9_UcWfjYJqUxsSKTTCZ30sSkFPl1Oot8EnNsd9LRdYEJzN9gSEtoVITuzDRQGLVYZkhVZK09goYsdEprCFqQB9FrVDiBlE9xNoGnvd5kM9i7Qxpj-zcfPCB5zrrbtvAa4gDLbgycc"
  },
  {
    id: "unhrc",
    type: "small",
    iconName: "Users",
    title: "Human Rights Council",
    description: "Addressing the digital divide and universal access to information as a fundamental human right in the era of artificial intelligence.",
    colSpan: "md:col-span-4",
    hasGuideLink: true,
    actionText: "View Guide"
  },
  {
    id: "disec",
    type: "small",
    iconName: "ShieldAlert",
    title: "DISEC",
    description: "The First Committee focuses on the regulation of space-based kinetic weapons and the prevention of an arms race in outer space.",
    colSpan: "md:col-span-4",
    statusBadge: "High Stakes"
  },
  {
    id: "adhoc",
    type: "bento",
    iconName: "Shield", // default backup
    title: "Ad-Hoc: The Fluidity of Borders",
    description: "An immersive, fast-paced crisis simulation challenging delegates to respond to a sudden, global environmental shift that alters maritime boundaries overnight.",
    badge: "SPECIAL CRISIS",
    colSpan: "md:col-span-8",
    bgImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcDYHlQgvWEbL2D36LtO286UIuiyV3yjHkHJYAVjSSVaSo8bnWvzuzdfDyuiDEHqV6ZLc_ASpp2v0C225xbgfsgkWX3kThp4Fd6i65n8BljzN1KmcORtElwAgiiE4_whJOWdJyich_1zGAbG-BW59ZAkwR2AN0EMbwPr0YYIqXDrTybot9ihY7pTt0IEiYlcA7RA6OtJwmEqahR3bMno42iajtoC6f5hOH7rQSVBn-StWq5izpZjcQQwqCMHrpImZJJVZ1y3DN40Y",
    actionText: "Apply for Position"
  },
  {
    id: "ecosoc",
    type: "small",
    iconName: "Banknote",
    title: "ECOSOC",
    topic: "Restructuring Global Debt Architecture",
    description: "Exploring innovative financial instruments to support emerging economies during climate-driven economic transitions and systemic shocks.",
    colSpan: "md:col-span-6"
  },
  {
    id: "who",
    type: "small",
    iconName: "HeartPulse",
    title: "World Health Org",
    topic: "Synthetic Biology Governance",
    description: "Establishing international frameworks for the regulation of lab-grown pathogens and the democratization of gene-editing technologies.",
    colSpan: "md:col-span-6"
  }
];
