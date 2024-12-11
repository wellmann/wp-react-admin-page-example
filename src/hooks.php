<?php
/**
 * Registers a custom administration page in WordPress using React for rendering.
 *
 * @package kwio/wp-react-admin-page-example
 */

namespace KWIO\React_Admin_Page;

add_action(
	'admin_menu',
	function () {
		add_menu_page(
			__( 'React Page', 'wp-react-admin-page-example' ),
			__( 'React Page', 'wp-react-admin-page-example' ),
			'manage_options',
			ADMIN_PAGE_SLUG,
			function () {
				printf(
					'<div class="wrap" id="root" data-title="%s"></div>',
					esc_attr( get_admin_page_title() )
				);
			},
            // phpcs:disable WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
            // phpcs:disable WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
			'data:image/svg+xml;base64,' . base64_encode( file_get_contents( DIR_PATH . '/assets/images/icon.svg' ) )
		);
	}
);

add_action(
	'admin_enqueue_scripts',
	function ( $hook_suffix ) {
		if ( 'toplevel_page_' . ADMIN_PAGE_SLUG !== $hook_suffix ) {
			return;
		}

		$asset_manifest_file = DIR_PATH . 'dist/app.asset.php';
		if ( ! file_exists( $asset_manifest_file ) ) {
			return;
		}

		$asset_manifest = include $asset_manifest_file;

		wp_enqueue_script(
			ADMIN_PAGE_SLUG,
			DIR_URL . 'dist/app.js',
			$asset_manifest['dependencies'],
			$asset_manifest['version'],
			true
		);

		wp_set_script_translations(
			ADMIN_PAGE_SLUG,
			'wp-react-admin-page-example',
			DIR_PATH . 'lang'
		);

		wp_enqueue_style(
			ADMIN_PAGE_SLUG,
			DIR_URL . 'dist/app.css',
			array( 'wp-components' ),
			filemtime( DIR_PATH . 'dist/app.css' )
		);

		remove_action( 'admin_print_styles', 'print_emoji_styles' );
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	}
);

add_action(
	'init',
	function () {
		load_plugin_textdomain(
			'wp-react-admin-page-example',
			false,
			dirname( BASENAME ) . '/lang'
		);
	}
);
