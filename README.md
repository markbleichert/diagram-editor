# Diagram editor
A proof of concept for a React based diagram editor. This editor enables a user to visually model a data flow.
This data serves as input for the QA runtime which is also embedded as a preview tool in the editor.
Runtime and data can be deployed to the target website.

![alt text](img/screenshot.png "Data flow visualization")

## Features

* React 16
* Webpack 4
* Babel 7
* Diagramming editor

## Installation

* `git clone https://github.com/markbleichert/diagram-editor.git`
* cd diagram-editor
* npm install
* npm start
* visit `http://localhost:8080/`


## Known bugs

* When creating a new diagram no root id is added. Root id is the id of the node where the QA runtime should start at.
* Nodes of type 'QA connection' only have one in and out port. In the props editor 'add ports' should be disabled and not allow to add additional ports.
* A selected node in the diagram should be removed only throught the use of the backspace button. Using the remove button on the
node in the diagram wil not properly remove the element.