import React from "react";
import {StyleSheet, View} from "react-native";
import Button from "./Button";
import icons from "./icons";

interface ToolbarProps {
    editorState: {
        bold: boolean;
        italic: boolean;
        underline: boolean;
        strikethrough: boolean;
    };
    handleState: (key: keyof ToolbarProps['editorState']) => () => void;
}

export default function Toolbar({handleState, editorState}: ToolbarProps) {

    return (
        <View style={styles.toolbar}>
            <Button
                source={icons['bold-regular']}
                onPress={handleState('bold')}
                selected={editorState.bold}
            />
            <Button
                source={icons['italic-regular']}
                onPress={handleState('italic')}
                selected={editorState.italic}
            />
            <Button
                source={icons['strikethrough-regular']}
                onPress={handleState('strikethrough')}
                selected={editorState.strikethrough}
            />
            <Button
                source={icons['underline-regular']}
                onPress={handleState('underline')}
                selected={editorState.underline}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    toolbar: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        gap: 16,
        alignItems: 'center',
        justifyContent: 'center',
        // light gray bg
        backgroundColor: '#f5f5f5',
    },
    box: {
        width: '100%',
        minHeight: 60,
        flexGrow: 1,
        marginVertical: 20,
        backgroundColor: 'white',
        fontSize: 16,
        fontFamily: 'monospace',
    },
});
