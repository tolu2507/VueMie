/* eslint-disable prettier/prettier */

interface Type {
  type: string;
  data: string;
}
export default function Tester(props: Type): boolean {
  let result: boolean = false;
  if (props.type === 'email') {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    result = emailRegex.test(props.data);
  }
  if (props.type === 'password') {
    const passwordRegex: RegExp =
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    result = passwordRegex.test(props.data);
  }
  if (props.type === 'name') {
    if (props.data.length >= 4) {
      result = true;
    } else {
      result = false;
    }
  }
  if (props.type === 'phonenumber') {
    if (props.data.length >= 8) {
      let hold = props.data.split('');
      if (hold[0] === '+') {
        result = true;
      } else {
        result = false;
      }
    } else {
      result = false;
    }
  }

  return result;
}
