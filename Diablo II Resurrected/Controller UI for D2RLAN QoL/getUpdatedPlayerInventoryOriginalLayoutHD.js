import { updateChild, updateChildPosition, insertChildAfterChild, removeChild, getReorderedChildren } from '../_ModContentGenerator/utils.js';

const getUpdatedPlayerInventoryOriginalLayoutHD = (data) => {
    let newData = { ...data };

    updateChild(newData, "Belt", {
        fields: {
            rect: { x: 267, y: 562 }
        },
        children: "DELETE"
    });


    updateChild(newData, "gold_amount", {
        fields: {
            rect: { x: 285, y: 80, height: 48, width: 228 },
            style: {
                pointSize: "$MediumFontSize",
                spacing: "$ReducedSpacing",
                alignment: { v: "center", h: "center" }
            }
        }
    });

    updateChild(newData, "gold_button", {
        fields: {
            rect: { x: 285, y: 80, width: 228 },
            filename: "NONE",
            focusIndicatorFilename: "/controller/panel/inventorypanel/v2/Gold_Highlight",
            focusIndicatorOffset: { x: -2, y: 2 },
            navigation: {
                left: { name: "slot_right_arm", panelBoundary: false },
                up: "DELETE",
                right: { name: "slot_head" },
                down: { name: "slot_neck" }
            }
        }
    });

    updateChild(newData, "grid", {
        fields: {
            rect: { x: 31, y: 680 },
            navigation: {
                left: { panelBoundary: true },
                up: { name: "Belt" },
                down: "DELETE"
            }
        }
    });

    updateChild(newData, "slot_belt", {
        fields: {
            rect: { x: 300, y: 307, width: 196, height: 98 },
            backgroundFilename: "PANEL/Inventory/Inventory_Paperdoll_Belt",
            navigation: {
                left: { name: "slot_right_arm" },
                right: { name: "slot_torso" },
                up: { name: "slot_neck" },
                down: { name: "slot_left_hand" }
            }
        }
    });

    updateChild(newData, "slot_feet", {
        fields: {
            rect: { x: 803, y: 475 },
            navigation: {
                left: { name: "slot_torso" },
            }
        }
    });

    updateChildPosition(newData, "slot_gloves", 44, 475, 196, 196);

    updateChild(newData, "slot_head", {
        fields: {
            rect: { x: 555, y: 17 },
            navigation: {
                left: { name: "gold_button" },
                right: { name: "slot_left_arm" }
            }
        }
    });

    updateChildPosition(newData, "slot_left_arm", 803, 62, 196, 392);

    updateChild(newData, "slot_left_hand", {
        fields: {
            rect: { x: 410, y: 440 },
            navigation: {
                left: { name: "slot_right_hand" },
                right: { name: "slot_torso" },
                up: { name: "slot_belt" },
                down: { name: "Belt" }
            }
        }
    });

    updateChild(newData, "slot_neck", {
        fields: {
            rect: { x: 347, y: 179 },
            navigation: {
                left: { name: "slot_right_arm" },
                right: { name: "slot_torso" },
                up: { name: "gold_button" },
                down: { name: "slot_belt" }
            }
        }
    });

    updateChild(newData, "slot_right_arm", {
        fields: {
            rect: { x: 44, y: 62 },
            navigation: {
                right: { name: "slot_neck" },
            }
        }
    });

    updateChild(newData, "slot_right_hand", {
        fields: {
            rect: { x: 279, y: 440 },
            navigation: {
                right: { name: "slot_left_hand" },
                up: { name: "slot_belt" },
                down: { name: "Belt" }
            }
        }
    });

    updateChild(newData, "slot_torso", {
        fields: {
            rect: { x: 552, y: 243 },
            navigation: {
                left: { name: "slot_belt" },
                down: { name: "Belt" }
            }
        }
    });

    newData.children.push(
        {
            type: "ImageWidget",
            name: "container_gold",
            fields: {
                rect: { x: 258, y: 50 },
                filename: "/controller/panel/inventorypanel/v2/Slot_Gold"
            }
        },
        {
            type: "ImageWidget",
            name: "container_inventory_grid",
            fields: {
                rect: { x: 31, y: 680 },
                filename: "/controller/panel/inventorypanel/v2/InvGrid_10x8"
            }
        },
        {
            type: "ImageWidget",
            name: "container_head",
            fields: {
                rect: { x: 543, y: 5 },
                filename: "/controller/panel/inventorypanel/v2/Slot_2x2"
            }
        },
        {
            type: "ImageWidget",
            name: "container_neck",
            fields: {
                rect: { x: 335, y: 169 },
                filename: "/controller/panel/inventorypanel/v2/Slot_1x1"
            }
        },
        {
            type: "ImageWidget",
            name: "container_potions",
            fields: {
                rect: { x: 267, y: 562 },
                filename: "/controller/panel/inventorypanel/v2/Slots_Potions"
            }
        },
        {
            type: "ImageWidget",
            name: "container_torso",
            fields: {
                rect: { x: 540, y: 233 },
                filename: "/controller/panel/inventorypanel/v2/Slot_2x6"
            }
        },
        {
            type: "ImageWidget",
            name: "container_right_arm",
            fields: {
                rect: { x: 31, y: 52 },
                filename: "/controller/panel/inventorypanel/v2/Slot_2x8"
            }
        },
        {
            type: "ImageWidget",
            name: "container_left_arm",
            fields: {
                rect: { x: 791, y: 52 },
                filename: "/controller/panel/inventorypanel/v2/Slot_2x8"
            }
        },
        {
            type: "ImageWidget",
            name: "container_right_hand",
            fields: {
                rect: { x: 267, y: 430 },
                filename: "/controller/panel/inventorypanel/v2/Slot_1x1"
            }
        },
        {
            type: "ImageWidget",
            name: "container_left_hand",
            fields: {
                rect: { x: 400, y: 430 },
                filename: "/controller/panel/inventorypanel/v2/Slot_1x1"
            }
        },
        {
            type: "ImageWidget",
            name: "container_belt",
            fields: {
                rect: { x: 284, y: 297 },
                filename: "/controller/panel/inventorypanel/v2/Slot_2x1"
            }
        },
        {
            type: "ImageWidget",
            name: "container_gloves",
            fields: {
                rect: {
                    x: 32,
                    y: 465
                },
                filename: "/controller/panel/inventorypanel/v2/Slot_2x2"
            }
        },
        {
            type: "ImageWidget",
            name: "container_feet",
            fields: {
                rect: {
                    x: 791,
                    y: 465
                },
                filename: "/controller/panel/inventorypanel/v2/Slot_2x2"
            }
        });

    removeChild(newData, "background");

    newData.children = getReorderedChildren(newData,
        [
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
            "container_belt",
            "slot_belt",
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
            "container_feet",
            "slot_feet",
            "container_gloves",
            "slot_gloves",
            "container_potions",
            "Belt",
        ]
    )

    return newData;
}

export {
    getUpdatedPlayerInventoryOriginalLayoutHD
}