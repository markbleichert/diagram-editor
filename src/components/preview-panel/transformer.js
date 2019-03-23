export const transform = function(model) {
    const m = {
        root: null,
        nodes: [],
        connectors: []
    };

    m.root = model.nodes[0].id;

    m.nodes = model.nodes.map((node) => {

        if (node.type === 'input') {
            const qa = {
                id: node.id,
                type: 'question',
                template: 'QA_TILES',
                question: node.name,
                options: []
            };

            node.ports.forEach((port)=> {
                if (!port.in) {
                    qa.options.push({id: port.id, text: port.label});
                }
            });

            return qa;
        }

        if (node.type === 'endpoint') {
            return {
                id: node.id,
                type: 'endpoint',
                template: 'EP_CONTENT',
                content: {
                    title: node.name,
                    body: '',
                    link: {
                        url: '#',
                        text: 'not available'
                    }
                }
            };
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
