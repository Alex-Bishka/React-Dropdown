import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import './Dropdown.css';

/* 
    - A user should be able to open and close the dropdown menu.
    - The component must support a single selected option or multiple selected options. Please demonstrate both use cases separately.
    - A user should be able to select and deselect all options at once.
    - The selected option or options must be visible when the dropdown is closed.
*/


interface DropdownProps {
    options: string[];
    isMultiSelect: boolean;
    placeholderText?: string;
    isSearchable?: boolean;
}

// A type alias for non-empty arrays
type NonEmptyArray<T> = T[];

// A type guard function to check for non-empty arrays
function isNonEmptyArray<T>(value: T[]): value is NonEmptyArray<T> {
    return value.length > 0;
}

const Dropdown: FC<DropdownProps> = ({
        options,
        isMultiSelect,
        placeholderText="",
        isSearchable=false
    }) => {
    const [text, setText] = useState<string>(placeholderText);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    useEffect(() => {
        setText(selectedOptions.join(", "))
    }, [selectedOptions])

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setText(event.target.value);
    };

    const toggleDropdown = (): void => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    const handleOptionClick = (option: string): void => {
        setSelectedOptions(prevSelected => {
            if (isMultiSelect) {
                if (prevSelected.includes(option)) {
                    return prevSelected.filter(selectedOption => selectedOption !== option);
                } else {
                    return [...prevSelected, option];
                }
            } else {
                if (prevSelected[0] == option) {
                    return []
                } else{
                    toggleDropdown()
                    return [option];
                }
            }
        });
    };

    // Validate options prop to ensure it's a non-empty array
    if (!isNonEmptyArray(options)) {
        throw new Error('options prop must be a non-empty array');
    }

    return (
        <div className="dropdown">
            <div className="input-wrapper" onClick={isSearchable ? undefined : toggleDropdown}>
                <div className="input-arrow-wrapper">
                    <input
                        className="dropdown-input"
                        type="text"
                        value={text}
                        onChange={handleChange}
                        readOnly={!isSearchable}
                        style={{cursor: isSearchable ? "auto" : "pointer"}}
                    />
                    <div className="arrow" onClick={isSearchable ? toggleDropdown : undefined}>
                        {isOpen ? '▼' : '►'}
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="options">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`option ${selectedOptions.includes(option) ? 'selected' : ''}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {isMultiSelect && <input type="checkbox" checked={selectedOptions.includes(option)} />}
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;