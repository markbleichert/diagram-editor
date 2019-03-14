import React from 'react';
import * as RJD from 'react-js-diagrams';

// Setup the diagram engine
export const engine = new RJD.DiagramEngine();
engine.registerNodeFactory(new RJD.DefaultNodeFactory());
engine.registerLinkFactory(new RJD.DefaultLinkFactory());

// We need this to help the system know what models to create form the JSON
engine.registerInstanceFactory(new RJD.DefaultNodeInstanceFactory());
engine.registerInstanceFactory(new RJD.DefaultPortInstanceFactory());
engine.registerInstanceFactory(new RJD.LinkInstanceFactory());
