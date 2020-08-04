/**
 * WordPress dependencies
 */
import { RichText, InnerBlocks } from "@wordpress/block-editor";

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	const {
		title,
		titleColor,
		body,
		bodyAlignment,
		bodyColor,
		backgroundImage,
		overlayColor,
		overlayOpacity,
	} = attributes;

	return (
		<div
			className="gallery-container"
			style={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div
				className="gallery-overlay"
				style={{ background: overlayColor, opacity: overlayOpacity }}
			></div>
			<h2
				style={{
					textAlign: bodyAlignment,
					color: titleColor,
					position: "relative",
				}}
			>
				{title}
			</h2>
			<RichText.Content
				style={{
					textAlign: bodyAlignment,
					color: bodyColor,
					position: "relative",
				}}
				tagName="p"
				value={body}
			/>
			<InnerBlocks.Content />
		</div>
	);
}
