const IntlMessageFormat = require('intl-messageformat').default || require('intl-messageformat');

try {
    const msg1 = new IntlMessageFormat("Testing '<br class=\"foo\">' output");
    console.log("Single quotes:", msg1.format());

    const msg2 = new IntlMessageFormat("Testing '<br class=\"foo\" />' output");
    console.log("Self closing single quotes:", msg2.format());

} catch (e) {
    console.error("Error:", e.message);
}
