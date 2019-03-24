import React from 'react';
import * as RJD from '../../../lib/main';
import { InputWidgetFactory } from '../nodes/input/InputWidgetFactory';
import { InputNodeFactory } from '../nodes/input/InputInstanceFactories';
import { EndpointWidgetFactory } from '../nodes/endpoint/EndpointWidgetFactory';
import { EndpointNodeFactory } from '../nodes/endpoint/EndpointInstanceFactories';

// Setup the diagram engine
export const engine = new RJD.DiagramEngine();
engine.registerNodeFactory(new RJD.DefaultNodeFactory());
engine.registerLinkFactory(new RJD.DefaultLinkFactory());

engine.registerNodeFactory(new InputWidgetFactory());
engine.registerNodeFactory(new EndpointWidgetFactory());

// We need this to help the system know what models to create form the JSON
engine.registerInstanceFactory(new RJD.DefaultNodeInstanceFactory());
engine.registerInstanceFactory(new RJD.DefaultPortInstanceFactory());
engine.registerInstanceFactory(new RJD.LinkInstanceFactory());
engine.registerInstanceFactory(new InputNodeFactory());
engine.registerInstanceFactory(new EndpointNodeFactory());
