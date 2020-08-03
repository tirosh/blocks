/**
 * WordPress dependencies
 */
import { RichText, InspectorControls } from "@wordpress/block-editor";
import {
	ColorPalette,
	Panel,
	PanelBody,
	PanelRow,
	// CheckboxControl,
	// RadioControl,
	// TextControl,
	// ToggleControl,
	// SelectControl,
} from "@wordpress/components";
import { withState } from "@wordpress/compose";
// import { more } from "@wordpress/icons";

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object} [props]           Properties passed from the editor.
 * @param {string} [props.className] Class name generated for the block.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { title, titleColor, body } = attributes;

	const colors = [
		{ name: "red", color: "#f00" },
		{ name: "white", color: "#fff" },
		{ name: "blue", color: "#00f" },
	];

	return [
		<InspectorControls style={{ marginBottom: "40px" }}>
			<PanelBody title={"Font Color Settings"}>
				<p>
					<strong>Select a Title color:</strong>
				</p>
				<ColorPalette
					colors={colors}
					value={titleColor}
					onChange={(titleColor) => setAttributes({ titleColor })}
				/>
			</PanelBody>
		</InspectorControls>,
		<div className="cta-container">
			<RichText
				key="editable"
				tagName="h2"
				placeholder="Your CTA Title"
				value={title}
				onChange={(title) => setAttributes({ title })}
				style={{ color: titleColor }}
			/>
			<RichText
				key="editable"
				tagName="p"
				placeholder="Your CTA Description"
				value={body}
				onChange={(body) => setAttributes({ body })}
			/>
		</div>,
	];
}
