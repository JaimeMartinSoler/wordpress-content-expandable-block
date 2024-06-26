<?php
/**
 * Plugin Name:       Content Expandable Block
 * Description:       WordPress Custom Block for expandable content
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Jaime Martín Soler
 * License:           MIT License
 * License URI:       https://github.com/JaimeMartinSoler/wordpress-content-expandable-block/blob/main/LICENSE
 * Text Domain:       content-expandable-block
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_content_expandable_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_content_expandable_block_block_init' );
