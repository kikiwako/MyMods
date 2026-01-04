import { type } from 'node:os';
import { updateChild, removeChild, setChild, updateChildPosition, getReorderedChildren } from '../_ModContentGenerator/utils.js';
import { getUpdatedHirelingInventoryLayoutHD } from './getUpdatedHirelingInventoryLayoutHD.js';
import { getUpdatedPlayerInventoryOriginalLayoutHD } from './getUpdatedPlayerInventoryOriginalLayoutHD.js';


const files = {
    // profilehHD: {
    //     source: "/sources/_profilehd.json",
    //     target: "/data/global/ui/layouts/controller/_profilehd.json"
    // },
    bankExpansionLayoutHD: {
        source: "/sources/bankexpansionlayouthd.json",
        target: "/data/global/ui/layouts/controller/bankexpansionlayouthd.json"
    },
    bankOriginalLayoutHD: {
        source: "/sources/bankoriginallayouthd.json",
        target: "/data/global/ui/layouts/controller/bankoriginallayouthd.json"
    },
    controllerOverlayHD: {
        source: "/sources/controlleroverlayhd.json",
        target: "/data/global/ui/layouts/controller/controlleroverlayhd.json"
    },
    hirelingInventoryLayoutHD: {
        source: "/sources/hirelinginventorypanelhd.json",
        target: "/data/global/ui/layouts/controller/hirelinginventorypanelhd.json"
    },
    horadricCubeLayoutHD: {
        source: "/sources/horadriccubelayouthd.json",
        target: "/data/global/ui/layouts/controller/horadriccubelayouthd.json"
    },
    playerInventoryExpansionLayoutHD: {
        source: "/sources/playerinventoryexpansionlayouthd.json",
        target: "/data/global/ui/layouts/controller/playerinventoryexpansionlayouthd.json"
    },
    playerInventoryOriginalLayoutHD: {
        source: "/sources/playerinventoryoriginallayouthd.json",
        target: "/data/global/ui/layouts/controller/playerinventoryoriginallayouthd.json"
    }
};

const applyChanges = (files) => {
    const newFiles = { ...files };

    // newFiles.profilehHD.json.ConsoleLeftPanelAnchor = {
    //     x: 0.521,
    //     y: 0.387
    // };
    // maybe remove SecondSetIconOffset

    newFiles.bankExpansionLayoutHD.json = getUpdatedBankExpansionLayoutHD(newFiles.bankExpansionLayoutHD.json);
    newFiles.bankOriginalLayoutHD.json = getUpdatedBankOriginalLayoutHD(newFiles.bankOriginalLayoutHD.json);
    newFiles.controllerOverlayHD.json = getUpdatedControllerOverlayHD(newFiles.controllerOverlayHD.json);
    newFiles.hirelingInventoryLayoutHD.json = getUpdatedHirelingInventoryLayoutHD(newFiles.hirelingInventoryLayoutHD.json);
    newFiles.horadricCubeLayoutHD.json = getUpdatedHoradricCubeLayoutHD(newFiles.horadricCubeLayoutHD.json);
    newFiles.playerInventoryExpansionLayoutHD.json = getUpdatedPlayerInventoryExpansionLayoutHD(newFiles.playerInventoryExpansionLayoutHD.json);
    newFiles.playerInventoryOriginalLayoutHD.json = getUpdatedPlayerInventoryOriginalLayoutHD(newFiles.playerInventoryOriginalLayoutHD.json);

    return newFiles;
};

