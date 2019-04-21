function clean(object) {
    Object
        .entries(object)
        .forEach(([k, v]) => {
            if (v && typeof v === 'object')
                clean(v);
            if (v &&
                typeof v === 'object' &&
                !Object.keys(v).length ||
                v === null ||
                v === undefined ||
                v.length === 0
            ) {
                if (Array.isArray(object))
                    object.splice(k, 1);
                else if (!(v instanceof Date))
                    delete object[k];
            }
        });
    return object;
}

function sanitize(data) {
    let d = null;
    if (data) {
        d = clean(data);
    }

    if (d) {
        return Object.keys(d).length > 0 ? d : null;
    }
    return null;
}

function clone(src) {
    return JSON.parse(JSON.stringify(src));
}

function addConnection(node) {
    const qa = {
        id: node.id,
        type: 'connection',
        template: 'QA_TILES',
        question: node.name,
        options: []
    };

    // add image only when present
    const content = sanitize(node.content);
    if (content) {
        qa.content = content;
    }

    node.ports.forEach((port)=> {
        if (!port.in) {
            qa.options.push({
                id: port.id,
                text: port.label
            });
        }
    });

    return qa;
}

function addQuestion(node) {
    const qa = {
        id: node.id,
        type: 'question',
        template: 'QA_TILES',
        question: node.name,
        options: []
    };

    // add image only when present
    const content = sanitize(node.content);
    if (content) {
        qa.content = content;
    }

    node.ports.forEach((port)=> {
        if (!port.in) {
            let image = null;

            if (port.image) {
                image = {};
                if (port.image.src) {
                    image.src = port.image.src;
                }
                if (port.image.alt) {
                    image.alt = port.image.alt;
                }

            }

            // required
            const option = {
                id: port.id,
                value: port.value,
                text: port.label
            };

            // optional
            if (image && image.src) {
                option.image = image;
            }

            qa.options.push(option);
        }
    });

    return qa;
}

function addEndpoint(node) {
    const ep = {
        id: node.id,
        type: 'endpoint',
        template: 'EP_CONTENT'
    };

    const content = sanitize(node.content);
    if (content) {
        ep.content = content;
    }

    return ep;
}

export const transform = function(diagram, selectedNode) {
    const model = clone(diagram);

    const m = {
        name: model.name || 'untitled',
        root: null,
        nodes: [],
        connectors: []
    };

    let rootId = model.root;

    // set selection in preview
    if (selectedNode) {
        rootId = selectedNode.id;
    }

    m.root = rootId;

    m.nodes = model.nodes.map((node) => {
        if (node.type === 'connection') {
            return addConnection(node);
        }

        if (node.type === 'input') {
            return addQuestion(node);
        }

        if (node.type === 'endpoint') {
            return addEndpoint(node);
        }
    });

    m.connectors = model.links.map((link) => {
        return {
            id: link.id,
            type: 'connector',
            source: {
                id: link.source,
                port: link.sourcePort
            },
            target: {
                id: link.target
            }
        };
    });

    return m;
};
