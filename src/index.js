// TODO - fix the onlyContries props. Currently expects that as an array of country object, but users should be able to send in array of country isos

import { some, find, reduce, filter, includes } from 'lodash/collection';
import { findIndex, head, tail } from 'lodash/array';
import { debounce, memoize } from 'lodash/function';
import { trim, startsWith } from 'lodash/string';
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/styles';

const TextFieldStyled = styled(TextField)({
    '& input': {
        paddingLeft: '36px',
    },
});

import { document } from './global.js';
import countryData from './country_data.js';
import {
    Container,
    FlagContainer,
    SelectedFlag,
    Flag,
    Arrow,
    Country,
    CountryName,
    DialCode,
    CountryListWrapper,
    CountryList,
    Divider,
} from './styles';

class ReactPhoneInput extends React.Component {
    static propTypes = {
        excludeCountries: PropTypes.arrayOf(PropTypes.string),
        onlyCountries: PropTypes.arrayOf(PropTypes.string),
        preferredCountries: PropTypes.arrayOf(PropTypes.string),
        defaultCountry: PropTypes.string,

        value: PropTypes.string,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,

        autoFormat: PropTypes.bool,
        disableAreaCodes: PropTypes.bool,
        disableCountryCode: PropTypes.bool,
        disableDropdown: PropTypes.bool,
        enableLongNumbers: PropTypes.bool,
        countryCodeEditable: PropTypes.bool,

        regions: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]),

        inputExtraProps: PropTypes.object,
        localization: PropTypes.object,

        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onClick: PropTypes.func,
        onKeyDown: PropTypes.func,
    };

    static defaultProps = {
        excludeCountries: [],
        onlyCountries: [],
        preferredCountries: [],
        defaultCountry: '',

        value: '',
        placeholder: '+1 (702) 123-4567',
        flagsImagePath: './flags.png',
        disabled: false,

        autoFormat: true,
        disableAreaCodes: false,
        isValid: (inputNumber) => {
            return some(countryData.allCountries, (country) => {
                return (
                    startsWith(inputNumber, country.dialCode) ||
                    startsWith(country.dialCode, inputNumber)
                );
            });
        },
        disableCountryCode: false,
        disableDropdown: false,
        enableLongNumbers: false,
        countryCodeEditable: true,

        regions: '',

        inputExtraProps: {},
        localization: {},

        onEnterKeyPress: () => {},

        isModernBrowser: document.createElement
            ? Boolean(document.createElement('input').setSelectionRange)
            : false,

        keys: {
            UP: 38,
            DOWN: 40,
            RIGHT: 39,
            LEFT: 37,
            ENTER: 13,
            ESC: 27,
            PLUS: 43,
            A: 65,
            Z: 90,
            SPACE: 32,
        },
    };

    constructor(props) {
        super(props);

        this.numberInputRef = React.createRef();
        this.dropdownRef = React.createRef();

        let filteredCountries = countryData.allCountries;

        if (props.disableAreaCodes)
            filteredCountries = this.deleteAreaCodes(filteredCountries);
        if (props.regions)
            filteredCountries = this.filterRegions(
                props.regions,
                filteredCountries,
            );

        const onlyCountries = this.excludeCountries(
            this.getOnlyCountries(props.onlyCountries, filteredCountries),
            props.excludeCountries,
        );

        const preferredCountries = filter(filteredCountries, (country) => {
            return some(props.preferredCountries, (preferredCountry) => {
                return preferredCountry === country.iso2;
            });
        });

        const inputNumber = props.value || '';

        let countryGuess;
        if (inputNumber.length > 1) {
            // Country detect by value field
            countryGuess =
                this.guessSelectedCountry(
                    inputNumber.substring(1, 6),
                    onlyCountries,
                    props.defaultCountry,
                ) || 0;
        } else if (props.defaultCountry) {
            // Default country
            countryGuess =
                find(onlyCountries, { iso2: props.defaultCountry }) || 0;
        } else {
            // Empty params
            countryGuess = 0;
        }

        const countryGuessIndex = findIndex(this.allCountries, countryGuess);
        const dialCode =
            inputNumber.length < 2 &&
            countryGuess &&
            !startsWith(inputNumber.replace(/\D/g, ''), countryGuess.dialCode)
                ? countryGuess.dialCode
                : '';

        let formattedNumber;
        formattedNumber =
            inputNumber === '' && countryGuess === 0
                ? ''
                : this.formatNumber(
                      (props.disableCountryCode ? '' : dialCode) +
                          inputNumber.replace(/\D/g, ''),
                      countryGuess.name ? countryGuess.format : undefined,
                  );

        this.state = {
            formattedNumber,
            placeholder: props.placeholder,
            onlyCountries,
            preferredCountries,
            defaultCountry: props.defaultCountry,
            selectedCountry: countryGuess,
            highlightCountryIndex: countryGuessIndex,
            queryString: '',
            showDropdown: false,
            freezeSelection: false,
            debouncedQueryStingSearcher: debounce(this.searchCountry, 100),
        };
    }

    componentDidMount() {
        if (document.addEventListener) {
            document.addEventListener('mousedown', this.handleClickOutside);
            document.addEventListener('keydown', this.handleKeydown);
        }
    }

    componentWillUnmount() {
        if (document.removeEventListener) {
            document.removeEventListener('mousedown', this.handleClickOutside);
            document.removeEventListener('keydown', this.handleKeydown);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.defaultCountry &&
            nextProps.defaultCountry !== this.state.defaultCountry
        ) {
            this.updateDefaultCountry(nextProps.defaultCountry);
        }
        if (nextProps.value !== this.state.formattedNumber) {
            this.updateFormattedNumber(nextProps.value);
        }
    }

    // Countries array methods
    deleteAreaCodes = (filteredCountries) => {
        return filteredCountries.filter((country) => {
            return country.isAreaCode !== true;
        });
    };

    filterRegions = (regions, filteredCountries) => {
        if (typeof regions === 'string') {
            const region = regions;
            return filteredCountries.filter((country) => {
                return country.regions.some((element) => {
                    return element === region;
                });
            });
        }

        return filteredCountries.filter((country) => {
            const matches = regions.map((region) => {
                return country.regions.some((element) => {
                    return element === region;
                });
            });
            return matches.some((el) => el);
        });
    };

    getOnlyCountries = (onlyCountriesArray, filteredCountries) => {
        if (onlyCountriesArray.length === 0) return filteredCountries;

        return filteredCountries.filter((country) => {
            return onlyCountriesArray.some((element) => {
                return element === country.iso2;
            });
        });
    };

    excludeCountries = (selectedCountries, excludedCountries) => {
        if (excludedCountries.length === 0) {
            return selectedCountries;
        } else {
            return filter(selectedCountries, (selCountry) => {
                return !includes(excludedCountries, selCountry.iso2);
            });
        }
    };

    getProbableCandidate = memoize((queryString) => {
        if (!queryString || queryString.length === 0) {
            return null;
        }
        // don't include the preferred countries in search
        const probableCountries = filter(
            this.state.onlyCountries,
            (country) => {
                return startsWith(
                    country.name.toLowerCase(),
                    queryString.toLowerCase(),
                );
            },
            this,
        );
        return probableCountries[0];
    });

    guessSelectedCountry = memoize(
        (inputNumber, onlyCountries, defaultCountry) => {
            const secondBestGuess =
                find(onlyCountries, { iso2: defaultCountry }) || {};
            if (trim(inputNumber) === '') return secondBestGuess;

            const bestGuess = reduce(
                onlyCountries,
                (selectedCountry, country) => {
                    if (startsWith(inputNumber, country.dialCode)) {
                        if (
                            country.dialCode.length >
                            selectedCountry.dialCode.length
                        ) {
                            return country;
                        }
                        if (
                            country.dialCode.length ===
                                selectedCountry.dialCode.length &&
                            country.priority < selectedCountry.priority
                        ) {
                            return country;
                        }
                    }
                    return selectedCountry;
                },
                { dialCode: '', priority: 10001 },
                this,
            );

            if (!bestGuess.name) return secondBestGuess;
            return bestGuess;
        },
    );

    // Hooks for updated props
    updateDefaultCountry = (country) => {
        const newSelectedCountry = find(this.state.onlyCountries, {
            iso2: country,
        });
        this.setState({
            defaultCountry: country,
            selectedCountry: newSelectedCountry,
            formattedNumber: this.props.disableCountryCode
                ? ''
                : '+' + newSelectedCountry.dialCode,
        });
    };

    updateFormattedNumber(number) {
        const { onlyCountries, defaultCountry } = this.state;
        let countryGuess;
        let inputNumber = number;
        let formattedNumber = number;

        // if inputNumber does not start with '+', then use default country's dialing prefix,
        // otherwise use logic for finding country based on country prefix.
        if (!inputNumber.startsWith('+')) {
            countryGuess = find(onlyCountries, { iso2: defaultCountry });
            const dialCode =
                countryGuess &&
                !startsWith(
                    inputNumber.replace(/\D/g, ''),
                    countryGuess.dialCode,
                )
                    ? countryGuess.dialCode
                    : '';
            formattedNumber = this.formatNumber(
                (this.props.disableCountryCode ? '' : dialCode) +
                    inputNumber.replace(/\D/g, ''),
                countryGuess ? countryGuess.format : undefined,
            );
        } else {
            inputNumber = inputNumber.replace(/\D/g, '');
            countryGuess = this.guessSelectedCountry(
                inputNumber.substring(0, 6),
                onlyCountries,
                defaultCountry,
            );
            formattedNumber = this.formatNumber(
                inputNumber,
                countryGuess.format,
            );
        }

        this.setState({ selectedCountry: countryGuess, formattedNumber });
    }

    // View methods
    scrollTo = (country, middle) => {
        if (!country) return;

        const container = this.dropdownRef;

        if (!container || !document.body) return;

        const containerHeight = container.offsetHeight;
        const containerOffset = container.getBoundingClientRect();
        const containerTop = containerOffset.top + document.body.scrollTop;
        const containerBottom = containerTop + containerHeight;

        const element = country;
        const elementOffset = element.getBoundingClientRect();

        const elementHeight = element.offsetHeight;
        const elementTop = elementOffset.top + document.body.scrollTop;
        const elementBottom = elementTop + elementHeight;

        let newScrollTop = elementTop - containerTop + container.scrollTop;
        const middleOffset = containerHeight / 2 - elementHeight / 2;

        if (elementTop < containerTop) {
            // scroll up
            if (middle) {
                newScrollTop -= middleOffset;
            }
            container.scrollTop = newScrollTop;
        } else if (elementBottom > containerBottom) {
            // scroll down
            if (middle) {
                newScrollTop += middleOffset;
            }
            const heightDifference = containerHeight - elementHeight;
            container.scrollTop = newScrollTop - heightDifference;
        }
    };

    formatNumber = (text, patternArg) => {
        const {
            disableCountryCode,
            enableLongNumbers,
            autoFormat,
        } = this.props;

        let pattern;
        if (disableCountryCode && patternArg) {
            pattern = patternArg.split(' ');
            pattern.shift();
            pattern = pattern.join(' ');
        } else {
            pattern = patternArg;
        }

        if (!text || text.length === 0) {
            return disableCountryCode ? '' : '+';
        }

        // for all strings with length less than 3, just return it (1, 2 etc.)
        // also return the same text if the selected country has no fixed format
        if ((text && text.length < 2) || !pattern || !autoFormat) {
            return disableCountryCode ? text : `+${text}`;
        }

        const formattedObject = reduce(
            pattern,
            (acc, character) => {
                if (acc.remainingText.length === 0) {
                    return acc;
                }

                if (character !== '.') {
                    return {
                        formattedText: acc.formattedText + character,
                        remainingText: acc.remainingText,
                    };
                }

                return {
                    formattedText: acc.formattedText + head(acc.remainingText),
                    remainingText: tail(acc.remainingText),
                };
            },
            {
                formattedText: '',
                remainingText: text.split(''),
            },
        );

        let formattedNumber;
        if (enableLongNumbers) {
            formattedNumber =
                formattedObject.formattedText +
                formattedObject.remainingText.join('');
        } else {
            formattedNumber = formattedObject.formattedText;
        }

        // Always close brackets
        if (formattedNumber.includes('(') && !formattedNumber.includes(')'))
            formattedNumber += ')';
        return formattedNumber;
    };

    // Put the cursor to the end of the input (usually after a focus event)
    cursorToEnd = () => {
        const input = this.numberInputRef.current;
        input.focus();
        if (this.props.isModernBrowser) {
            const len = input.value.length;
            input.setSelectionRange(len, len);
        }
    };

    getElement = (index) => {
        return this[`flag_no_${index}`];
    };

    // return country data from state
    getCountryData = () => {
        if (!this.state.selectedCountry) return {};
        return {
            name: this.state.selectedCountry.name || '',
            dialCode: this.state.selectedCountry.dialCode || '',
            countryCode: this.state.selectedCountry.iso2 || '',
        };
    };

    handleFlagDropdownClick = () => {
        if (!this.state.showDropdown && this.props.disabled) return;

        if (
            this.state.preferredCountries.includes(this.state.selectedCountry)
        ) {
            this.setState(
                {
                    showDropdown: !this.state.showDropdown,
                    highlightCountryIndex: findIndex(
                        this.state.preferredCountries,
                        this.state.selectedCountry,
                    ),
                },
                () => {
                    if (this.state.showDropdown) {
                        this.scrollTo(
                            this.getElement(this.state.highlightCountryIndex),
                        );
                    }
                },
            );
        } else {
            this.setState(
                {
                    showDropdown: !this.state.showDropdown,
                    highlightCountryIndex: findIndex(
                        this.state.onlyCountries,
                        this.state.selectedCountry,
                    ),
                },
                () => {
                    if (this.state.showDropdown) {
                        this.scrollTo(
                            this.getElement(
                                this.state.highlightCountryIndex +
                                    this.state.preferredCountries.length,
                            ),
                        );
                    }
                },
            );
        }
    };

    handleInput = (e) => {
        let formattedNumber = this.props.disableCountryCode ? '' : '+';
        let newSelectedCountry = this.state.selectedCountry;
        let freezeSelection = this.state.freezeSelection;

        if (!this.props.countryCodeEditable) {
            const updatedInput = '+' + newSelectedCountry.dialCode;
            if (e.target.value.length < updatedInput.length) {
                return;
            }
        }

        //Does not exceed 15 digit phone number limit
        if (e.target.value.replace(/\D/g, '').length > 15) {
            return;
        }

        // if the input is the same as before, must be some special key like enter etc.
        if (e.target.value === this.state.formattedNumber) {
            return;
        }

        // ie hack
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }

        if (e.target.value.length > 0) {
            // before entering the number in new format, lets check if the dial code now matches some other country
            const inputNumber = e.target.value.replace(/\D/g, '');

            // we don't need to send the whole number to guess the country... only the first 6 characters are enough
            // the guess country function can then use memoization much more effectively since the set of input it
            // gets has drastically reduced
            if (
                !this.state.freezeSelection ||
                this.state.selectedCountry.dialCode.length > inputNumber.length
            ) {
                newSelectedCountry = this.guessSelectedCountry(
                    inputNumber.substring(0, 6),
                    this.state.onlyCountries,
                    this.state.defaultCountry,
                );
                freezeSelection = false;
            }
            // let us remove all non numerals from the input
            formattedNumber = this.formatNumber(
                inputNumber,
                newSelectedCountry.format,
            );
        }

        let caretPosition = e.target.selectionStart;
        const oldFormattedText = this.state.formattedNumber;
        const diff = formattedNumber.length - oldFormattedText.length;

        this.setState(
            {
                formattedNumber: formattedNumber,
                freezeSelection: freezeSelection,
                selectedCountry: newSelectedCountry.dialCode
                    ? newSelectedCountry
                    : this.state.selectedCountry,
            },
            () => {
                if (this.props.isModernBrowser) {
                    if (diff > 0) {
                        caretPosition = caretPosition - diff;
                    }

                    const lastChar = formattedNumber.charAt(
                        formattedNumber.length - 1,
                    );

                    if (lastChar == ')') {
                        this.numberInputRef.current.setSelectionRange(
                            formattedNumber.length - 1,
                            formattedNumber.length - 1,
                        );
                    } else if (
                        caretPosition > 0 &&
                        oldFormattedText.length >= formattedNumber.length
                    ) {
                        this.numberInputRef.current.setSelectionRange(
                            caretPosition,
                            caretPosition,
                        );
                    }
                }

                if (this.props.onChange) {
                    this.props.onChange(
                        this.state.formattedNumber,
                        this.getCountryData(),
                    );
                }
            },
        );
    };

    handleInputClick = (e) => {
        this.setState({ showDropdown: false });
        if (this.props.onClick) this.props.onClick(e, this.getCountryData());
    };

    handleFlagItemClick = (country) => {
        const currentSelectedCountry = this.state.selectedCountry;
        const nextSelectedCountry = find(this.state.onlyCountries, country);

        const unformattedNumber = this.state.formattedNumber
            .replace(' ', '')
            .replace('(', '')
            .replace(')', '')
            .replace('-', '');
        const newNumber =
            unformattedNumber.length > 1
                ? unformattedNumber.replace(
                      currentSelectedCountry.dialCode,
                      nextSelectedCountry.dialCode,
                  )
                : nextSelectedCountry.dialCode;
        const formattedNumber = this.formatNumber(
            newNumber.replace(/\D/g, ''),
            nextSelectedCountry.format,
        );

        this.setState(
            {
                showDropdown: false,
                selectedCountry: nextSelectedCountry,
                freezeSelection: true,
                formattedNumber,
            },
            () => {
                this.cursorToEnd();
                if (this.props.onChange) {
                    this.props.onChange(formattedNumber, this.getCountryData());
                }
            },
        );
    };

    handleInputFocus = (e) => {
        // if the input is blank, insert dial code of the selected country
        if (this.numberInputRef.current) {
            if (
                this.numberInputRef.current.value === '+' &&
                this.state.selectedCountry &&
                !this.props.disableCountryCode
            ) {
                this.setState(
                    {
                        formattedNumber:
                            '+' + this.state.selectedCountry.dialCode,
                    },
                    () => setTimeout(this.cursorToEnd, 10),
                );
            }
        }

        this.setState({ placeholder: '' });

        this.props.onFocus && this.props.onFocus(e, this.getCountryData());
        setTimeout(this.cursorToEnd, 10);
    };

    handleInputBlur = (e) => {
        if (!e.target.value)
            this.setState({ placeholder: this.props.placeholder });
        this.props.onBlur && this.props.onBlur(e, this.getCountryData());
    };

    getHighlightCountryIndex = (direction) => {
        // had to write own function because underscore does not have findIndex. lodash has it
        const highlightCountryIndex =
            this.state.highlightCountryIndex + direction;

        if (
            highlightCountryIndex < 0 ||
            highlightCountryIndex >=
                this.state.onlyCountries.length +
                    this.state.preferredCountries.length
        ) {
            return highlightCountryIndex - direction;
        }

        return highlightCountryIndex;
    };

    searchCountry = () => {
        const probableCandidate =
            this.getProbableCandidate(this.state.queryString) ||
            this.state.onlyCountries[0];
        const probableCandidateIndex =
            findIndex(this.state.onlyCountries, probableCandidate) +
            this.state.preferredCountries.length;

        this.scrollTo(this.getElement(probableCandidateIndex), true);

        this.setState({
            queryString: '',
            highlightCountryIndex: probableCandidateIndex,
        });
    };

    handleInputKeyDown = (e) => {
        const { keys } = this.props;
        if (e.which === keys.ENTER) {
            this.props.onEnterKeyPress(e);
        }

        if (this.props.onKeyDown) this.props.onKeyDown(e);
    };

    handleKeydown = (e) => {
        const { keys } = this.props;
        if (!this.state.showDropdown || this.props.disabled) return;

        // ie hack
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }

        const moveHighlight = (direction) => {
            this.setState(
                {
                    highlightCountryIndex: this.getHighlightCountryIndex(
                        direction,
                    ),
                },
                () => {
                    this.scrollTo(
                        this.getElement(
                            this.state.highlightCountryIndex +
                                this.state.preferredCountries.length,
                        ),
                        true,
                    );
                },
            );
        };

        switch (e.which) {
            case keys.DOWN:
                moveHighlight(1);
                break;
            case keys.UP:
                moveHighlight(-1);
                break;
            case keys.ENTER:
                this.handleFlagItemClick(
                    this.state.onlyCountries[this.state.highlightCountryIndex],
                    e,
                );
                break;
            case keys.ESC:
                this.setState(
                    {
                        showDropdown: false,
                    },
                    this.cursorToEnd,
                );
                break;
            default:
                if (
                    (e.which >= keys.A && e.which <= keys.Z) ||
                    e.which === keys.SPACE
                ) {
                    this.setState(
                        {
                            queryString:
                                this.state.queryString +
                                String.fromCharCode(e.which),
                        },
                        this.state.debouncedQueryStingSearcher,
                    );
                }
        }
    };

    handleClickOutside = (e) => {
        if (!this.dropdownContainerRef.contains(e.target)) {
            this.state.showDropdown && this.setState({ showDropdown: false });
        }
    };

    getCountryName = (country) =>
        this.props.localization[country] != undefined
            ? this.props.localization[country]
            : country;

    getCountryDropdown = () => {
        const {
            preferredCountries,
            onlyCountries,
            highlightCountryIndex,
            showDropdown,
        } = this.state;
        const countryIsPreferred = this.state.preferredCountries.includes(
            this.state.selectedCountry,
        );
        return (
            <CountryList
                hide={!showDropdown}
                ref={(el) => (this.dropdownRef = el)}>
                {[
                    ...preferredCountries,
                    preferredCountries.length && 'divider',
                    ...onlyCountries,
                ]
                    .filter((v) => v)
                    .map((country, index) => {
                        if (country === 'divider')
                            return <Divider key={'dashes'} />;
                        return (
                            <Country
                                ref={(el) => (this[`flag_no_${index}`] = el)}
                                key={`flag_no_${index}`}
                                data-dial-code="1"
                                data-country-code={country.iso2}
                                highlight={
                                    countryIsPreferred
                                        ? highlightCountryIndex === index
                                        : highlightCountryIndex ===
                                          index - preferredCountries.length
                                }
                                onClick={() =>
                                    this.handleFlagItemClick(country)
                                }>
                                <Flag
                                    countryCode={country.iso2}
                                    countryList={true}
                                />
                                <CountryName>
                                    {this.getCountryName(country.name)}
                                </CountryName>
                                <DialCode>{`+${country.dialCode}`}</DialCode>
                            </Country>
                        );
                    })}
            </CountryList>
        );
    };

    render() {
        const { selectedCountry, showDropdown, formattedNumber } = this.state;
        const {
            disableDropdown,
            component: Component = TextFieldStyled,
        } = this.props;

        return (
            <Container>
                <Component
                    onChange={this.handleInput}
                    onClick={this.handleInputClick}
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputBlur}
                    value={formattedNumber}
                    inputRef={this.numberInputRef}
                    onKeyDown={this.handleInputKeyDown}
                    placeholder={this.state.placeholder}
                    disabled={this.props.disabled}
                    type="tel"
                    fullWidth
                    error={
                        !this.props.isValid(formattedNumber.replace(/\D/g, ''))
                    }
                    {...this.props.inputExtraProps}
                />
                <FlagContainer
                    disabled={this.props.disabled}
                    error={this.props.inputExtraProps.error}
                    onKeyDown={this.handleKeydown}>
                    <SelectedFlag
                        onClick={
                            disableDropdown
                                ? undefined
                                : this.handleFlagDropdownClick
                        }
                        title={
                            selectedCountry
                                ? `${selectedCountry.name}: + ${
                                      selectedCountry.dialCode
                                  }`
                                : ''
                        }>
                        <Flag
                            countryCode={selectedCountry.iso2}
                            selected={true}>
                            {!disableDropdown && <Arrow up={showDropdown} />}
                        </Flag>
                    </SelectedFlag>
                </FlagContainer>
                <CountryListWrapper
                    ref={(el) => (this.dropdownContainerRef = el)}>
                    {showDropdown && this.getCountryDropdown()}
                </CountryListWrapper>
            </Container>
        );
    }
}

export default ReactPhoneInput;

if (__DEV__) require('./demo.js');