const getUpdatedPlayerInventoryExpansionLayoutHD = (data) => {
    let newData = { ...data };


    updateChildPosition(newData, "background_left_arm", 793, 5);
    updateChildPosition(newData, "background_left_arm_selected", 793, 5);

    updateChildPosition(newData, "background_right_arm", 33, 5);
    updateChildPosition(newData, "background_right_arm_selected", 33, 5);

    setChild(newData, "Belt", {
        "type": "BeltWidget",
        "name": "Belt"
    });

    const bob = []
    bob.push(newData.children[0]);

    bob.push(
        { type: "ImageWidget", name: "container_gold" },
        { type: "ImageWidget", name: "container_inventory_grid" },
        { type: "ImageWidget", name: "container_head" },
        { type: "ImageWidget", name: "container_neck" },
        { type: "ImageWidget", name: "container_torso" },
        { type: "ImageWidget", name: "container_right_arm" },
        { type: "ImageWidget", name: "container_left_arm" },
        { type: "ImageWidget", name: "container_right_hand" },
        { type: "ImageWidget", name: "container_left_hand" },
        { type: "ImageWidget", name: "container_belt" },
        { type: "ImageWidget", name: "container_feet" },
        { type: "ImageWidget", name: "container_gloves" },
        { type: "ImageWidget", name: "container_potions" },
    );

    newData.children.shift();
    bob.push(...newData.children);

    newData.children = bob;

    updateChildPosition(newData, "text_i_left", 46, 5, 84, 48);
    updateChildPosition(newData, "text_i_right", 804, 5, 84, 48);
    updateChildPosition(newData, "text_ii_left", 148, 5, 84, 48);
    updateChildPosition(newData, "text_ii_right", 912, 5, 84, 48);
    updateChildPosition(newData, "WeaponSwapLeftLegend", 799, 40, 197, 48);
    updateChildPosition(newData, "WeaponSwapRightLegend", 40, 30, 197, 48);

    newData.children = getReorderedChildren(newData, [
        "click_catcher",
        "container_gold",
        "gold_amount",
        "gold_button",
        "container_inventory_grid",
        "grid",
        "container_head",
        "slot_head",
        "container_neck",
        "slot_neck",
        "container_torso",
        "slot_torso",
        "container_right_arm",
        "slot_right_arm",
        "container_left_arm",
        "slot_left_arm",
        "container_right_hand",
        "slot_right_hand",
        "container_left_hand",
        "slot_left_hand",
        "container_belt",
        "slot_belt",
        "container_feet",
        "slot_feet",
        "container_gloves",
        "slot_gloves",
        "container_potions",
        "Belt",

        "background_left_arm_selected",
        "background_left_arm",
        "text_i_right",
        "text_ii_right",
        "WeaponSwapLeftLegend",

        "background_right_arm_selected",
        "background_right_arm",
        "text_i_left",
        "text_ii_left",
        "WeaponSwapRightLegend",
    ]);

    return newData;
}

const getUpdatedHoradricCubeLayoutHD = (data) => {
    let newData = { ...data };

    updateChild(newData, "background", {
        fields: {
            rect: {
                x: -280,
                y: 140
            },
            filename: "Controller/Panel/HoradricCube/V2/HoradricCubeBG_Edit"
        }
    });

    updateChildPosition(newData, "convert", 1200, 15);
    updateChildPosition(newData, "grid", -253, 163);

    removeChild(newData, "flourish");

    return newData;
}

const getUpdatedControllerOverlayHD = (data) => {
    let newData = { ...data };

    updateChild(newData, "Anchor", {}, (anchor) => {
        updateChild(anchor, "ControllerCursorBounds", {
            fields: {
                fitToParent: false,
                rect: {
                    x: -285,
                    y: 0,
                    width: 3165,
                    height: 1763
                }
            }
        });
    });

    return newData;
}

const getUpdatedBankOriginalLayoutHD = (data) => {
    let newData = { ...data };

    newData = getCommonBankLayoutUpdates(newData);

    updateChild(newData, "background", {
        fields: {
            filename: "Controller/Panel/Stash/V2/Classic_StashPanelBG_Expanded"
        }
    });

    return newData;
}

const getUpdatedBankExpansionLayoutHD = (data) => {
    let newData = { ...data };

    newData = getCommonBankLayoutUpdates(newData);

    newData.children.push(getDropdownListWidget());
    newData.children.push(getBankTabs());

    updateChild(newData, "background", {
        fields: {
            filename: "Controller/Panel/Stash/V2/StashPanelBG_Expanded"
        }
    });

    // update(newData, "ConsoleLeftPanelAnchor", {
    //     fields: {
    //         rect: {
    //             x: 0,
    //             y: 0
    //         }
    //     }
    // });

    updateChild(newData, "grid", {
        fields: {
            cellCount: {
                x: 16,
                y: 13
            }
        }
    });

    removeChild(newData, "PreviousLadderSeasonBankTabs");
    removeChild(newData, "PreviousSeasonToggleDisplay");

    return newData;
};

