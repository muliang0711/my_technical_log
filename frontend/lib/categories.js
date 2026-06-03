import {
  BookOpen,
  BriefcaseBusiness,
  Code2,
  Globe2,
  GraduationCap,
  Heart,
  MapPin,
  Sparkles,
  TrendingUp
} from "lucide-react";

export const categoryDefinitions = [
  {
    name: "Software Development",
    slug: "software",
    description: "Programming languages, frameworks, tools, and best...",
    fullDescription: "Programming languages, frameworks, tools, and architecture patterns",
    icon: Code2
  },
  {
    name: "Fitness & Health",
    slug: "fitness",
    description: "Exercise routines, nutrition, mental health, and wellness",
    fullDescription: "Sustainable exercise routines, nutrition science, and holistic wellness practices",
    icon: Heart
  },
  {
    name: "Finance",
    slug: "finance",
    description: "Personal finance, investing, budgeting, and financial planning",
    fullDescription: "Personal finance strategies, investment principles, and long-term wealth building",
    icon: BriefcaseBusiness
  },
  {
    name: "Travel",
    slug: "travel",
    description: "Travel experiences, destination guides, and cultural insights",
    fullDescription: "Exploring new places, understanding different cultures, and broadening perspectives",
    icon: MapPin
  },
  {
    name: "Life Reflections",
    slug: "life",
    description: "Personal growth, philosophy, productivity, and life lessons",
    fullDescription: "Personal growth, productivity systems, and reflections on meaningful living",
    icon: Sparkles
  },
  {
    name: "Learning",
    slug: "learning",
    description: "Study techniques, online courses, books, and continuous education",
    fullDescription: "Study techniques, online courses, books, and the art of learning itself",
    icon: BookOpen
  }
];

export const focusAreas = [
  { ...categoryDefinitions[0], name: "Software Development" },
  { ...categoryDefinitions[1], name: "Health & Fitness" },
  { ...categoryDefinitions[2], icon: TrendingUp },
  { ...categoryDefinitions[3], name: "Travel & Culture", icon: Globe2 },
  { ...categoryDefinitions[4], name: "Life Philosophy", icon: BookOpen },
  { ...categoryDefinitions[5], name: "Continuous Learning", icon: GraduationCap }
];

export function getCategoryDefinition(name) {
  return categoryDefinitions.find((category) => category.name === name) ?? {
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    description: "Knowledge notes and reference material",
    fullDescription: "Knowledge notes and reference material",
    icon: BookOpen
  };
}

export function getCategoryBySlug(slug) {
  return categoryDefinitions.find((category) => category.slug === slug);
}

export function getCategorySlugs() {
  return categoryDefinitions.map((category) => category.slug);
}
