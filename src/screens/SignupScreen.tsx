import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "../lib/supabase";

// Signup screen where users can create a new account
//saves password and an email
export default function SignupScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      alert("Check your email to confirm your account");
      navigation.navigate("Login");
    }

    setLoading(false);
  };

  //this is the styling for the signup screen
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      // This is the input field for the user's email.
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
      <Button
        title={loading ? "Creating..." : "Sign Up"}
        onPress={handleSignup}
      />
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Already have an account? Log in
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 28, marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  error: { color: "red", marginBottom: 10 },
  link: { marginTop: 20, textAlign: "center", color: "blue" },
});
