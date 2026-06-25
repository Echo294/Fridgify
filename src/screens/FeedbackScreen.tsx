import { useState } from "react";
import { ActivityIndicator, Button, Text, TextInput, View } from "react-native";
import { supabase } from "../../supabase/supabase";

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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Thank you!</Text>
        <Text style={{ textAlign: "center" }}>
          Your feedback has been submitted.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Send Feedback</Text>

      <TextInput
        placeholder="Tell me what you'd improve or what you'd like to see here!"
        value={message}
        onChangeText={setMessage}
        multiline
        style={{
          height: 150,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          padding: 10,
          textAlignVertical: "top",
          marginBottom: 20,
        }}
      />

      {error ? (
        <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
      ) : null}

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <Button title="Submit Feedback" onPress={submitFeedback} />
      )}
    </View>
  );
}
