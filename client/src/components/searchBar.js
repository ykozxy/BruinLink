import React from "react";
import {Box, InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from "prop-types";

export default class SearchBar extends React.Component {
    static propTypes = {
        initialQuery: PropTypes.string,
        bgColor: PropTypes.string,
        size: PropTypes.oneOf(["small", "medium", "large"]),
    }

    static defaultProps = {
        initialQuery: "",
        size: "small",
        bgColor: "rgb(232, 241, 250)",
    }

    constructor(props) {
        super(props);

        this.state = {query: "", changed: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(event) {
        this.setState({query: event.target.value, changed: true})
    }

    handleKeyPress(event) {
        if (event.charCode === 13) {
            window.location.href = `/search?query=${encodeURIComponent(this.state.query)}`
        }
    }

    render() {
        return (
            <Box width={1} bgcolor={this.props.bgColor}>
                <TextField
                    fullWidth
                    size={this.props.size}
                    variant="outlined"
                    type="search"
                    value={this.state.changed ? this.state.query : this.props.initialQuery}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        );
    }
}
  