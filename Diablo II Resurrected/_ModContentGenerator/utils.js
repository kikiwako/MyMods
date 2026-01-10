/*
* Recursively merge properties of two objects 
  obj2 has priority and overwrites obj1 for conflicts
  https://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects
*/
function MergeRecursive(obj1, obj2) {

    for (var k in obj2) {
        try {
            // Property in destination object set; update its value.
            if (obj2[k].constructor == Object) {
                obj1[k] = MergeRecursive(obj1[k], obj2[k]);

            } else if ([obj1[k], obj2[k]].includes("DELETE")) {
                delete obj1[k];
                delete obj2[k];
            } else {
                obj1[k] = obj2[k];
            }

        } catch (e) {
            // Property in destination object not set; create it and set its value.
            obj1[k] = obj2[k];

        }
    }

    return obj1;
}

const updateChild = (newData, name, values, callback = null) => {
    let foundIndex = -1;

    const child = newData.children.find((c, i) => {
        if (c.name === name) {
            foundIndex = i;
            return true;
        }
    });

    if (foundIndex === -1) {
        console.error("Child with name " + name + " not found");
        return child;
    }

    if (typeof values === 'object') {
        newData.children[foundIndex] = MergeRecursive(child, values);
    } else {
        newData.children[foundIndex] = values;
    }

    if (callback) {
        callback(newData.children[foundIndex]);
    }
}

const updateChildPosition = (newData, name, x, y, w, h) => {
    let foundIndex = -1;

    const child = newData.children.find((c, i) => {
        if (c.name === name) {
            foundIndex = i;
            return true;
        }
    });

    if (foundIndex === -1) {
        console.error("Child with name " + name + " not found");
        return child;
    }

    newData.children[foundIndex].fields.rect.x = x;
    newData.children[foundIndex].fields.rect.y = y;
    if (w != undefined) newData.children[foundIndex].fields.rect.width = w;
    if (y != undefined) newData.children[foundIndex].fields.rect.height = h;
}

const insertChildAfterChild = (newData, name, value) => {
    let foundIndex = -1;

    const child = newData.children.find((c, i) => {
        if (c.name === name) {
            foundIndex = i;
            return true;
        }
    });

    if (foundIndex === -1) {
        console.error("Child with name " + name + " not found");
        return child;
    }

    newData.children.splice(foundIndex + 1, 0, value);
}

const updateNode = (newData, values) => {
    if (typeof values === 'object') {
        newData = MergeRecursive(newData, values);
    } else {
        newData = values;
    }
}

const setChild = (newData, name, values) => {
    let foundIndex = -1;

    const child = newData.children.find((c, i) => {
        if (c.name === name) {
            foundIndex = i;
            return true;
        }
    });

    if (foundIndex === -1) {
        console.error("Child with name " + name + " not found");
        return child;
    }

    newData.children[foundIndex] = values;
}

const removeChild = (newData, name) => {
    let foundIndex = -1;

    newData.children.find((c, i) => {
        if (c.name === name) {
            foundIndex = i;
            return true;
        }
    });

    if (foundIndex === -1) {
        console.error("Child with name " + name + " not found");
        return child;
    }

    if (foundIndex !== -1) {
        newData.children.splice(foundIndex, 1);
    }
}

const getReorderedChildren = (newData, nameList) => {

    if (!newData || !Array.isArray(newData.children)) return newData;
    if (!Array.isArray(nameList) || nameList.length === 0) return newData;

    const used = new Set();
    const nameToChild = new Map();
    newData.children.forEach((c) => {
        if (c && typeof c.name === 'string') nameToChild.set(c.name, c);
    });

    const reordered = [];
    for (const name of nameList) {
        if (used.has(name)) continue;
        if (nameToChild.has(name)) {
            reordered.push(nameToChild.get(name));
            used.add(name);
        } else {
            console.warn("Child with name " + name + " not found");
        }
    }

    // Append any children not mentioned in nameList, preserving original order
    for (const c of newData.children) {
        if (!used.has(c.name)) reordered.push(c);
    }

    return reordered;

}

export {
    updateChild,
    updateNode,
    updateChildPosition,
    getReorderedChildren,
    setChild,
    insertChildAfterChild,
    removeChild
};