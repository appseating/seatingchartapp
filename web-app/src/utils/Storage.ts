export const saveToStorage = (key: string, value: any) => {
    console.log('saving to storage...');

    try {
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch (err: any) {
        localStorage.setItem(key, value.toString());
    }
}

export const readFromStorage = (key: string) => {
    console.log('reading from storage...');

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

export const k_layouts = 'layouts';
export const k_rosters = 'rosters';