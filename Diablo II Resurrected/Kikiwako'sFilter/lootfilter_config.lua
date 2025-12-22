--- Filter Title: Kikiwako
--- Filter Type: (None)
--- Filter Description: patente
local anywhere = {"onground", "onplayer", "equipped", "atvendor"}
local stats = {
    requiredLevel = 92
}

function getRules()
    local rules = {{
        codes = "allitems",
        ethereal = true,
        location = anywhere,
        itype = itemTypes({"Weapon", "Any_Armor"}),
        suffix = "{gray}"
    }, {
        codes = "allitems",
        ethereal = false,
        location = anywhere,
        itype = itemTypes({"Weapon", "Any_Armor"}),
        suffix = "{white}"
    }}

    appendArray(rules, suffixRarity())

    appendArray(rules, {{
        codes = "allitems",
        location = anywhere,
        itype = itemTypes({"Weapon", "Any_Armor"}),
        suffix = "-{ilvl}"
    }})

    appendArray(rules, suffixSocketCount())
    appendArray(rules, suffixRuneHelpers())

    return rules
end

function suffixRarity()
    return {{
        codes = "allitems",
        rarity = 0,
        location = anywhere,
        itype = itemTypes({"Any"}),
        suffix = " 1"
    }, {
        codes = "allitems",
        rarity = 1,
        location = anywhere,
        itype = itemTypes({"Any"}),
        suffix = "2"
    }, {
        codes = "allitems",
        rarity = 2,
        location = anywhere,
        itype = itemTypes({"Any"}),
        suffix = "3"
    }}
end

function appendArray(targetArray, sourceArray)
    for _, v in ipairs(sourceArray) do
        table.insert(targetArray, v)
    end
end

function getRuneObj(name, text)
    return {
        codes = rune(string.lower(name)),
        itype = 74,
        location = {"onplayer"},
        suffix = text
    }
end

function suffixRuneHelpers()
    return {getRuneObj("El", " {gray}> Eld"), getRuneObj("Eld", " {gray}> Tir"), getRuneObj("Tir", " {gray}> Nef"),
            getRuneObj("Nef", " {gray}> Eth"), getRuneObj("Eth", " {gray}> Ith"), getRuneObj("Ith", " {gray}> Tal"),
            getRuneObj("Tal", " {gray}> Ral"), getRuneObj("Ral", " {gray}> Ort"), getRuneObj("Ort", " {gray}> Thul"),
            getRuneObj("Thul", " {yellow}> {gray} Amn"), getRuneObj("Amn", " {purple}> {gray} Sol"),
            getRuneObj("Sol", " {blue}> {gray} Shael"), getRuneObj("Shael", " {red}> {gray} Dol"),
            getRuneObj("Dol", " {green}> {gray} Hel"), getRuneObj("Hel", " {white}> {gray} Io"),
            getRuneObj("Io", " {yellow}> {gray} Lum"), getRuneObj("Lum", " {purple}> {gray} Ko"),
            getRuneObj("Ko", " {blue}> {gray} Fal"), getRuneObj("Fal", " {red}> {gray} Lem"),
            getRuneObj("Lem", " {green}> {gray} Pul"), getRuneObj("Pul", " {white}> {gray} Um"),
            getRuneObj("Um", " {yellow}> {gray} Mal"), getRuneObj("Mal", " {purple}> {gray} Ist"),
            getRuneObj("Ist", " {blue}> {gray} Gul"), getRuneObj("Gul", " {red}> {gray} Vex"),
            getRuneObj("Vex", " {green}> {gray} Ohm"), getRuneObj("Ohm", " {white}> {gray} Lo"),
            getRuneObj("Lo", " {yellow}> {gray} Sur"), getRuneObj("Sur", " {purple}> {gray} Ber"),
            getRuneObj("Ber", " {blue}> {gray} Jah"), getRuneObj("Jah", " {red}> {gray} Cham"),
            getRuneObj("Cham", " {green}> {gray} Zod"), getRuneObj("Zod", " {gray}(holy shit a Zod!)")}
end

