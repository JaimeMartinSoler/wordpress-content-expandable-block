/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, FontSizePicker, BaseControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {

	const {
		buttonsTextColor,
		buttonsColor,
		buttonsFontSize,
		buttonsSize,
		buttonsHoverColor,
		buttonsDisableColor,
		buttonsBackgroundColor
	} = attributes;

	const divStyles = {
		buttons: {
            color: buttonsTextColor,
            backgroundColor: buttonsColor,
            fontSize: buttonsFontSize,
			width: buttonsSize,
			height: buttonsSize,
			'--buttons-hover-background-color': buttonsHoverColor
		},
		buttonsContainer: {
            backgroundColor: buttonsBackgroundColor
		}
	}

	return (
        <>
			<InspectorControls>
                <PanelBody title={ __( 'Buttons Settings', 'content-expandable-block' ) }>
					<BaseControl label={ __('Buttons Text Color', 'content-expandable-block')}>
						<ColorPalette
							value={buttonsTextColor}
							onChange={(color) => setAttributes({ buttonsTextColor: color })}
						/>
                    </BaseControl>
					<BaseControl label={ __('Buttons Color', 'content-expandable-block')}>
						<ColorPalette
							value={buttonsColor}
							onChange={(color) => setAttributes({ buttonsColor: color })}
						/>
                    </BaseControl>
                    <BaseControl label={__('Buttons Font Size', 'content-expandable-block')}>
                        <FontSizePicker
                            value={buttonsFontSize}
                            onChange={(size) => setAttributes({ buttonsFontSize: size })}
                        />
                    </BaseControl>
                    <BaseControl label={__('Buttons Size', 'content-expandable-block')}>
                        <FontSizePicker
                            value={buttonsSize}
                            onChange={(size) => setAttributes({ buttonsSize: size })}
                        />
                    </BaseControl>
					<BaseControl label={ __('Buttons Hover Color', 'content-expandable-block')}>
						<ColorPalette
							value={buttonsHoverColor}
							onChange={(color) => setAttributes({ buttonsHoverColor: color })}
						/>
                    </BaseControl>
					<BaseControl label={ __('Buttons Disable Color', 'content-expandable-block')}>
						<ColorPalette
							value={buttonsDisableColor}
							onChange={(color) => setAttributes({ buttonsDisableColor: color })}
						/>
                    </BaseControl>
					<BaseControl label={ __('Buttons Background Color', 'content-expandable-block')}>
						<ColorPalette
							value={buttonsBackgroundColor}
							onChange={(color) => setAttributes({ buttonsBackgroundColor: color })}
						/>
                    </BaseControl>
                </PanelBody>
			</InspectorControls>

			<p { ...useBlockProps() }> {
				<div class="content-expandable-block">
					<div class="news-button-container" style={divStyles.buttonsContainer}>
						<button style={divStyles.buttons}>-</button>
						<button style={divStyles.buttons}>+</button>
					</div>
					<div class="news-text-container">
						<div class="news-text">
							This is a text sample for the content-expandable-block
						</div>
					</div>
				</div>
			} </p>
		</>
	);
}
