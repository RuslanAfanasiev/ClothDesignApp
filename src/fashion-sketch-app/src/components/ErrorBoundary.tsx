import React, { Component, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.icon}>⚠</Text>
          <Text style={styles.title}>
            {this.props.fallbackMessage ?? 'Ceva a mers prost'}
          </Text>
          <Text style={styles.message} numberOfLines={3}>
            {this.state.errorMessage}
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.handleReset}>
            <Text style={styles.buttonText}>Incearca din nou</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  icon: { fontSize: 48, marginBottom: 16, color: '#D4AF37' },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F5F5F0',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  buttonText: { color: '#D4AF37', fontSize: 14, letterSpacing: 0.5 },
});

export default ErrorBoundary;