function suffixSocketCount()
    return { -- Display socket count in gray, to the right of item name, [x/m]
    {
        codes = "allitems",
        maxsock = false,
        sockets = "1+",
        location = anywhere,
        itype = itemTypes({"Weapon", "Any_Armor"}),
        suffix = "{white}[{sockets}]"
    }, {
        codes = "allitems",
        maxsock = true,
        sockets = "1+",
        location = anywhere,
        itype = itemTypes({"Weapon", "Any_Armor"}),
        suffix = "{white}[{tan}{sockets}{white}]"
    }, {
        codes = "allitems",
        maxsock = "1",
        sockets = "0",
        location = anywhere,
        itype = itemTypes({"Weapon", "Any_Armor"}),
        suffix = "{grey}[1]"
    }, {
        codes = "allitems",
        maxsock = "2",
        sockets = "0",
        location = anywhere,
        itype = itemTypes({"Weapon", "Any_Armor"}),
        suffix = "{grey}[2]"
    }, {
        codes = "allitems",
        maxsock = "3",
        sockets = "0",
        location = anywhere,
        itype = itemTypes({"Weapon", "Any_Armor"}),
        suffix = "{grey}[3]"
    }, {
        codes = "allitems",
        maxsock = "4",
        sockets = "0",
        location = anywhere,
        itype = itemTypes({"Weapon", "Any_Armor"}),
        suffix = "{grey}[4]"
    }, {
        codes = "allitems",
        maxsock = "5",
        sockets = "0",
        location = anywhere,
        itype = itemTypes({"Weapon", "Any_Armor"}),
        suffix = "{grey}[5]"
    }, {
        codes = "allitems",
        maxsock = "6",
        sockets = "0",
        location = anywhere,
        itype = itemTypes({"Weapon", "Any_Armor"}),
        suffix = "{grey}[6]"
    }}
end

local runeList = {
    el = "r01",
    eld = "r02",
    tir = "r03",
    nef = "r04",
    eth = "r05",
    ith = "r06",
    tal = "r07",
    ral = "r08",
    ort = "r09",
    thul = "r10",
    amn = "r11",
    sol = "r12",
    shael = "r13",
    dol = "r14",
    hel = "r15",
    io = "r16",
    lum = "r17",
    ko = "r18",
    fal = "r19",
    lem = "r20",
    pul = "r21",
    um = "r22",
    mal = "r23",
    ist = "r24",
    gul = "r25",
    vex = "r26",
    ohm = "r27",
    lo = "r28",
    sur = "r29",
    ber = "r30",
    jah = "r31",
    cham = "r32",
    zod = "r33"
}

function rune(name)
    return {runeList[name]} or {""}
end

