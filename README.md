# React-Dropdown

## Overview

To run the application to demo the dropdowns please navigate to the `dropdown` directory (`cd ./dropdown`), run `npm install` after cloning the repo and then `npm start`.

I have provided a simple example for each dropdown option: multi-select and single select.

## Props

The functional props for dropdown component:

    - options (array of strings): The data for rendering each element in the dropdown
    - isMultiSelect (boolean): Enables multiselection when set to true, and single selection when set to false
    - placeholderText (string): The tag or starting text that can be entered to specify what the dropdown is for
    - onSelectionChange (func): A callback function that provides access to the selections made via string array

The styling props:

    - dropdownWrapperStyle (React.CSSProperties): The styling for the parent div of the entire component
    - selectBtnStyle (React.CSSProperties): The styling for the select all button in the multiselect dropdown - same styling as a button tag
    - deselectBtnStyle (React.CSSProperties): The styling for the deselect all button in the multiselect dropdown - same styling as a <button> component
    - btnWrapperStyle (React.CSSProperties): The styling for the div that wraps the (de)select all buttons in the multiselect use case
    - dropdownInputStyle (React.CSSProperties): The styling for the input tag in the dropdown
    - arrowStyle (React.CSSProperties): The styling for the arrow inside of the input component in the dropdown - this is a div
    - optionsStyle (React.CSSProperties): The styling for the div that wraps the individual option divs in each dropdown
    - optionWrapperStyle (React.CSSProperties): The styling for the div that wraps each option


## Future Work and Considerations

I would improve the default styling of the dropdowns; however, since I tried to make the styling highly customizable via props, I felt it was acceptable to leave a simpler design for the demo.

Additionally, I would add search capabilites to at least the single select dropdown, such that when you type into the input it would filter options for you to select. I spent some time on this, but felt I would not be able to achieve something nice in the time I had left, and so I abandoned it. I don't think search makes a ton of sense to the multiselect option.

Another feature I would add with more time is adding some animations to make things look smoother - I would probably use something like [react-magic-motion](https://www.react-magic-motion.com/) to make the dropdown better than appear and disappear.

Lastly, I would spend some more time on showcasing the results of a larger multiselect. All the info is currently in the text input box, but the horizontal scroll isn't super intuitive, in my opinion. However, using a show all button to a modal also feels a bit clunky.