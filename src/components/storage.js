export default {
    parseItem(item) {
        let parsed = null;
        try {
            parsed = JSON.parse(item);
        } catch(e) {
            console.info(`Can not parse ${item}`)
        }
        return parsed;
    },

    getAllFromStorage() {
        var models = [];
        for (var i = 0; i<localStorage.length; i++) {
            const item = this.getFromStorage(localStorage.key(i));
            if (item) {
                models.push(item);
            }
        }
        return models;
    },

    saveToStorage(model) {
        localStorage.setItem(model.id, JSON.stringify(model));
    },

    getFromStorage(id) {
        return this.parseItem(localStorage.getItem(id));
    },

    removeItem(id) {
        localStorage.removeItem(id);
    }
};