local itemTypeList = {
    Any = 0,
    None = 1,

    Amazon_Bow = 85,
    Amazon_Circlet = 133,
    Amazon_Gloves = 134,
    Amazon_Item = 60,
    Amazon_Javelin = 87,
    Amazon_M_Charm = 156,
    Amazon_Spear = 86,
    Amethyst = 96,
    Amulet = 12,
    Antidote_Potion = 80,
    Any_Armor = 50,
    Any_Shield = 51,
    Armor = 3,
    Assassin_Armor = 73,
    Assassin_Boots = 136,
    Assassin_Claws = 67,
    Assassin_Claws_2 = 88,
    Assassin_Item = 65,
    Assassin_Katanas = 135,
    Assassin_M_Charm = 157,
    Axe = 28,
    Barbarian_Belt = 143,
    Barbarian_Flurry_Axe = 140,
    Barbarian_Flurry_Sword = 141,
    Barbarian_Flurry_Throwing = 142,
    Barbarian_Helm = 71,
    Barbarian_Item = 61,
    Barbarian_M_Charm = 158,
    Barbarian_Mighty_Axe = 137,
    Barbarian_Mighty_Hammer = 139,
    Barbarian_Mighty_Sword = 138,
    Basic_Armor = 120,
    Basic_Weap = 119,
    Beacon = 125,
    Belt = 19,
    Blood_Contract = 130,
    Blunt = 57,
    Body_Part = 40,
    Book = 18,
    Boots = 15,
    Bow_and_Crossbow = 27,
    Bow_Quiver = 5,
    Charm = 13,
    Chipped_Gem = 91,
    Circlet = 75,
    Class_Specific = 59,
    Club = 29,
    Color_Dye_Bottle = 109,
    Combo_Weapon = 49,
    Converter = 108,
    Crossbow = 27,
    Crossbow_Quiver = 6,
    Crystals = 113,
    Demon_Amulet = 208,
    Demon_Armor = 210,
    Demon_Axe = 219,
    Demon_Barb_Flurry_Throwing = 226,
    Demon_Belt = 213,
    Demon_Boots = 211,
    Demon_Bow = 217,
    Demon_Circlet = 215,
    Demon_Druid_Helms = 216,
    Demon_Gloves = 212,
    Demon_Hammer = 224,
    Demon_Helm = 214,
    Demon_Javelin = 222,
    Demon_Knife = 220,
    Demon_Large_Charm = 207,
    Demon_Medium_Charm = 206,
    Demon_Necro_Scythe = 228,
    Demon_Polearm = 221,
    Demon_Ring = 204,
    Demon_Shield = 209,
    Demon_Small_Charm = 205,
    Demon_Sorc_Orb = 225,
    Demon_Staff = 218,
    Demon_Sword = 227,
    Demon_Zon_Javelin = 223,
    Diamond = 97,
    Druid_Armor = 146,
    Druid_Branch = 144,
    Druid_Helms = 72,
    Druid_Item = 66,
    Druid_M_Charm = 159,
    Dyes = 112,
    Elite_Armor = 124,
    Elite_Weapon = 123,
    Elixir = 11,
    Emerald = 98,
    Enhance_Crystal = 111,
    Equipment_Blueprint = 117,
    Exceptional_Armor = 122,
    Exceptional_Weap = 121,
    Flawed_Gem = 92,
    Flawless_Gem = 94,
    Gem = 20,
    Gem_Bag = 106,
    Gem_Remover = 107,
    Gloves = 16,
    Gold = 4,
    Gold_Replacement = 132,
    Hammer = 31,
    Healing_Potion = 76,
    Helm = 37,
    Herb = 8,
    Ingredient = 114,
    Javelin = 44,
    Jewel = 58,
    Key = 41,
    Knife = 32,
    Large_Charm = 84,
    Mace = 36,
    Magic_Bow_Quiv = 89,
    Magic_Xbow_Quiv = 90,
    Mana_Potion = 77,
    Maps = 174,
    Medium_Charm = 83,
    Melee_Weapon = 46,
    Merc_5_Weapon = 128,
    Merc_Equip = 105,
    Miscellaneous = 52,
    Missile = 56,
    Missile_Potion = 38,
    Missile_Weapon = 47,
    Necromancer_Armor = 149,
    Necromancer_Heads = 69,
    Necromancer_Item = 62,
    Necromancer_M_Charm = 160,
    Necromancer_Scythe = 147,
    Necromancer_Wand = 148,
    Paladin_Armor = 152,
    Paladin_Item = 63,
    Paladin_M_Charm = 161,
    Paladin_Mace = 151,
    Paladin_Scepter = 150,
    Paladin_Shields = 70,
    Parchment = 203,
    Perfect_Gem = 95,
    Player_Body_Part = 7,
    Polearm = 34,
    Potion = 9,
    Quest = 39,
    Rejuv_Potion = 78,
    Reroller = 127,
    Ring = 10,
    Ruby = 99,
    Rune = 74,
    Sapphire = 100,
    Scepter = 24,
    Scroll = 22,
    Second_Hand = 54,
    Shield = 2,
    Shop_Voucher = 118,
    Skull = 102,
    Small_Charm = 82,
    Snowball = 229,
    Socket_Filler = 53,
    Socket_Puncher = 129,
    Sorceress_Armor = 155,
    Sorceress_Gauntlets = 154,
    Sorceress_Item = 64,
    Sorceress_M_Charm = 162,
    Sorceress_Orbs = 68,
    Soul_Summon_Gear = 131,
    Spear = 33,
    Spears_and_Polearms = 104,
    Spell_Blade = 230,
    Staff = 26,
    Stamina_Potion = 79,
    Standard_Gem = 93,
    Staves_And_Rods = 55,
    Sword = 30,
    Swords_and_Knives = 103,
    Thawing_Potion = 81,
    Throwing_Axe = 43,
    Throwing_Knife = 42,
    Thrown_Weapon = 48,
    Ticket = 115,
    Token = 126,
    Topaz = 101,
    Torch = 21,
    Treasure_Chest = 110,
    Unique_Core = 116,
    Wand = 25,
    Weapon = 45
}

function itemType(name)
    return itemTypeList[name] or itemTypeList.None
end

function itemTypes(array)
    local types = {}
    for _, name in ipairs(array) do
        local itype = itemType(name)
        if itype ~= itemTypeList.None then
            table.insert(types, itype)
        end
    end
    return types
end

return {
    allowOverrides = true,
    rules = getRules()
}
