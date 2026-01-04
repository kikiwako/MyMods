import { updateChild, updateNode } from '../_ModContentGenerator/utils.js';

const getUpdatedHirelingInventoryLayoutHD = (data) => {
    let newData = { ...data };

    updateNode(newData, {
        basedOn: "",
        fields: {
            anchor: "$ConsoleLeftPanelAnchor",
            bowBackgroundFilename: "PANEL/Hireling/HireablePanel/Hireables_Paperdoll_Bow",
            spearBackgroundFilename: "PANEL/Hireling/HireablePanel/Hireables_Paperdoll_Spear",
            longswordBackgroundFilename: "PANEL/Hireling/HireablePanel/Hireables_Paperdoll_LongSword",
            shieldBackgroundFilename: "PANEL/Hireling/HireablePanel/Hireables_Paperdoll_Shield",
            twoHandSwordBackgroundFilename: "PANEL/Hireling/HireablePanel/Hireables_Paperdoll_2HSword",
            defaultWidget: "slot_right_arm"
        }
    });

    newData.children.find((child, index) => {
        if (child.type === "ClickCatcherWidget") {
            newData.children[index] = {
                type: "ClickCatcherWidget",
                fields: {
                    rect: { x: -180, y: -200, width: 1362, height: 1727 }
                }

            };
        }

        return child.type === "ClickCatcherWidget";
    })

    updateChild(newData, "Background", {
        fields: {
            rect: { x: 0, y: 0 },
            filename: "/PANEL/Hireling/HirelingPanel",
        }
    });

    updateChild(newData, "slot_head", {
        fields: {
            rect: { x: 481, y: 113 },
            location: "head",
            navigation: {
                right: { name: "slot_neck" }
            },
            isHireable: true,
            cellSize: "$ItemCellSize"
        }
    });

    updateChild(newData, "slot_torso", {
        fields: {
            rect: { x: 483, y: 348 },
            location: "torso",
            navigation: {
                right: { name: "slot_neck" },
                down: { name: "slot_belt" }
            },
            isHireable: true,
            cellSize: "$ItemCellSize"
        }
    });

    updateChild(newData, "slot_right_arm", {
        fields: {
            rect: { x: 110, y: 156 },
            location: "right_arm",
            navigation: {
                down: { name: "slot_gloves" }
            },
            isHireable: true,
            cellSize: "$ItemCellSize"
        },
    });

    updateChild(newData, "slot_left_arm", {
        fields: {
            rect: { x: 863, y: 156 },
            location: "left_arm",
            navigation: {
                left: { name: "slot_neck" },
                down: { name: "slot_feet" }
            },
            isHireable: true,
            cellSize: "$ItemCellSize"
        },
    });

    updateChild(newData, "CharacterName", {
        fields: {
            rect: { x: 121, y: 849, width: 500, height: 50 },
            style: {
                pointSize: "$LargeFontSize",
                fontColor: "$FontColorWhite",
                dropShadow: "$DefaultDropShadow",
            }
        }
    });

    updateChild(newData, "HPTitle", {
        fields: {
            rect: { x: 104, y: 1020, width: 251, height: 59 },
            text: "@strchrlif",
            style: {
                pointSize: "$SmallFontSize",
            }
        }
    });

    updateChild(newData, "HPStat", {
        fields: {
            rect: { x: 361, y: 1020, width: 187, height: 59 },
            style: {
                pointSize: "$SmallFontSize",
            }
        }
    });

    updateChild(newData, "HireTypeText", {
        fields: {
            rect: { x: 126, y: 937, width: 100, height: 30 },
            text: "@strchrlvl",
            style: {
                pointSize: "$MediumFontSize",
                fontColor: "$FontColorWhite",
                dropShadow: "$DefaultDropShadow",
                alignment: { h: "left", v: "" }
            }
        }
    });

    updateChild(newData, "XpProgress", {
        fields: {
            rect: { x: 139, y: 913, width: 888, height: 10 },
            filename: "PANEL/Hireling/Hireling_ExpBar",
            frame: 0,
            isHireling: true,
            hitMargin: {
                top: 15, bottom: 15
            }
        }
    });

    updateChild(newData, "StrengthTitle", {
        fields: {
            rect: { x: 104, y: 1102, width: 251, height: 59 },
            text: "@strchrstr",
            style: {
                pointSize: "$SmallFontSize",
            }
        }
    });

    updateChild(newData, "StrengthStat", {
        fields: {
            rect: { x: 361, y: 1102, width: 187, height: 59 },
            style: {
                pointSize: "$SmallFontSize",
            }
        }
    });

    updateChild(newData, "DexTitle", {
        fields: {
            rect: { x: 104, y: 1186, width: 251, height: 59 },
            text: "@strchrdex",
            style: {
                pointSize: "$SmallFontSize",
            }
        }
    });

    updateChild(newData, "DexStat", {
        fields: {
            rect: {
                x: 361,
                y: 1184,
                width: 187,
                height: 59
            },
            style: {
                pointSize: "$SmallFontSize",
            }
        }
    });

    updateChild(newData, "DamageTitle", {
        fields: {
            rect: { x: 104, y: 1269, width: 251, height: 59 },
            text: "@strchrdmg",
            style: {
                pointSize: "$SmallFontSize",
            }
        }
    });

    updateChild(newData, "Damage", {
        fields: {
            rect: { x: 328, y: 1269, width: 237, height: 59 },
        }
    },
        (damage) => {
            updateChild(damage, "DamageStat", {
                fields: {
                    rect: { width: 237, height: 59 },
                    style: {
                        pointSize: "$SmallPanelFontSize",
                    }
                },
            });

            updateChild(damage, "DamageStatTop", {
                fields: {
                    rect: { y: 0, width: 237, height: 59 },
                    style: {
                        pointSize: "$SmallFontSize",
                    }
                },
            });

            updateChild(damage, "DamageStatBottom", {
                fields: {
                    rect: { y: -1, width: 237, height: 59 },
                    style: {
                        pointSize: "$SmallPanelFontSize",
                    }
                },
            });
        }
    );

    updateChild(newData, "ArmorClassTitle", {
        fields: {
            rect: { x: 104, y: 1353, width: 251, height: 59 },
            text: "@strchrac",
            style: {
                pointSize: "$SmallFontSize",
            }
        }
    });

    updateChild(newData, "ArmorClass", {
        fields: {
            rect: { x: 361, y: 1353, width: 187, height: 59 },
            style: {
                pointSize: "$SmallFontSize",
            }
        },
    });

    updateChild(newData, "FireResistanceTitle", {
        fields: {
            rect: {
                x: 608, y: 1103, width: 325,
            },
        }
    });

    updateChild(newData, "FireText", {
        fields: {
            rect: { x: 938, y: 1103, width: 113 },
            style: {
                pointSize: "$SmallFontSize",
            }
        },
    });

    updateChild(newData, "ColdResistanceTitle", {
        "fields": {
            "rect": {
                "x": 608,
                "Y": 1184,
                "width": 325
            },
            "style": {
                "fontColor": "$FontColorWhite",
                "fontFace": "Formal",
                "pointSize": "$SmallFontSize",
                "alignment": {
                    "h": "center",
                    "v": "center"
                }
            },
            "useAltStyleIfDoesntFit": false
        }
    });

    updateChild(newData, "ColdText", {
        "fields": {
            "rect": {
                "x": 938,
                "y": 1184,
                "width": 113
            },
            "style": {
                "pointSize": "$SmallFontSize",
            }
        },
    });

    updateChild(newData, "LightningResistanceTitle", {
        "fields": {
            "rect": {
                "x": 608,
                "y": 1269,
                "width": 325
            },
            "useAltStyleIfDoesntFit": false
        }
    });

    updateChild(newData, "LightningText", {
        "fields": {
            "rect": {
                "x": 938,
                "y": 1269,
                "width": 113
            },
            "style": {
                "pointSize": "$SmallFontSize",
            }
        },
    });

    updateChild(newData, "PoisonResistanceTitle", {
        "fields": {
            "rect": {
                "x": 608,
                "y": 1351,
                "width": 325
            },
            "style": {
                "pointSize": "$SmallFontSize",
            },
            "useAltStyleIfDoesntFit": false
        }
    });

    updateChild(newData, "PoisonText", {
        "fields": {
            "rect": {
                "x": 938,
                "y": 1351,
                "width": 113
            },
            "style": {
                "pointSize": "$SmallFontSize",
            }
        },
    });

    updateChild(newData, "Skill0", {
        "fields": {
            "rect": {
                "x": 673,
                "y": 1007,
                "scale": 0.6
            },
        }
    });

    updateChild(newData, "Skill1", {
        "fields": {
            "rect": {
                "x": 780,
                "y": 1007,
                "scale": 0.6
            },
        }
    });

    updateChild(newData, "Skill2", {
        "fields": {
            "rect": {
                "x": 887,
                "y": 1007,
                "scale": 0.6
            },
        }
    });

    newData.children.push({
        "type": "ImageWidget",
        "name": "LeftHinge",
        "fields": {
            "rect": "$LeftHingeRect",
            "filename": "$LeftHingeSprite"
        }
    });

    newData.children.push({
        "type": "TextBoxWidget",
        "name": "Title",
        "fields": {
            "rect": {
                "x": 481,
                "y": -69,
                "width": 196,
                "height": 196
            },
            "style": "$StyleTitleBlock",
            "text": "@MiniPanelHireinv"
        }
    });

    newData.children.push({
        "type": "InventorySlotWidget",
        "name": "slot_belt",
        "fields": {
            "rect": {
                "x": 483,
                "y": 688,
                "width": 196,
                "height": 98
            },
            "cellSize": "$ItemCellSize",
            "location": "belt",
            "gemSocketFilename": "PANEL/gemsocket",
            "backgroundFilename": "PANEL/Inventory/Inventory_Paperdoll_Belt",
            "isHireable": true,
            "navigation": {
                "left": {
                    "name": "slot_feet"
                },
                "right": {
                    "name": "slot_right_hand"
                },
                "up": {
                    "name": "slot_torso"
                }
            }
        }
    },
        {
            "type": "InventorySlotWidget",
            "name": "slot_right_hand",
            "fields": {
                "rect": {
                    "x": 720,
                    "y": 691,
                    "width": 98,
                    "height": 98
                },
                "cellSize": "$ItemCellSize",
                "location": "right_hand",
                "gemSocketFilename": "PANEL/gemsocket",
                "backgroundFilename": "PANEL/Inventory/Inventory_Paperdoll_Ring",
                "isHireable": false,
                "navigation": {
                    "left": {
                        "name": "slot_belt"
                    },
                    "right": {
                        "name": "slot_feet"
                    },
                    "up": {
                        "name": "slot_torso"
                    }
                }
            }
        },
        {
            "type": "InventorySlotWidget",
            "name": "slot_left_hand",
            "fields": {
                "rect": {
                    "x": 350,
                    "y": 691,
                    "width": 98,
                    "height": 98
                },
                "cellSize": "$ItemCellSize",
                "location": "left_hand",
                "gemSocketFilename": "PANEL/gemsocket",
                "backgroundFilename": "PANEL/Inventory/Inventory_Paperdoll_Ring",
                "navigation": {
                    "left": {
                        "name": "slot_gloves"
                    },
                    "right": {
                        "name": "slot_belt"
                    },
                    "up": {
                        "name": "slot_torso"
                    }
                }
            }
        },
        {
            "type": "InventorySlotWidget",
            "name": "slot_gloves",
            "fields": {
                "rect": {
                    "x": 108,
                    "y": 591,
                    "width": 196,
                    "height": 196
                },
                "cellSize": "$ItemCellSize",
                "location": "gloves",
                "gemSocketFilename": "PANEL/gemsocket",
                "backgroundFilename": "PANEL/Inventory/Inventory_Paperdoll_Glove",
                "isHireable": false,
                "navigation": {
                    "right": {
                        "name": "slot_belt"
                    },
                    "up": {
                        "name": "slot_right_arm"
                    }
                }
            }
        },
        {
            "type": "InventorySlotWidget",
            "name": "slot_feet",
            "fields": {
                "rect": {
                    "x": 861,
                    "y": 591,
                    "width": 196,
                    "height": 196
                },
                "cellSize": "$ItemCellSize",
                "location": "feet",
                "gemSocketFilename": "PANEL/gemsocket",
                "backgroundFilename": "PANEL/Inventory/Inventory_Paperdoll_Boots",
                "isHireable": false,
                "navigation": {
                    "left": {
                        "name": "slot_right_hand"
                    },
                    "right": {
                        "panelBoundary": true
                    },
                    "up": {
                        "name": "slot_left_arm"
                    }
                }
            }
        },
        {
            "type": "InventorySlotWidget",
            "name": "slot_neck",
            "fields": {
                "rect": {
                    "x": 720,
                    "y": 271,
                    "width": 98,
                    "height": 98
                },
                "cellSize": "$ItemCellSize",
                "location": "neck",
                "gemSocketFilename": "PANEL/gemsocket",
                "backgroundFilename": "PANEL/Inventory/Inventory_Paperdoll_Amulet",
                "isHireable": false,
                "navigation": {
                    "left": {
                        "name": "slot_torso"
                    },
                    "right": {
                        "name": "slot_left_arm"
                    },
                    "up": {
                        "name": "slot_head"
                    },
                    "down": {
                        "name": "slot_right_hand"
                    }
                }
            }
        });

    return newData;
}

export {
    getUpdatedHirelingInventoryLayoutHD
};