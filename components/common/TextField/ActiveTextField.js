import React from 'react';
import Colors from '../../../helpers/Colors';
import { TextField } from 'react-native-material-textfield';

export default class ActiveTextField extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            isFocused: false
        });
    }

    render() {
        return (
            <TextField
                textColor={Colors.darkGray}
                baseColor={!this.state.isFocused ? Colors.lightGray : this.props.error ? Colors.error : Colors.tint}
                tintColor={Colors.activeLabel}
                errorColor={Colors.error}
                label={this.props.label}
                value={this.props.value}
                onChangeText={this.props.onChangeText}
                labelHeight={15}
                fontSize={15}
                titleFontSize={15}
                labelFontSize={12}
                keyboardType={this.props.keyboardType}
                onFocus={() => { this.setState({ isFocused: true }); }}
                secureTextEntry={this.props.secureTextEntry}
            />
        );
    }
}