const getCommonBankLayoutUpdates = (data) => {
    const background_x = -368;
    const background_y = -176;
    const newData = { ...data };

    updateChild(newData, "background", {
        fields: {
            rect: {
                x: background_x,
                y: background_y
            },
            filename: "Controller/Panel/Stash/V2/Classic_StashPanelBG_Expanded"
        }
    });

    updateChild(newData, "gold_max", {
        fields: {
            rect: {
                x: background_x + 68,
                y: background_y + 32
            },
            style: {
                fontColor: "$FontColorLightGray",
                pointSize: "$SmallFontSize",
                spacing: "$ReducedSpacing",
                alignment: {
                    v: "center",
                    h: "center"
                }
            }
        }
    });

    updateChildPosition(newData, "gold_amount", background_x + 1393, background_y + 28);
    updateChildPosition(newData, "gold_withdraw", background_x + 1343, background_y + 32);
    updateChildPosition(newData, "grid", background_x + 92, background_y + 295);

    return newData;
}

const getDropdownListWidget = () => {
    return {
        "type": "DropdownListWidget",
        "name": "BankPages",
        "fields": {
            "anchor": { "x": 0.15, "y": 0.05 },
            "rect": {
                "width": 408,
                "height": 75,
                "x": -100,
                "y": -230
            },
            "background/rect": { "x": 20, "width": 408, "height": 75 },
            "background/leftCapOffset": "$OptionsDropDownLeftCapOffset2",
            "background/rightCapOffset": "$OptionsDropDownRightCapOffset2",
            "pressedFrame": 1,
            "disabledFrame": 2,
            "hoveredFrame": 3,
            // "focusIndicatorFilename": "$OptionsDropDownFocusIndicatorFilename",
            "states": [
                "General",
                "Amazon",
                "Assassin",
                "Barbarian",
                "Druid",
                "Necromancer",
                "Paladin",
                "Sorceress",
                "Page 9",
                "Page 10",
                "Page 11",
                "Page 12",
                "Page 13",
                "Page 14",
                "Page 15",
                "Page 16",
                "Page 17",
                "Page 18",
                "Page 19",
                "Page 20",
                "Page 21",
                "Page 22",
                "Page 23",
                "Page 24",
                "Page 25",
                "Page 26",
                "Page 27",
                "Page 28",
                "Page 29",
                "Page 30",
                "Page 31",
                "Page 32",
                "Page 33",
                "Page 34",
                "Page 35",
                "Page 36",
                "Page 37",
                "Page 38",
                "Page 39",
                "Page 40",
                "Page 41",
                "Page 42",
                "Page 43",
                "Page 44",
                "Page 45",
                "Page 46",
                "Page 47",
                "Page 48",
                "Page 49",
                "Page 50",
                "Page 51",
                "Page 52",
                "Page 53",
                "Page 54",
                "Page 55",
                "Page 56",
                "Page 57",
                "Page 58",
                "Page 59",
                "Page 60",
                "Page 61",
                "Page 62",
                "Page 63",
                "Page 64"
            ],
            "onUpdateMessage": "BankPanelMessage:SelectPage",
            "text/style": { "pointSize": "$MediumFontSize" },
            "textColor": "$FontColorLightGold",
            "tooltipString": "This allows you to switch between multiple pages of shared stash tabs",
            "tooltipStyle": {
                "showAfterDelay": true
            }
        }
    }
};

const getBankTabs = () => {
    return {
        "type": "TabBarWidget",
        "name": "BankTabs",
        "fields": {
            "rect": {
                "x": -191,
                "y": 9
            },
            "tabCount": 8,
            "filename": "Controller/Panel/Stash/V2/StashTabs_Expanded",
            "inactiveFrames": [1, 1, 1, 1, 1, 1, 1, 1],
            "activeFrames": [0, 0, 0, 0, 0, 0, 0, 0],
            "disabledFrames": [1, 1, 1, 1, 1, 1, 1, 1],
            "textStrings": ["personal", "I", "II", "III", "IV", "V", "VI", "VII"],
            "textStyle": {
                "pointSize": "$MediumFontSize"
            },
            "focusIndicatorFilename": "Controller/HoverImages/StashTab_Hover_Expanded",
            "focusIndicatorOffset": {
                "x": 0,
                "y": -6
            },
            "activeTextColor": "$TabsActiveTextColor",
            "inactiveTextColor": "$TabsInactiveTextColor",
            "tabSize": {
                "x": 175,
                "y": 120
            },
            "tabPadding": {
                "x": 0,
                "y": 0
            },
            "onSwitchTabMessage": "BankPanelMessage:SelectTab",
            "tabLeftIndicatorPosition": {
                "x": -42,
                "y": -2
            },
            "tabRightIndicatorPosition": {
                "x": 1435,
                "y": -2
            },
            "focusOnMouseOver": true
        }
    }
}

export {
    files,
    applyChanges
};