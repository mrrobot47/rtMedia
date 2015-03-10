/**
 * Responsive Table JS
 */
jQuery( document ).ready( function ( $ ) {

	// Tabs
	$( '.rtm-tabs' ).rtTab();

	$( 'input[name^="rtmedia-options"]' ).on( 'change', function () {
		if ( $( '.rtm-fly-warning' ).length === 0 ) {
			$( '.rtm-button-container.top' ).prepend( '<div class="rtm-warning rtm-fly-warning hide">Settings have changed, you should save them!</div>' );
			$( '.rtm-fly-warning' ).slideDown();
		}
	} );

	// Theme section lightbox like WordPress
	// May be not like Backbone, But I will surely update this code. ;)
	var ListView = Backbone.View.extend( {
		el: $( '.bp-media-admin' ), // attaches `this.el` to an existing element.

		events: {
			'click .rtm-theme': 'render',
			'click .rtm-close': 'close',
			'click .rtm-previous': 'previousTheme',
			'click .rtm-next': 'nextTheme',
			'keyup': 'keyEvent'
		},
		initialize: function () {
			_.bindAll( this, 'render', 'close', 'nextTheme', 'previousTheme', 'keyEvent' ); // fixes loss of context for 'this' within methods

			this.keyEvent();
		},
		render: function ( event ) {
			$( '.rtm-theme' ).removeClass( 'rtm-modal-open' );

			var themeContent = $( event.currentTarget ).addClass( 'rtm-modal-open' ).find( '.rtm-theme-content' ).html();

			if ( $( '.rtm-theme-overlay' )[0] ) {
				$( '.rtm-theme-overlay' ).show();
				$( this.el ).find( '.rtm-theme-content-wrap' ).empty().append( themeContent );
			} else {
				$( this.el ).append( '<div class="theme-overlay rtm-theme-overlay"><div class="theme-backdrop rtm-close"></div><div class="rtm-theme-content-wrap">' + themeContent + '</div></div>' );
			}

			if ( $( event.currentTarget ).is( ':first-child' ) ) {
				$( '.rtm-previous' ).addClass( 'disabled' );
			} else if ( $( event.currentTarget ).is( ':last-child' ) ) {
				$( '.rtm-next' ).addClass( 'disabled' );
			} else {
				$( '.rtm-next, .rtm-previous' ).removeClass( 'disabled' );
			}

		},
		close: function () {
			$( '.rtm-theme' ).removeClass( 'rtm-modal-open' );
			$( '.rtm-theme-overlay' ).hide();
			$( '.rtm-next, .rtm-previous' ).removeClass( 'disabled' );
		},
		nextTheme: function ( event ) {
			$( '.rtm-next, .rtm-previous' ).removeClass( 'disabled' );
			if ( $( '.rtm-theme:last-child' ).hasClass( 'rtm-modal-open' ) ) {
				$( event.currentTarget ).addClass( 'disabled' );
			}

			$( '.rtm-modal-open' ).next().trigger( 'click' );
			return false;
		},
		previousTheme: function ( event ) {
			$( '.rtm-next, .rtm-previous' ).removeClass( 'disabled' );
			if ( $( '.rtm-theme:first-child' ).hasClass( 'rtm-modal-open' ) ) {
				$( event.currentTarget ).addClass( 'disabled' );
			}

			$( '.rtm-modal-open' ).prev().trigger( 'click' );
			return false;
		},
		keyEvent: function (  ) {
			// Bind keyboard events.
			$( 'body' ).on( 'keyup', function ( event ) {
				// The right arrow key, next theme
				if ( event.keyCode === 39 ) {
					$( '.rtm-next, .rtm-previous' ).removeClass( 'disabled' );
					if ( $( '.rtm-theme:last-child' ).hasClass( 'rtm-modal-open' ) ) {
						$( event.currentTarget ).addClass( 'disabled' );
					}

					$( '.rtm-modal-open' ).next().trigger( 'click' );
					return false;
				}

				// The left arrow key, previous theme
				if ( event.keyCode === 37 ) {
					$( '.rtm-next, .rtm-previous' ).removeClass( 'disabled' );
					if ( $( '.rtm-theme:first-child' ).hasClass( 'rtm-modal-open' ) ) {
						$( event.currentTarget ).addClass( 'disabled' );
					}

					$( '.rtm-modal-open' ).prev().trigger( 'click' );
					return false;
				}

				// The escape key closes the preview
				if ( event.keyCode === 27 ) {
					$( '.rtm-close' ).trigger( 'click' );
				}
			} );
		}

	} );

	var listView = new ListView();

} );