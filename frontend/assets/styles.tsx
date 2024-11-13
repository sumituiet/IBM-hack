import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Theme {
  background: string;
  text: string;
  inputBackground: string;
  inputBorder: string;
  placeholderText: string;
  buttonBackground: string;
  buttonText: string;
  linkText: string;
}

const lightTheme: Theme = {
  background: '#f0f4f7',
  text: '#333',
  inputBackground: '#fff',
  inputBorder: '#ddd',
  placeholderText: '#666',
  buttonBackground: '#007bff',
  buttonText: '#fff',
  linkText: '#007bff',
};

const darkTheme: Theme = {
  background: '#1e1e1e',
  text: '#fff',
  inputBackground: '#333',
  inputBorder: '#555',
  placeholderText: '#ccc',
  buttonBackground: '#375a7f',
  buttonText: '#fff',
  linkText: '#4d90fe',
};

interface CommonStyles {
  container: ViewStyle;
  title: TextStyle;
  input: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  linkText: TextStyle;
  text: TextStyle;
}

const commonStyles: CommonStyles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
  },
  linkText: {
    marginTop: 15,
    fontSize: 16,
  },
  text: {
    fontSize: 24,
  },
};

// Define return type for createStyles
type Style = {
  container: ViewStyle;
  title: TextStyle;
  input: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  linkText: TextStyle;
  text:TextStyle;
};



// Create styles based on theme
export const createStyles = (isDarkMode: boolean): Style => {
  const theme = isDarkMode ? darkTheme : lightTheme;

  return StyleSheet.create({
    container: {
      ...commonStyles.container,
      backgroundColor: theme.background,
    },
    title: {
      ...commonStyles.title,
      color: theme.text,
    },
    input: {
      ...commonStyles.input,
      backgroundColor: theme.inputBackground,
      borderColor: theme.inputBorder,
      color: theme.text,
    },
    button: {
      ...commonStyles.button,
      backgroundColor: theme.buttonBackground,
    },
    buttonText: {
      ...commonStyles.buttonText,
      color: theme.buttonText,
    },
    linkText: {
      ...commonStyles.linkText,
      color: theme.linkText,
    },
    text: {
      ...commonStyles.text,
      color: theme.text,
    },
  });
};
