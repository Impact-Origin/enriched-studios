import { site } from "@/content/site";
import type { Dictionary } from "./pt";

export const en: Dictionary = {
  nav: {
    services: "Services",
    portfolio: "Work",
    contact: "Contact",
    cta: "Book a call",
    menu: "Menu",
    close: "Close",
    language: "Language",
  },

  actions: {
    bookCall: "Book a call",
    seeWork: "See our work",
    seeServices: "See services",
    talkToUs: "Talk to us",
    playReel: "Watch showreel",
    allWork: "View all work",
    instagram: "Instagram",
  },

  ui: {
    goTo: "Go to image",
    skip: "Skip to content",
    clients: "Companies we work with",
    drag: "Drag to see more",
    prev: "Previous",
    next: "Next",
  },
  notFound: {
    eyebrow: "Error 404",
    title: "This shot does not exist",
    lead: "The page you were looking for moved, changed name or was never recorded. It happens in the best edits.",
    signal: "No signal",
    helpTitle: "You may be looking for",
    cta: "Back to homepage",
  },
  hero: {
    eyebrow: "Video production · Real estate",
    titleLine1: "We film properties.",
    titleLine2: "We build",
    titleAccent: "brands.",
    lead: "Filming, editing and personal branding for real estate agents and agencies. From the first idea to the final post: content that drives viewings, leads and reputation.",
    note: "24h reply · No commitment",
    mediaLabel: "Studio",
    scroll: "Scroll",
  },

  stats: [
    { value: site.stats.videos, label: "Videos delivered" },
    { value: site.stats.agents, label: "Agents and agencies" },
    { value: site.stats.views, label: "Views generated" },
    { value: site.stats.delivery, label: "Average turnaround" },
  ],

  services: {
    eyebrow: "What we do",
    title: "Three pillars, one content system",
    lead: "We don't sell one-off videos. We build a content engine that works for you every single month.",
    timeline: {
      hint: "Drag the playhead or click a block",
      play: "Resume",
      pause: "Pause",
      sliderLabel: "Services timeline",
    },
    items: [
      {
        id: "filming",
        number: "01",
        title: "Filming",
        tagline: "Imagery that raises the value of the property",
        description:
          "Professional crew and gear on site. We film the property the way it deserves to be seen, and we film you with it, so your face becomes part of the deal.",
        deliverables: [
          "4K property tours",
          "Aerial drone video",
          "Real estate photography",
          "Professional sound and lighting",
          "Batch content sessions",
        ],
      },
      {
        id: "editing",
        number: "02",
        title: "Editing",
        tagline: "Post-production that hooks in the first 3 seconds",
        description:
          "We cut for retention. Pacing, captions, colour and sound built for the feed: vertical for social, horizontal for portals and presentations.",
        deliverables: [
          "Reels and vertical cuts",
          "Dynamic captions",
          "Cinematic colour grading",
          "Motion graphics with your brand",
          "48h delivery on working days",
        ],
      },
      {
        id: "branding",
        number: "03",
        title: "Personal branding",
        tagline: "The agent stops being just another name",
        description:
          "Strategy, scripts and a publishing calendar. We work on your positioning so clients come looking for you, not for the listing.",
        deliverables: [
          "Monthly content strategy",
          "Scripts and delivery coaching",
          "Recurring monthly shoots",
          "Publishing and scheduling",
          "Performance reporting",
        ],
      },
    ],
    cta: "See services in detail",
  },

  process: {
    eyebrow: "How we work",
    title: "A simple process, no surprises",
    lead: "You focus on selling. We handle everything else.",
    steps: [
      {
        number: "01",
        title: "Discovery",
        description:
          "A 30-minute call to understand your market, your listings and where you're losing opportunities.",
      },
      {
        number: "02",
        title: "Strategy and scripts",
        description:
          "We define formats, message and calendar. You get the scripts before the shoot. Nothing is improvised.",
      },
      {
        number: "03",
        title: "Shoot day",
        description:
          "We come to the property or to your office. In a single session we capture the listing and several personal content pieces.",
      },
      {
        number: "04",
        title: "Edit and publish",
        description:
          "We edit, deliver within 48h and, if you want, publish and track the results with you.",
      },
    ],
  },

  work: {
    eyebrow: "Work",
    title: "Content that is already selling",
    lead: "A sample of what we produce for agents and agencies. Every piece is built for one platform and one goal.",
    featured: "Featured",
    filters: [
      { id: "all", label: "All" },
      { id: "tours", label: "Property tours" },
      { id: "branding", label: "Personal branding" },
      { id: "events", label: "Events" },
      { id: "interviews", label: "Interviews" },
      { id: "aerial", label: "Aerial" },
      { id: "backstage", label: "Behind the scenes" },
    ],
    items: [
      { id: "w1", title: "Interior with terrace", category: "tours", format: "4:5", duration: "0:07", description: "A calm move through the living room out to the balcony, showing light and space." },
      { id: "w2", title: "Living room in one take", category: "tours", format: "4:5", duration: "0:06", description: "A single movement across the space, no cuts." },
      { id: "w3", title: "Kitchen with life in it", category: "tours", format: "4:5", duration: "0:06", description: "The property filmed with someone inside, to give it scale and use." },
      { id: "w4", title: "Agent on site", category: "branding", format: "9:16", duration: "0:54", description: "Vertical piece shot on a development, with captions and social pacing." },
      { id: "w5", title: "Development walkthrough", category: "interviews", format: "9:16", duration: "1:31", description: "Explaining a project on screen, long form built for authority." },
      { id: "w6", title: "Speaking on stage", category: "events", format: "9:16", duration: "0:44", description: "Coverage of a stage talk, with audience and room detail." },
      { id: "w7", title: "Agency event", category: "events", format: "9:16", duration: "0:40", description: "Office opening and gathering, edited into a brand piece." },
      { id: "w8", title: "Motion graphics piece", category: "branding", format: "9:16", duration: "0:40", description: "Commercial message carried by numbers and animated graphics." },
      { id: "w9", title: "Workday and aerials", category: "aerial", format: "9:16", duration: "0:59", description: "A day of work cut with aerial shots of the development." },
      { id: "p1", title: "Behind the scenes", category: "backstage", format: "4:5", duration: "", description: "Camera set up outdoors on a shooting day." },
      { id: "p2", title: "Podcast studio", category: "backstage", format: "1:1", duration: "", description: "Set ready for an interview, with crew and guests." },
      { id: "p3", title: "Studio interview", category: "interviews", format: "1:1", duration: "", description: "Two camera angles, controlled light and desk audio." },
    ],
    empty: "No work in this category yet.",
    cta: "I want content like this",
  },

  why: {
    eyebrow: "Why Enriched",
    title: "A studio that understands real estate",
    lead: "We've filmed enough homes to know what makes someone request a viewing.",
    items: [
      { title: "Sector specialists", description: "We only work in real estate. We know what to show, in what order and what to cut." },
      { title: "Fast delivery", description: "48 working hours for the main deliverables. A new listing can't wait two weeks." },
      { title: "Built per platform", description: "Vertical for social, horizontal for portals, short versions for paid ads." },
      { title: "Monthly consistency", description: "Recurring plans: every month there's a shoot, an edit and a publishing schedule." },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    lead: "If your question isn't here, write to us and we reply within 24 hours.",
    items: [
      {
        q: "How much does a video cost?",
        a: "It depends on the property, the format and the frequency. We work per project and on monthly plans for those who want consistent content. After a 30-minute call we send a proposal with a fixed price.",
      },
      {
        q: "How long does delivery take?",
        a: "Main deliverables arrive within 48 working hours of the shoot. Larger projects with several locations or motion graphics can take up to five days.",
      },
      {
        q: "Which areas do you cover?",
        a: `We work across ${site.areaServed.slice(0, 3).join(", ")} and the rest of ${site.region}. For projects outside our base, travel is included in the proposal.`,
      },
      {
        q: "Do I have to appear on camera?",
        a: "It's not mandatory, but it's what drives the best results. We prepare scripts, direct you during the shoot and cut anything that doesn't land. Most of our clients had never filmed before.",
      },
      {
        q: "Do you handle publishing too?",
        a: "Yes. On personal branding plans we handle the calendar, the captions and the publishing, and send a monthly report on how each piece performed.",
      },
      {
        q: "Are your drone flights licensed?",
        a: "Yes. Every flight is operated by a certified pilot under ANAC rules, including authorisations in restricted areas.",
      },
      {
        q: "Do you work with agencies or only individual agents?",
        a: "Both. We have plans for individual agents and team formats for agencies, with a consistent visual identity across everyone.",
      },
      {
        q: "How do we start?",
        a: "Fill in the contact form or send us a message on Instagram. We'll book a call, understand your goal and propose the right plan.",
      },
    ],
  },

  cta: {
    eyebrow: "Next step",
    title: "Your next listing deserves better than a phone video",
    lead: "Book a 30-minute call. No commitment: you leave with a concrete plan for your content.",
    primary: "Book a call",
    secondary: "See Instagram",
    note: "24h reply · Fixed-price proposal",
  },

  footer: {
    tagline: "Filming, editing and personal branding for real estate.",
    legalTitle: "Legal",
    complaints: "Complaints book",
    navTitle: "Navigation",
    servicesTitle: "Services",
    contactTitle: "Contact",
    services: ["Property filming", "Editing and post-production", "Personal branding", "Aerial video"],
    rights: "All rights reserved.",
    madeIn: `Made in ${site.city}`,
    builtBy: "Platform developed by",
  },

  pages: {
    home: {
      title: "Enriched Studios · Real estate video and personal branding",
      description:
        "Video production studio for real estate: property tours, reels, drone and personal branding for agents and agencies. 48h delivery.",
    },
    services: {
      title: "Real estate video services",
      description:
        "Property filming, editing and post-production, and personal branding management for real estate agents and agencies.",
      eyebrow: "Services",
      heroTitle: "Everything your listing needs, and your brand too",
      heroLead:
        "We work per project or on a monthly plan. Pick what you need today; we build the rest along the way.",
      includedTitle: "What's included",
      addonsTitle: "Available add-ons",
      addons: [
        "Full property photo session",
        "Floor plan and 360º virtual tour",
        "Paid ads (Meta and Google)",
        "Professional voiceover",
        "English subtitles",
        "Visual identity and templates",
      ],
      pricingTitle: "So what does it cost?",
      pricingLead:
        "Every agent is in a different situation: number of listings, area, goals. That's why we don't work with fixed price lists: we run a 30-minute call and send a fixed-price proposal with no hidden costs.",
      pricingCta: "Request a proposal",
    },
    portfolio: {
      title: "Work",
      description:
        "Enriched Studios portfolio: property tours, vertical reels, aerial video and personal branding content for real estate.",
      eyebrow: "Portfolio",
      heroTitle: "Recent work",
      heroLead:
        "Tours, reels, drone and personal branding content. Filter by type to find what's closest to what you need.",
    },
    contact: {
      title: "Contact",
      description:
        "Talk to Enriched Studios. A 30-minute call with no commitment and a fixed-price proposal within 24 hours.",
      eyebrow: "Contact",
      heroTitle: "Let’s talk.",
      heroLead:
        "Tell us what you need. We reply within 24 hours with next steps and a tailored proposal.",
      infoTitle: "Direct contact",
      whatsappLabel: "Message on WhatsApp",
      availability: "Monday to Friday, 9:30am to 7pm",
      coverage: "Porto and northern Portugal",
      formTitle: "Or leave us a message",
      form: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "name@email.com",
        phone: "Phone",
        phonePlaceholder: "Optional",
        service: "What you're looking for",
        serviceOptions: [
          "Property filming",
          "Editing and post-production",
          "Personal branding",
          "Aerial drone video",
          "Full monthly plan",
          "Other",
        ],
        message: "Message",
        messagePlaceholder: "Tell us about the property, the area and the goal of the video.",
        submit: "Send message",
        submitting: "Sending...",
        success: "Message sent. We'll reply within 24 hours.",
        error: "We couldn't send it. Please try again or email us directly.",
        tooMany: "Too many attempts. Please try again in a few minutes.",
        errors: {
          name: "Please enter your name.",
          email: "Please enter a valid email.",
          message: "Please write us a message.",
        },
        required: "Please fill in the required fields.",
        consent: "By sending, you agree we use your details only to reply to this request. Learn more in our",
        consentLink: "privacy policy",
      },
    },
  },
};
