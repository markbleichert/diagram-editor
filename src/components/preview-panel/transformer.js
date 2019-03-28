export const transform = function(model, selectedNode) {
    const m = {
        root: null,
        nodes: [],
        connectors: []
    };

    let rootId = model.nodes[0].id;

    if (selectedNode) {
        rootId = selectedNode.id;
    }

    m.root = rootId;

    m.nodes = model.nodes.map((node) => {
        if (node.type === 'input') {

            const qa = {
                id: node.id,
                type: 'question',
                template: 'QA_TILES',
                question: node.name,
                options: []
            };

            // add image only when present
            if (node.image && node.image.src) {
                qa.content = {
                    image: {
                        src: node.image.src,
                        alt: node.image.alt
                    }
                };

            } else {
                console.warn('no image to process..');
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
