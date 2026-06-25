import { useState } from "react";
import {
    ActivityIndicator,
    Button,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { supabase } from "../../supabase/supabase";
import AppTextInput from "../components/AppTextInput";

export default function FeedbackScreen() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitFeedback = async () => {
    if (!message.trim()) {
      setError("Please give me some feedback before submitting.");
      return;
    }

    setLoading(true);
    setError("");

    const { error } = await supabase.from("feedback").insert({
      message,
    });

    setLoading(false);

    if (error) {
      setError("Could not submit feedback. Please try again.");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.thankYouTitle}>Thank you!</Text>
        <Text style={styles.thankYouText}>
          Your feedback has been submitted.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Feedback</Text>

      <AppTextInput
        placeholder="Tell me what you'd improve or what you'd like to see here!"
        value={message}
        onChangeText={setMessage}
        multiline
        style={styles.textArea}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <Button title="Submit Feedback" onPress={submitFeedback} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, marginBottom: 20, color: "black" },
  thankYouTitle: { fontSize: 20, marginBottom: 10, color: "black" },
  thankYouText: { textAlign: "center", color: "black" },
  textArea: {
    height: 150,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  error: { color: "red", marginBottom: 10 },
});
