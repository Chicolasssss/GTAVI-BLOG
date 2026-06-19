export type CategoryType = "vehicles" | "weapons" | "characters" | "locations"
export type ConfirmationStatus = "confirmed" | "leaked" | "speculated"

export interface DatabaseEntry {
  id: string;
  slug: string;
  name: string;
  category: CategoryType;
  description: string;
  confirmation_status: ConfirmationStatus;
  date_added: string;
  image?: string;
  
  // Specific to Vehicles
  manufacturer?: string;
  vehicle_class?: string;
  
  // Specific to Weapons
  weapon_type?: string;
  estimated_damage?: string;
  
  // Specific to Locations
  district?: string;
  zone_type?: string;
}

export const DATABASE_ENTRIES: DatabaseEntry[] = [
  // CHARACTERS
  {
    id: "char-1",
    slug: "lucia",
    name: "Lucia",
    category: "characters",
    description: "One of the two main protagonists of Grand Theft Auto VI. First introduced in the September 2022 leaks and fully revealed in Trailer 1. She appears to be of Latin American descent and is involved in a Bonnie and Clyde-style criminal relationship.",
    confirmation_status: "confirmed",
    date_added: "2023-12-05",
  },
  {
    id: "char-2",
    slug: "jason",
    name: "Jason",
    category: "characters",
    description: "The second main protagonist alongside Lucia. He was heavily featured in the 2022 leaks and made a brief appearance in Trailer 1. His relationship with Lucia drives the central narrative of the game.",
    confirmation_status: "confirmed",
    date_added: "2023-12-05",
  },
  {
    id: "char-3",
    slug: "stefanie",
    name: "Stefanie",
    category: "characters",
    description: "Seen in the official Trailer 1, a prison counselor or probation officer talking to Lucia in the opening scene.",
    confirmation_status: "confirmed",
    date_added: "2023-12-06",
  },
  {
    id: "char-4",
    slug: "dre",
    name: "Dre",
    category: "characters",
    description: "Mentioned and seen during the 2022 leaks. Appears to be an associate or friend of Jason and Lucia.",
    confirmation_status: "leaked",
    date_added: "2023-12-10",
  },

  // VEHICLES
  {
    id: "veh-1",
    slug: "bravado-banshee-vi",
    name: "Bravado Banshee (Gen VI)",
    category: "vehicles",
    manufacturer: "Bravado",
    vehicle_class: "Sports",
    description: "The iconic Banshee returns with a redesigned body inspired by the real-world Dodge Viper SRT. Spotted weaving through traffic in Vice Beach during Trailer 1.",
    confirmation_status: "confirmed",
    date_added: "2023-12-06",
  },
  {
    id: "veh-2",
    slug: "pegassi-ignus-custom",
    name: "Pegassi Ignus Custom",
    category: "vehicles",
    manufacturer: "Pegassi",
    vehicle_class: "Super",
    description: "A heavily customized variant of the Pegassi Ignus, featuring neon underglow and a widebody kit. Spotted in the leaks during a street racing sequence.",
    confirmation_status: "leaked",
    date_added: "2024-01-15",
  },
  {
    id: "veh-3",
    slug: "vapid-dominator-gtx",
    name: "Vapid Dominator GTX",
    category: "vehicles",
    manufacturer: "Vapid",
    vehicle_class: "Muscle",
    description: "A modern muscle car seen multiple times during highway shots in the trailer. Features aggressive styling similar to a modern Mustang.",
    confirmation_status: "confirmed",
    date_added: "2023-12-07",
  },
  {
    id: "veh-4",
    slug: "grotti-cheetah-classic",
    name: "Grotti Cheetah Classic",
    category: "vehicles",
    manufacturer: "Grotti",
    vehicle_class: "Sports Classics",
    description: "A staple of the 3D universe Vice City, this 80s Ferrari Testarossa lookalike makes a glorious return passing by Ocean Drive.",
    confirmation_status: "confirmed",
    date_added: "2023-12-08",
  },
  {
    id: "veh-5",
    slug: "maibatsu-sanchez",
    name: "Maibatsu Sanchez",
    category: "vehicles",
    manufacturer: "Maibatsu",
    vehicle_class: "Motorcycles",
    description: "The classic dirt bike returns. Heavily featured in the Thrillbilly Mud Club sequences.",
    confirmation_status: "confirmed",
    date_added: "2023-12-09",
  },
  {
    id: "veh-6",
    slug: "pfister-comet-retro",
    name: "Pfister Comet Retro Custom",
    category: "vehicles",
    manufacturer: "Pfister",
    vehicle_class: "Sports",
    description: "Spotted in the 2022 leaks, parked outside a motel. The wide-body Porsche 911 equivalent.",
    confirmation_status: "leaked",
    date_added: "2023-12-11",
  },

  // WEAPONS
  {
    id: "weap-1",
    slug: "compact-rifle",
    name: "Compact Rifle",
    category: "weapons",
    weapon_type: "Assault Rifle",
    estimated_damage: "High",
    description: "A short-barreled assault rifle heavily featured in the diner robbery sequence of the 2022 leaks. It appears to be highly customizable.",
    confirmation_status: "leaked",
    date_added: "2023-12-10",
  },
  {
    id: "weap-2",
    slug: "pump-shotgun",
    name: "Police Pump Shotgun",
    category: "weapons",
    weapon_type: "Shotgun",
    estimated_damage: "Extreme (Close Range)",
    description: "Standard issue shotgun used by the Vice City Police Department. Seen during the trailer when VCPD raids a motel.",
    confirmation_status: "confirmed",
    date_added: "2023-12-05",
  },
  {
    id: "weap-3",
    slug: "heavy-pistol",
    name: "Heavy Pistol",
    category: "weapons",
    weapon_type: "Handgun",
    estimated_damage: "Medium",
    description: "Jason is seen holding what appears to be a 1911-style Heavy Pistol during the convenience store robbery in Trailer 1.",
    confirmation_status: "confirmed",
    date_added: "2023-12-06",
  },
  {
    id: "weap-4",
    slug: "baseball-bat",
    name: "Baseball Bat",
    category: "weapons",
    weapon_type: "Melee",
    estimated_damage: "Low",
    description: "A classic melee weapon. Seen in the leaks during an animation test for stealth takedowns.",
    confirmation_status: "leaked",
    date_added: "2023-12-12",
  },
  {
    id: "weap-5",
    slug: "molotov-cocktail",
    name: "Molotov Cocktail",
    category: "weapons",
    weapon_type: "Throwable",
    estimated_damage: "Area of Effect (Fire)",
    description: "Confirmed via the leaks menu wheel. Standard fire-based throwable weapon.",
    confirmation_status: "leaked",
    date_added: "2023-12-14",
  },

  // LOCATIONS
  {
    id: "loc-1",
    slug: "vice-beach",
    name: "Vice Beach",
    category: "locations",
    district: "Vice City",
    zone_type: "Commercial / Leisure",
    description: "The bustling coastal stretch of Vice City, featuring densely packed hotels, neon-lit clubs, and crowded sandy beaches. The opening shot of Trailer 1.",
    confirmation_status: "confirmed",
    date_added: "2023-12-04",
  },
  {
    id: "loc-2",
    slug: "port-gellhorn",
    name: "Port Gellhorn",
    category: "locations",
    district: "Leonida West",
    zone_type: "Industrial / Rural",
    description: "A distinct, grittier town located away from the glitz of Vice City. Known for its raceway, industrial areas, and heavy police presence in the leaks.",
    confirmation_status: "leaked",
    date_added: "2023-12-15",
  },
  {
    id: "loc-3",
    slug: "kelly-county",
    name: "Kelly County",
    category: "locations",
    district: "Leonida North",
    zone_type: "Swamp / Rural",
    description: "A muddy, alligator-infested swamp region featured in the trailer, likely inspired by the real-world Florida Everglades.",
    confirmation_status: "confirmed",
    date_added: "2023-12-05",
  },
  {
    id: "loc-4",
    slug: "gator-keys",
    name: "Gator Keys",
    category: "locations",
    district: "Leonida South",
    zone_type: "Islands / Highway",
    description: "An archipelago connected by long highway bridges, heavily inspired by the Florida Keys. Seen prominently in Trailer 1.",
    confirmation_status: "confirmed",
    date_added: "2023-12-06",
  },
  {
    id: "loc-5",
    slug: "ocean-drive",
    name: "Ocean Drive",
    category: "locations",
    district: "Vice City",
    zone_type: "Nightlife",
    description: "The neon-drenched avenue running parallel to Vice Beach. Packed with lowriders, sports cars, and clubs.",
    confirmation_status: "confirmed",
    date_added: "2023-12-07",
  },
  {
    id: "loc-6",
    slug: "wynwood",
    name: "Wynwood Arts District",
    category: "locations",
    district: "Vice City",
    zone_type: "Commercial",
    description: "A neighborhood covered in colorful graffiti and street art, directly inspired by Miami's Wynwood Walls. Seen briefly in the trailer.",
    confirmation_status: "confirmed",
    date_added: "2023-12-08",
  }
];

export function getEntriesByCategory(category: CategoryType | "all") {
  if (category === "all") return DATABASE_ENTRIES;
  return DATABASE_ENTRIES.filter(e => e.category === category);
}

export function getEntryBySlug(slug: string) {
  return DATABASE_ENTRIES.find(e => e.slug === slug);
}
