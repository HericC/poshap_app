import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
  btnDangerColor: {
    backgroundColor: '#A82930',
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
  texts: {
    width: '80%',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    color: '#A0A0A0',
    backgroundColor: '#F1F5F4',
  },
  textTitle: {
    fontSize: 16,
    color: '#717F7F',
  },
  list: {
    alignItems: 'center',
  },
  listItem: {
    width: '80%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: '#F1F5F4',
  },
  listItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemTitle: {
    fontSize: 22,
    color: '#717F7F',
  },
  listItemText: {
    fontSize: 20,
    color: '#A0A0A0',
  },
});
