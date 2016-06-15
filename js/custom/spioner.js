/**
 * Foundation settings
 */
$( document ).foundation({
	"magellan-expedition": {
		destination_threshold: 40, // Pixels from the top of destination for it to be considered active.
	},
});

/**
 * Form/jsPDF handling
 */

// Pre-fill date in form
var d = new Date();
var month = d.getMonth() + 1;
var day = d.getDate();

var output = d.getFullYear() + '-' +
	(month < 10 ? '0' : '') + month + '-' +
	(day < 10 ? '0' : '') + day;

$( 'input#date' ).val( output );

// Load list of companies/organizations
var orgList;
$.getJSON("/companies.json", function(json) {
	orgList = json;
});

// Runs when the submit button of the form is clicked
function generatePdf() {

	var doc = new jsPDF();
	doc.setFont("times");

	// Get user address from form
	var userAddress = [];
	$( 'input#name, input#careof, input#street' ).each(function() {
		if ( $( this ).val() ) {
			userAddress.push( $( this ).val() );
		}
	});
	userAddress.push( $( 'input#postalcode' ).val() + ' ' + $( 'input#city' ).val() );

	// Get selected organizations from form
	var selectedOrgs = [];
	$( '#orglist input[type=checkbox]' ).each(function () {
		if ( this.checked ) {
			selectedOrgs.push( this.id );
		}
	});

	// Check if the user has actually selected an organization
	if ( selectedOrgs.length > 0 ) {
		// For each organization, write to PDF
		for ( var i = 0; i < selectedOrgs.length; i++ ) {
			doc.setFontSize( 12 );

			var company = selectedOrgs[ i ];

			doc.text( 20, 20, 'Till ' + orgList[ company ].name );

			// Address is stored as an array; jsPDF puts each value on its own line
			var address = orgList[ company ].address;
			doc.text( 20, 30, address );

			doc.text( 20, 70, 'Härmed ansöker jag om information enligt 26 § personuppgiftslagen och i enlighet med mina' );
			doc.text( 20, 77, 'rättigheter enligt EU:s stadga om de grundläggande rättigheterna artikel 8.2.' );
			doc.text( 20, 84, 'Med detta menas samtliga personuppgifter om mig som ni behandlar, inklusive sådana uppgifter' );
			doc.text( 20, 91, 'som tillkommit till följd av 6 kap. 16 a § lagen om elektronisk kommunikation (trafikdatalagring).' );

			doc.text( 20, 118, $( 'input#place' ).val() );
			doc.text( 90, 118, $( 'input#date' ).val() );
			doc.text( 20, 158, $( 'input#name' ).val() );
			doc.text( 90, 158, $( 'input#personalid' ).val() );

			doc.setFontSize( 10 );

			doc.line( 20, 120, 65, 120 );
			doc.text( 20, 124, 'Ort' );

			doc.line( 90, 120, 120, 120 );
			doc.text( 90, 124, 'Datum' );

			doc.line( 20, 140, 65, 140 );
			doc.text( 20, 145, 'Namnteckning' );

			doc.line( 20, 160, 65, 160 );
			doc.text( 20, 164, 'Namnförtydligande' );

			doc.line( 90, 160, 120, 160 );
			doc.text( 90, 164, 'Personnummer' );

			doc.setFontSize( 12 );

			doc.text( 20, 180, 'Vänligen skicka per post till:' );

			doc.text( 20, 190, userAddress );

			// If there's still an organization left, add another page (and transfer focus to it)
			if ( i < selectedOrgs.length - 1 ) {
				doc.addPage();
			}
		}

		doc.save('ansokan_registerutdrag.pdf');

	} else { // If no organization was selected, show an error message
		var alertBox = '<div data-alert class="alert-box warning round text-center">' +
			'Markera minst en mottagare.<a href="#" class="close">&times;</a></div>';
		$( '#alertarea' ).append( alertBox );
		$( document ).foundation( 'alert', 'reflow' );
	}
}

$( window ).load(function() {
	var headerImageHeight = $( '#header-image' ).height();
	if ( $( window ).width() > $( window ).height() && $( window ).height() < 900 ) {
		$( '#hero h1' ).css( 'font-size', '3rem' );
	}
	// Make intro text/header appear on top of header image
	$( '#hero' ).css( 'margin-top', '-' + ( headerImageHeight / 3.60 ) + 'px' );
});
