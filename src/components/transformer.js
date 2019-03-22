const findPortLabel = function(sourceId, portId) {
    const sourceNode = model.nodes.find((node) => {
        return (node.id == sourceId);
    });

    const portNode = sourceNode.ports.find((port) => {
        return (port.id == portId);
    });

    return portNode.label;
};

export const transform = function(model) {
    const rootId = model.nodes[0].id;
    model.root = rootId;


    model.nodes.forEach((node) => {
        if (node.type === 'input') {
            node.template = 'QA_TILES';
            node.question = node.name;

            // answers
            node.options =[];
            node.ports.forEach((port)=> {
                if (!port.in) {
                    node.options.push({
                        id: port.id,
                        text: port.label
                    })
                }
            });
        }

        if (node.type === 'endpoint') {
            node.template = 'EP_CONTENT';
            node.content = {
                title: node.name,
                body: 'This property is not available in the editor.',
                link: {
                    url: 'http://www.vi.nl',
                    text: 'The link property is not available in the editor.'
                }
            }
        }
    });

    model.connectors = model.links.map((link) => {
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

    console.log(JSON.stringify(model));

    return model;
};
