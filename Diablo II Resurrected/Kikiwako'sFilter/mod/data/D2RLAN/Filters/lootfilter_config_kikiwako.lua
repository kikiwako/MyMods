--- Filter Title: Kikiwako
--- Filter Type: (None)
--- Filter Description: patente
return {
    allowOverrides = true,
    rules = {
        -- Diplay rarity for weapons and armor
        {
            codes = "allitems",
            rarity = "Normal",
            location = {"onground", "onplayer", "equipped", "atvendor"},
            itype = {10, 12, 45, 50, 58, 82, 83, 84},
            suffix = " {white}1-"
        }, {
            codes = "allitems",
            rarity = "Exceptional",
            location = {"onground", "onplayer", "equipped", "atvendor"},
            itype = {10, 12, 45, 50, 58, 82, 83, 84},
            suffix = " {white}2-"
        }, {
            codes = "allitems",
            rarity = "Elite",
            location = {"onground", "onplayer", "equipped", "atvendor"},
            itype = {10, 12, 45, 50, 58, 82, 83, 84},
            suffix = " {white}3-{rarity}"
        }, -- 
        -- Display item levels for weapons, armors, charms, jewels, rings and amulets in white, to the right of item name, (x)
        {
            codes = "allitems",
            location = {"onground", "onplayer", "equipped", "atvendor"},
            itype = {10, 12, 45, 50, 58, 82, 83, 84},
            suffix = "{white}({ilvl})"
        }, -- 
        -- Display socket count in gray, to the right of item name, [x/m]
        {
            codes = "allitems",
            maxsock = "1+",
            location = {"onground", "onplayer", "equipped", "atvendor"},
            itype = {10, 12, 45, 50, 58, 82, 83, 84},
            suffix = "{gray}[{sockets}"
        }, {
            codes = "allitems",
            maxsock = "1",
            location = {"onground", "onplayer", "equipped", "atvendor"},
            itype = {10, 12, 45, 50, 58, 82, 83, 84},
            suffix = "{gray}/1]"
        }, {
            codes = "allitems",
            maxsock = "2",
            location = {"onground", "onplayer", "equipped", "atvendor"},
            itype = {10, 12, 45, 50, 58, 82, 83, 84},
            suffix = "{gray}/2]"
        }, {
            codes = "allitems",
            maxsock = "3",
            location = {"onground", "onplayer", "equipped", "atvendor"},
            itype = {10, 12, 45, 50, 58, 82, 83, 84},
            suffix = "{gray}/3]"
        }, {
            codes = "allitems",
            maxsock = "4",
            location = {"onground", "onplayer", "equipped", "atvendor"},
            itype = {10, 12, 45, 50, 58, 82, 83, 84},
            suffix = "{gray}/4]"
        }, {
            codes = "allitems",
            maxsock = "5",
            location = {"onground", "onplayer", "equipped", "atvendor"},
            itype = {10, 12, 45, 50, 58, 82, 83, 84},
            suffix = "{gray}/5]"
        }, {
            codes = "allitems",
            maxsock = "6",
            location = {"onground", "onplayer", "equipped", "atvendor"},
            itype = {10, 12, 45, 50, 58, 82, 83, 84},
            suffix = "{gray}/6]"
        }, -- 
        { -- Display ethereal status in gray
            codes = "allitems",
            ethereal = true,
            location = {"onground", "onplayer", "equipped", "atvendor"},
            itype = {10, 12, 45, 50, 58, 82, 83, 84},
            suffix = " {gray}Eth."
        }
        -- {
        --     codes = "r01",
        --     itype = 74,
        --     location = {"onplayer"},
        --     suffix = " {gray}> Eld"
        -- }, {
        --     codes = "r02",
        --     itype = 74,
        --     location = {"onplayer"},
        --     suffix = " {gray}> Tir"
        -- }, {
        --     codes = "r03",
        --     itype = 74,
        --     location = {"onplayer"},
        --     suffix = " {gray}> Nef"
        -- }, {
        --     codes = "r04",
        --     itype = 74,
        --     location = {"onplayer"},
        --     suffix = " {gray}> Eth"
        -- }, {
        --     codes = "r05",
        --     itype = 74,
        --     location = {"onplayer"},
        --     suffix = " {gray}> Ith"
        -- }, {
        --     codes = "r06",
        --     itype = 74,
        --     location = {"onplayer"},
        --     suffix = " {gray}> Tal"
        -- }, {
        --     codes = "r07",
        --     itype = 74,
        --     location = {"onplayer"},
        --     suffix = " {gray}> Ral"
        -- }, {
        --     codes = "r08",
        --     itype = 74,
        --     location = {"onplayer"},
        --     suffix = " {gray}> Ort"
        -- }, {
        --     codes = "r09",
        --     itype = 74,
        --     location = {"onplayer"},
        --     suffix = " {gray}> Thul"
        -- }, {
        --     codes = "r10",
        --     itype = 74,
        --     location = {"onplayer"},
        --     suffix = " {yellow}> {gray} Amn"
        -- }, {
        --     codes = "r11",
        --     itype = 74,
        --     location = {"onplayer"},
        --     suffix = " {purple}> {gray} Sol"
        -- }, {
        --     codes = "r12",
        --     itype = 74,
        --     location = {"onplayer"},
        --     suffix = " {blue}> {gray} Shael"
        -- }, {
        --     codes = "r13",
        --     itype = 74,
        --     location = {"onplayer"},
        --     suffix = " {red}> {gray} Dol"
        -- }, {
        --     codes = "r14",
        --     itype = 74,
        --     location = {"onplayer"},
        --     suffix = " {green}> {gray} Hel"
        -- }, {
        --     codes = "r15",
        --     itype = 74,
        --     location = {"onplayer"},
        --     suffix = " {white}> {gray} Io"
        -- }
    }
}
