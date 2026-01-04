/*
* Recursively merge properties of two objects 
  https://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects
*/
function MergeRecursive(obj1, obj2) {

    for (var p in obj2) {
        try {
            // Property in destination object set; update its value.
            if (obj2[p].constructor == Object) {
                obj1[p] = MergeRecursive(obj1[p], obj2[p]);

            } else {
                obj1[p] = obj2[p];

            }

        } catch (e) {
            // Property in destination object not set; create it and set its value.
            obj1[p] = obj2[p];

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

export {
    updateChild,
    updateNode,
    updateChildPosition,
    setChild,
    removeChild
};