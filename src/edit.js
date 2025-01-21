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
import { PanelBody, TextControl, __experimentalPaletteEdit as PaletteEdit, __experimentalBoxControl as BoxControl, FontSizePicker, BaseControl, CheckboxControl, RadioControl } from '@wordpress/components';
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
 * @see https://wordpress.github.io/gutenberg/?path=/docs/components-colorpalette--docs
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {

	const {
		buttonsSide,
		buttonsColor,
		buttonsHoverColor,
		buttonsDisabledColor,

		buttonsWidth,
		buttonsHeight,
		buttonsMargin,

		buttonsBorderColor,
		buttonsBorderWidth,
		buttonsBorderRadius,

		buttonsBackgroundColor,
		buttonsBackgroundPadding,
		buttonsBackgroundRadius,

		buttonsTextColor,
		buttonsTextHoverColor,
		buttonsTextDisabledColor,
		button01Text,  // typ: | ▲ | - | prev | less | 
		button02Text,  // typ: | ▼ | + | next | more | 
		buttonsFontSize,

		textPadding,

		disableButtons,
		showErrorMsgIfContentError,
		contentDefaultKey
		
	} = attributes;

	const divStyles = {
		buttons: {
            color: buttonsTextColor,
            backgroundColor: buttonsColor,
            fontSize: buttonsFontSize,
			width: buttonsWidth,
			height: buttonsHeight,
			margin: `${buttonsMargin} 0`,
			border: `${buttonsBorderWidth} solid ${buttonsBorderColor}`,
			borderRadius: buttonsBorderRadius,
			'--buttons-hover-text-color': buttonsTextHoverColor,
			'--buttons-hover-background-color': buttonsHoverColor
		},
		buttonsDiasbled: {
            color: buttonsTextDisabledColor,
            backgroundColor: buttonsDisabledColor,
            fontSize: buttonsFontSize,
			width: buttonsWidth,
			height: buttonsHeight,
			margin: `${buttonsMargin} 0`,
			border: `${buttonsBorderWidth} solid ${buttonsBorderColor}`,
			borderRadius: buttonsBorderRadius,
			'--buttons-hover-text-color': buttonsTextHoverColor,
			'--buttons-hover-background-color': buttonsHoverColor
		},
		buttonsContainer: {
            backgroundColor: buttonsBackgroundColor,
			padding: buttonsBackgroundPadding,
			borderRadius: buttonsBackgroundRadius,
			//display: disableButtons ? 'none' : 'DO_NOT_DISPLAY'
		},
		text: {
            padding: textPadding
		},
	}
	const textSample = "This is a text sample for the content-expandable-block. This is supposed to be filled with the corresponding content of our WordPress posts. With this text we can have an idea of the looks of this content-expandable-block."
	// divStyles.buttonsContainer.display
	if (disableButtons) {
		divStyles.buttonsContainer.display = 'none'
	} else {
		delete divStyles.buttonsContainer.display  // assigning 'block' or 'inline' ruins the view
	}

	return (
        <>
			<InspectorControls>

                <PanelBody title={ __( 'Buttons Main', 'content-expandable-block' ) }>
					<RadioControl
						label="Buttons Side"
						selected={ buttonsSide }
						options={[
							{
								label: 'Left',
								value: 'left'
							},
							{
								label: 'Right',
								value: 'right'
							}
						]}
						onChange={ ( value ) => setAttributes( { buttonsSide: value } ) }
					/>
					<PaletteEdit
						paletteLabel="Buttons Color | Hover | Disabled"
						emptyMessage="Colors are empty"
						colors={[
							{
								color: buttonsColor,
								name: 'Buttons Color',
								slug: 'buttons-color'
							},
							{
								color: buttonsHoverColor,
								name: 'Buttons Hover Color',
								slug: 'buttons-hover-color'
							},
							{
								color: buttonsDisabledColor,
								name: 'Buttons Disabled Color',
								slug: 'buttons-disabled-color'
							}
						]}
						onChange={ ( colors ) => setAttributes( {
							buttonsColor: colors[0].color,
							buttonsHoverColor: colors[1].color,
							buttonsDisabledColor: colors[2].color
						} ) }
						popoverProps={{ offset: 8, placement: 'bottom-start' }}
						canOnlyChangeValues
					/>
					<br></br>
					<BoxControl
						label="Buttons Width"
						units={['px']}
						values={ {left: buttonsWidth, right: buttonsWidth} }
						onChange={ ( values ) => setAttributes( { buttonsWidth: values.left } ) }
						sides={['horizontal']}
						resetValues={ {top: undefined,  right: '30px', bottom: undefined, left: '30px'} }
					/>
					<BoxControl
						label="Buttons Height"
						units={['px']}
						values={ {top: buttonsHeight, bottom: buttonsHeight} }
						onChange={ ( values ) => setAttributes( { buttonsHeight: values.top } ) }
						sides={['vertical']}
						resetValues={ {top: '30px',  right: undefined, bottom: '30px', left: undefined} }
					/>
					<BoxControl
						label="Buttons Margin"
						units={['px']}
						values={ {top: buttonsMargin, bottom: buttonsMargin} }
						onChange={ ( values ) => setAttributes( { buttonsMargin: values.top } ) }
						sides={['vertical']}
						resetValues={ {top: '5px',  right: undefined, bottom: '5px', left: undefined} }
					/>
                </PanelBody>

                <PanelBody title={ __( 'Buttons Border', 'content-expandable-block' ) }>
					<PaletteEdit
						paletteLabel="Buttons Border Color"
						emptyMessage="Colors are empty"
						colors={[
							{
								color: buttonsBorderColor,
								name: 'Buttons Border Color',
								slug: 'buttons-border-color'
							}
						]}
						onChange={ ( colors ) => setAttributes( {
							buttonsBorderColor: colors[0].color
						} ) }
						popoverProps={{ offset: 8, placement: 'bottom-start' }}
						canOnlyChangeValues
					/>
					<br></br>
					<BaseControl label={ __('Buttons Border Width', 'content-expandable-block')}>
					<FontSizePicker
						fontSizes={[
							{name: 'No Border (0px)', size: '0px', slug: 'n'},
							{name: 'M (1px)', size: '1px', slug: 'm'},
							{name: 'L (2px)', size: '2px', slug: 'l'},
							{name: 'XL (3px)', size: '3px', slug: 'xl'},
							{name: 'XXL (4px)', size: '4px', slug: 'xxl'}
						]}
						units={['px']}
						value={buttonsBorderWidth}
						onChange={(width) => setAttributes({ buttonsBorderWidth: width })}
                    />
                    </BaseControl>
					<BaseControl label={ __('Buttons Border Radius', 'content-expandable-block')}>
					<FontSizePicker
						fontSizes={[
							{name: 'No Radius (0px)', size: '0px', slug: 'n'},
							{name: 'M (4px)', size: '4px', slug: 'm'},
							{name: 'L (6px)', size: '6px', slug: 'l'},
							{name: 'XL (8px)', size: '8px', slug: 'xl'},
							{name: 'XXL (10px)', size: '10px', slug: 'xxl'}
						]}
						units={['px']}
						value={buttonsBorderRadius}
						onChange={(radius) => setAttributes({ buttonsBorderRadius: radius })}
                    />
                    </BaseControl>
				</PanelBody>

                <PanelBody title={ __( 'Buttons Background', 'content-expandable-block' ) }>
					<PaletteEdit
						paletteLabel="Buttons Background Color"
						emptyMessage="Colors are empty"
						colors={[
							{
								color: buttonsBackgroundColor,
								name: 'Buttons Background Color',
								slug: 'buttons-background-color'
							}
						]}
						onChange={ ( colors ) => setAttributes( {
							buttonsBackgroundColor: colors[0].color
						} ) }
						popoverProps={{ offset: 8, placement: 'bottom-start' }}
						canOnlyChangeValues
					/>
					<br></br>
					<BaseControl label={ __('Buttons Background Padding', 'content-expandable-block')}>
					<FontSizePicker
						fontSizes={[
							{name: 'S (4px)', size: '4px', slug: 's'},
							{name: 'M (6px)', size: '6px', slug: 'm'},
							{name: 'L (8px)', size: '8px', slug: 'l'},
							{name: 'XL (10px)', size: '10px', slug: 'xl'},
							{name: 'XXL (12px)', size: '12px', slug: 'xxl'}
						]}
						units={['px']}
						value={buttonsBackgroundPadding}
						onChange={(padding) => setAttributes({ buttonsBackgroundPadding: padding })}
                    />
                    </BaseControl>
					<BaseControl label={ __('Buttons Background Radius', 'content-expandable-block')}>
					<FontSizePicker
						fontSizes={[
							{name: 'No Radius (0px)', size: '0px', slug: 'n'},
							{name: 'M (4px)', size: '4px', slug: 'm'},
							{name: 'L (6px)', size: '6px', slug: 'l'},
							{name: 'XL (8px)', size: '8px', slug: 'xl'},
							{name: 'XXL (10px)', size: '10px', slug: 'xxl'}
						]}
						units={['px']}
						value={buttonsBackgroundRadius}
						onChange={(radius) => setAttributes({ buttonsBackgroundRadius: radius })}
                    />
                    </BaseControl>
				</PanelBody>

                <PanelBody title={ __( 'Buttons Text', 'content-expandable-block' ) }>
					<PaletteEdit
						paletteLabel="Buttons Text Color | Hover | Disabled"
						emptyMessage="Colors are empty"
						colors={[
							{
								color: buttonsTextColor,
								name: 'Buttons Text Color',
								slug: 'buttons-text-color'
							},
							{
								color: buttonsTextHoverColor,
								name: 'Buttons Text Hover Color',
								slug: 'buttons-text-hover-color'
							},
							{
								color: buttonsTextDisabledColor,
								name: 'Buttons Text Disabled Color',
								slug: 'buttons-text-disabled-color'
							}
						]}
						onChange={ ( colors ) => setAttributes( {
							buttonsTextColor: colors[0].color,
							buttonsTextHoverColor: colors[1].color,
							buttonsTextDisabledColor: colors[2].color
						} ) }
						popoverProps={{ offset: 8, placement: 'bottom-start' }}
						canOnlyChangeValues
					/>
					<br></br>
					<TextControl
						label="Button 01 Text"
						value={button01Text}
						onChange={(text) => setAttributes({ button01Text: text })}
					/>
					<TextControl
						label="Button 02 Text"
						value={button02Text}
						onChange={(text) => setAttributes({ button02Text: text })}
					/>
					<BaseControl label={ __('Buttons Font Size', 'content-expandable-block')}>
					<FontSizePicker
						fontSizes={[
							{name: 'S (16px)', size: '16px',slug: 's'},
							{name: 'M (18px)', size: '18px', slug: 'm'},
							{name: 'L (20px)', size: '20px', slug: 'l'},
							{name: 'XL (22px)', size: '22px', slug: 'xl'},
							{name: 'XXL (24px)', size: '24px', slug: 'xxl'}
						]}
						units={['px']}
						value={buttonsFontSize}
						onChange={(size) => setAttributes({ buttonsFontSize: size })}
                    />
                    </BaseControl>
                </PanelBody>

                <PanelBody title={ __( 'Text', 'content-expandable-block' ) }>
					<BaseControl label={ __('Text Padding', 'content-expandable-block')}>
					<FontSizePicker
						fontSizes={[
							{name: 'S (4px)', size: '4px', slug: 's'},
							{name: 'M (6px)', size: '6px', slug: 'm'},
							{name: 'L (8px)', size: '8px', slug: 'l'},
							{name: 'XL (10px)', size: '10px', slug: 'xl'},
							{name: 'XXL (12px)', size: '12px', slug: 'xxl'}
						]}
						units={['px']}
						value={textPadding}
						onChange={(padding) => setAttributes({ textPadding: padding })}
                    />
                    </BaseControl>
				</PanelBody>

				<PanelBody title={ __( 'Advanced Settings', 'content-expandable-block' ) }>
					<CheckboxControl
						label="Disable Buttons"
						help="if checked, you may want to set text-padding to 0px"
						checked={ disableButtons }
						onChange={(check) => {setAttributes({ disableButtons: check })}}
					/>
					<CheckboxControl
						label="Show Error Message if Content Error"
						help="if checked, when there is an error decoding the content, an error message is shown, otherwise the raw content is shown"
						checked={ showErrorMsgIfContentError }
						onChange={(check) => {setAttributes({ showErrorMsgIfContentError: check })}}
					/>
					<TextControl
						label="Content Default Key"
						value={ contentDefaultKey }
						help="key (str) or idx (int) of the default content json key"
						onChange={(text) => setAttributes({ contentDefaultKey: text })}
					/>
				</PanelBody>

			</InspectorControls>

			<p { ...useBlockProps() }> {
				<div class="content-expandable-block">

					{buttonsSide === 'left' && (
						<>
							<div class="news-button-container" style={divStyles.buttonsContainer}>
								<button class="news-button nb-01 nb-disabled" style={divStyles.buttonsDiasbled}>{button01Text}</button>
								<button class="news-button nb-02 nb-enabled" style={divStyles.buttons}>{button02Text}</button>
							</div>
							<div class="news-text-container" style={divStyles.text}>
								<div class="news-text">
									{textSample}
								</div>
							</div>
						</>
					)}

					{buttonsSide === 'right' && (
						<>
							<div class="news-text-container" style={divStyles.text}>
								<div class="news-text">
									{textSample}
								</div>
							</div>
							<div class="news-button-container" style={divStyles.buttonsContainer}>
								<button class="news-button nb-01 nb-disabled" style={divStyles.buttonsDiasbled}>{button01Text}</button>
								<button class="news-button nb-02 nb-enabled" style={divStyles.buttons}>{button02Text}</button>
							</div>
						</>
					)}

				</div>
			} </p>
		</>
	);
}
