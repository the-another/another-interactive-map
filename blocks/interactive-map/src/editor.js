/**
 * Interactive Map — Gutenberg Editor Component
 *
 * @package Another_Interactive_Map
 */

import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import { __ } from '@wordpress/i18n';

import './style.css';
import './editor.css';

import metadata from '../block.json';

registerBlockType( metadata.name, {
	edit( { attributes, setAttributes } ) {
		const {
			fillColor,
			fillColorHover,
			strokeColor,
			strokeColorHover,
			textColor,
			textColorHover,
			clickAction,
			callbackFunctionName,
			webhookIsExternal,
			webhookBaseUrl,
			webhookPath,
			webhookFormat,
		} = attributes;

		return (
			<>
				<InspectorControls>
					<PanelColorSettings
						title={ __( 'Color Settings', 'another-interactive-map' ) }
						initialOpen={ true }
						colorSettings={ [
							{
								value: fillColor,
								onChange: ( value ) =>
									setAttributes( { fillColor: value } ),
								label: __( 'Fill Color', 'another-interactive-map' ),
							},
							{
								value: fillColorHover,
								onChange: ( value ) =>
									setAttributes( { fillColorHover: value } ),
								label: __( 'Fill Color (Hover)', 'another-interactive-map' ),
							},
							{
								value: strokeColor,
								onChange: ( value ) =>
									setAttributes( { strokeColor: value } ),
								label: __( 'Stroke Color', 'another-interactive-map' ),
							},
							{
								value: strokeColorHover,
								onChange: ( value ) =>
									setAttributes( { strokeColorHover: value } ),
								label: __( 'Stroke Color (Hover)', 'another-interactive-map' ),
							},
							{
								value: textColor,
								onChange: ( value ) =>
									setAttributes( { textColor: value } ),
								label: __( 'Text Color', 'another-interactive-map' ),
							},
							{
								value: textColorHover,
								onChange: ( value ) =>
									setAttributes( { textColorHover: value } ),
								label: __( 'Text Color (Hover)', 'another-interactive-map' ),
							},
						] }
					/>

					<PanelBody
						title={ __( 'Click Action', 'another-interactive-map' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Action Type', 'another-interactive-map' ) }
							value={ clickAction }
							options={ [
								{
									label: __( 'JavaScript Callback', 'another-interactive-map' ),
									value: 'callback',
								},
								{
									label: __( 'Webhook (Navigate)', 'another-interactive-map' ),
									value: 'webhook',
								},
							] }
							onChange={ ( value ) =>
								setAttributes( { clickAction: value } )
							}
							__nextHasNoMarginBottom
						/>

						{ clickAction === 'callback' && (
							<TextControl
								label={ __( 'Function Name', 'another-interactive-map' ) }
								help={ __( 'Global window function to call on click, e.g. onMapStateClick', 'another-interactive-map' ) }
								value={ callbackFunctionName }
								onChange={ ( value ) =>
									setAttributes( { callbackFunctionName: value } )
								}
								__nextHasNoMarginBottom
							/>
						) }

						{ clickAction === 'webhook' && (
							<>
								<ToggleControl
									label={ __( 'External website', 'another-interactive-map' ) }
									help={ __( 'Use a custom base URL instead of this site\'s URL.', 'another-interactive-map' ) }
									checked={ webhookIsExternal }
									onChange={ ( value ) =>
										setAttributes( { webhookIsExternal: value } )
									}
									__nextHasNoMarginBottom
								/>

								{ webhookIsExternal && (
									<TextControl
										label={ __( 'Base URL', 'another-interactive-map' ) }
										help={ __( 'External base URL, e.g. https://example.com', 'another-interactive-map' ) }
										value={ webhookBaseUrl }
										onChange={ ( value ) =>
											setAttributes( { webhookBaseUrl: value } )
										}
										__nextHasNoMarginBottom
									/>
								) }

								<TextControl
									label={ __( 'Path', 'another-interactive-map' ) }
									help={ __( 'URI path appended after the base URL, e.g. /states/', 'another-interactive-map' ) }
									value={ webhookPath }
									onChange={ ( value ) =>
										setAttributes( { webhookPath: value } )
									}
									__nextHasNoMarginBottom
								/>

								<SelectControl
									label={ __( 'URL Format', 'another-interactive-map' ) }
									value={ webhookFormat }
									options={ [
										{
											label: __( 'State Slug (e.g. california)', 'another-interactive-map' ),
											value: 'state-slug',
										},
										{
											label: __( 'Country/State Slug (e.g. us/california)', 'another-interactive-map' ),
											value: 'country-state-slug',
										},
										{
											label: __( 'Code (e.g. CA)', 'another-interactive-map' ),
											value: 'code',
										},
										{
											label: __( 'Country:Code (e.g. US:CA)', 'another-interactive-map' ),
											value: 'country-code',
										},
									] }
									onChange={ ( value ) =>
										setAttributes( { webhookFormat: value } )
									}
									__nextHasNoMarginBottom
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>

				<ServerSideRender
					block={ metadata.name }
					attributes={ attributes }
				/>
			</>
		);
	},
} );
