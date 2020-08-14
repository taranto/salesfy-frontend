import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from '@material-ui/core';
import { GOOGLE_DOCS_LINK, GOOGLE_SHEETS_LINK, GOOGLE_PRESENTATION_LINK, PREZI_LINK, CANVA_LINK, OFFICE_LINK, DRAWIO_LINK } from 'root/envVars';

const LinkButton = ({tooltip, className, src, onClick}) => {
	return (
		<Tooltip title={tooltip} placement={"top"}>
			<IconButton onClick={onClick}><img className={className} src={src} /></IconButton>
		</Tooltip>
	)
}

export const FastLink = () => {
	return (
		<div className="fast-link-container">
			<LinkButton tooltip={"Google Docs"} onClick={() => window.open(GOOGLE_DOCS_LINK, "_blank")} className="img-button-google" src={require("assets/docs2.png")}/>
			<LinkButton tooltip={"Google Sheets"} onClick={() => window.open(GOOGLE_SHEETS_LINK, "_blank")} className="img-button-google" src={require("assets/sheets2.png")} />
			<LinkButton tooltip={"Google Presentation"} onClick={() => window.open(GOOGLE_PRESENTATION_LINK, "_blank")} className="img-button-google" src={require("assets/presentation2.png")} />
			<LinkButton tooltip={"Prezi"} onClick={() => window.open(PREZI_LINK)} className="img-button" src={require("assets/prezi.png")} />
			<LinkButton tooltip={"Canva"} onClick={() => window.open(CANVA_LINK, "_blank")} className="img-button-canva" src={require("assets/canva.png")} />
			<LinkButton tooltip={"Microsoft Office"} onClick={() => window.open(OFFICE_LINK, "_blank")} className="img-button" src={require("assets/office.png")} />
			<LinkButton tooltip={"Draw.io"} onClick={() => window.open(DRAWIO_LINK, "_blank")} className="img-button" src={require("assets/drawio.png")} />
		</div>
	)
}
