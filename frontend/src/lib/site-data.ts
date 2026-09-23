export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/founders-story", label: "Founder’s Story" },
  { href: "/programs", label: "Programs" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/get-involved", label: "Get Involved" },
] as const;

export const ORG = {
  name: "Second Start Initiative",
  shortName: "SSI",
  location: "Kenya",
  whatsapp: "+254 701 401 306",
  whatsappHref: "https://wa.me/254701401306",
  email: "second.start.initiative@gmail.com",
  instagram: "https://instagram.com/secondstartinitiative",
  twitter: "https://x.com/secondstartinitiative",
  facebook: "https://facebook.com/secondstartinitiative",
  handle: "@secondstartinitiative",
};

export const MISSION =
  "To empower young adults leaving children’s homes and orphanages by providing emotional, educational, and economic support that enables them to build independent, dignified, and fulfilling lives.";

export const VISION =
  "A society where every youth transitioning out of care has equal opportunities for stability, growth, and success.";

export const CORE_VALUES = [
  "Empathy",
  "Dignity",
  "Integrity",
  "Empowerment",
  "Community",
  "Sustainability",
] as const;

export type Pillar = {
  title: string;
  description: string;
};

export const PILLARS: Pillar[] = [
  {
    title: "Mentorship",
    description: "Trusted guidance from people who care and listen.",
  },
  {
    title: "Life Skills",
    description: "Financial literacy, communication, and independence.",
  },
  {
    title: "Education & Work",
    description: "Support for training, education, and employment pathways.",
  },
  {
    title: "Community",
    description: "A sense of belonging beyond institutional care.",
  },
];

export type Program = {
  slug: string;
  title: string;
  summary: string;
  details: string;
  image: string;
};

export const PROGRAMS: Program[] = [
  {
    slug: "transitional-support",
    title: "Transitional Support & Stability",
    summary:
      "We walk alongside young adults as they transition from institutional care to independence — offering housing support, life skills workshops, and emotional guidance every step of the way.",
    details:
      "This program includes safe transitional housing, personal development planning, structured case management, and dedicated peer mentorship to build stability and confidence in the journey ahead.",
    image: "/images/pic2.jpg",
  },
  {
    slug: "mentorship-personal-growth",
    title: "Mentorship & Personal Growth",
    summary:
      "Through one-on-one and group mentorship, participants develop confidence, life strategies, and skills that help them thrive beyond transitional support.",
    details:
      "Guided by trained mentors who offer personalized support on leadership, career pathways, decision-making, and resilience, this program cultivates not just independence but life ownership.",
    image: "/images/pic10.jpg",
  },
  {
    slug: "skills-career-development",
    title: "Skills & Career Development",
    summary:
      "Participants access workshops, vocational training, internship placements, and career guidance to build competencies that lead to sustainable employment.",
    details:
      "Training areas include digital literacy, entrepreneurship basics, workplace etiquette, and partnerships with local employers — helping youth transition from learning to earning.",
    image: "/images/pic9.jpg",
  },
  {
    slug: "entrepreneurship-economic-empowerment",
    title: "Entrepreneurship & Economic Empowerment",
    summary:
      "Building on skills training, this program supports young people to start, manage, and scale their own ventures.",
    details:
      "Through business planning guidance, startup mentorship, access to local markets, and foundational financial education, participants transform ideas into livelihoods.",
    image: "/images/pic4.jpg",
  },
];

export const AREAS_OF_INTEREST = [
  "Mentorship",
  "Life skills facilitation",
  "Education & tutoring support",
  "Career & internship guidance",
  "Entrepreneurship coaching",
  "Fundraising & partnerships",
  "Events & logistics",
  "Other",
] as const;

export const INVOLVEMENT_PATHWAYS = [
  {
    title: "Volunteer",
    description:
      "Give your time and skills directly to mentorship, workshops, or program support.",
    href: "/volunteer",
    cta: "Apply to volunteer",
  },
  {
    title: "Partner",
    description:
      "Organizations and businesses can partner on training placements, internships, or in-kind support.",
    href: "/get-involved#inquiry",
    cta: "Start a conversation",
  },
  {
    title: "Mentor",
    description:
      "Offer sustained, one-on-one guidance to a young person building their independent life.",
    href: "/get-involved#inquiry",
    cta: "Ask about mentoring",
  },
  {
    title: "Donate",
    description:
      "Fund transitional housing, training, and mentorship directly.",
    href: "/donate",
    cta: "Give now",
  },
] as const;
