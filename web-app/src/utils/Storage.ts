export const saveToStorage = (key: string, value: any) => {
    if(typeof value === 'object') {
        localStorage.setItem(key, JSON.stringify(value));
    }
    else {
        localStorage.setItem(key, value.toString());
    }
}

export const readFromStorage = (key: string) => {
    let item: string | null = localStorage.getItem(key);

    if(item == null) {
        return undefined;
    }

    try {
        item = JSON.parse(item);
        return item;
    }
    catch (err: any) {
        return item;
    }
}

export const k_roster = 'roster';