import { FC, ChangeEvent, useState, useEffect, useRef } from 'react';
import './Dropdown.css';

// The props for our Dropdown component
interface DropdownProps {
    options: string[];
    isMultiSelect: boolean;
    placeholderText?: string;
    onSelectionChange?: (selectedOptions: string[]) => void;
    selectBtnStyle?: React.CSSProperties;
    deselectBtnStyle?: React.CSSProperties;
    btnWrapperStyle?: React.CSSProperties;
    dropdownInputStyle?: React.CSSProperties;
    optionWrapperStyle?: React.CSSProperties;
    arrowStyle?: React.CSSProperties;
    dropdownWrapperStyle?: React.CSSProperties;
    optionsStyle?: React.CSSProperties;
}

// A type alias for non-empty arrays
type NonEmptyArray<T> = T[];

// A type guard function to check for non-empty arrays
function isNonEmptyArray<T>(value: T[]): value is NonEmptyArray<T> {
    return value.length > 0;
}

// Validation function for what our props can and can't be
const validateProps = (options: string[]): void => {
    // Data must be passed in to use either drop down
    if (!isNonEmptyArray(options)) {
        throw new Error('Options prop must be a non-empty array - pass in your data for the dropdown!');
    }
};

const Dropdown: FC<DropdownProps> = ({
    options,
    isMultiSelect = false,
    placeholderText = "Placeholder",
    onSelectionChange =  () => {},
    selectBtnStyle = {},
    deselectBtnStyle = {},
    btnWrapperStyle = {},
    dropdownInputStyle = {},
    optionWrapperStyle = {},
    arrowStyle = {},
    dropdownWrapperStyle = {},
    optionsStyle = {},
}) => {
    // Validation call
    validateProps(options);

    const inputRef = useRef<HTMLInputElement>(null);    // Keep track of last selection in multiselect
    const dropdownRef = useRef<HTMLDivElement>(null);   // Allows us to close the dropdown on a click away

    const [text, setText] = useState<string>(placeholderText);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    useEffect(() => {
        // Place holder text should only be replaced if we have selected an option
        if (selectedOptions.length) {
            setText(selectedOptions.join(", "))
        } else {
            setText(placeholderText)
        }
    }, [selectedOptions])

    useEffect(() => {
        if (inputRef.current && text != placeholderText) {
          const length = text.length;
          inputRef.current.focus();
          inputRef.current.setSelectionRange(length, length);  // Set cursor position to the end of the text
        }
    }, [text]);

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
          }
        };
      
        // Attach the event listener
        document.addEventListener('click', handleClickOutside);
      
        // Clean up the event listener when the component is unmounted
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Updates our text based on text input change - for search capability
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setText(event.target.value);
        if (!selectedOptions.includes(event.target.value)) {
            setSelectedOptions([])
        }
    };

    // Handles dropdown open/close
    const toggleDropdown = (): void => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    // Handles the different situations for clicking on an option from a dropdown
    const handleOptionClick = (option: string): void => {
        setSelectedOptions(prevSelected => {
            let selected: string[];

            // Multiselect dropdown
            if (isMultiSelect) {
                if (prevSelected.includes(option)) {
                    selected = prevSelected.filter(selectedOption => selectedOption !== option);
                } else {
                    selected = [...prevSelected, option];
                }
            }
            // Single select dropdown
            else {
                if (prevSelected[0] == option) {
                    selected = []
                } else {
                    toggleDropdown()    // User probably wants dropdown interaction to be done after selection
                    selected = [option];
                }
            }
            onSelectionChange(selected)
            return selected
        });
    };

    // Select all button handler -> passed in options array for selected options
    const handleSelectAll = (): void => {
        setSelectedOptions(options);
        toggleDropdown()    // User probably doesn't need the dropdown to stay open if they select everything
        onSelectionChange(options)
    };

    // Deselect all button handler -> empty array for selected options
    const handleDeselectAll = (): void => {
        setSelectedOptions([]);
        onSelectionChange([])
    };

    return (
        <div className="dropdown" ref={dropdownRef} style={dropdownWrapperStyle}>
            <div className="input-wrapper" onClick={toggleDropdown}>
                <div className="input-arrow-wrapper">
                    <input
                        className="dropdown-input"
                        type="text"
                        value={text}
                        onChange={handleChange}
                        style={dropdownInputStyle}
                        readOnly={true}
                        ref={inputRef}
                    />
                    <div className="arrow" style={arrowStyle}>
                        {isOpen ? '▼' : '►'}
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="options" style={optionsStyle}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`option ${selectedOptions.includes(option) ? 'selected' : ''}`}
                            onClick={() => handleOptionClick(option)}
                            style={optionWrapperStyle}
                        >
                            {isMultiSelect && <input type="checkbox" checked={selectedOptions.includes(option)} />}
                            {option}
                        </div>
                    ))}
                    {isMultiSelect && (
                        <div className="select-deselect-buttons" style={btnWrapperStyle}>
                            <button onClick={handleSelectAll} style={selectBtnStyle}>Select All</button>
                            <button onClick={handleDeselectAll} style={deselectBtnStyle}>Deselect All</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dropdown;