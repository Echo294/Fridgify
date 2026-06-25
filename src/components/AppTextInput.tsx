import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native";

interface AppTextInputProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
  placeholderTextColor?: string;
}

export default function AppTextInput({
  style,
  placeholderTextColor,
  ...props
}: AppTextInputProps) {
  return (
    <TextInput
      {...props}
      style={[
        {
          color: "black", // fixes white text issue
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 8,
          fontSize: 16,
        },
        style,
      ]}
      placeholderTextColor={placeholderTextColor || "#888"}
    />
  );
}
