export default {
    "id": "f95618df-cdb4-4e65-852c-fab964cdd1a2",
    "offsetX": 0,
    "offsetY": 0,
    "name": "Kaart kwijt",
    "zoom": 100,
    "links": [{
        "id": "b20600de-f365-4a7c-ad0c-a0f77ed2af84",
        "_class": "LinkModel",
        "selected": false,
        "type": "default",
        "source": "469be3b4-d42b-4b8b-bc5a-7ff5f74c34c6",
        "sourcePort": "860c8c72-398d-4ea9-9720-6082193b3bbf",
        "target": "844c6cd9-65a6-4889-bddd-b53e5ba13c71",
        "targetPort": "b251fc39-d822-4272-9fbe-bc6799b838fa",
        "points": [{
            "id": "804351a2-2d5c-4633-9eb3-2aae4ba0a410",
            "_class": "PointModel",
            "selected": false,
            "x": 194.25,
            "y": 130.5
        }, {
            "id": "ece34f82-fc1a-49e1-a9d5-ee996219d360",
            "_class": "PointModel",
            "selected": false,
            "x": 317.25,
            "y": 128.5
        }],
        "extras": {}
    }, {
        "id": "2d225d73-f86c-4e91-b1bb-fdb02956c735",
        "_class": "LinkModel",
        "selected": false,
        "type": "default",
        "source": "844c6cd9-65a6-4889-bddd-b53e5ba13c71",
        "sourcePort": "d9a93ae7-a091-4f49-9a4e-508eaad86bd6",
        "target": "e3add8b5-28f5-4f96-966a-bcd57327ece3",
        "targetPort": "8e88de78-66c1-40a1-bab7-ed95a543517a",
        "points": [{
            "id": "8fbdfa4d-1be9-4f57-afb1-6c90c123f700",
            "_class": "PointModel",
            "selected": false,
            "x": 413.109375,
            "y": 151
        }, {
            "id": "8133c567-f792-4b6b-bd7c-b3685678a269",
            "_class": "PointModel",
            "selected": false,
            "x": 533.25,
            "y": 129.5
        }],
        "extras": {}
    }, {
        "id": "0835da1c-409c-43a5-80de-c26086848139",
        "_class": "LinkModel",
        "selected": false,
        "type": "default",
        "source": "469be3b4-d42b-4b8b-bc5a-7ff5f74c34c6",
        "sourcePort": "944a83c6-29df-4fc6-88b7-9e3b517cfca1",
        "target": "102b37cc-5983-4cd9-88b3-383fcef7115b",
        "targetPort": "a6beb22c-fd3d-4b35-ba75-a68b3241c267",
        "points": [{
            "id": "097ac3b6-e71d-494c-a0e1-b62500ea2a3f",
            "_class": "PointModel",
            "selected": false,
            "x": 194.25,
            "y": 146.5
        }, {
            "id": "d466c394-f57b-4430-9197-d2b3c2d22829",
            "_class": "PointModel",
            "selected": false,
            "x": 325.25,
            "y": 258.5
        }],
        "extras": {}
    }, {
        "id": "5d015d24-6918-4c71-8fc0-b83a3e06ca24",
        "_class": "LinkModel",
        "selected": false,
        "type": "default",
        "source": "469be3b4-d42b-4b8b-bc5a-7ff5f74c34c6",
        "sourcePort": "a357ccab-e30e-4f81-8808-6c44f4623068",
        "target": "c5811014-f836-48cb-96cf-f4013d54ae15",
        "targetPort": "266732bd-b041-4566-a6ee-460e7655f533",
        "points": [{
            "id": "b3092d5f-39f1-4930-8161-2a34cfde003b",
            "_class": "PointModel",
            "selected": false,
            "x": 194.25,
            "y": 162.5
        }, {
            "id": "553a2951-032f-4a09-8d5d-94e442c1298b",
            "_class": "PointModel",
            "selected": false,
            "x": 260.25,
            "y": 330.5
        }],
        "extras": {}
    }],
    "nodes": [{
        "id": "844c6cd9-65a6-4889-bddd-b53e5ba13c71",
        "_class": "InputNodeModel",
        "selected": true,
        "type": "input",
        "x": 302.75,
        "y": 89,
        "extras": {},
        "ports": [{
            "id": "b251fc39-d822-4272-9fbe-bc6799b838fa",
            "_class": "DefaultPortModel",
            "selected": false,
            "name": "input",
            "parentNode": "844c6cd9-65a6-4889-bddd-b53e5ba13c71",
            "links": ["b20600de-f365-4a7c-ad0c-a0f77ed2af84"],
            "in": true,
            "label": "In"
        }, {
            "id": "d9a93ae7-a091-4f49-9a4e-508eaad86bd6",
            "_class": "ImagePortModel",
            "selected": false,
            "name": "out1",
            "parentNode": "844c6cd9-65a6-4889-bddd-b53e5ba13c71",
            "links": ["2d225d73-f86c-4e91-b1bb-fdb02956c735"],
            "in": false,
            "label": "Tijdelijk blokkeren",
            "image": {"src": "", "alt": ""}
        }, {
            "id": "21b17fb0-329e-43c9-831d-d42f1f7040e6",
            "_class": "ImagePortModel",
            "selected": false,
            "name": "out2",
            "parentNode": "844c6cd9-65a6-4889-bddd-b53e5ba13c71",
            "links": [],
            "in": false,
            "label": "Deblokkeren",
            "image": {"src": "", "alt": ""}
        }],
        "name": "Wil je nu doen ?",
        "color": "rgb(192, 255, 0)",
        "content": {
            "title": "Creditcard kwijt",
            "body": "Ben je je creditcard kwijt maar denk je hem nog terug te vinden? Blokkeer je creditcard dan tijdelijk online of via de app. Zo weet je zeker dat anderen je creditcard niet kunnen gebruiken.  <br/><br/>Ben je je kaart kwijt maar heb je hem inmiddels terug gevonden ? Dan kun je je kaart nu online deblokkeren.",
            "video": {"url": ""},
            "image": {"src": "", "alt": ""},
            "info": {"title": "", "body": ""}
        }
    }, {
        "id": "e3add8b5-28f5-4f96-966a-bcd57327ece3",
        "_class": "EndpointNodeModel",
        "selected": false,
        "type": "endpoint",
        "x": 518.75,
        "y": 90,
        "extras": {},
        "ports": [{
            "id": "8e88de78-66c1-40a1-bab7-ed95a543517a",
            "_class": "DefaultPortModel",
            "selected": false,
            "name": "endpoint",
            "parentNode": "e3add8b5-28f5-4f96-966a-bcd57327ece3",
            "links": ["2d225d73-f86c-4e91-b1bb-fdb02956c735"],
            "in": true,
            "label": "In"
        }],
        "name": "Endpoint Node",
        "color": "rgb(6, 147, 227)",
        "content": {
            "title": "Je creditcard is kwijt",
            "body": "Ben je je creditcard kwijt maar denk je hem nog terug te vinden? Blokkeer je creditcard dan tijdelijk online of via de app. Zo weet je zeker dat anderen je creditcard niet kunnen gebruiken. Vind je je creditcard niet terug, vraag dan gratis een nieuwe aan. Je krijgt de nieuwe creditcard binnen enkele dagen in de brievenbus.",
            "image": {"src": "", "alt": ""},
            "link": {"url": "https://bankieren.rabobank.nl/", "text": "Tijdelijk blokkeren"}
        }
    }, {
        "id": "469be3b4-d42b-4b8b-bc5a-7ff5f74c34c6",
        "_class": "InputNodeModel",
        "selected": false,
        "type": "input",
        "x": 84.75,
        "y": 75,
        "extras": {},
        "ports": [{
            "id": "635a2254-5e1c-4139-a5b6-e66b1a7df71a",
            "_class": "DefaultPortModel",
            "selected": false,
            "name": "input",
            "parentNode": "469be3b4-d42b-4b8b-bc5a-7ff5f74c34c6",
            "links": [],
            "in": true,
            "label": "In"
        }, {
            "id": "860c8c72-398d-4ea9-9720-6082193b3bbf",
            "_class": "ImagePortModel",
            "selected": false,
            "name": "out1",
            "parentNode": "469be3b4-d42b-4b8b-bc5a-7ff5f74c34c6",
            "links": ["b20600de-f365-4a7c-ad0c-a0f77ed2af84"],
            "in": false,
            "label": "Kwijt",
            "image": {"src": "", "alt": ""}
        }, {
            "id": "944a83c6-29df-4fc6-88b7-9e3b517cfca1",
            "_class": "ImagePortModel",
            "selected": false,
            "name": "out2",
            "parentNode": "469be3b4-d42b-4b8b-bc5a-7ff5f74c34c6",
            "links": ["0835da1c-409c-43a5-80de-c26086848139"],
            "in": false,
            "label": "Gestolen",
            "image": {"src": "", "alt": ""}
        }, {
            "id": "a357ccab-e30e-4f81-8808-6c44f4623068",
            "_class": "ImagePortModel",
            "selected": false,
            "name": "out3",
            "parentNode": "469be3b4-d42b-4b8b-bc5a-7ff5f74c34c6",
            "links": ["5d015d24-6918-4c71-8fc0-b83a3e06ca24"],
            "in": false,
            "label": "Kapot",
            "image": {"src": "", "alt": ""}
        }],
        "name": "Mijn kaart is..",
        "color": "rgb(192, 255, 0)",
        "content": {
            "title": "Creditcard kwijt, gestolen of kapot",
            "body": "Is je creditcard gestolen, verloren of werkt hij niet meer? Vervelend! Volg de stappen hieronder en je hebt binnenkort weer een werkende RaboCard of Rabo GoldCard in je portemonnee.",
            "video": {"url": ""},
            "image": {"src": "", "alt": ""},
            "info": {"title": "", "body": ""}
        }
    }, {
        "id": "102b37cc-5983-4cd9-88b3-383fcef7115b",
        "_class": "EndpointNodeModel",
        "selected": false,
        "type": "endpoint",
        "x": 310.75,
        "y": 219,
        "extras": {},
        "ports": [{
            "id": "a6beb22c-fd3d-4b35-ba75-a68b3241c267",
            "_class": "DefaultPortModel",
            "selected": false,
            "name": "endpoint",
            "parentNode": "102b37cc-5983-4cd9-88b3-383fcef7115b",
            "links": ["0835da1c-409c-43a5-80de-c26086848139"],
            "in": true,
            "label": "In"
        }],
        "name": "Endpoint Node",
        "color": "rgb(6, 147, 227)",
        "content": {
            "title": "Je kaart is gestolen",
            "body": "Is je creditcard gestolen? Blokkeer je creditcard definitief en je ontvangt gelijk een nieuwe creditcard. Dit gaat het snelst via de app. Direct blokkeren is belangrijk, want zo weet je zeker dat anderen je creditcard niet gebruiken. Je krijgt de nieuwe creditcard binnen enkele dagen in de brievenbus. Je krijgt ook een aparte brief met je nieuwe pincode.",
            "image": {"src": "", "alt": ""},
            "link": {"url": "", "text": "Blokkeren"}
        }
    }, {
        "id": "c5811014-f836-48cb-96cf-f4013d54ae15",
        "_class": "EndpointNodeModel",
        "selected": false,
        "type": "endpoint",
        "x": 245.75,
        "y": 291,
        "extras": {},
        "ports": [{
            "id": "266732bd-b041-4566-a6ee-460e7655f533",
            "_class": "DefaultPortModel",
            "selected": false,
            "name": "endpoint",
            "parentNode": "c5811014-f836-48cb-96cf-f4013d54ae15",
            "links": ["5d015d24-6918-4c71-8fc0-b83a3e06ca24"],
            "in": true,
            "label": "In"
        }],
        "name": "Endpoint Node",
        "color": "rgb(192, 255, 0)",
        "content": {
            "title": "Je creditcard is kapot",
            "body": "Is je creditcard stuk? Vraag een nieuwe creditcard aan. Dit gaat het snelst via de app. Je hoeft je oude creditcard niet te blokkeren. Je krijgt de nieuwe creditcard binnen enkele dagen in de brievenbus. Je blijft dezelfde pincode gebruiken.",
            "image": {"src": "", "alt": ""},
            "link": {"url": "", "text": "Nieuwe kaart aanvragen"}
        }
    }],
    "root": "844c6cd9-65a6-4889-bddd-b53e5ba13c71"
}