// Comprehensive vehicle makes and models data
// Used across all forms: Sell/Trade, Sell Car, Pre-Qualify, Admin

export const VEHICLE_MAKES = [
  "Acura", "Alfa Romeo", "Aston Martin", "Audi",
  "Bentley", "BMW", "Buick", "Bugatti",
  "Cadillac", "Chevrolet", "Chrysler", "Citroën",
  "Daewoo", "Daihatsu", "Dodge",
  "Ferrari", "Fiat", "Ford",
  "Genesis", "GMC",
  "Honda", "Hummer", "Hyundai",
  "Infiniti", "Isuzu",
  "Jaguar", "Jeep",
  "Kia",
  "Lamborghini", "Land Rover", "Lexus", "Lincoln", "Lotus",
  "Maserati", "Mazda", "McLaren", "Mercedes-Benz", "Mercury", "Mini", "Mitsubishi",
  "Nissan",
  "Oldsmobile", "Opel",
  "Peugeot", "Plymouth", "Polestar", "Pontiac", "Porsche",
  "Ram", "Rivian", "Rolls-Royce",
  "Saab", "Saturn", "Scion", "Smart", "Subaru", "Suzuki",
  "Tesla", "Toyota",
  "Volkswagen", "Volvo",
];

export const VEHICLE_MODELS = {
  Acura: ["CL", "CSX", "EL", "ILX", "Integra", "Legend", "MDX", "NSX", "RDX", "RL", "RLX", "RSX", "TL", "TLX", "TSX", "Vigor", "ZDX"],
  "Alfa Romeo": ["4C", "Giulia", "Giulietta", "MiTo", "Spider", "Stelvio", "Tonale"],
  "Aston Martin": ["DB7", "DB9", "DB11", "DB12", "DBS", "DBX", "Rapide", "V12 Vantage", "Vantage", "Vanquish", "Virage"],
  Audi: ["80", "90", "100", "200", "A1", "A3", "A4", "A5", "A6", "A7", "A8", "allroad", "e-tron", "e-tron GT", "Q2", "Q3", "Q4 e-tron", "Q5", "Q7", "Q8", "Q8 e-tron", "R8", "RS3", "RS4", "RS5", "RS6", "RS7", "RS Q8", "S3", "S4", "S5", "S6", "S7", "S8", "SQ5", "SQ7", "SQ8", "TT", "TTS", "TT RS"],
  Bentley: ["Arnage", "Azure", "Bentayga", "Brooklands", "Continental", "Continental GT", "Continental GTC", "Flying Spur", "Mulsanne"],
  BMW: ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "6 Series", "7 Series", "8 Series", "i3", "i4", "i5", "i7", "i8", "iX", "iX1", "iX3", "M2", "M3", "M4", "M5", "M6", "M8", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "XM", "Z3", "Z4"],
  Buick: ["Cascada", "Century", "Enclave", "Encore", "Encore GX", "Envision", "Envista", "LaCrosse", "LeSabre", "Lucerne", "Park Avenue", "Rainier", "Regal", "Rendezvous", "Riviera", "Skylark", "Terraza", "Verano"],
  Bugatti: ["Chiron", "Veyron"],
  Cadillac: ["ATS", "Brougham", "CT4", "CT5", "CT6", "CTS", "DeVille", "DTS", "Eldorado", "ELR", "Escalade", "Escalade ESV", "Fleetwood", "Lyriq", "Seville", "SRX", "STS", "XT4", "XT5", "XT6", "XTS"],
  Chevrolet: ["Astro", "Avalanche", "Aveo", "Blazer", "Bolt", "Bolt EUV", "Camaro", "Captiva", "Cavalier", "Cobalt", "Colorado", "Corvette", "Cruze", "Equinox", "Express", "HHR", "Impala", "Malibu", "Monte Carlo", "Orlando", "Silverado 1500", "Silverado 2500HD", "Silverado 3500HD", "Sonic", "Spark", "Suburban", "Tahoe", "Tracker", "TrailBlazer", "Traverse", "Trax", "Uplander", "Venture"],
  Chrysler: ["200", "300", "300C", "300M", "Aspen", "Concorde", "Crossfire", "Grand Voyager", "Intrepid", "LHS", "Neon", "New Yorker", "Pacifica", "PT Cruiser", "Sebring", "Town & Country", "Voyager"],
  "Citroën": ["Berlingo", "C3", "C4", "C5", "DS3", "DS4", "DS5"],
  Daewoo: ["Lanos", "Leganza", "Matiz", "Nubira"],
  Daihatsu: ["Charade", "Rocky", "Terios"],
  Dodge: ["Avenger", "Caliber", "Caravan", "Challenger", "Charger", "Dakota", "Dart", "Durango", "Grand Caravan", "Hornet", "Intrepid", "Journey", "Magnum", "Neon", "Nitro", "Ram 1500", "Ram 2500", "Ram 3500", "Stealth", "Stratus", "Viper"],
  Ferrari: ["296 GTB", "296 GTS", "360", "430", "458", "488", "812", "California", "F8 Tributo", "F12", "FF", "GTC4Lusso", "LaFerrari", "Portofino", "Roma", "SF90"],
  Fiat: ["124 Spider", "500", "500L", "500X", "Panda", "Punto", "Tipo"],
  Ford: ["Bronco", "Bronco Sport", "C-Max", "Crown Victoria", "E-Series", "EcoSport", "Edge", "Escape", "Excursion", "Expedition", "Explorer", "F-150", "F-250", "F-350", "Fiesta", "Five Hundred", "Flex", "Focus", "Freestar", "Freestyle", "Fusion", "Galaxy", "GT", "Maverick", "Mondeo", "Mustang", "Mustang Mach-E", "Ranger", "Taurus", "Thunderbird", "Transit", "Windstar"],
  Genesis: ["G70", "G80", "G90", "GV60", "GV70", "GV80", "GV80 Coupe"],
  GMC: ["Acadia", "Canyon", "Envoy", "Hummer EV", "Jimmy", "Safari", "Savana", "Sierra 1500", "Sierra 2500HD", "Sierra 3500HD", "Sonoma", "Terrain", "Yukon", "Yukon XL"],
  Honda: ["Accord", "Civic", "Clarity", "CR-V", "CR-Z", "Crosstour", "Element", "Fit", "HR-V", "Insight", "Odyssey", "Passport", "Pilot", "Prelude", "Prologue", "Ridgeline", "S2000"],
  Hummer: ["H1", "H2", "H3", "H3T"],
  Hyundai: ["Accent", "Azera", "Elantra", "Elantra GT", "Entourage", "Equus", "Genesis", "Genesis Coupe", "Ioniq", "Ioniq 5", "Ioniq 6", "Kona", "Kona Electric", "Nexo", "Palisade", "Santa Cruz", "Santa Fe", "Sonata", "Tiburon", "Tucson", "Veloster", "Venue", "Veracruz", "XG350"],
  Infiniti: ["EX35", "FX35", "FX45", "G25", "G35", "G37", "I35", "JX35", "M35", "M37", "M45", "M56", "Q40", "Q50", "Q60", "Q70", "QX30", "QX50", "QX55", "QX56", "QX60", "QX70", "QX80"],
  Isuzu: ["Amigo", "Ascender", "Axiom", "Hombre", "i-Series", "Rodeo", "Trooper", "VehiCROSS"],
  Jaguar: ["E-PACE", "F-PACE", "F-TYPE", "I-PACE", "S-Type", "X-Type", "XE", "XF", "XJ", "XJR", "XK", "XKR"],
  Jeep: ["Cherokee", "Commander", "Compass", "Gladiator", "Grand Cherokee", "Grand Cherokee L", "Grand Wagoneer", "Liberty", "Patriot", "Renegade", "Wagoneer", "Wrangler", "Wrangler Unlimited"],
  Kia: ["Amanti", "Borrego", "Cadenza", "Carnival", "EV6", "EV9", "Forte", "K5", "K900", "Magentis", "Niro", "Niro EV", "Optima", "Rio", "Rondo", "Sedona", "Seltos", "Sorento", "Soul", "Spectra", "Sportage", "Stinger", "Telluride"],
  Lamborghini: ["Aventador", "Countach", "Diablo", "Gallardo", "Huracán", "Murciélago", "Revuelto", "Urus"],
  "Land Rover": ["Defender", "Discovery", "Discovery Sport", "Freelander", "LR2", "LR3", "LR4", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar"],
  Lexus: ["CT", "ES", "GS", "GX", "HS", "IS", "LC", "LFA", "LS", "LX", "NX", "RC", "RX", "RZ", "SC", "TX", "UX"],
  Lincoln: ["Aviator", "Blackwood", "Continental", "Corsair", "LS", "Mark LT", "Mark VIII", "MKC", "MKS", "MKT", "MKX", "MKZ", "Nautilus", "Navigator", "Town Car", "Zephyr"],
  Lotus: ["Eletre", "Elise", "Emira", "Esprit", "Evija", "Evora", "Exige"],
  Maserati: ["Ghibli", "GranCabrio", "GranSport", "GranTurismo", "Grecale", "Levante", "MC20", "Quattroporte", "Spyder"],
  Mazda: ["2", "3", "5", "6", "B-Series", "CX-3", "CX-30", "CX-5", "CX-50", "CX-7", "CX-70", "CX-9", "CX-90", "Mazda3", "Mazda6", "Millenia", "MPV", "MX-5 Miata", "MX-30", "Protege", "RX-7", "RX-8", "Tribute"],
  McLaren: ["540C", "570GT", "570S", "600LT", "620R", "650S", "675LT", "720S", "750S", "765LT", "Artura", "Elva", "GT", "MP4-12C", "P1", "Senna", "Speedtail"],
  "Mercedes-Benz": ["A-Class", "AMG GT", "AMG ONE", "B-Class", "C-Class", "CL", "CLA", "CLE", "CLK", "CLS", "E-Class", "EQA", "EQB", "EQC", "EQE", "EQS", "G-Class", "GL", "GLA", "GLB", "GLC", "GLE", "GLK", "GLS", "Maybach", "Metris", "ML", "R-Class", "S-Class", "SL", "SLC", "SLK", "SLR McLaren", "SLS AMG", "Sprinter"],
  Mercury: ["Cougar", "Grand Marquis", "Mariner", "Milan", "Montego", "Monterey", "Mountaineer", "Sable", "Villager"],
  Mini: ["Clubman", "Convertible", "Cooper", "Countryman", "Coupe", "Hardtop", "Paceman", "Roadster"],
  Mitsubishi: ["3000GT", "Eclipse", "Eclipse Cross", "Endeavor", "Galant", "i-MiEV", "Lancer", "Mirage", "Montero", "Outlander", "Outlander PHEV", "Outlander Sport", "Raider", "RVR"],
  Nissan: ["350Z", "370Z", "Altima", "Ariya", "Armada", "Frontier", "GT-R", "Juke", "Kicks", "Leaf", "Maxima", "Micra", "Murano", "NV", "Pathfinder", "Quest", "Rogue", "Rogue Sport", "Sentra", "Titan", "Versa", "X-Trail", "Xterra", "Z"],
  Oldsmobile: ["Alero", "Aurora", "Bravada", "Cutlass", "Intrigue", "Silhouette"],
  Opel: ["Astra", "Corsa", "Insignia", "Mokka"],
  Peugeot: ["2008", "208", "3008", "308", "5008", "508"],
  Plymouth: ["Breeze", "Neon", "Prowler", "Voyager"],
  Polestar: ["1", "2", "3", "4"],
  Pontiac: ["Aztek", "Bonneville", "Firebird", "G5", "G6", "G8", "Grand Am", "Grand Prix", "GTO", "Montana", "Solstice", "Sunfire", "Torrent", "Vibe", "Wave"],
  Porsche: ["718 Boxster", "718 Cayman", "911", "918 Spyder", "928", "944", "968", "Boxster", "Carrera GT", "Cayenne", "Cayman", "Macan", "Panamera", "Taycan"],
  Ram: ["1500", "1500 Classic", "2500", "3500", "ProMaster", "ProMaster City"],
  Rivian: ["R1S", "R1T", "R2"],
  "Rolls-Royce": ["Cullinan", "Dawn", "Ghost", "Phantom", "Silver Shadow", "Spectre", "Wraith"],
  Saab: ["9-2X", "9-3", "9-4X", "9-5", "9-7X"],
  Saturn: ["Astra", "Aura", "Ion", "L-Series", "Outlook", "Relay", "S-Series", "Sky", "Vue"],
  Scion: ["FR-S", "iA", "iM", "iQ", "tC", "xA", "xB", "xD"],
  Smart: ["EQ ForTwo", "ForFour", "ForTwo"],
  Subaru: ["Ascent", "B9 Tribeca", "Baja", "BRZ", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "Solterra", "SVX", "Tribeca", "WRX", "XV"],
  Suzuki: ["Aerio", "Equator", "Esteem", "Forenza", "Grand Vitara", "Jimny", "Kizashi", "Reno", "Sidekick", "Swift", "SX4", "Vitara", "XL7"],
  Tesla: ["Cybertruck", "Model 3", "Model S", "Model X", "Model Y", "Roadster", "Semi"],
  Toyota: ["4Runner", "86", "Avalon", "bZ4X", "Camry", "C-HR", "Celica", "Corolla", "Corolla Cross", "Crown", "Echo", "FJ Cruiser", "GR86", "GR Corolla", "GR Supra", "Grand Highlander", "Highlander", "Land Cruiser", "Matrix", "Mirai", "MR2", "Prius", "Prius Prime", "RAV4", "RAV4 Prime", "Sequoia", "Sienna", "Solara", "Supra", "Tacoma", "Tercel", "Tundra", "Venza", "Yaris"],
  Volkswagen: ["Arteon", "Atlas", "Atlas Cross Sport", "Beetle", "CC", "e-Golf", "Eos", "Golf", "Golf GTI", "Golf R", "ID.4", "ID. Buzz", "Jetta", "Jetta GLI", "New Beetle", "Passat", "Phaeton", "Rabbit", "Routan", "Taos", "Tiguan", "Touareg"],
  Volvo: ["C30", "C40 Recharge", "C70", "EX30", "EX90", "S40", "S60", "S70", "S80", "S90", "V40", "V50", "V60", "V60 Cross Country", "V70", "V90", "V90 Cross Country", "XC40", "XC60", "XC70", "XC90"],
};

/**
 * Filter makes by search query
 * @param {string} query - The search text
 * @returns {string[]} Filtered array of make names
 */
export function filterMakes(query) {
  if (!query) return VEHICLE_MAKES;
  const q = query.toLowerCase();
  return VEHICLE_MAKES.filter((make) => make.toLowerCase().includes(q));
}

/**
 * Filter models for a given make by search query
 * @param {string} make - The vehicle make
 * @param {string} query - The search text
 * @returns {string[]} Filtered array of model names
 */
export function filterModels(make, query) {
  const models = VEHICLE_MODELS[make] || [];
  if (!query) return models;
  const q = query.toLowerCase();
  return models.filter((model) => model.toLowerCase().includes(q));
}
