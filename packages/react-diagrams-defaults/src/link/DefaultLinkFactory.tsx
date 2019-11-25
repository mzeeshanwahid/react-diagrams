import * as React from 'react';
import { DefaultLinkModel } from './DefaultLinkModel';
import { DefaultLinkWidget } from './DefaultLinkWidget';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { Toolkit } from '@projectstorm/react-canvas-core/src/Toolkit';

namespace S {
	export const Keyframes = keyframes`
		from {
			stroke-dashoffset: 24;
		}
		to {
			stroke-dashoffset: 0;
		}
	`;

	const selected = css`
		stroke-dasharray: 10, 2;
		animation: ${Keyframes} 1s linear infinite;
	`;

	export const Path = styled.path<{ selected: boolean }>`
		${p => p.selected && selected};
		fill: none;
		pointer-events: all;
	`;
}

export class DefaultLinkFactory<Link extends DefaultLinkModel = DefaultLinkModel> extends AbstractReactFactory<
	Link,
	DiagramEngine
	> {
	constructor(type = 'default') {
		super(type);
	}

	generateReactWidget(event): JSX.Element {
		return <DefaultLinkWidget link={event.model} diagramEngine={this.engine} />;
	}

	generateModel(event): Link {
		return new DefaultLinkModel() as Link;
	}

	// generateLinkSegment(model: Link, selected: boolean, path: string) {
	// 	return (
	// 		<S.Path
	// 			selected={selected}
	// 			stroke={selected ? model.getOptions().selectedColor : model.getOptions().color}
	// 			strokeWidth={model.getOptions().width}
	// 			d={path}
	// 		/>
	// 	);
	// }

	generateLinkSegment(model: DefaultLinkModel, widget: DefaultLinkWidget, selected: boolean, path: string) {
		var markerId = Toolkit.UID();
		var markerEndUrl = "url(#" + markerId + ")";
		return (
			<g>
				<defs>
					<marker id={markerId} markerWidth="8" markerHeight="8" refX="3.5" refY="3"
						orient="auto" markerUnits="strokeWidth">
						<path d="M0,0 L0,6 L3.5,3 z" className={selected ? widget.bem("--marker-selected") : widget.bem("-marker")} />
					</marker>
				</defs>
				<path
					className={selected ? widget.bem("--path-selected") : ""}
					fill="none"
					strokeWidth={model.width}
					stroke={model.color}
					d={path}
					markerEnd={markerEndUrl}
				/>
			</g>
		);
	}
}
