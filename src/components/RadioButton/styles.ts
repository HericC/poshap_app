import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  button: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
  },
  external: {
    width: 35,
    height: 35,
    borderWidth: 3,
    borderRadius: 50,
    borderColor: '#295BA8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  internal: {
    width: 20,
    height: 20,
    backgroundColor: '#295BA8',
    borderRadius: 50,
  },
  text: {
    width: '100%',
    marginLeft: 10,
    flexShrink: 1,
  },
  externalSmall: {
    width: 25,
    height: 25,
  },
  internalSmall: {
    width: 15,
    height: 15,
  },
});
