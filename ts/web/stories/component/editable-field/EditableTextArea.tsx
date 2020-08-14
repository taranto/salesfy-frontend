import React from "react";
import AbstractEditableField from './AbstractEditableField'

class EditableTextArea extends AbstractEditableField {
	constructor(props) {
		super(props);
	}

	public editableLabel(input, placeholder) {
		const { meta: { error, visited, touched } } = this.props;
		return (
			<a className={`fake-field field-description fake-text-area ${(error && (visited || touched)) && 'error-field'}`} href="#" onClick={() => this.setEditable(true)}>
				{input.value ? input.value : placeholder}
			</a>
		)
	}

	public editableInput(input, placeholder) {
		const { meta: { error, visited, touched } } = this.props;
		return (
			<textarea
				ref={ref => this.textArea = ref}
				className={`field field-description ${(error && (visited || touched)) && 'error-field'}`}
				placeholder={placeholder}
				{...input}
				onChange={this.onChange}
				onBlur={() => this.setEditable(false)}
			/>
		)
	}
}

export default EditableTextArea;

/*

export const DescriptionField = () => {
	return (
		<div className="description-field">
			<div className="window-module-title window-module-title-no-divider card-detail-description">
				<span className="icon-description icon-lg window-module-title-icon"/>
				<h3 className="u-inline-block">Descrição</h3>
				<div className="editable">
					<a className="button subtle hide-on-edit js-show-with-desc js-edit-desc hide" href="#">Editar</a>
				</div>
			</div>
			<div className="u-gutter js-hide-on-minimize-desc">
				<div className="editable">
					<div className="description-content js-desc-content">
						<div className="description-content-fade-button">
							<span className="description-content-fade-button-text">Mostrar descrição completa.</span>
						</div>
						<div className="current markeddown hide-on-edit js-card-desc js-show-with-desc hide" dir="auto"/>
						<p className="u-bottom js-hide-on-edit js-hide-with-desc">
							<a className="description-fake-text-area hide-on-edit js-edit-desc js-hide-with-draft" href="#">Adicione uma descrição mais detalhada...</a>
						</p>
						<div className="card-detail-edit edit"><a className="helper button subtle js-format-help" href="#">Ajuda para formatação</a>
							<textarea className="field field-autosave js-description-draft description card-detail-description" placeholder="Adicione uma descrição mais detalhada..."/>
						</div>
						<p className="edits-warning quiet">Você tem edições não salvas neste campo. <a className="js-view-edits" href="#">Exibir edições</a> - <a className="js-discard-edits" href="#">Descartar</a></p>
						<p className="edits-error error">A edição não foi salva.</p>
					</div>
				</div>
			</div>
		</div>
	)
}
*/
