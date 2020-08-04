/**
 * WordPress dependencies
 */
import {
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	InnerBlocks,
	BlockControls,
	AlignmentToolbar,
} from "@wordpress/block-editor";
import {
	Button,
	ColorPalette,
	PanelBody,
	RangeControl,
	CheckboxControl,
	RadioControl,
	TextControl,
	ToggleControl,
	SelectControl,
} from "@wordpress/components";
import { withState } from "@wordpress/compose";
// import { more } from "@wordpress/icons";

const ALLOWED_BLOCKS = ["core/button"];

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
	const {
		title,
		titleColor,
		body,
		bodyAlignment,
		bodyColor,
		backgroundImage,
		overlayColor,
		overlayOpacity,
		checkboxField,
		radioField,
		textField,
		toggleField,
		selectField,
	} = attributes;

	const colors = [
		{ name: "red", color: "#f00" },
		{ name: "white", color: "#fff" },
		{ name: "blue", color: "#00f" },
	];

	const onSelectImage = (newImage) =>
		setAttributes({ backgroundImage: newImage.sizes.full.url });

	return [
		<InspectorControls style={{ marginBottom: "40px" }}>
			<PanelBody title={"Inspector Control Attributes"} initialOpen={false}>
				<CheckboxControl
					heading="Checkbox Field"
					label="Tick Me"
					help="Additional help text"
					checked={checkboxField}
					onChange={(checkboxField) => setAttributes({ checkboxField })}
				/>

				<RadioControl
					label="Radio Field"
					selected={radioField}
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(radioField) => setAttributes({ radioField })}
				/>

				<TextControl
					label="Text Field"
					help="Additional help text"
					value={textField}
					onChange={(textField) => setAttributes({ textField })}
				/>

				<ToggleControl
					label="Toggle Field"
					checked={toggleField}
					onChange={(toggleField) => setAttributes({ toggleField })}
				/>

				<SelectControl
					label="Select Control"
					value={selectField}
					options={[
						{ value: "a", label: "Option A" },
						{ value: "b", label: "Option B" },
						{ value: "c", label: "Option C" },
					]}
					onChange={(selectField) => setAttributes({ selectField })}
				/>
			</PanelBody>
			<PanelBody title={"Font Color Settings"} initialOpen={false}>
				<p>
					<strong>Select a Title color:</strong>
				</p>
				<ColorPalette
					colors={colors}
					value={titleColor}
					onChange={(titleColor) => setAttributes({ titleColor })}
				/>
			</PanelBody>
			<PanelBody title={"Body Color Settings"} initialOpen={false}>
				<p>
					<strong>Select a Body color:</strong>
				</p>
				<ColorPalette
					colors={colors}
					value={bodyColor}
					onChange={(bodyColor) => setAttributes({ bodyColor })}
				/>
			</PanelBody>
			<PanelBody title={"Background Image Settings"} initialOpen={false}>
				<p>
					<strong>Select a Background Image:</strong>
				</p>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={onSelectImage}
						allowedTypes={["image"]}
						value={backgroundImage}
						render={({ open }) => (
							<Button
								onClick={open}
								icon="upload"
								label="Background Image"
								className="editor-media-placeholder__button is-button is-default is-large"
							>
								Background Image
							</Button>
						)}
					/>
				</MediaUploadCheck>
				<div style={{ marginTop: "20px", marginBottom: "40px" }}>
					<p>
						<strong>Overlay Color</strong>
					</p>
					<ColorPalette
						colors={[
							{ name: "white", color: "#fff" },
							{ name: "black", color: "#000" },
						]}
						value={overlayColor}
						onChange={(overlayColor) => setAttributes({ overlayColor })}
					/>
				</div>
				<RangeControl
					label={"Overlay Opacity"}
					value={overlayOpacity}
					onChange={(overlayOpacity) => setAttributes({ overlayOpacity })}
					min={0}
					max={1}
					step={0.01}
				/>
			</PanelBody>
		</InspectorControls>,
		<div
			className="cta-container"
			style={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div
				className="cta-overlay"
				style={{ background: overlayColor, opacity: overlayOpacity }}
			></div>
			{
				<BlockControls>
					<AlignmentToolbar
						value={bodyAlignment}
						onChange={(bodyAlignment) => setAttributes({ bodyAlignment })}
					/>
				</BlockControls>
			}
			<RichText
				key="editable"
				tagName="h2"
				placeholder="Your CTA Title"
				value={title}
				onChange={(title) => setAttributes({ title })}
				style={{
					textAlign: bodyAlignment,
					color: titleColor,
					position: "relative",
				}}
			/>
			<RichText
				key="editable"
				tagName="p"
				placeholder="Your CTA Description"
				value={body}
				onChange={(body) => setAttributes({ body })}
				style={{
					textAlign: bodyAlignment,
					color: bodyColor,
					position: "relative",
				}}
			/>
			<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
		</div>,
	];
}
