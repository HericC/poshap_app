import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 30,
  },
  img: {
    width: 160,
    height: 160,
  },
  title: {
    fontSize: 26,
    marginTop: 10,
  },
  inputs: {
    width: '80%',
    marginVertical: 16,
  },
  input: {
    height: 46,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#295BA8',
    paddingHorizontal: 10,
    marginVertical: 6,
  },
  btns: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    borderWidth: 0,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 32,
    backgroundColor: '#295BA8',
    justifyContent: 'center',
  },
  btnSecondary: {
    borderWidth: 2,
    borderColor: '#295BA8',
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
  },
  btnTextSecondary: {
    color: '#295BA8',
  },
  link: {
    paddingEnd: 12,
    alignItems: 'flex-end',
  },
  linkText: {
    fontSize: 12,
    textDecorationLine: 'underline',
    color: '#5C6262',
  },
});
