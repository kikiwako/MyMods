const files = {
    levels: {
        source: "/sources/levels.json",
        target: "/data/local/lng/strings/levels.json"
    },
};

const corner = ">";
const edgeCenter = "+";
const follow = "~";
const center = "X";

const location = " -";
const waypoint = "WP";
const near = "<> ";

const left = "<<";
const right = ">>";
const up = "/\\";
const down = "\\/";
const to = "|";

const opposite = "<->";

const iff = "?";
const then = ":";

const clockwise = `${up}(C)${down}`
const antiClockwise = `${down}(A)${up}`
const or = "/"
const and = "&"

const applyChanges = (files) => {
    const appendString = (key, ...strings) => {
        files.levels.json.find(string => {
            if (string.Key === key) {
                for (const str of strings) {
                    string.enUS += `\n${str}`;
                }
            }
        });
    }

    const newFiles = { ...files };

    // ACT I
    appendString("Blood Moor", `${follow}Path`);
    appendString("Cold Plains", `${follow}Path`, `${corner}Burial Grounds${location}`, `${edgeCenter}Stony Field${location}`);
    appendString("Stony Field", `${follow}Edges`, `${waypoint}${location}`, `${near}path ${to} Cairn Stones${location}`, `Wall${or}Hole ${to} Underground Passage${location}`);
    appendString("Underground Passage Level 1", `${left} ${to} Level 2${location}`, ` ${up}Dark Wood${location}`);
    appendString("Dark Wood", `${follow}Edges`, `${waypoint}${location}`, `Tree of Inifuss${location}`, `${follow}Path ${to} Black Marsh${location}`);
    appendString("Black Marsh", `${follow}Edges`, `${waypoint}${location}`, `Forgotten Tower${location}`, `${follow}Path ${to} Tamoe Highland${location}`);
    appendString("Tower Cellar Level 1", `${left} ${to} Level 2${location}`);
    appendString("Tower Cellar Level 2", `${left} ${to} Level 3${location}`);
    appendString("Tower Cellar Level 3", `${left} ${to} Level 4${location}`);
    appendString("Tower Cellar Level 4", `${left} ${to} Level 5${location}`);
    appendString("Tamoe Highland", `N-E ${to} Monastery Gate${location}`);
    appendString("Outer Cloister", `${iff}${waypoint} on W ${then} Go S-E`, `${iff}${waypoint} on S ${then} Go N-W`, `${waypoint} on N-E ${to} Go N-E`);
    appendString("Barracks", `${left} or ${up}`, `Hammer${location}`, `Jail${location}`);
    appendString("Jail Level 1", `${left} ${to} ${waypoint}`, `${up} ${to} Level 2${location}`);
    appendString("Jail Level 2", `${up} ${to} Level 3${location}`);
    appendString("Jail Level 3", `${left} ${to} Inner Cloister${location}`);
    appendString("Catacombs Level 1", `${follow}Edges`, `Level 2${location}`);
    appendString("Catacombs Level 2", `${clockwise} ${or} ${left} from L3 ${to} ${waypoint}${location}`, `${antiClockwise} ${or} ${right} from WP ${to} Level 3${location}`);
    appendString("Catacombs Level 3", `${follow}Edges`);

    // ACT II
    appendString("Sewers Level 1", `${left} or ${right} from S-E ${to} Level 2${location}`);
    appendString("Sewers Level 2", `${left} ${to} ${waypoint}${location}`, `${up} ${to} Level 3${location}`);
    appendString("Sewers Level 3", `${left} ${to} Radament${location}`);
    appendString("Rocky Waste", `${follow}Edges`, `${corner} ${to} Dry Hills${location}`);
    appendString("Dry Hills", `${follow}Edges`, `${waypoint}${location}`, `Halls of the Dead${location}`, `${corner} ${to} Far Oasis${location}`);
    appendString("Halls of the Dead Level 1", `${left} ${to} Level 2${location}`);
    appendString("Halls of the Dead Level 2", `${up} ${to} ${waypoint}${location}`, `${left} ${to} Level 3${location}`);
    appendString("Halls of the Dead Level 3", `${left} ${to} Cube${location}`);
    appendString("Far Oasis", `${follow}Edges`, `${waypoint}${location}`, `Maggot Lair${location}`, `${corner} ${to} Lost City${location}`);
    appendString("Maggot Lair Level 1", `${right} ${to} Level 2${location}`);
    appendString("Maggot Lair Level 2", `${right} ${to} Level 3${location}`);
    appendString("Maggot Lair Level 3", `N-E ${to} Staff${location}`);
    appendString("Lost City", `N ${or} W ${or} E ${corner} ${to} Valley${location}`);
    appendString("Claw Viper Temple Level 1", `${left} ${to} Level 2${location}`);
    appendString("Harem Level 2", `N ${and} S ${to} Palace Cellar${location}`);
    appendString("Palace Cellar Level 1", `S ${to} ${waypoint}${location}`, `N ${and} S ${to} Level 2${location}`);
    appendString("Palace Cellar Level 2", `N ${and} S ${to} Level 3${location}`);
    appendString("Palace Cellar Level 3", `${center} ${to} Arcane Sanctuary${location}`);
    appendString("Arcane Sanctuary", `Flat ${opposite} Portals`, `Stairs ${opposite} Windy`, `Flat, Portals, Windy, Stairs`);
    appendString("Canyon of the Magi", `| O | _ | [ ] |    +    | \\/ | /\\ | _O_ |`);
    appendString("Tal Rasha's Tomb", `${left} ${to} Duriel${location}`);

    // ACT III
    appendString("Spider Forest", `2x6`, `3 POI ${opposite} River`, `Spider Cavern${location}`, `Great Marsh${location}`, `Flayer Jungle?${location}`, `Ex 1-3-5-6`);
    appendString("Spider Cavern", `S-W ${to} Eye-${location}`);
    appendString("Great Marsh", `2x6`, `3 POI ${opposite} River`, `${waypoint}${location}`, `Flayer Jungle?${location}`, `Ex 1-3-5-6`);
    appendString("Flayer Jungle", `2x6`, `3 POI ${opposite} River`, `${waypoint}${location}`, `Flayer Dungeon${location}`, `N-E ${to} Lower Kurast${location}`);
    appendString("Flayer Dungeon Level 1", `${left} ${to} Level 2${location}`);
    appendString("Flayer Dungeon Level 2", `${left} ${to} Level 3${location}`);
    appendString("Lower Kurast", `Grid`, `Check 2 rows/columns`, `${waypoint}${location}`, `N or E ${to} Kurast Bazaar${location}`);
    appendString("Kurast Bazaar", `Grid`, `Check 2 rows/columns`, `${waypoint}${location}`, `Ruined Temple${location}`, `Near ${center} ${to} Sewers${location}`);
    appendString("Upper Kurast", `Grid`, `Check 2 rows/columns`, `${waypoint}${location}`, `N-E ${to} Travincal${location}`);
    appendString("Travincal", `N-NW ${to} ${waypoint}${location}`, `N-E ${to} Council-${location}`);
    appendString("Durance of Hate Level 1", `${left} ${to} Level 2${location}`);
    appendString("Durance of Hate Level 2", `${left} ${to} ${waypoint}${location}`, `${up} ${to} Level 3${location}`);

    // ACT IV
    appendString("Outer Steppes", `W ${or} E ${or} S-E ${to} Plains of Despair${location}`);
    appendString("Plains of Despair", `${right}${down} ${or} ${up} ${or} ${left}${up} ${to} City of the Damned${location}`);
    appendString("River of Flame", `N-W ${or} S-E ${to} Hellforge${location}`, `N-E ${to} Chaos Sanctuary${location}`, `Always ${left}, ${iff} H then ${right}`);

    // ACT V
    appendString("Bloody Foothills", `N-W ${to} Frigid Highlands${location}`);
    appendString("Frigid Highlands", `N-E ${or} N-W ${to} Arreat Plateau${location}`, `${follow}Stairs`);
    appendString("Arreat Plateau", `N-E ${or} N-W ${to} Crystalline Passage${location}`, `${follow}Stairs`);
    appendString("Crystalline Cavern Level 1", `${right} ${to} ${waypoint}${location}`, `${up} ${to} Frozen River${location}`, `${left} ${to} Glacial Trail${location}`);
    appendString("Cellar of Pity", `${follow}Walls ${to} Anya-${location}`);
    appendString("Crystalized Cavern Level 2", `${right} (?${left}x3) ${to} ${waypoint}${location}`, `${left} ${to} Frozen Tundra${location}`);
    appendString("Frozen Tundra", `N-W ${to} Ancients${location}`);
    appendString("Glacial Caves Level 1", `${right} ${to} ${waypoint}${location}`, `${left} ${to} Arreat Summit${location}`);
    appendString("Halls of Anguish", `Look for the 2 red eyes`);
    appendString("Halls of Death's Calling", `Look for the 2 red eyes`);
    appendString("Halls of Tormented Insanity", `Look for the 2 red eyes`);
    appendString("Halls of Vaught", `Look for the 2 red eyes`);
    appendString("The Worldstone Keep Level 2", `${antiClockwise} ${or} ${left} from L3 | ${waypoint}-`, `${clockwise} ${or} ${right} from ${waypoint} ${to} Level 3${location}`);

    return newFiles;
};

export {
    files,
    applyChanges
};