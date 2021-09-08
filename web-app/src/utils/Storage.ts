export const saveToStorage = (key: string, value: any) => {
    console.log('saving to storage...');

    console.log(value);

    try {
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch (err: any) {
        localStorage.setItem(key, value.toString());
    }
}

export const readFromStorage = (key: string) => {
    let item = localStorage.getItem(key);

    console.log(`${key} in storage: `, item);

    if(item == null) {
        return undefined;
    }

    try {
        return JSON.parse(item);
    }
    catch (err: any) {
        return item;
    }
}

export const k_layouts = 'layouts';
export const k_rosters = 'rosters';