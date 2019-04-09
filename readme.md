[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

# Accordion Pro WP
A responsive accordion plugin for WordPress.

## Installation
To install the plugin you will need to upload the folder called _accordionpro\_wp_ to your WordPress plugins directory. You can accomplish this in one of two ways: you can either use an FTP client to upload the unzipped folder, or you can use the upload function contained within your WordPress admin panel.

**Upload via FTP:**

Use your ftp client to upload the accordion\_pro folder to /wp-content/plugins/ folder on your server.

**Upload with WordPress:**

In your WordPress admin panel, browse to Plugins > Add New > Upload. Click Choose File, select the zipped plugin, and click Install Now.

## Activation
Once the _accordionpro\_wp_ folder has been uploaded, you can activate the plugin. Go to your WordPress admin panel and select the ‘Plugins’ menu option. You should see a new plugin listed, Accordion Pro. Click Activate to activate the plugin.

## Using the Plugin
Once the plugin has been activated, a new menu panel called Accordion Pro will appear underneath ‘Settings’. There are three menu options: ‘Manage Accordions’, ‘Create Accordions’ and ‘Settings’.

## Creating your First Accordion
Click the submenu entry called ‘Create Accordions’. This will take you to the accordion creation and editing page. The first slide of your new accordion is automatically created for you.

Begin by entering a title for your first slide – this will be displayed on the horizontally on the ‘spine’ of your slide. Titles are optional.

Next, enter a caption for your slide. This will be displayed when the slide is activated, and hidden when the slide closes. Captions are also optional, and can be toggled on and off.

Content can be entered using the Visual or HTML content editors. Any valid HTML content (e.g. images, video, Canvas, etc.) can be displayed in a slide. If you prefer to use the Visual Editor to edit your slides, and would like to have WordPress automatically format your text (i.e. by adding paragraph tags), enable the Auto Formatting option in the Accordion Pro > Settings panel. If you prefer to hand-code your HTML, you should leave this setting disabled.

If you plan to use Flash videos in your slides, remember to set the wmode parameter to _transparent_. This will fix the z-index issue and stop the video overlapping the other slides.

To add a new slide, click the ‘Add Another Slide’ button located at the bottom of the editing page. To remove a slide, click the ‘Remove Slide’ button located underneath the slide’s content editor.

Save your accordion by entering a name for it (in the box at the top-right of the screen) and hitting 'Save Accordion'.

## Options
The plugin has a multitude of options, so you can tailor the aesthetics and functionality to suit your needs.

```
/* layout */
orientation : 'horizontal',             // 'horizontal' or 'vertical' accordion
startClosed : false,                    // start in a closed position

/* aesthetics */
theme : 'basic',                        // 'basic', 'bordered', 'stitch' or 'transparent'
colour : {
  scheme : 'charcoal',                  // colour scheme, 'charcoal' set by default; choose from 'charcoal', 'white', 'silver', 'grey', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'light-blue', 'blue', and 'dark-blue'
  style : 'flat'                        // choose from 'flat' or 'gradient'
},
rounded : false,                        // square or rounded corners
rtl : false,                            // right to left layout

/* horizontal accordion options */
responsive : true,                      // accordion will adapt itself to the page layout, based on width of parent element
horizontalWidth : 900,                  // base width; fixed (px \[integer\]) - responsive scaling is relative to this value
horizontalHeight : 300,                 // base horizontal accordion height; fixed (px \[integer\]) - responsive scaling is relative to this value

/* vertical accordion options */
verticalWidth : '100%',                 // fixed (px \[integer\]) or fluid (% \[string\])
verticalHeight : 500,                   // base vertical accordion height; fixed (px \[integer\])
verticalSlideHeight : 'fixed',          // vertical accordion slide heights can be 'fixed' or 'fitToContent'

/* tabs */
tab : {
  size : 48,                            // set tab size
  fontSize : 16,                        // set tab font size
  font : 'Arial',                       // set tab font family
  icon : 'number',                      // set tab icon -> 'number', 'chevron', 'disc', 'square', 'custom', or 'none'
  customIcons : \[\],                     // set a custom image for each icon
  customColours : \[\],                   // set a custom colour for each tab
  selected : 1                          // displays slide (n) on page load
},

/* panels */
panel : {
  scrollable : false,                   // trigger scrollbar on vertical overflow
  scaleImages : true,                   // scales images to fit slide width and height
  padding : 0                           // adds internal padding (px \[integer\]) to slide panels
},

/* events */
activateOn : 'click',                   // click or mouseover

/* animations */
autoPlay : false,                       // automatically cycle through slides
cycleSpeed : 6000,                      // time between slide cycles
slideSpeed : 800,                       // slide animation speed

/* miscellaneous */
pauseOnHover : true,                    // pause on hover
linkable : false                        // link slides via hash
```

## Inserting an Accordion into a Post or Page
After saving your accordion, you’ll see a notification that the accordion has been saved successfully, accompanied by a link to the management screen. Click the link in the notification, or click the link called ‘Manage Accordions’ in the Accordion Pro submenu to visit the management screen.

The management screen contains the shortcode required to insert your newly created accordion into your WordPress post or page. Select the shortcode relating to your accordion, and copy it. Then visit the page you want to insert it into, and paste the shortcode in. Save your post and browse to it to see your new accordion.

To edit, clone or delete an accordion, click the corresponding icon on the management screen.

## Browser Differences
Not all of the CSS3 properties used to create Accordion Pro are supported in all browsers. The appearance of accordions will be consistent in modern browsers (Chrome, Firefox, Safari), but where older versions of Internet Explorer are lacking the requisite CSS3 support, styles will degrade gracefully.

## Credits
This plugin wouldn't be possible if it weren't for the open-source efforts of others. Many thanks to:

*   Orman Clark for the original [accordion design](http://www.premiumpixels.com/freebies/horizontal-accordion-slider-psd/);
*   Addy Osmani for the [CSS3 Transitions shim](http://addyosmani.com/blog/css3transitions-jquery/).

Thanks a bunch guys!

## Thank you!
I hope you have fun with your new plugin. If you have any questions that aren’t covered by this document, then please don’t hesitate to get in touch.
